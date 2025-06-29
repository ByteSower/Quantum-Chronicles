import { useState, useEffect, lazy, Suspense } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
const StateDebugOverlay = lazy(() => import('./StateDebugOverlay'));
const ConsolidatedFeedbackPrompt = lazy(() => import('./ConsolidatedFeedbackPrompt'));
import { useQNCE } from '../hooks/useQNCE';
import { useConsolidatedFeedbackManager } from '../utils/ConsolidatedFeedbackManager';

interface StoryFlowProps {
  settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
}

const StoryFlow: React.FC<StoryFlowProps> = ({
  settings,
}) => {
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

    // useQNCE hook already tracks the choice via trackStoryEvent.choice
    makeChoice(choiceIndex);

    updateSessionData({ choiceCount: history.length });

    if (currentNode.feedbackHook) {
      checkForFeedback(currentNode.feedbackHook.milestone);
    }

    if (isFirstChoice) {
      setIsFirstChoice(false);
    }
  };

  const availableChoices = getAvailableChoices();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      <Suspense fallback={<div>Loading...</div>}>
        {settings.showDebugInfo && <StateDebugOverlay nodeId={currentNode.nodeId} variables={variables} history={history} className={showDebug ? 'opacity-100' : 'opacity-0'} />}
      </Suspense>

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
    </div>
  );
};

export default StoryFlow;
