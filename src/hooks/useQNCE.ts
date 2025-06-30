import { useState, useCallback } from 'react';
import { trackStoryEvent } from '../utils/analytics';
import { forgottenTruth } from '../narratives/forgottenTruth';
import type {
  NarrativeNode,
  Choice,
  QNCEVariables,
  FlagUpdate,
  VariableUpdate,
  FlagCondition,
  NarrativeSegment,
} from '../narratives/types';

export interface QNCEReturn {
  currentNode: NarrativeNode;
  flags: Record<string, boolean | number | string>;
  history: string[];
  variables: QNCEVariables;
  makeChoice: (choiceIndex: number) => void;
  reset: () => void;
  getAvailableChoices: () => Choice[];
  isChoiceAvailable: (choice: Choice) => boolean;
}

export const useQNCE = (narrative: NarrativeSegment = forgottenTruth, startNodeId?: string): QNCEReturn => {
  const initialStartNode = startNodeId || narrative.startNodeId;
  const [currentNodeId, setCurrentNodeId] = useState(initialStartNode);
  const [flags, setFlags] = useState<Record<string, boolean | number | string>>(narrative.initialFlags);
  const [history, setHistory] = useState<string[]>([initialStartNode]);
  const [variables, setVariables] = useState<QNCEVariables>(narrative.initialVariables);

  const NODES = narrative.nodes;

  const reset = useCallback(() => {
    const resetStartNode = startNodeId || narrative.startNodeId;
    setCurrentNodeId(resetStartNode);
    setFlags(narrative.initialFlags);
    setHistory([resetStartNode]);
    setVariables(narrative.initialVariables);
    trackStoryEvent.reset(narrative.segmentId);
  }, [narrative, startNodeId]);

  const isChoiceAvailable = useCallback((choice: Choice): boolean => {
    if (!choice.conditions || choice.conditions.length === 0) {
      return true;
    }

    return choice.conditions.every((condition: FlagCondition) => {
      const currentValue = flags[condition.flag];
      if (currentValue === undefined) return false;

      switch (condition.operator) {
        case '===':
          return currentValue === condition.value;
        case '!==':
          return currentValue !== condition.value;
        case '>':
          return typeof currentValue === 'number' && typeof condition.value === 'number' && currentValue > condition.value;
        case '<':
          return typeof currentValue === 'number' && typeof condition.value === 'number' && currentValue < condition.value;
        case '>=':
          return typeof currentValue === 'number' && typeof condition.value === 'number' && currentValue >= condition.value;
        case '<=':
          return typeof currentValue === 'number' && typeof condition.value === 'number' && currentValue <= condition.value;
        default:
          return false;
      }
    });
  }, [flags]);

  const makeChoice = (choiceIndex: number) => {
    const currentNode = NODES.find(node => node.nodeId === currentNodeId);
    if (!currentNode || !currentNode.choices) return;

    const availableChoices = currentNode.choices.filter(isChoiceAvailable);
    const choice = availableChoices[choiceIndex];
    if (!choice) return;

    trackStoryEvent.choice(choice.nextNodeId);

    if (currentNode.feedbackHook) {
      try {
        // This is a simplified representation of a feedback hook call
        console.log(`Feedback hook triggered for milestone: ${currentNode.feedbackHook.milestone}`);
      } catch (error) {
        console.warn('Feedback hook error:', error);
      }
    }

    if (choice.flagUpdates) {
      setFlags(prevFlags => {
        const newFlags = { ...prevFlags };
        choice.flagUpdates!.forEach((update: FlagUpdate) => {
          const currentVal = newFlags[update.flag];
          switch (update.operation) {
            case 'set':
              newFlags[update.flag] = update.value;
              break;
            case 'increment':
              if (typeof currentVal === 'number' && typeof update.value === 'number') {
                newFlags[update.flag] = currentVal + update.value;
              } else {
                newFlags[update.flag] = update.value;
              }
              break;
            case 'decrement':
              if (typeof currentVal === 'number' && typeof update.value === 'number') {
                newFlags[update.flag] = currentVal - update.value;
              }
              break;
          }
        });
        return newFlags;
      });
    }

    if (choice.variableUpdates) {
      setVariables(prevVars => {
        const newVars = { ...prevVars };
        choice.variableUpdates!.forEach((update: VariableUpdate) => {
            const currentVal = newVars[update.variable];
            if (typeof currentVal !== 'number') return;

            switch (update.operation) {
                case 'set':
                    newVars[update.variable] = update.value;
                    break;
                case 'add':
                    newVars[update.variable] = currentVal + update.value;
                    break;
                case 'subtract':
                    newVars[update.variable] = currentVal - update.value;
                    break;
            }
        });
        return newVars;
      });
    }

    setCurrentNodeId(choice.nextNodeId);
    setHistory(prevHistory => [...prevHistory, choice.nextNodeId]);
  };

  const getAvailableChoices = useCallback(() => {
    const currentNode = NODES.find(node => node.nodeId === currentNodeId);
    if (!currentNode || !currentNode.choices) return [];
    return currentNode.choices.filter(isChoiceAvailable);
  }, [currentNodeId, isChoiceAvailable, NODES]);

  return {
    currentNode: NODES.find(node => node.nodeId === currentNodeId)!,
    flags,
    variables,
    history,
    reset,
    makeChoice,
    isChoiceAvailable,
    getAvailableChoices,
  };
};
