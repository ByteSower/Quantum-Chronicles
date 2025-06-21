
import React, { useState, useEffect } from 'react';
import AboutQNCEModal from '../AboutQNCEModal';
import { analytics, trackUIEvent } from '../../utils/analytics';

interface VariableDashboardProps {
  curiosity: number;
  coherence: number;
  disruption: number;
  synchrony: number;
}

interface VariableChangeAnimation {
  previousValue: number;
  currentValue: number;
  isAnimating: boolean;
}

// Tooltip component for explaining QNCE concepts
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-indigo-500 rounded-lg text-xs text-white w-48 z-50 shadow-lg">
          <div className="text-center leading-relaxed">{text}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

const VariableDashboard: React.FC<VariableDashboardProps> = ({
  curiosity,
  coherence,
  disruption,
  synchrony,
}) => {
  const [showAboutQNCE, setShowAboutQNCE] = useState(false);
  const [animations, setAnimations] = useState<Record<string, VariableChangeAnimation>>({
    curiosity: { previousValue: curiosity, currentValue: curiosity, isAnimating: false },
    coherence: { previousValue: coherence, currentValue: coherence, isAnimating: false },
    disruption: { previousValue: disruption, currentValue: disruption, isAnimating: false },
    synchrony: { previousValue: synchrony, currentValue: synchrony, isAnimating: false },
  });

  // Trigger animations when values change
  useEffect(() => {
    const newAnimations = { ...animations };
    let hasChanges = false;

    if (curiosity !== animations.curiosity.currentValue) {
      newAnimations.curiosity = {
        previousValue: animations.curiosity.currentValue,
        currentValue: curiosity,
        isAnimating: true
      };
      hasChanges = true;
    }

    if (coherence !== animations.coherence.currentValue) {
      newAnimations.coherence = {
        previousValue: animations.coherence.currentValue,
        currentValue: coherence,
        isAnimating: true
      };
      hasChanges = true;
    }

    if (disruption !== animations.disruption.currentValue) {
      newAnimations.disruption = {
        previousValue: animations.disruption.currentValue,
        currentValue: disruption,
        isAnimating: true
      };
      hasChanges = true;
    }

    if (synchrony !== animations.synchrony.currentValue) {
      newAnimations.synchrony = {
        previousValue: animations.synchrony.currentValue,
        currentValue: synchrony,
        isAnimating: true
      };
      hasChanges = true;
    }

    if (hasChanges) {
      setAnimations(newAnimations);
      
      // Track variable state changes
      const fieldStrength = Math.sqrt(
        Math.pow(curiosity, 2) + 
        Math.pow(coherence, 2) + 
        Math.pow(disruption, 2) + 
        Math.pow(synchrony, 2)
      );
      
      analytics.trackVariableState(
        { curiosity, coherence, disruption, synchrony },
        fieldStrength,
        'dashboard_update'
      );
      
      // Clear animations after duration
      setTimeout(() => {
        setAnimations(prev => {
          const cleared = { ...prev };
          Object.keys(cleared).forEach(key => {
            cleared[key].isAnimating = false;
          });
          return cleared;
        });
      }, 1500);
    }
  }, [curiosity, coherence, disruption, synchrony]);

  const getVariableColor = (value: number, isAnimating: boolean) => {
    if (isAnimating) {
      return 'text-yellow-300'; // Highlight during changes
    }
    if (value >= 8) return 'text-green-300';
    if (value >= 5) return 'text-blue-300';
    if (value >= 2) return 'text-purple-300';
    if (value <= -2) return 'text-red-300';
    return 'text-gray-300';
  };

  const getVariableIcon = (variableName: string, _value: number, isAnimating: boolean) => {
    const baseIcons = {
      curiosity: '👁️',
      coherence: '🧭',
      disruption: '⚡️',
      synchrony: '🔗'
    };

    if (isAnimating) {
      return '✨'; // Sparkle during animation
    }

    return baseIcons[variableName as keyof typeof baseIcons];
  };

  const getVariableTooltip = (variableName: string) => {
    const tooltips = {
      curiosity: "Curiosity drives exploration and discovery. Higher values unlock new paths and reveal hidden information, while lower values limit your narrative options.",
      coherence: "Coherence represents how well your understanding fits together. Higher coherence provides clarity and stability in your story progression.",
      disruption: "Disruption measures how much you're challenging the established order. Higher values open radical possibilities but may create instability.",
      synchrony: "Synchrony reflects how aligned you are with the narrative flow. Higher synchrony creates powerful story convergences and meaningful connections."
    };
    return tooltips[variableName as keyof typeof tooltips];
  };

  const renderVariable = (name: string, value: number, label: string) => {
    const animation = animations[name];
    const isIncreasing = animation.currentValue > animation.previousValue;
    const change = animation.currentValue - animation.previousValue;

    return (
      <div 
        key={name}
        className={`variable flex items-center my-1.5 transition-all duration-500 ${
          animation.isAnimating ? 'scale-105 bg-gray-800 bg-opacity-50 rounded px-2 py-1' : ''
        }`}
      >
        <span 
          className={`variable-icon mr-1.5 transition-all duration-300 ${
            animation.isAnimating ? 'animate-pulse scale-125' : ''
          }`}
        >
          {getVariableIcon(name, value, animation.isAnimating)}
        </span>
        <div className="flex items-center">
          <span className="variable-label font-bold mr-1.5 text-gray-200">
            {label}:
          </span>
          <Tooltip text={getVariableTooltip(name)}>
            <span className="text-xs text-gray-400 hover:text-indigo-300 mr-1.5 cursor-help">ℹ️</span>
          </Tooltip>
        </div>
        <span 
          className={`variable-value transition-all duration-500 font-semibold ${
            getVariableColor(value, animation.isAnimating)
          } ${animation.isAnimating ? 'drop-shadow-lg' : ''}`}
          style={{
            filter: animation.isAnimating ? 'drop-shadow(0 0 8px currentColor)' : 'none'
          }}
        >
          {value}
        </span>
        
        {/* Change indicator */}
        {animation.isAnimating && change !== 0 && (
          <span 
            className={`ml-2 text-xs font-bold transition-all duration-500 ${
              isIncreasing ? 'text-green-400' : 'text-red-400'
            }`}
            style={{
              animation: 'fadeInOut 1.5s ease-in-out'
            }}
          >
            {isIncreasing ? '+' : ''}{change}
          </span>
        )}
        
        {/* Quantum ripple effect for significant changes */}
        {animation.isAnimating && Math.abs(change) >= 3 && (
          <div 
            className="ml-2 w-3 h-3 rounded-full border-2 opacity-70"
            style={{
              borderColor: isIncreasing ? '#10b981' : '#ef4444',
              animation: 'ripple 1.5s ease-out'
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <AboutQNCEModal 
        isOpen={showAboutQNCE} 
        onClose={() => setShowAboutQNCE(false)} 
      />
      
      <div id="variable-dashboard" className="text-white font-sans">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-lg mr-2">⚛️</span>
            <h3 className="text-sm font-bold text-gray-200">Quantum State</h3>
          </div>
          <button
            onClick={() => {
              setShowAboutQNCE(true);
              trackUIEvent.help('variable_dashboard', 'learn_more_button');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
          >
            Learn More
          </button>
        </div>
        
        {renderVariable('curiosity', curiosity, 'Curiosity')}
        {renderVariable('coherence', coherence, 'Coherence')}
        {renderVariable('disruption', disruption, 'Disruption')}
        {renderVariable('synchrony', synchrony, 'Synchrony')}
        
        {/* Quantum field visualization */}
        <div className="mt-3 pt-2 border-t border-indigo-500 border-opacity-30">
          <div className="flex justify-between text-xs text-gray-400 items-center">
            <div className="flex items-center">
              <span>Field Strength:</span>
              <Tooltip text="Field Strength represents the convergence of narrative energy from your choices. Higher values indicate that story themes are pulling together strongly, creating focused narrative paths and powerful story moments.">
                <span className="text-xs text-gray-400 hover:text-indigo-300 ml-1 cursor-help">ℹ️</span>
              </Tooltip>
            </div>
            <span className="font-semibold">
              {Math.abs(curiosity) + Math.abs(coherence) + Math.abs(disruption) + Math.abs(synchrony)}
            </span>
          </div>
          <div className="mt-1 h-1 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-1000"
              style={{
                width: `${Math.min(100, (Math.abs(curiosity) + Math.abs(coherence) + Math.abs(disruption) + Math.abs(synchrony)) * 2)}%`,
                filter: 'drop-shadow(0 0 4px currentColor)'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* CSS for custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInOut {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(0.9); }
          }
          
          @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(4); opacity: 0; }
          }
          
          @keyframes quantumGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.3); }
            50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
          }
        `
      }} />
    </>
  );
};

export default VariableDashboard;