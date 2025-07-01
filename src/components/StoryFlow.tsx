import { useState, useEffect, lazy, Suspense } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
const StateDebugOverlay = lazy(() => import('./StateDebugOverlay'));
const ConsolidatedFeedbackPrompt = lazy(() => import('./ConsolidatedFeedbackPrompt'));
const StarRatingOverlay = lazy(() => import('./StarRatingOverlay'));
import { useQNCE } from '../hooks/useQNCE';
import { useConsolidatedFeedbackManager } from '../utils/ConsolidatedFeedbackManager';
import { useStarRatingFeedback } from '../utils/StarRatingFeedbackManager';

// Chapter entry point mapping
const CHAPTER_ENTRY_POINTS: Record<string, string> = {
  'partI': 'ft_journalDiscovery',    // Chapter 1: The Garden That Wasn't
  'partII': 'partII:intro',          // Chapter 2: The Echo Protocol  
  'partIII': 'partIII:intro',        // Chapter 3: The Keepers
  'partIV': 'partIV:intro',          // Chapter 4: The Antarctic Discovery
  'partV': 'partV:intro',            // Chapter 5: The Echo Awakens
  'partVI': 'partVI:intro',          // Chapter 6: The Fractured Timeline
  'partVII': 'partVII:intro',        // Chapter 7: The New Guardians
  'partVIII': 'partVIII:intro',      // Chapter 8: The Ones Who Shaped
};

interface StoryFlowProps {
  segmentId: string;
  onComplete: () => void;
  onBack: () => void;
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
  // Extract chapter from segmentId (format: "forgottenTruth_partII")
  const chapterId = segmentId.split('_')[1] || 'partI';
  const startNodeId = CHAPTER_ENTRY_POINTS[chapterId] || 'ft_journalDiscovery';
  
  console.log('StoryFlow loaded with segmentId:', segmentId, 'Starting at:', startNodeId);
  
  const { 
    currentNode, 
    variables, 
    history, 
    makeChoice, 
    getAvailableChoices,
  } = useQNCE(undefined, startNodeId); // Pass startNodeId to useQNCE
  const [showDebug, setShowDebug] = useState(false);
  const [isFirstChoice, setIsFirstChoice] = useState(true);

  const {
    currentMilestone,
    isVisible: isFeedbackVisible,
    checkForFeedback,
    handleFeedbackSubmit,
    handleFeedbackDismiss,
    updateSessionData,
    sessionData,
    forceReleasePopupLock
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

  // Handle automatic completion for terminal nodes (no choices) only
  useEffect(() => {
    if ((!currentNode.choices || currentNode.choices.length === 0) && onComplete) {
      // Terminal nodes without choices should show a "Continue" button instead of auto-completing
      // This prevents users from being redirected before they can read the ending
      console.log('🎯 Terminal node detected:', currentNode.nodeId, '- will show Continue button');
    }
  }, [currentNode, onComplete]);

  // Handle feedbackHook when entering a node (not just when making choices)
  useEffect(() => {
    if (currentNode.feedbackHook) {
      console.log('🎯 FeedbackHook detected on node entry:', currentNode.feedbackHook, 'on node:', currentNode.nodeId);
      checkForFeedback(currentNode.feedbackHook.milestone);
      
      // Only trigger star rating for story completion milestones
      if (currentNode.feedbackHook.milestone === 'story_completion') {
        console.log('⭐ Star rating feedback should trigger in', currentNode.feedbackHook.delay || 1000, 'ms');
        setTimeout(() => {
          console.log('⭐ Triggering star rating feedback now');
          checkForStarRating(currentNode.feedbackHook!.milestone, currentNode.nodeId, history.length);
        }, currentNode.feedbackHook.delay || 1000);
      }
    }
  }, [currentNode, checkForFeedback, checkForStarRating, history.length]);

  // Cleanup feedback locks when component unmounts or navigates away
  useEffect(() => {
    return () => {
      // Force release any feedback locks when StoryFlow unmounts
      if (forceReleasePopupLock) {
        forceReleasePopupLock();
        console.log('🚨 StoryFlow cleanup: Released feedback popup lock');
      }
    };
  }, [forceReleasePopupLock]);

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

    if (isFirstChoice) {
      setIsFirstChoice(false);
    }
  };

  const availableChoices = getAvailableChoices();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      {/* Back button */}
      {onBack && (
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => {
              // Clean up any active feedback locks before navigating back
              if (forceReleasePopupLock) {
                forceReleasePopupLock();
                console.log('🚨 Navigation back: Released feedback popup lock');
              }
              onBack();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50"
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
          isTerminalNode={(!currentNode.choices || currentNode.choices.length === 0)}
          onComplete={onComplete}
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
