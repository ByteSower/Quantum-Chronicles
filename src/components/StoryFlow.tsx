import { useState, useEffect, lazy, Suspense } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
import EnhancedSettingsModal from './EnhancedSettingsModal';
// Lazy load non-critical components
const StateDebugOverlay = lazy(() => import('./StateDebugOverlay'));
const IntroModal = lazy(() => import('./IntroModal'));
const TutorialOverlay = lazy(() => import('./TutorialOverlay'));
const OnboardingOverlay = lazy(() => import('./OnboardingOverlay'));
const VariableTeaser = lazy(() => import('./VariableTeaser'));
const VariableDashboard = lazy(() => import('./VariableDashboard/VariableDashboard'));
const VisualBranchTracker = lazy(() => import('./VisualBranchTracker'));
const LogArea = lazy(() => import('./LogArea'));
const FeedbackPrompt = lazy(() => import('./FeedbackPrompt'));
import { useQNCE, type Choice } from '../hooks/useQNCE';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import { useFeatureFlag, useABTestVariant } from '../utils/ABTestConfig';
import { useFeedbackManager } from '../utils/FeedbackManager';
import type { LogEntry } from './LogArea';
import type { StartingPoint } from './StartScreen';

interface StoryFlowProps {
  startingPoint: StartingPoint | null;
  settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
  devMode: boolean;
  onReturnToStart: () => void;
  onShowAbout: () => void;
  onShowSettings: () => void;
  onShowQNCEHelp?: () => void;
  // Add new props for settings modal actions
  onUpdateSettings?: (settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  }) => void;
}

