import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import StoryFlow from './components/StoryFlow';
import AboutModal from './components/AboutModal';
import SettingsModal from './components/SettingsModal';
import AboutQNCEModal from './components/AboutQNCEModal';
import { analytics, trackUIEvent } from './utils/analytics';
import type { StartingPoint } from './components/StartScreen';
import './index.css';

type AppState = 'start' | 'story';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<StartingPoint | null>(null);
  const [devMode, setDevMode] = useState(false);
  const [showOrientationWarning, setShowOrientationWarning] = useState(true);
  const [showAboutQNCE, setShowAboutQNCE] = useState(false);
  const [settings, setSettings] = useState({
    developerMode: false,
    showVariableDashboard: true,
    showDebugInfo: false,
    animationSpeed: 'normal' as 'slow' | 'normal' | 'fast'
  });

  // Initialize analytics and send app start event
  useEffect(() => {
    trackUIEvent.feature('app', 'initialized');
  }, []);

  const handleSelectStart = (startingPoint: StartingPoint) => {
    setSelectedStartingPoint(startingPoint);
    setAppState('story');
    
    // Track session start
    analytics.trackEvent('session_start', 'engagement', startingPoint.id);
  };

  const handleReturnToStart = () => {
    setAppState('start');
    setSelectedStartingPoint(null);
    
    // Track return to start
    trackUIEvent.feature('navigation', 'return_to_start');
  };

  if (appState === 'start') {
    return (
      <>
        {/* Mobile Portrait Orientation Warning */}
        {showOrientationWarning && (
          <div className="md:hidden portrait:flex landscape:hidden fixed inset-0 bg-black bg-opacity-95 flex-col items-center justify-center p-6 z-50">
            <div className="text-center max-w-sm">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-xl font-bold mb-4 text-white">Best Experience</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                For the optimal Quantum Chronicles experience, please rotate your device to <strong>landscape mode</strong> or use a <strong>desktop browser</strong>.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowOrientationWarning(false)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Continue Anyway
                </button>
                <p className="text-xs text-gray-400">
                  Note: Some content may be difficult to view in portrait mode
                </p>
              </div>
            </div>
          </div>
        )}
        
        <StartScreen
          onSelectStart={handleSelectStart}
          onShowAbout={() => setShowAbout(true)}
          onShowSettings={() => setShowSettings(true)}
        />
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
      </>
    );
  }

  return (
    <>
      {/* Mobile Portrait Orientation Warning */}
      {showOrientationWarning && (
        <div className="md:hidden portrait:flex landscape:hidden fixed inset-0 bg-black bg-opacity-95 flex-col items-center justify-center p-6 z-50">
          <div className="text-center max-w-sm">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-xl font-bold mb-4 text-white">Best Experience</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              For the optimal Quantum Chronicles experience, please rotate your device to <strong>landscape mode</strong> or use a <strong>desktop browser</strong>.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowOrientationWarning(false)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Continue Anyway
              </button>
              <p className="text-xs text-gray-400">
                Note: Some content may be difficult to view in portrait mode
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        style={{ margin: '0 auto', textAlign: 'center' }}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950 to-black text-white"
      >
      <header className="w-full container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Quantum Chronicles
            </h1>
            <p className="text-lg sm:text-xl text-indigo-200 mb-6 font-light">
              {selectedStartingPoint?.title || 'An Interactive Narrative Experience'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowAboutQNCE(true);
                trackUIEvent.help('about_qnce');
              }}
              className="px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium bg-purple-600 text-white hover:bg-purple-700"
              title="Learn about QNCE"
            >
              Help
            </button>
            <button
              onClick={() => {
                const newDevMode = !devMode;
                setDevMode(newDevMode);
                trackUIEvent.feature('developer_mode', newDevMode ? 'enabled' : 'disabled');
              }}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${
                devMode 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title={devMode ? 'Disable Developer Mode' : 'Enable Developer Mode'}
            >
              {devMode ? 'Dev: ON' : 'Dev: OFF'}
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-4xl w-full mx-auto px-4 text-center">
        <StoryFlow
          startingPoint={selectedStartingPoint}
          settings={settings}
          devMode={devMode}
          onReturnToStart={handleReturnToStart}
          onShowAbout={() => setShowAbout(true)}
          onShowSettings={() => setShowSettings(true)}
          onShowQNCEHelp={() => setShowAboutQNCE(true)}
        />
      </div>
      
      {/* Footer */}
      <footer className="mt-8 mb-4 text-center">
        <p className="text-xs text-slate-500">
          Quantum Chronicles
        </p>
      </footer>
      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
      <AboutQNCEModal
        isOpen={showAboutQNCE}
        onClose={() => setShowAboutQNCE(false)}
      />
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
    </>
  );
}

export default App;
