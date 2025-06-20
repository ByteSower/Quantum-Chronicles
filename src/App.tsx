import { useState } from 'react';
import StartScreen from './components/StartScreen';
import StoryFlow from './components/StoryFlow';
import AboutModal from './components/AboutModal';
import SettingsModal from './components/SettingsModal';
import type { StartingPoint } from './components/StartScreen';
import './index.css';

type AppState = 'start' | 'story';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<StartingPoint | null>(null);
  const [settings, setSettings] = useState({
    developerMode: false,
    showVariableDashboard: true,
    showDebugInfo: false,
    animationSpeed: 'normal' as 'slow' | 'normal' | 'fast'
  });

  const handleSelectStart = (startingPoint: StartingPoint) => {
    setSelectedStartingPoint(startingPoint);
    setAppState('story');
  };

  const handleReturnToStart = () => {
    setAppState('start');
    setSelectedStartingPoint(null);
  };

  if (appState === 'start') {
    return (
      <>
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
    <div
      style={{ margin: '0 auto', textAlign: 'center' }}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950 to-black text-white"
    >
      <header className="w-full container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Quantum Chronicles
        </h1>
        <p className="text-lg sm:text-xl text-indigo-200 mb-6 font-light">
          {selectedStartingPoint?.title || 'An Interactive Narrative Experience'}
        </p>
      </header>
      <div className="max-w-4xl w-full mx-auto px-4 text-center">
        <StoryFlow
          startingPoint={selectedStartingPoint}
          settings={settings}
          onReturnToStart={handleReturnToStart}
          onShowAbout={() => setShowAbout(true)}
          onShowSettings={() => setShowSettings(true)}
        />
      </div>
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
    </div>
  );
}

export default App;
