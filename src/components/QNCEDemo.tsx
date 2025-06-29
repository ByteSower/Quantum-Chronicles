/**
 * Demo App for Testing Brain's Narrative Reference Structure
 * 
 * A simple React app to test the "Origins Unveiled" segment with Brain's schema.
 * This demonstrates the QNCE integration and dynamic text features.
 */

import { useState } from 'react';
import { ORIGINS_UNVEILED } from '../narratives/forgottenTruth/originsUnveiled';
import { applyFlagUpdates } from '../utils/narrativeUtils';
import { checkConditions } from '../narratives/types';
import type { QNCEVariables } from '../narratives/types';

export function QNCEDemo() {
  const [currentNodeId, setCurrentNodeId] = useState('archive_discovery');
  const [variables, setVariables] = useState<QNCEVariables>({
    curiosity: 5,
    coherence: 3,
    scientific_background: 6,
    intuition: 4,
    wisdom: 8
  });
  const [history, setHistory] = useState<string[]>([]);

  const currentNode = ORIGINS_UNVEILED.nodes.find(node => node.nodeId === currentNodeId);
  
  if (!currentNode) {
    return <div>Node not found: {currentNodeId}</div>;
  }

  const makeChoice = (choiceIndex: number) => {
    const choice = currentNode.choices?.[choiceIndex];
    if (!choice) return;

    // Apply flag updates
    if (choice.flagUpdates) {
      const newVariables = applyFlagUpdates(variables, choice.flagUpdates);
      setVariables(newVariables);
    }

    // Apply global decay (simplified)
    const decayRate = 0.1;
    const decayedVariables = { ...variables };
    Object.keys(decayedVariables).forEach(key => {
      if (typeof decayedVariables[key] === 'number') {
        decayedVariables[key] = Math.max(0, (decayedVariables[key] as number) - decayRate);
      }
    });
    setVariables(decayedVariables);

    // Update state
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(choice.nextNodeId);
  };

  // Get display text (dynamic or static)
  const displayText = currentNode.dynTextFunction 
    ? currentNode.dynTextFunction(variables)
    : currentNode.text;

  // Get additional text
  const additionalText = currentNode.textAfter 
    ? currentNode.textAfter(variables)
    : '';

  // Filter available choices based on conditions
  const availableChoices = currentNode.choices?.filter(choice => {
    if (!choice.conditions) return true;
    return checkConditions(choice.conditions, variables);
  }) || [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {ORIGINS_UNVEILED.title}
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          {ORIGINS_UNVEILED.description}
        </p>
        <p className="text-xs text-gray-500">
          Current Node: {currentNodeId}
        </p>
      </div>

      <div className="mb-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-800 leading-relaxed">
            {displayText}
          </p>
          {additionalText && (
            <p className="text-sm text-gray-600 mt-2">
              {additionalText}
            </p>
          )}
        </div>
      </div>

      {availableChoices.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Choose your action:
          </h3>
          {availableChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => makeChoice(index)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-gray-800">
                {choice.choiceText}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p className="text-lg font-semibold mb-2">Story Complete</p>
          <p>You've reached one of the endings in this segment.</p>
          <button 
            onClick={() => {
              setCurrentNodeId('archive_discovery');
              setHistory([]);
              setVariables({
                curiosity: 5,
                coherence: 3,
                scientific_background: 6,
                intuition: 4,
                wisdom: 8
              });
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Restart
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">QNCE Variables:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}:</span>
              <span className="text-gray-800 font-mono">
                {typeof value === 'number' ? value.toFixed(1) : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">History:</h4>
          <div className="text-xs text-gray-600">
            {history.join(' → ')} → <strong>{currentNodeId}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
