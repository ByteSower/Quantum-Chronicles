import React from 'react';

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
    <div className="max-w-3xl w-full mx-auto bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl text-left border border-indigo-500/30">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">Quantum Chronicles Tutorial</h2>
      <p className="mb-2 text-slate-300">
        In Quantum Chronicles, your choices create quantum ripples that influence the entire narrative structure.
      </p>
      <ul className="list-disc pl-6 mb-4 text-left text-slate-300">
        <li><strong className="text-white">Narrative Text:</strong> Watch the story evolve based on your quantum choices.</li>
        <li><strong className="text-white">Choice Buttons:</strong> Each decision alters the narrative's quantum state.</li>
        <li><strong className="text-white">Variable Dashboard:</strong> Track how your choices affect <span className="text-green-300">Curiosity</span>, <span className="text-blue-300">Coherence</span>, <span className="text-red-300">Disruption</span>, and <span className="text-purple-300">Synchrony</span>.</li>
        <li>
          <strong className="text-white">Feedback Log:</strong> Observe quantum effects— <span className="whitespace-nowrap text-red-400 font-bold text-sm">red: narrative disruption</span>, <span className="text-green-400 font-bold whitespace-nowrap text-sm">green: favorable convergence</span>.
        </li>
      </ul>
      <p className="mb-4 text-slate-300">
        Every choice you make doesn't just change the story—it fundamentally alters the narrative's quantum signature, creating a truly unique experience.
      </p>
      <button onClick={onClose} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-lg focus:outline-none">
        Enter the Quantum Narrative
      </button>
    </div>
  </div>
);

export default TutorialOverlay;
