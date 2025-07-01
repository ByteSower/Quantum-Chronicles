import React, { useState, useEffect, useRef } from 'react';
import type { Choice } from '../narratives/types';
import { accessibilityManager, a11y } from '../utils/accessibility';

interface ChoiceSelectorProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  showOnboardingHints?: boolean;
  isFirstChoice?: boolean;
  isTerminalNode?: boolean;
  onComplete?: () => void;
}

const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({ 
  choices, 
  onSelect, 
  showOnboardingHints = false,
  isFirstChoice = false,
  isTerminalNode = false,
  onComplete
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const choicesListId = a11y.generateId('choices-list');

  // Announce when new choices are available
  useEffect(() => {
    if (choices.length > 0) {
      const choiceTexts = choices.map(c => c.choiceText).join(', ');
      accessibilityManager.announceContentChange('choice', 
        `${choices.length} choice${choices.length > 1 ? 's' : ''} available: ${choiceTexts}`
      );
    } else if (isTerminalNode) {
      accessibilityManager.announceContentChange('choice', 
        'Chapter complete. Continue button available.'
      );
    }
  }, [choices, isTerminalNode]);

  // Handle keyboard navigation between choices
  const handleKeyDown = (event: KeyboardEvent, choice: Choice, index: number) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (index + 1) % choices.length;
        const nextButton = containerRef.current?.querySelector(`button[data-choice-index="${nextIndex}"]`) as HTMLElement;
        nextButton?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = index === 0 ? choices.length - 1 : index - 1;
        const prevButton = containerRef.current?.querySelector(`button[data-choice-index="${prevIndex}"]`) as HTMLElement;
        prevButton?.focus();
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect(choice);
        break;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="choice-selector flex flex-col gap-3 mt-4 items-center w-full"
      role="group"
      aria-labelledby={choicesListId}
    >
      <div id={choicesListId} className="sr-only">
        {isTerminalNode ? 'Chapter complete' : `Story choices: ${choices.length} option${choices.length > 1 ? 's' : ''} available`}
      </div>
      
      {/* Show Continue button for terminal nodes */}
      {isTerminalNode && onComplete && (
        <div className="w-full max-w-md">
          <button
            className="
              choice-button
              text-white rounded-lg shadow-lg px-6 py-3 
              transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 
              w-full text-lg font-semibold 
              transform hover:scale-105
              bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500
            "
            onClick={onComplete}
            tabIndex={0}
            aria-label="Continue to chapter selection"
            role="button"
          >
            Continue
          </button>
        </div>
      )}
      
      {/* Show regular choices if not terminal node */}
      {!isTerminalNode && choices.map((choice, idx) => (
        <div key={idx} className="relative w-full max-w-md">
          <button
            className={`
              choice-button
              text-white rounded-lg shadow-lg px-6 py-3 
              transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 
              w-full text-lg font-semibold 
              transform hover:scale-105
              ${showOnboardingHints && isFirstChoice ? 'choice-pulse' : ''}
            `}
            style={{
              background: 'linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234))',
              border: 'none'
            }}
            onClick={() => onSelect(choice)}
            onKeyDown={(e) => handleKeyDown(e.nativeEvent, choice, idx)}
            onMouseEnter={(e) => {
              setHoveredChoice(idx);
              e.currentTarget.style.background = 'linear-gradient(to right, rgb(67, 56, 202), rgb(126, 34, 206))';
            }}
            onMouseLeave={(e) => {
              setHoveredChoice(null);
              e.currentTarget.style.background = 'linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234))';
            }}
            onFocus={() => setHoveredChoice(idx)}
            onBlur={() => setHoveredChoice(null)}
            tabIndex={0}
            data-choice-index={idx}
            aria-label={a11y.getChoiceLabel(choice.choiceText, idx, true)}
            aria-describedby={showOnboardingHints && isFirstChoice ? `choice-hint-${idx}` : undefined}
            role="button"
          >
            {choice.choiceText}
          </button>
          
          {/* Tooltip for guidance */}
          {showOnboardingHints && isFirstChoice && (
            <div 
              id={`choice-hint-${idx}`}
              className={`choice-tooltip ${hoveredChoice === idx ? 'visible' : ''}`}
              role="tooltip"
              aria-hidden={hoveredChoice !== idx}
            >
              Tap here to shape the story! Use arrow keys to navigate between choices.
            </div>
          )}
          
          {/* Mobile tap hint */}
          {showOnboardingHints && isFirstChoice && idx === 0 && (
            <div 
              className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce md:hidden"
              aria-hidden="true"
              role="presentation"
            >
              !
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChoiceSelector;
