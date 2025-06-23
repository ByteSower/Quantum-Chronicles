import { useState, useEffect } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
import StateDebugOverlay from './StateDebugOverlay';
import IntroModal from './IntroModal';
import TutorialOverlay from './TutorialOverlay';
import OnboardingOverlay from './OnboardingOverlay';
import EngagementBanner from './EngagementBanner';
import VariableTeaser from './VariableTeaser';
import VariableDashboard from './VariableDashboard/VariableDashboard';
import VisualBranchTracker from './VisualBranchTracker';
import { useQNCE } from '../hooks/useQNCE';
import LogArea from './LogArea';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import { useFeatureFlag, useABTestVariant } from '../utils/ABTestConfig';
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
}

const StoryFlow: React.FC<StoryFlowProps> = ({ 
  startingPoint, 
  settings, 
  devMode,
  onReturnToStart, 
  onShowAbout, 
  onShowSettings,
  onShowQNCEHelp: _onShowQNCEHelp // Keep for interface compatibility but don't use
}) => {
  const { 
    currentNode, 
    flags, 
    history, 
    variables, 
    unlockedNodes: _unlockedNodes,
    delayedConsequences: _delayedConsequences,
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
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Onboarding and engagement states
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [showEngagementBanner, setShowEngagementBanner] = useState(false);
  const [choiceCount, setChoiceCount] = useState(0);
  const [isFirstChoice, setIsFirstChoice] = useState(true);

  // A/B Test configuration
  const abTestVariant = useABTestVariant();
  const enhancedOnboarding = useFeatureFlag('enhancedOnboarding');
  const microPrompts = useFeatureFlag('microPrompts');

  // Initialize A/B test and check onboarding status
  useEffect(() => {
    // Check if onboarding was completed
    const completed = localStorage.getItem('qnce_onboarding_completed') === 'true';
    setOnboardingCompleted(completed);
    
    // Debug A/B test assignment
    if (import.meta.env.DEV) {
      console.log('🧪 A/B Test Variant:', abTestVariant, {
        enhancedOnboarding,
        microPrompts,
      });
    }
  }, [abTestVariant, enhancedOnboarding, microPrompts]);

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

  // Scroll depth tracking for engagement prompts
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      // Show engagement banner at 75% scroll depth (only if micro-prompts enabled and other conditions met)
      if (scrollPercent >= 0.75 && !showEngagementBanner && onboardingCompleted && choiceCount < 3 && microPrompts) {
        setShowEngagementBanner(true);
        analyticsWrapper.trackEngagementEvent('engagement_prompt_shown', {
          scrollDepth: scrollPercent * 100,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showEngagementBanner, onboardingCompleted, choiceCount]);

  // Show tutorial after intro modal is closed
  function handleIntroClose() {
    setShowModal(false);
    // Show onboarding based on A/B test variant
    // Variant A: Minimal onboarding (baseline)
    // Variant B: Enhanced onboarding with guided tour
    if (enhancedOnboarding || !onboardingCompleted) {
      setShowOnboarding(true);
    }
    analyticsWrapper.trackOnboardingEvent('onboarding_started');
  }

  // Handle onboarding completion
  function handleOnboardingComplete() {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    localStorage.setItem('qnce_onboarding_completed', 'true');
    analyticsWrapper.trackOnboardingEvent('onboarding_completed');
  }

  // Handle onboarding dismissal
  function handleOnboardingDismiss() {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    localStorage.setItem('qnce_onboarding_completed', 'true');
    analyticsWrapper.trackOnboardingEvent('onboarding_skipped');
  }

  // Handle engagement banner interaction
  function handleEngagementInteraction() {
    setShowEngagementBanner(false);
    // Scroll to choices if available
    const choicesElement = document.querySelector('.choice-button');
    if (choicesElement) {
      choicesElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
  function handleSelectChoice(choice: any) {
    // Find the index of the choice in the available choices (filtered)
    const availableChoices = getAvailableChoices();
    const choiceIndex = availableChoices.findIndex(c => c === choice);
    if (choiceIndex === -1) return;
    
    // Track choice count and update first choice flag
    setChoiceCount(prev => prev + 1);
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
    } else {
      analyticsWrapper.trackChoiceMade({
        choiceId: choice.nextNodeId,
        choiceText: choice.text,
        nodeId: currentNode.id,
        choiceIndex,
        isFirstChoice: false,
        variables,
      });
    }
    
    // Hide engagement banner when choice is made
    setShowEngagementBanner(false);
    
    // Add consequence messages to logs
    if (choice.consequences?.immediate) {
      setLogs(logs => [
        ...logs,
        { message: choice.consequences.immediate, type: 'neutral' },
      ]);
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
      {showModal && <IntroModal onClose={handleIntroClose} />}
      {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
      
      <div className="w-full flex flex-col items-center text-white">
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
                <VariableTeaser 
                  variables={variables}
                  showHint={choiceCount <= 2}
                  compact={choiceCount > 3}
                />
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
                <LogArea logs={logs} />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-2 w-full max-w-md justify-center">
              <button
                className="text-xs text-blue-200 underline hover:text-blue-400 transition"
                onClick={handleReset}
              >
                Restart Story
              </button>
              <button
                className="text-xs text-cyan-200 underline hover:text-cyan-400 transition"
                onClick={onReturnToStart}
              >
                Change Story
              </button>
              {settings.developerMode && (
                <button
                  className="text-xs text-gray-300 underline hover:text-blue-400 transition"
                  onClick={() => setShowDebug((v) => !v)}
                >
                  {showDebug ? 'Hide Debug' : 'Show Debug'}
                </button>
              )}
              <button
                className="text-xs text-yellow-300 underline hover:text-yellow-500 transition"
                onClick={() => setShowTutorial(true)}
              >
                Tutorial
              </button>
              <button
                className="text-xs text-purple-300 underline hover:text-purple-500 transition"
                onClick={onShowAbout}
              >
                About
              </button>
              <button
                className="text-xs text-slate-300 underline hover:text-slate-500 transition"
                onClick={onShowSettings}
              >
                Settings
              </button>
            </div>
            
            {showDebug && settings.developerMode && settings.showDebugInfo && (
              <StateDebugOverlay nodeId={currentNode.id} flags={flags} history={history} />
            )}
          </div>
        </div>
        
        {/* Visual Branch Tracker moved to bottom and scaled down */}
        {settings.developerMode && (
          <div className="w-full max-w-4xl mx-auto mt-6 px-2">
            <VisualBranchTracker 
              nodes={getBranchNodes()}
              selectedPath={history}
              className="w-full"
            />
          </div>
        )}
      </div>
      
      {/* Onboarding Overlay */}
      <OnboardingOverlay
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onDismiss={handleOnboardingDismiss}
      />
      
      {/* Engagement Banner */}
      <EngagementBanner
        isVisible={showEngagementBanner}
        onInteraction={handleEngagementInteraction}
        onDismiss={() => setShowEngagementBanner(false)}
      />

      {/* Developer Mode Variable Dashboard */}
      {devMode && settings.showVariableDashboard && (
        <VariableDashboard 
          curiosity={variables.curiosity}
          coherence={variables.coherence}
          disruption={variables.disruption}
          synchrony={variables.synchrony}
        />
      )}
    </>
  );
};

export default StoryFlow;
