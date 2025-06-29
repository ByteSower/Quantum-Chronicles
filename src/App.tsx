import { useState, useEffect, lazy, Suspense } from 'react';
import StartScreen from './components/StartScreen';
import StoryFlow from './components/StoryFlow';
import { SideMenu } from './components/SideMenu';
// Lazy load modal components
const AboutModal = lazy(() => import('./components/AboutModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const AboutQNCEModal = lazy(() => import('./components/AboutQNCEModal'));
import { analytics, trackUIEvent } from './utils/analytics';
import type { StartingPoint } from './components/StartScreen';
import './index.css';

type AppMode = 'start' | 'story';

function App() {
  const [mode, setMode] = useState<AppMode>('start');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAboutQNCE, setShowAboutQNCE] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [storyKey, setStoryKey] = useState(0); // Add a key to force re-mount StoryFlow
  const [settings, setSettings] = useState({
    developerMode: false,
    showVariableDashboard: true,
    showDebugInfo: false,
    animationSpeed: 'normal' as 'slow' | 'normal' | 'fast'
  });

  // Initialize analytics and send app start event
  useEffect(() => {
    trackUIEvent.feature('app', 'initialized');
    // Track session start
    analytics.trackEvent('session_start', 'engagement', 'forgottenTruth');
  }, []);

  const handleSelectStart = (startingPoint: StartingPoint) => {
    console.log('Starting with:', startingPoint); // For now, just log it
    setMode('story');
  };

  const handleRestart = () => {
    setStoryKey(prevKey => prevKey + 1); // Increment key to re-mount StoryFlow
    // Track restart event
    trackUIEvent.feature('navigation', 'restart_story');
  };

  const handleHome = () => {
    setMode('start');
    setStoryKey(prevKey => prevKey + 1); // Reset story state
  };

  const handleToggleVariables = () => {
    setShowVariables(prev => !prev);
    setSettings(prev => ({
      ...prev,
      showVariableDashboard: !prev.showVariableDashboard
    }));
  };

  return (
    <>
      <SideMenu
        onHome={handleHome}
        onTutorial={() => setShowTutorial(true)}
        onSettings={() => setShowSettings(true)}
        onRestart={handleRestart}
        onToggleVariables={handleToggleVariables}
      />
      {mode === 'start' ? (
        <StartScreen
          onSelectStart={handleSelectStart}
          onShowAbout={() => setShowAbout(true)}
          onShowSettings={() => setShowSettings(true)}
        />
      ) : (
        <StoryFlow
          key={storyKey} // Use key to ensure component re-mounts on restart
          settings={settings}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onUpdateSettings={setSettings}
        />
        <AboutQNCEModal
          isOpen={showAboutQNCE}
          onClose={() => setShowAboutQNCE(false)}
        />
        {/* Tutorial modal placeholder - will be implemented in next feature */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md">
              <h3 className="text-lg font-bold mb-4">Tutorial Coming Soon</h3>
              <p className="mb-4">Enhanced tutorial system will be implemented in the next feature.</p>
              <button 
                onClick={() => setShowTutorial(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Variables dashboard placeholder - will show current value */}
        {showVariables && (
          <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg z-40 max-w-xs">
            <h4 className="font-bold mb-2">Variables Dashboard</h4>
            <p className="text-sm text-gray-600 mb-2">Enhanced dashboard coming soon.</p>
            <button 
              onClick={() => setShowVariables(false)}
              className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default App;
