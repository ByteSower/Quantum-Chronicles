import React, { useState, useEffect, useRef } from 'react';
import { TUTORIAL_STEPS } from '../config/tutorialSteps';
import { trackTutorialEvent } from '../utils/analytics';

interface TutorialOverlayProps {
  onClose: () => void;
  onComplete?: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [tutorialStartTime] = useState(Date.now());
  const overlayRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  const currentStep = TUTORIAL_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TUTORIAL_STEPS.length - 1;

  // Analytics tracking
  useEffect(() => {
    if (currentStepIndex === 0) {
      trackTutorialEvent.start();
    }
    trackTutorialEvent.step(currentStep.id, currentStepIndex);
  }, [currentStepIndex, currentStep.id]);

  // Focus management and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkipTutorial();
      } else if (e.key === 'ArrowRight' && !isLastStep) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        handlePrevious();
      }
    };

    // Focus trap
    const focusableElements = focusTrapRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabKey);
    
    // Focus first element when step changes
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [currentStepIndex, isLastStep, isFirstStep]);

  // Highlight target elements
  useEffect(() => {
    if (currentStep.highlight) {
      const element = document.querySelector(currentStep.highlight);
      if (element) {
        element.classList.add('tutorial-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Cleanup highlights from previous step
    return () => {
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
    };
  }, [currentStep.highlight]);

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const completionTime = Date.now() - tutorialStartTime;
    trackTutorialEvent.complete(TUTORIAL_STEPS.length, completionTime);
    setIsVisible(false);
    if (currentStep.action?.callback) {
      currentStep.action.callback();
    }
    if (onComplete) {
      onComplete();
    }
    setTimeout(onClose, 300); // Allow fade out animation
  };

  const handleSkipTutorial = () => {
    trackTutorialEvent.skip(currentStep.id, currentStepIndex);
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getPositionClasses = () => {
    switch (currentStep.position) {
      case 'top':
        return 'items-start pt-20';
      case 'bottom':
        return 'items-end pb-20';
      case 'left':
        return 'items-center justify-start pl-20';
      case 'right':
        return 'items-center justify-end pr-20';
      default:
        return 'items-center justify-center';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex ${getPositionClasses()} bg-black bg-opacity-80 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      aria-describedby="tutorial-content"
    >
      <div 
        ref={focusTrapRef}
        className="max-w-2xl w-full mx-4 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl border border-indigo-500/30 transform transition-transform duration-300 scale-100"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 
              id="tutorial-title"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-slate-400">
                Step {currentStepIndex + 1} of {TUTORIAL_STEPS.length}
              </span>
              <div className="flex gap-1">
                {TUTORIAL_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStepIndex ? 'bg-indigo-400' : 
                      index < currentStepIndex ? 'bg-indigo-600' : 'bg-gray-600'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleSkipTutorial}
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="Skip tutorial"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div 
          id="tutorial-content"
          className="mb-6 text-slate-300 leading-relaxed whitespace-pre-line"
        >
          {currentStep.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={isFirstStep}
            className={`px-4 py-2 rounded-lg transition-all ${
              isFirstStep 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
            aria-label="Previous step"
          >
            ← Previous
          </button>

          <button
            onClick={handleSkipTutorial}
            className="px-4 py-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            Skip Tutorial
          </button>

          {isLastStep ? (
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={currentStep.action?.text || "Complete tutorial"}
            >
              {currentStep.action?.text || "Complete Tutorial"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
              aria-label="Next step"
            >
              Next →
            </button>
          )}
        </div>

        {/* Keyboard hints */}
        <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
          <p>
            Use ← → arrow keys to navigate • <kbd className="bg-slate-700 px-1 rounded">Esc</kbd> to skip
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
