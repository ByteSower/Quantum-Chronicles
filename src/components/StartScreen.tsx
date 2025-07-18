import React from 'react';

interface StartingPoint {
  id: string;
  title: string;
  description: string;
  theme: string;
  initialVariables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
}

interface StartScreenProps {
  onSelectStart: (startingPoint: StartingPoint) => void;
  onShowAbout: () => void;
  onShowSettings: () => void;
}

const startingPoints: StartingPoint[] = [
  {
    id: 'forgotten_truth',
    title: 'The Forgotten Truth',
    description: 'Uncover buried memories and hidden experiments in a small town with dark secrets.',
    theme: 'Mystery-thriller with quantum consciousness themes',
    initialVariables: { curiosity: 2, coherence: 1, disruption: 1, synchrony: 0 }
  }
];

const lockedStartingPoints: StartingPoint[] = [
  {
    id: 'classic',
    title: 'The Crossroads',
    description: 'Begin at the traditional crossroads where every choice creates ripples through reality.',
    theme: 'Balanced exploration of quantum narrative mechanics',
    initialVariables: { curiosity: 0, coherence: 0, disruption: 0, synchrony: 0 }
  },
  {
    id: 'mystery',
    title: 'The Anomaly',
    description: 'Start with heightened curiosity in a world where reality itself seems unstable.',
    theme: 'Mystery-focused with enhanced curiosity-driven choices',
    initialVariables: { curiosity: 3, coherence: -1, disruption: 2, synchrony: 0 }
  },
  {
    id: 'harmony',
    title: 'The Sanctuary',
    description: 'Begin in a place of perfect coherence, where every choice flows naturally.',
    theme: 'Harmony-focused with enhanced synchrony mechanics',
    initialVariables: { curiosity: 0, coherence: 3, disruption: -1, synchrony: 2 }
  },
  {
    id: 'chaos',
    title: 'The Fracture',
    description: 'Start in a reality where disruption reigns and every choice has unexpected consequences.',
    theme: 'Chaos-focused with amplified disruption effects',
    initialVariables: { curiosity: 1, coherence: -2, disruption: 4, synchrony: -1 }
  }
];

const StartScreen: React.FC<StartScreenProps> = ({ onSelectStart, onShowAbout, onShowSettings }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Header */}
        <header>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Quantum Chronicles
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 mb-2 font-light">
            An Interactive Narrative Experience
          </p>
          <p className="text-sm text-slate-400 mb-12">
            Where every choice ripples through the quantum fabric of reality
          </p>
        </header>

        {/* Main Content */}
        <main>
          <h2 className="sr-only">Choose Your Starting Point</h2>
          
          {/* Starting Points */}
          <section aria-labelledby="starting-points-heading">
            <h3 id="starting-points-heading" className="sr-only">Available Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Available Narrative */}
          {startingPoints.map((point) => (
            <button
              key={point.id}
              onClick={() => onSelectStart(point)}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-indigo-500/30 rounded-lg p-6 text-left hover:from-slate-700/80 hover:to-slate-800/80 hover:border-indigo-400/50 transition-all duration-300 transform hover:scale-105 group"
            >
              <h4 className="text-xl font-bold mb-2 text-indigo-300 group-hover:text-indigo-200">
                {point.title}
              </h4>
              <p className="text-slate-300 mb-3 text-sm leading-relaxed">
                {point.description}
              </p>
              <p className="text-xs text-slate-500 italic">
                {point.theme}
              </p>
              <div className="flex gap-2 mt-3 text-xs">
                {Object.entries(point.initialVariables).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-2 py-1 rounded ${
                      value > 0 ? 'bg-green-900/50 text-green-300' :
                      value < 0 ? 'bg-red-900/50 text-red-300' :
                      'bg-gray-700/50 text-gray-400'
                    }`}
                  >
                    {key}: {value}
                  </span>
                ))}
              </div>
            </button>
          ))}
          
          {/* Locked Narratives */}
          {lockedStartingPoints.map((point) => (
            <div
              key={point.id}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-lg p-6 text-left opacity-60 relative group cursor-not-allowed"
            >
              <div className="absolute top-4 right-4 text-gray-400">
                🔒
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-400">
                {point.title}
              </h4>
              <p className="text-gray-500 mb-3 text-sm leading-relaxed">
                {point.description}
              </p>
              <p className="text-xs text-gray-600 italic mb-2">
                {point.theme}
              </p>
              <div className="bg-gray-700/50 rounded p-2 text-xs text-gray-400 border border-gray-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow-400">⚡</span>
                  <span className="font-semibold">Coming Soon</span>
                </div>
                <p>This narrative will be expanded in future updates. Currently focusing on The Forgotten Truth expansion.</p>
              </div>
              <div className="flex gap-2 mt-3 text-xs opacity-50">
                {Object.entries(point.initialVariables).map(([key, value]) => (
                  <span
                    key={key}
                    className="px-2 py-1 rounded bg-gray-700/30 text-gray-500"
                  >
                    {key}: {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
            </div>
          </section>

          {/* Navigation */}
          <nav aria-label="App navigation">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onShowAbout}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50"
                aria-label="Learn more about Quantum Chronicles"
              >
                About Quantum Chronicles
              </button>
              <button
                onClick={onShowSettings}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50"
                aria-label="Open application settings"
              >
                Settings
              </button>
            </div>
          </nav>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-xs text-slate-500" role="contentinfo">
          <p>Created by ByteSower • Follow us for more interactive experiences!</p>
        </footer>
      </div>
    </div>
  );
};

export default StartScreen;
export type { StartingPoint };
