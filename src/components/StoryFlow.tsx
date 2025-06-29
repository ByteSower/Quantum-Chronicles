import { useState, useEffect } from 'react';
import NarrativeDisplay from './NarrativeDisplay';
import ChoiceSelector from './ChoiceSelector';
import StateDebugOverlay from './StateDebugOverlay';
import IntroModal from './IntroModal';
import TutorialOverlay from './TutorialOverlay';
import VariableDashboard from './VariableDashboard/VariableDashboard';
import { useQNCE } from '../hooks/useQNCE';
import LogArea from './LogArea';
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
  onShowQNCEHelp
}) => {
  const { 
    currentNode, 
    flags, 
    history, 
    variables, 
    makeChoice, 
    reset, 
    initializeFromStartingPoint, 
    getAvailableChoices,
    isChoiceAvailable,
    getCurrentNodeText
  } = useQNCE();
  const [showDebug, setShowDebug] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [initialized, setInitialized] = useState(false);

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
    setShowTutorial(true);
  }

  function handleReset() {
    if (startingPoint) {
      // Restart with the current starting point rather than going to default
      initializeFromStartingPoint(startingPoint.id, startingPoint.initialVariables);
    } else {
      reset();
    }
    setInitialized(false);
  }

  // Enhanced decision logic for good/bad branches
  function handleSelectChoice(choice: any) {
    // Find the index of the choice in the available choices (filtered)
    const availableChoices = getAvailableChoices();
    const choiceIndex = availableChoices.findIndex(c => c === choice);
    if (choiceIndex === -1) return;
    
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
    
    // Origins Unveiled narrative nodes
    const originsUnveiledGoodNodes = [
      'ou_revelation'
    ];
    const originsUnveiledNeutralNodes = [
      'ou_discovery', 'ou_examination'
    ];
    
    // Use the original choice index from all choices for the actual makeChoice call
    if (!currentNode || !currentNode.choices) return;
    const originalChoiceIndex = currentNode.choices.findIndex(c => c === choice);
    makeChoice(originalChoiceIndex);
    
    // Check for good outcomes
    if (goodNodes.includes(choice.nextNodeId) || originsUnveiledGoodNodes.includes(choice.nextNodeId)) {
      const message = originsUnveiledGoodNodes.includes(choice.nextNodeId) 
        ? 'Quantum Discovery: Truth illuminated, knowledge expanded!'
        : 'Branch Good: Favorable narrative shift achieved!';
      setLogs(logs => [
        ...logs,
        { message, type: 'good' },
      ]);
    } 
    // Check for bad outcomes
    else if (badNodes.includes(choice.nextNodeId)) {
      setLogs(logs => [
        ...logs,
        { message: 'Branch Bad: Narrative collapse warning triggered!', type: 'bad' },
      ]);
    }
    // Check for neutral/complex outcomes
    else if (originsUnveiledNeutralNodes.includes(choice.nextNodeId)) {
      setLogs(logs => [
        ...logs,
        { message: 'Quantum Equilibrium: Discovery balanced with caution.', type: 'neutral' },
      ]);
    }
  }

  return (
    <>
      {showModal && <IntroModal onClose={handleIntroClose} onShowAbout={onShowQNCEHelp} />}
      {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
      
      {/* Developer Mode Variable Dashboard */}
      {devMode && settings.showVariableDashboard && (
        <div className={`variable-dashboard ${sheetOpen ? 'open' : 'collapsed'}`}>
          {/* Mobile bottom sheet header */}
          <div 
            className="sheet-header md:hidden" 
            onClick={() => setSheetOpen(prev => !prev)}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Developer Dashboard</span>
              <span className="text-lg">{sheetOpen ? '▼' : '▲'}</span>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className={`sheet-content ${sheetOpen || 'md:block' ? 'block' : 'hidden'}`}>
            <VariableDashboard 
              curiosity={Number(variables.curiosity || 0)}
              coherence={Number(variables.coherence || 0)}
              disruption={Number(variables.disruption || 0)}
              synchrony={Number(variables.synchrony || 0)}
            />
          </div>
        </div>
      )}
      
      <div className="w-full flex flex-col items-center text-white">
        <div className="w-full max-w-md mx-auto px-2 sm:px-4 text-center">
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 w-full">
              <NarrativeDisplay text={currentNode ? getCurrentNodeText() : "Loading..."} />
            </div>
            <div className="flex flex-col items-center mb-2 w-full">
              <ChoiceSelector choices={getAvailableChoices()} onSelect={handleSelectChoice} />
              
              {/* Show locked choices in developer mode */}
              {settings.developerMode && currentNode && currentNode.choices && currentNode.choices.length > getAvailableChoices().length && (
                <div className="mt-2 p-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-400 w-full">
                  <details>
                    <summary className="cursor-pointer text-yellow-400">
                      🔒 {currentNode.choices ? currentNode.choices.length - getAvailableChoices().length : 0} Locked Choice(s)
                    </summary>
                    <div className="mt-2 space-y-1">
                      {currentNode.choices?.filter(choice => !isChoiceAvailable(choice)).map((choice, index) => (
                        <div key={index} className="text-gray-500 italic">
                          "{choice.choiceText}" 
                          {choice.conditions && (
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
            
            {showDebug && settings.developerMode && settings.showDebugInfo && currentNode && (
              <StateDebugOverlay nodeId={currentNode.nodeId} flags={flags} history={history} />
            )}
          </div>
        </div>
        
        {/* Visual Branch Tracker - disabled until getBranchNodes is reimplemented */}
        {false && settings.developerMode && (
          <div className="w-full max-w-4xl mx-auto mt-6 px-2">
            <div className="text-gray-500 text-center">Visual Branch Tracker - Coming Soon</div>
          </div>
        )}
      </div>
    </>
  );
};

export default StoryFlow;
