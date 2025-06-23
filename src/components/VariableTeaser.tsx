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
      <div className="variable-teaser bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-indigo-500/20 rounded-lg p-3 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="text-lg">{highest.icon}</span>
          <span className="text-indigo-300 font-medium">
            <strong>{highest.name}</strong> leads at <strong>{highest.value}</strong>
          </span>
        </div>
        {showHint && (
          <p className="text-slate-400 text-xs mt-2 text-center">
            Keep making choices to see how your traits evolve!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="variable-teaser bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-indigo-500/30 rounded-lg p-4 backdrop-blur-sm">
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
        <p className="text-slate-300 text-sm mb-3">
          {highest.description}. Your choices shape how this develops!
        </p>
      )}
      
      <div className="grid grid-cols-4 gap-3">
        {variableList.map((variable) => (
          <div key={variable.name} className="text-center">
            <div className="text-lg mb-1">{variable.icon}</div>
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
