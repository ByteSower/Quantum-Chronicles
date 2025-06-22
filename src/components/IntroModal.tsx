import React from 'react';

interface IntroModalProps {
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div className="max-w-xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl text-center border border-indigo-500/30">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
        Welcome to Quantum Chronicles
      </h2>
      <p className="mb-4 text-slate-300 leading-relaxed">
        Step into an interactive story where your choices create unique narrative paths. 
        Every decision you make shapes your character's journey and unlocks different possibilities.
      </p>
      <p className="mb-4 text-sm text-slate-400 leading-relaxed">
        As you play, you'll see how your choices affect four key aspects of your story: 
        your curiosity to explore, your understanding of events, your willingness to challenge the status quo, 
        and your alignment with the story's flow.
      </p>
      
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-lg"
        >
          Start Your Journey
        </button>
      </div>
      
      <p className="mt-4 text-xs text-slate-500">
        Need help understanding QNCE? Click the "Help" button anytime during your journey!
      </p>
    </div>
  </div>
);

export default IntroModal;
