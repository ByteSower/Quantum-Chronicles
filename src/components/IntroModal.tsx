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
      <p className="mb-4 text-slate-300">
        Enter a world where every choice ripples through reality itself. Quantum Chronicles harnesses
        quantum-inspired storytelling to deliver a truly dynamic narrative experience where your decisions
        shape not just the story, but the very nature of the narrative universe.
      </p>
      <p className="mb-4 text-sm text-slate-400">
        Watch your choices influence Curiosity, Coherence, Disruption, and Synchrony as you navigate
        through quantum narrative possibilities.
      </p>
      <p className="mb-6 text-xs text-slate-500">
        Created by ByteSower • Follow us for more interactive experiences!
      </p>
      <button
        onClick={onClose}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-lg"
      >
        Begin Your Journey
      </button>
    </div>
  </div>
);

export default IntroModal;
