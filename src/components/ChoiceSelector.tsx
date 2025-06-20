import React from 'react';
import type { Choice } from '../hooks/useQNCE';

interface ChoiceSelectorProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({ choices, onSelect }) => (
  <div className="flex flex-col gap-3 mt-4 items-center w-full">
    {choices.map((choice, idx) => (
      <button
        key={idx}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg px-6 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 w-full max-w-md text-lg font-semibold transform hover:scale-105"
        onClick={() => onSelect(choice)}
        tabIndex={0}
      >
        {choice.text}
      </button>
    ))}
  </div>
);

export default ChoiceSelector;
