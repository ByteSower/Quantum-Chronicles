import React, { useState, useEffect } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';

interface OnboardingOverlayProps {
  isOpen: boolean;
  onComplete: () => void;
  onDismiss: () => void;
  currentStep?: number;
  totalSteps?: number;
}

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  targetElement?: string; // CSS selector for highlighting
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'zoom';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Quantum Chronicles!',
    content: 'New here? Let us show you around! **Returning user?** Feel free to skip to your story. Experience storytelling inspired by **quantum physics** — where your choices shape multiple narrative possibilities.',
    position: 'center',
    animation: 'fadeIn'
  },
  {
    id: 'qnce-intro',
    title: 'The Quantum Narrative Engine',
    content: 'QNCE creates stories that exist in **superposition** — multiple potential states at once. Your choices "collapse" these possibilities into your unique narrative path.',
    position: 'center',
    animation: 'slideUp'
  },
  {
    id: 'variables',
    title: 'Your Quantum Variables',
    content: 'Four key aspects define your character: **Curiosity** (🔍 exploration drive), **Coherence** (🧩 logical understanding), **Disruption** (⚡ willingness to challenge), and **Synchrony** (🌊 harmony with forces).',
    position: 'center',
    animation: 'slideUp'
  },
  {
    id: 'first-choice',
    title: 'Make Your First Choice',
    content: 'Each decision influences your quantum variables in real-time. Watch how your character develops through the Variable Dashboard!',
    targetElement: '.choice-button',
    position: 'bottom',
    animation: 'slideDown'
  },
  {
    id: 'dashboard',
    title: 'Track Your Evolution',
    content: 'Your Variable Dashboard shows how choices shape your character. Different combinations create entirely unique narrative experiences!',
    targetElement: '.variable-dashboard',
    position: 'right',
    animation: 'slideUp'
  }
];

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({
  isOpen,
  onComplete,
  onDismiss,
  currentStep = 0
}) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const step = onboardingSteps[activeStep];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      analyticsWrapper.trackOnboardingEvent('onboarding_started');
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step?.targetElement && isVisible) {
      const element = document.querySelector(step.targetElement) as HTMLElement;
      if (element) {
        setHighlightedElement(element);
        element.classList.add('onboarding-highlight');
        
        // Scroll element into view
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center' 
        });
      }
    }

    return () => {
      if (highlightedElement) {
        highlightedElement.classList.remove('onboarding-highlight');
      }
    };
  }, [step, isVisible]);

  const handleNext = () => {
    analyticsWrapper.trackUIEvent('feature_used', {
      feature: 'onboarding_step',
      action: step.id,
    });
    
    if (activeStep < onboardingSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    analyticsWrapper.trackOnboardingEvent('onboarding_completed');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    analyticsWrapper.trackOnboardingEvent('onboarding_skipped', {
      step: activeStep,
      totalSteps: onboardingSteps.length,
    });
    setIsVisible(false);
    onDismiss();
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'slideUp':
        return 'animate-slideUp';
      case 'slideDown':
        return 'animate-slideDown';
      case 'zoom':
        return 'animate-zoom';
      default:
        return 'animate-fadeIn';
    }
  };

  const getPositionClass = (position: string) => {
    switch (position) {
      case 'top':
        return 'self-start';
      case 'bottom':
        return 'self-end';
      case 'left':
        return 'self-center mr-auto';
      case 'right':
        return 'self-center ml-auto';
      default:
        return 'self-center'; // center position
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity duration-300" />
      
      {/* Spotlight effect for highlighted elements */}
      {step.targetElement && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="onboarding-spotlight" />
        </div>
      )}

      {/* Onboarding Modal */}
      <div 
        className={`relative ${getPositionClass(step.position)} max-w-sm w-full mx-4 z-10`}
      >
        <div 
          className={`
            bg-gradient-to-br from-slate-800 to-slate-900 
            border border-indigo-500/30 
            rounded-xl shadow-2xl p-6
            pointer-events-auto
            ${getAnimationClass(step.animation)}
          `}
        >
          {/* Progress indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index <= activeStep ? 'bg-indigo-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            {step.title}
          </h3>
          
          <div 
            className="text-slate-300 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: step.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>')
            }}
          />

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
            >
              <span>✨</span> Skip to Story
            </button>
            
            <div className="flex gap-3">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                {activeStep === onboardingSteps.length - 1 ? 'Start Journey!' : 'Next'}
              </button>
            </div>
          </div>
        </div>

        {/* Pointer arrow for positioned tooltips */}
        {step.position !== 'center' && (
          <div className={`absolute w-0 h-0 ${getArrowClasses(step.position)}`} />
        )}
      </div>
    </div>
  );
};

// Helper function for arrow positioning
const getArrowClasses = (position: string) => {
  switch (position) {
    case 'top':
      return 'bottom-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-800';
    case 'bottom':
      return 'top-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-800';
    case 'left':
      return 'right-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-slate-800';
    case 'right':
      return 'left-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-slate-800';
    default:
      return '';
  }
};

export default OnboardingOverlay;
