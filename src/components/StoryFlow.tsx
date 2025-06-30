import { useState, useEffect, lazy, Suspense } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
const StateDebugOverlay = lazy(() => import('./StateDebugOverlay'));
const ConsolidatedFeedbackPrompt = lazy(() => import('./ConsolidatedFeedbackPrompt'));
const StarRatingOverlay = lazy(() => import('./StarRatingOverlay'));
import { useQNCE } from '../hooks/useQNCE';
import { useConsolidatedFeedbackManager } from '../utils/ConsolidatedFeedbackManager';
import { useStarRatingFeedback } from '../utils/StarRatingFeedbackManager';

interface StoryFlowProps {
  segmentId?: string;
  onComplete?: () => void;
  onBack?: () => void;
  settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
  };
}

const StoryFlow: React.FC<StoryFlowProps> = ({
  segmentId,
  onComplete,
  onBack,
  settings,
}) => {
  // Log props for now (TODO: implement proper segmentId support)
  console.log('StoryFlow loaded with segmentId:', segmentId);
  
  const { 
    currentNode, 
    variables, 
    history, 
    makeChoice, 
    getAvailableChoices,
  } = useQNCE();
  const [showDebug, setShowDebug] = useState(false);
  const [isFirstChoice, setIsFirstChoice] = useState(true);

  const {
    currentMilestone,
    isVisible: isFeedbackVisible,
    checkForFeedback,
    handleFeedbackSubmit,
    handleFeedbackDismiss,
    updateSessionData,
    sessionData
  } = useConsolidatedFeedbackManager();

  // Star rating feedback for story completion
  const {
    isVisible: isStarRatingVisible,
    checkForFeedback: checkForStarRating,
    handleSubmit: handleStarRatingSubmit,
    handleSkip: handleStarRatingSkip
  } = useStarRatingFeedback();

  useEffect(() => {
    const sessionStartTime = Date.now();
    const handleSessionEnd = () => {
      const sessionDuration = Date.now() - sessionStartTime;
      if (sessionDuration > 15 * 60 * 1000) { // 15 minutes
        checkForFeedback('session_end');
      }
    };
    window.addEventListener('beforeunload', handleSessionEnd);
    return () => window.removeEventListener('beforeunload', handleSessionEnd);
  }, [checkForFeedback]);

  const handleChoice = (choice: any) => {
    const choiceIndex = getAvailableChoices().indexOf(choice);
    if (choiceIndex < 0) return;

    // Check if this choice leads to completion
    const nextNodeId = choice.nextNodeId;
    const isCompletionChoice = nextNodeId && (
      nextNodeId.includes('_finale') || 
      nextNodeId.includes('_complete') ||
      nextNodeId.includes('Return to the Core Story')
    );

    // useQNCE hook already tracks the choice via trackStoryEvent.choice
    makeChoice(choiceIndex);

    updateSessionData({ choiceCount: history.length });

    // If this is a completion choice, trigger the onComplete callback
    if (isCompletionChoice && onComplete) {
      setTimeout(() => {
        onComplete();
      }, 1000); // Small delay to allow text to be read
    }

    if (currentNode.feedbackHook) {
      console.log('🎯 FeedbackHook detected:', currentNode.feedbackHook, 'on node:', currentNode.nodeId);
      checkForFeedback(currentNode.feedbackHook.milestone);
      
      // Also check for star rating feedback at story completion
      if (currentNode.feedbackHook.milestone === 'story_completion') {
        console.log('⭐ Star rating feedback should trigger in', currentNode.feedbackHook.delay || 1000, 'ms');
        setTimeout(() => {
          console.log('⭐ Triggering star rating feedback now');
          checkForStarRating(currentNode.feedbackHook!.milestone, currentNode.nodeId, history.length);
        }, currentNode.feedbackHook.delay || 1000);
      }
    }

    if (isFirstChoice) {
      setIsFirstChoice(false);
    }
  };

  const availableChoices = getAvailableChoices();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative overflow-hidden">
      {/* Back button */}
      {onBack && (
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Back button clicked - calling onBack');
              onBack();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50 shadow-lg backdrop-blur-sm cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chapters
          </button>
        </div>
      )}
      
      <div className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
        <NarrativeDisplay 
          text={currentNode.dynTextFunction ? currentNode.dynTextFunction(variables) : (currentNode.text || 'Error: Node has no text')} 
          variables={variables} 
        />
        <ChoiceSelector 
          choices={availableChoices} 
          onSelect={handleChoice} 
          isFirstChoice={isFirstChoice}
        />
      </div>

      {/* Developer-only debug toggle - kept separate from main menu */}
      {settings.developerMode && (
        <div className="absolute bottom-4 right-4">
          <button onClick={() => setShowDebug(!showDebug)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            {showDebug ? 'Hide' : 'Show'} Debug
          </button>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        {settings.showDebugInfo && <StateDebugOverlay nodeId={currentNode.nodeId} variables={variables} history={history} className={showDebug ? 'opacity-100' : 'opacity-0'} />}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {isFeedbackVisible && currentMilestone && (
          <ConsolidatedFeedbackPrompt
            isVisible={isFeedbackVisible}
            milestone={currentMilestone}
            sessionData={sessionData}
            onSubmit={handleFeedbackSubmit}
            onDismiss={handleFeedbackDismiss}
          />
        )}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {isStarRatingVisible && (
          <StarRatingOverlay
            isVisible={isStarRatingVisible}
            title="How was your story experience?"
            description="Rate your quantum narrative journey!"
            onSubmit={handleStarRatingSubmit}
            onSkip={handleStarRatingSkip}
          />
        )}
      </Suspense>
    </div>
  );
};

export default StoryFlow;