const StoryFlow: React.FC<StoryFlowProps> = ({
  startingPoint, 
  settings, 
  devMode,
  onReturnToStart,
  onShowAbout,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onShowSettings: _onShowSettings, // Keep for interface compatibility but don't use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onShowQNCEHelp: _onShowQNCEHelp, // Keep for interface compatibility but don't use
  onUpdateSettings
}) => {
  const { 
    currentNode, 
    flags, 
    history, 
    variables, 
    recentActions,
    makeChoice, 
    reset, 
    initializeFromStartingPoint, 
    getBranchNodes, 
    getAvailableChoices,
    isChoiceAvailable 
  } = useQNCE();
  const [showDebug, setShowDebug] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showEnhancedSettings, setShowEnhancedSettings] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Onboarding and engagement states
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [choiceCount, setChoiceCount] = useState(0);
  const [isFirstChoice, setIsFirstChoice] = useState(true);

  // Feedback management
  const {
    currentPrompt,
    checkForFeedback,
    handleFeedbackSubmit,
    handleFeedbackDismiss
  } = useFeedbackManager();

  // Track session start and end for feedback
  useEffect(() => {
    const sessionStartTime = Date.now();
    
    // Track session end on component unmount or page unload
    const handleSessionEnd = () => {
      const sessionDuration = Date.now() - sessionStartTime;
      if (sessionDuration > 2 * 60 * 1000) { // At least 2 minutes for meaningful session
        checkForFeedback('session_ended');
      }
    };

    // Add event listeners for session end
    window.addEventListener('beforeunload', handleSessionEnd);
    
    // Return cleanup function
    return () => {
      handleSessionEnd();
      window.removeEventListener('beforeunload', handleSessionEnd);
    };
  }, [checkForFeedback]);

  // A/B Test configuration
  const abTestVariant = useABTestVariant();
  const enhancedOnboarding = useFeatureFlag('enhancedOnboarding');

  // Initialize A/B test and check onboarding status
  useEffect(() => {
    // Always show onboarding for new sessions (don't persist completion)
    // This helps users who forget quickly and ensures consistent UX
    setOnboardingCompleted(false);
    
    // Debug logging
    if (import.meta.env.DEV) {
      console.log('🎯 Session onboarding status:', {
        abTestVariant,
        enhancedOnboarding,
        showModal,
        showOnboarding,
        sessionBased: true
      });
    }
  }, [abTestVariant, enhancedOnboarding, showModal, showOnboarding]);

  // Initialize with starting point variables
  useEffect(() => {
    if (startingPoint && !initialized) {
      initializeFromStartingPoint(startingPoint.id, startingPoint.initialVariables);
      setInitialized(true);
    }
  }, [startingPoint, initializeFromStartingPoint, initialized]);

  // Reset initialized flag when starting point changes
  useEffect(() => {
    setInitialized(false);
  }, [startingPoint?.id]);

  // Show tutorial after intro modal is closed
  function handleIntroClose() {
    setShowModal(false);
    // Show onboarding based on A/B test variant
    // Variant A: Minimal onboarding (baseline) - but still show if never completed
    // Variant B: Enhanced onboarding with guided tour
    
    const shouldShow = enhancedOnboarding || !onboardingCompleted;
    
    // Debug logging
    if (import.meta.env.DEV) {
      console.log('🎯 Intro closed, checking onboarding conditions:', {
        enhancedOnboarding,
        onboardingCompleted,
        abTestVariant,
        shouldShowOnboarding: shouldShow,
        localStorage_value: localStorage.getItem('qnce_onboarding_completed'),
        willShowOnboarding: shouldShow
      });
    }
    
    if (shouldShow) {
      console.log('✅ Starting onboarding overlay');
      setShowOnboarding(true);
      analyticsWrapper.trackOnboardingEvent('onboarding_started');
    } else {
      console.log('❌ Skipping onboarding - already completed and not enhanced variant');
      // For beta testing: always show onboarding if enhanced onboarding is enabled
      if (enhancedOnboarding && import.meta.env.VITE_APP_ENV === 'beta') {
        console.log('🧪 Beta override: Showing onboarding anyway for testing');
        setShowOnboarding(true);
        analyticsWrapper.trackOnboardingEvent('onboarding_started');
      }
    }
  }

  // Handle onboarding completion
  function handleOnboardingComplete() {
    setShowOnboarding(false);
    setOnboardingCompleted(true); // Only for this session
    // Don't persist to localStorage - allow fresh onboarding each session
    analyticsWrapper.trackOnboardingEvent('onboarding_completed');
    
    // Trigger feedback prompt after onboarding
    setTimeout(() => {
      checkForFeedback('onboarding_finished');
    }, 2000); // Small delay to let user settle
  }

  // Handle onboarding dismissal
  function handleOnboardingDismiss() {
    setShowOnboarding(false);
    setOnboardingCompleted(true); // Only for this session
    // Don't persist to localStorage - allow fresh onboarding each session
    analyticsWrapper.trackOnboardingEvent('onboarding_skipped');
  }

  function handleReset() {
    if (startingPoint) {
      // Restart with the current starting point rather than going to default
      initializeFromStartingPoint(startingPoint.id, startingPoint.initialVariables);
    } else {
      reset();
    }
    setInitialized(false);
    // Reset choice tracking
    setChoiceCount(0);
    setIsFirstChoice(true);
  }

  // Enhanced decision logic for good/bad branches
  function handleSelectChoice(choice: Choice) {
    // Find the index of the choice in the available choices (filtered)
    const availableChoices = getAvailableChoices();
    const choiceIndex = availableChoices.findIndex(c => c === choice);
    if (choiceIndex === -1) return;
    
    // Track choice count and update first choice flag
    const newChoiceCount = choiceCount + 1;
    setChoiceCount(newChoiceCount);
    
    if (isFirstChoice) {
      setIsFirstChoice(false);
      analyticsWrapper.trackChoiceMade({
        choiceId: choice.nextNodeId,
        choiceText: choice.text,
        nodeId: currentNode.id,
        choiceIndex,
        isFirstChoice: true,
        variables,
      });
      
      // Trigger feedback after first choice
      setTimeout(() => {
        checkForFeedback('first_choice_completed');
      }, 3000);
    } else {
      analyticsWrapper.trackChoiceMade({
        choiceId: choice.nextNodeId,
        choiceText: choice.text,
        nodeId: currentNode.id,
        choiceIndex,
        isFirstChoice: false,
        variables,
      });
      
      // Trigger story midpoint feedback after several choices
      if (newChoiceCount === 5) {
        setTimeout(() => {
          checkForFeedback('story_midpoint');
        }, 4000);
      }
      
      // Trigger engagement feedback at deeper story points
      if (newChoiceCount === 10) {
        setTimeout(() => {
          checkForFeedback('story_engagement');
        }, 5000);
      }
    }
    
    // Hide engagement banner when choice is made (functionality preserved for potential re-implementation)
    
    // Add consequence messages to logs
    if (choice.consequences?.immediate) {
      const message = choice.consequences.immediate;
      if (message) {
        setLogs(logs => [
          ...logs,
          { message, type: 'neutral' as const },
        ]);
      }
    }
    
    // Classic crossroads narrative nodes
    const goodNodes = ['campfire', 'merchant', 'signal', 'welcome', 'shortcut'];
    const badNodes = ['lost'];
    
    // The Forgotten Truth narrative nodes - expanded with new nodes
    const forgottenTruthGoodNodes = [
      'forgotten_truth_transfer', 'forgotten_truth_network', 'forgotten_truth_repair', 
      'forgotten_truth_multiverse', 'forgotten_truth_acceptance', 'forgotten_truth_evidence',
      'forgotten_truth_expose', 'forgotten_truth_rescue', 'forgotten_truth_guided_recovery',
      'forgotten_truth_research_notes', 'forgotten_truth_network_secret',
      'forgotten_truth_ai_negotiation', 'forgotten_truth_hybrid_consciousness',
      'forgotten_truth_evolution_guide', 'forgotten_truth_consciousness_protectors',
      'forgotten_truth_global_revelation', 'forgotten_truth_collective_power',
      'forgotten_truth_individual_choice', 'forgotten_truth_quantum_awakening',
      'forgotten_truth_knowledge_sharing'
    ];
    const forgottenTruthBadNodes = [
      'forgotten_truth_denial', 'forgotten_truth_therapy', 'forgotten_truth_destruction',
      'forgotten_truth_ai_conflict', 'forgotten_truth_forced_return'
    ];
    const forgottenTruthNeutralNodes = [
      'forgotten_truth_acceptance_forced', 'forgotten_truth_protection', 'forgotten_truth_seal',
      'forgotten_truth_webb_confrontation', 'forgotten_truth_deception',
      'forgotten_truth_reversal_attempt', 'forgotten_truth_safe_reversal',
      'forgotten_truth_guardian', 'forgotten_truth_shadow_guardian',
      'forgotten_truth_healers', 'forgotten_truth_expert_consultation'
    ];
    
    // Use the original choice index from all choices for the actual makeChoice call
    const originalChoiceIndex = currentNode.choices.findIndex(c => c === choice);
    makeChoice(originalChoiceIndex);
    
    // Check for good outcomes
    if (goodNodes.includes(choice.nextNodeId) || forgottenTruthGoodNodes.includes(choice.nextNodeId)) {
      const message = forgottenTruthGoodNodes.includes(choice.nextNodeId) 
        ? 'Quantum Convergence: Truth illuminated, consciousness expanded!'
        : 'Branch Good: Favorable narrative shift achieved!';
      setLogs(logs => [
        ...logs,
        { message, type: 'good' },
      ]);
    } 
    // Check for bad outcomes
    else if (badNodes.includes(choice.nextNodeId) || forgottenTruthBadNodes.includes(choice.nextNodeId)) {
      const message = forgottenTruthBadNodes.includes(choice.nextNodeId)
        ? 'Memory Fracture: Consciousness destabilized, truth buried deeper!'
        : 'Branch Bad: Narrative collapse warning triggered!';
      setLogs(logs => [
        ...logs,
        { message, type: 'bad' },
      ]);
    }
    // Check for neutral/complex outcomes
    else if (forgottenTruthNeutralNodes.includes(choice.nextNodeId)) {
      setLogs(logs => [
        ...logs,
        { message: 'Quantum Equilibrium: Truth balanced with wisdom - consequences uncertain.', type: 'neutral' },
      ]);
    }
  }

  return (
    <>
      {showModal && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="text-white">Loading...</div></div>}>
          <IntroModal onClose={handleIntroClose} />
        </Suspense>
      )}
      {showTutorial && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="text-white">Loading...</div></div>}>
          <TutorialOverlay onClose={() => setShowTutorial(false)} />
        </Suspense>
      )}
      
      <main className="w-full flex flex-col items-center text-white" role="main" aria-label="Interactive story content">
        <div className="w-full max-w-md mx-auto px-2 sm:px-4 text-center">
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 w-full">
              <NarrativeDisplay 
                text={currentNode.text}
              />
            </div>
            
            {/* Variable Teaser - shows after first choice and periodically thereafter */}
            {choiceCount > 0 && (choiceCount <= 5 || choiceCount % 3 === 0) && (
              <div className="w-full max-w-md mx-auto mb-4 px-4">
                <Suspense fallback={<div className="text-gray-500 text-sm">Loading variables...</div>}>
                  <VariableTeaser 
                    variables={variables}
                    showHint={choiceCount <= 2}
                    compact={choiceCount > 3}
                  />
                </Suspense>
              </div>
            )}
            
            <div className="flex flex-col items-center mb-2 w-full">
              <ChoiceSelector 
                choices={getAvailableChoices()} 
                onSelect={handleSelectChoice}
                showOnboardingHints={!onboardingCompleted}
                isFirstChoice={isFirstChoice}
              />
              
              {/* Show locked choices in developer mode */}
              {settings.developerMode && currentNode.choices.length > getAvailableChoices().length && (
                <div className="mt-2 p-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-400 w-full">
                  <details>
                    <summary className="cursor-pointer text-yellow-400">
                      🔒 {currentNode.choices.length - getAvailableChoices().length} Locked Choice(s)
                    </summary>
                    <div className="mt-2 space-y-1">
                      {currentNode.choices.filter(choice => !isChoiceAvailable(choice)).map((choice, index) => (
                        <div key={index} className="text-gray-500 italic">
                          "{choice.text}" 
                          {choice.requirements && (
                            <div className="text-xs text-red-400 ml-2">
                              Requirements not met
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
            
            {/* Show recent actions in developer mode */}
            {settings.developerMode && recentActions.length > 0 && (
              <div className="w-full mt-2 mb-2 px-2">
                <div className="bg-blue-900 bg-opacity-30 p-2 rounded text-xs">
                  <h4 className="text-blue-300 font-semibold mb-1">Recent Quantum Effects:</h4>
                  {recentActions.slice(0, 3).map((action, index) => (
                    <div key={index} className="text-blue-200 mb-1">• {action}</div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show logs only if developer mode and show logs is enabled */}
            {settings.developerMode && settings.showDebugInfo && (
              <div className="w-full mt-2 mb-4 px-2">
                <Suspense fallback={<div className="text-gray-500 text-sm">Loading logs...</div>}>
                  <LogArea logs={logs} />
                </Suspense>
              </div>
            )}
            
            <nav 
              className="flex flex-wrap items-center gap-4 mt-2 w-full max-w-md justify-center"
              role="navigation"
              aria-label="Story navigation and options"
            >
              <button
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 text-sm font-medium"
                onClick={() => setShowEnhancedSettings(true)}
                aria-label="Open settings and navigation options"
              >
                <span>⚙️</span>
                Menu
              </button>
            </nav>
            
            {showDebug && settings.developerMode && settings.showDebugInfo && (
              <Suspense fallback={<div className="text-gray-500 text-sm">Loading debug...</div>}>
                <StateDebugOverlay nodeId={currentNode.id} flags={flags} history={history} />
              </Suspense>
            )}
          </div>
        </div>
        
        {/* Visual Branch Tracker moved to bottom and scaled down */}
        {settings.developerMode && (
          <div className="w-full max-w-4xl mx-auto mt-6 px-2">
            <Suspense fallback={<div className="text-gray-500 text-sm">Loading branch visualizer...</div>}>
              <VisualBranchTracker 
                nodes={getBranchNodes()}
                selectedPath={history}
                className="w-full"
              />
            </Suspense>
          </div>
        )}
      </main>
      
      {/* Onboarding Overlay */}
      <Suspense fallback={null}>
        <OnboardingOverlay
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          onDismiss={handleOnboardingDismiss}
        />
      </Suspense>

      {/* Developer Mode Variable Dashboard */}
      {devMode && settings.showVariableDashboard && (
        <Suspense fallback={<div className="text-gray-500 text-sm">Loading variable dashboard...</div>}>
          <VariableDashboard 
            curiosity={variables.curiosity}
            coherence={variables.coherence}
            disruption={variables.disruption}
            synchrony={variables.synchrony}
            onInteraction={() => {
              // Track variable dashboard usage and potentially trigger feedback
              analyticsWrapper.trackUIEvent('feature_used', {
                feature: 'variable_dashboard',
                action: 'opened'
              });
              setTimeout(() => {
                checkForFeedback('variable_dashboard_used');
              }, 2000);
            }}
          />
        </Suspense>
      )}

      {/* Feedback Prompt */}
      {currentPrompt && (
        <Suspense fallback={null}>
          <FeedbackPrompt
            isVisible={currentPrompt.isVisible}
            category={currentPrompt.trigger.category}
            milestone={currentPrompt.trigger.milestone}
            title={currentPrompt.trigger.title}
            description={currentPrompt.trigger.description}
            quickOptions={currentPrompt.trigger.quickOptions}
            onSubmit={handleFeedbackSubmit}
            onDismiss={handleFeedbackDismiss}
          />
        </Suspense>
      )}

      {/* Enhanced Settings Modal */}
      <EnhancedSettingsModal
        isOpen={showEnhancedSettings}
        onClose={() => setShowEnhancedSettings(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => {
          // Pass settings changes back to App level
          if (onUpdateSettings) {
            onUpdateSettings(newSettings);
          }
        }}
        onRestartStory={() => {
          handleReset();
          setShowEnhancedSettings(false);
        }}
        onChangeStory={() => {
          onReturnToStart();
          setShowEnhancedSettings(false);
        }}
        onShowTutorial={() => {
          setShowTutorial(true);
          setShowEnhancedSettings(false);
        }}
        onShowAbout={() => {
          onShowAbout();
          setShowEnhancedSettings(false);
        }}
        onToggleDebug={() => {
          setShowDebug(!showDebug);
        }}
        showDebug={showDebug}
      />
    </>
  );
};

export default StoryFlow;
