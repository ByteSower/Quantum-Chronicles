import React, { useState } from 'react';
import type { Choice } from '../hooks/useQNCE';

interface ChoiceSelectorProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  showOnboardingHints?: boolean;
  isFirstChoice?: boolean;
}

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({ 
  choices, 
  onSelect, 
  showOnboardingHints = false,
  isFirstChoice = false
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 mt-4 items-center w-full">
      {choices.map((choice, idx) => (
        <div key={idx} className="relative w-full max-w-md">
          <button
            className={`
              choice-button
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-700 hover:to-purple-700 
              text-white rounded-lg shadow-lg px-6 py-3 
              transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 
              w-full text-lg font-semibold 
              transform hover:scale-105
              ${showOnboardingHints && isFirstChoice ? 'choice-pulse' : ''}
            `}
            onClick={() => onSelect(choice)}
            onMouseEnter={() => setHoveredChoice(idx)}
            onMouseLeave={() => setHoveredChoice(null)}
            onFocus={() => setHoveredChoice(idx)}
            onBlur={() => setHoveredChoice(null)}
            tabIndex={0}
            aria-label={`Make choice: ${choice.text}`}
          >
            {choice.text}
          </button>
          
          {/* Tooltip for guidance */}
          {showOnboardingHints && isFirstChoice && (
            <div className={`choice-tooltip ${hoveredChoice === idx ? 'visible' : ''}`}>
              Tap here to shape the story!
            </div>
          )}
          
          {/* Mobile tap hint */}
          {showOnboardingHints && isFirstChoice && idx === 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce md:hidden">
              !
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChoiceSelector;
