import React from 'react';

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

  if (compact) {
    return (
      <div className="variable-teaser inline-block">
        <span className="text-indigo-300 font-medium">
          Your <strong>{highest.name}</strong> is currently <strong>{highest.value}</strong>
        </span>
        {showHint && (
          <span className="text-slate-400 text-sm ml-2">
            — Make a choice to see it change!
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="variable-teaser">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{highest.icon}</span>
          <span className="text-indigo-300 font-semibold">
            Your strongest trait: {highest.name}
          </span>
        </div>
        <span className="text-purple-300 font-bold text-lg">
          {highest.value}
        </span>
      </div>
      
      {showHint && (
        <p className="text-slate-400 text-sm mb-3">
          {highest.description}. Your choices shape how this develops!
        </p>
      )}
      
      <div className="grid grid-cols-4 gap-2">
        {variableList.map((variable) => (
          <div key={variable.name} className="text-center">
            <div className="text-xs text-slate-400 mb-1">{variable.icon}</div>
            <div className={`text-sm font-medium ${
              variable.name === highest.name ? 'text-indigo-300' : 'text-slate-300'
            }`}>
              {variable.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableTeaser;
