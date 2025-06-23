import React, { useState } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'about' | 'qnce' | 'story' | 'credits';

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  if (!isOpen) return null;

  const tabs = [
    { id: 'about' as TabType, label: 'About', icon: '📖' },
    { id: 'qnce' as TabType, label: 'QNCE Engine', icon: '⚛️' },
    { id: 'story' as TabType, label: 'Story Guide', icon: '🗺️' },
    { id: 'credits' as TabType, label: 'Credits', icon: '👥' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-300">Welcome to Quantum Chronicles</h3>
            <p className="text-slate-300 leading-relaxed">
              Welcome to <strong>Quantum Chronicles</strong>, an interactive narrative experience powered by the 
              Quantum Narrative Convergence Engine (QNCE). Every choice you make creates ripples through the story, 
              influencing not just the immediate outcome, but shaping the very fabric of the narrative universe.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Watch as your decisions affect four core narrative dimensions: <span className="text-green-300">Curiosity</span>, 
              <span className="text-blue-300"> Coherence</span>, <span className="text-red-300"> Disruption</span>, and 
              <span className="text-purple-300"> Synchrony</span>. Each choice doesn't just lead to a new scene—it 
              fundamentally alters the story's quantum state, creating a truly unique narrative experience.
            </p>
          </div>
        );
      
      case 'qnce':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-300">Quantum Narrative Convergence Engine</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-white">Superposition</h4>
                <p className="text-sm text-slate-300">Multiple narrative possibilities exist simultaneously until choice collapse occurs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Collapse</h4>
                <p className="text-sm text-slate-300">Player choices "collapse" quantum possibilities into concrete narrative paths.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Entanglement</h4>
                <p className="text-sm text-slate-300">Early decisions create invisible connections that influence future story branches.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Variable Dynamics</h4>
                <p className="text-sm text-slate-300">Four core dimensions (Curiosity, Coherence, Disruption, Synchrony) evolve with each choice.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-indigo-500/30">
              <p className="text-xs text-slate-400 leading-relaxed">
                QNCE represents a revolutionary approach to interactive storytelling, moving beyond traditional branching narratives 
                to create truly dynamic, quantum-inspired narrative experiences where the very nature of choice itself becomes part of the story.
              </p>
            </div>
          </div>
        );
      
      case 'story':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-300">Navigating Your Quantum Journey</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="text-green-300">👁️ Curiosity</span>
                </h4>
                <p className="text-sm text-slate-300">Drives exploration of unknown paths and mysterious choices. Higher curiosity unlocks unique story branches.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="text-blue-300">🧭 Coherence</span>
                </h4>
                <p className="text-sm text-slate-300">Represents logical narrative flow. High coherence leads to predictable, sensible outcomes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="text-red-300">⚡ Disruption</span>
                </h4>
                <p className="text-sm text-slate-300">Chaos and unexpected events. High disruption creates surprising twists and alternate realities.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="text-purple-300">🔗 Synchrony</span>
                </h4>
                <p className="text-sm text-slate-300">Harmony between choices and narrative flow. High synchrony creates seamless, interconnected experiences.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-indigo-500/30">
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Pro Tip:</strong> Different starting points begin with unique variable configurations, leading to completely different narrative experiences. 
                Try multiple starting points to explore the full quantum narrative space!
              </p>
            </div>
          </div>
        );
      
      case 'credits':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-300">Credits & Acknowledgments</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Created by ByteSower</h4>
                <p className="text-sm text-slate-300">Follow us on social media for more interactive experiences and behind-the-scenes content!</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Technology Stack</h4>
                <p className="text-sm text-slate-300">Built with React, TypeScript, Tailwind CSS, and the Quantum Narrative Convergence Engine (QNCE)</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Open Source</h4>
                <p className="text-sm text-slate-300">
                  Quantum Chronicles is open source. Visit our{' '}
                  <a
                    href="https://github.com/ByteSower/Quantum-Chronicles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                  >
                    GitHub repository
                  </a>{' '}
                  to contribute, report issues, or explore the codebase.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Feedback & Support</h4>
                <p className="text-sm text-slate-300">
                  Have feedback or found an issue?{' '}
                  <a
                    href="https://github.com/ByteSower/Quantum-Chronicles/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                  >
                    Let us know on GitHub!
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30">
              <p className="text-center text-sm text-slate-300">
                <strong>Version 1.0.0</strong> • Built with ❤️ for the interactive fiction community
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-indigo-500/30 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Quantum Chronicles
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex h-[calc(90vh-8rem)]">
          {/* Tab Navigation */}
          <div className="w-48 bg-slate-900/50 border-r border-slate-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
