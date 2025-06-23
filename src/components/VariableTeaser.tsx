import React, { useEffect, useRef } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import { accessibilityManager, a11y } from '../utils/accessibility';

interface VariableTeaserProps {
  variables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
  showHint?: boolean;
  compact?: boolean;
}

const VariableTeaser: React.FC<VariableTeaserProps> = ({ 
  variables, 
  showHint = true,
  compact = false
}) => {
  const teaserRef = useRef<HTMLDivElement>(null);
  const teaserId = a11y.generateId('variable-teaser');

  const variableList = [
    { 
      name: 'Curiosity', 
      value: variables.curiosity, 
      icon: '🔍',
      description: 'Drive to explore and question'
    },
    { 
      name: 'Coherence', 
      value: variables.coherence, 
      icon: '🧩',
      description: 'Logical understanding'
    },
    { 
      name: 'Disruption', 
      value: variables.disruption, 
      icon: '⚡',
      description: 'Willingness to challenge'
    },
    { 
      name: 'Synchrony', 
      value: variables.synchrony, 
      icon: '🌊',
      description: 'Harmony with forces'
    }
  ];

  const getHighestVariable = () => {
    return variableList.reduce((prev, current) => 
      current.value > prev.value ? current : prev
    );
  };

  const highest = getHighestVariable();

  // Track when variable teaser is displayed
  useEffect(() => {
    analyticsWrapper.trackUIEvent('feature_used', {
      feature: 'variable_teaser_display',
      action: compact ? 'compact_displayed' : 'full_displayed',
    });

    // Announce variable changes to screen readers
    const variableText = `${highest.name} is your strongest trait at ${highest.value}`;
    accessibilityManager.announceContentChange('variable', variableText);
  }, [compact, highest.name, highest.value]);

  const handleTeaserClick = () => {
    analyticsWrapper.trackUIEvent('feature_used', {
      feature: 'variable_teaser_interaction',
      action: 'clicked',
    });
  };

  if (compact) {
    return (
      <div 
        ref={teaserRef}
        className="variable-teaser bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-indigo-500/20 rounded-lg p-3 backdrop-blur-sm cursor-pointer hover:border-indigo-500/40 transition-all duration-300"
        onClick={handleTeaserClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleTeaserClick()}
        aria-label={`Variable summary: ${highest.name} leads at ${highest.value}. Click for more details.`}
        aria-describedby={compact ? `${teaserId}-compact` : undefined}
      >
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="text-lg" aria-hidden="true">{highest.icon}</span>
          <span className="text-indigo-300 font-medium">
            <strong>{highest.name}</strong> leads at <strong>{highest.value}</strong>
          </span>
        </div>
        {showHint && (
          <p 
            id={`${teaserId}-compact`}
            className="text-slate-400 text-xs mt-2 text-center"
          >
            Keep making choices to see how your traits evolve!
          </p>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={teaserRef}
      className="variable-teaser bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-indigo-500/30 rounded-lg p-4 backdrop-blur-sm cursor-pointer hover:border-indigo-500/50 transition-all duration-300"
      onClick={handleTeaserClick}
      role="region"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleTeaserClick()}
      aria-label={`Variable details: ${highest.name} is strongest at ${highest.value}. All variables: ${variableList.map(v => `${v.name} ${v.value}`).join(', ')}`}
      aria-describedby={`${teaserId}-full`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">{highest.icon}</span>
          <span className="text-indigo-300 font-semibold">
            Your strongest trait: {highest.name}
          </span>
        </div>
        <span className="text-purple-300 font-bold text-lg">
          {highest.value}
        </span>
      </div>
      
      {showHint && (
        <p 
          id={`${teaserId}-full`}
          className="text-slate-300 text-sm mb-3"
        >
          {highest.description}. Your choices shape how this develops!
        </p>
      )}
      
      <div className="grid grid-cols-4 gap-3" role="list" aria-label="All variable values">
        {variableList.map((variable) => (
          <div 
            key={variable.name} 
            className="text-center"
            role="listitem"
            aria-label={a11y.getVariableLabel(variable.name, variable.value)}
          >
            <div className="text-lg mb-1" aria-hidden="true">{variable.icon}</div>
            <div className={`text-sm font-medium ${
              variable.name === highest.name ? 'text-indigo-300' : 'text-slate-300'
            }`}>
              {variable.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {variable.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableTeaser;
