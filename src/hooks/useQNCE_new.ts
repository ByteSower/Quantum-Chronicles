import { useState, useCallback } from 'react';
import { trackStoryEvent } from '../utils/analytics';
import type { BranchNode } from '../components/VisualBranchTracker';
import type { NarrativeNode, Choice, NarrativeSegment, QNCEVariables, FlagCondition } from '../narratives/types';
import { checkConditions, interpolateText } from '../narratives/types';
import { applyFlagUpdates } from '../utils/narrativeUtils';
import { ORIGINS_UNVEILED } from '../narratives/forgottenTruth/originsUnveiled';
import { TEMPLATE_SEGMENT } from '../narratives/templateSegment';

// Export Choice type for compatibility
export type { Choice };

// Available narrative segments - using Brain's new schema
const NARRATIVE_SEGMENTS: NarrativeSegment[] = [
  ORIGINS_UNVEILED,
  TEMPLATE_SEGMENT,
];

// Flatten all nodes from all segments for lookup
const ALL_NODES: NarrativeNode[] = NARRATIVE_SEGMENTS.flatMap(segment => segment.nodes);

export interface QNCEReturn {
  currentNode: NarrativeNode;
  flags: Record<string, boolean | number | string>;
  history: string[];
  variables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
  unlockedNodes: string[];
  delayedConsequences: Array<{ nodeId: string; message: string; triggerTime: number }>;
  recentActions: string[];
  makeChoice: (choice: Choice) => void;
  reset: () => void;
  initializeFromStartingPoint: (startingPointId: string, initialVariables?: Record<string, number>) => void;
  getBranchNodes: () => BranchNode[];
  getAvailableChoices: () => Choice[];
  isChoiceAvailable: (choice: Choice) => boolean;
}

export const useQNCE = (): QNCEReturn => {
  // QNCE Variables - core dimensions that influence narrative paths
  const [variables, setVariables] = useState({
    curiosity: 3,    // Drive to explore and question
    coherence: 3,    // Logical reasoning and systematic thinking
    disruption: 3,   // Willingness to challenge and break systems
    synchrony: 3     // Harmony with surrounding forces and people
  });

  // Narrative State
  const [currentNodeId, setCurrentNodeId] = useState('archive_discovery'); // Start with Origins Unveiled
  const [flags, setFlags] = useState<Record<string, boolean | number | string>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(['archive_discovery']);
  const [delayedConsequences, setDelayedConsequences] = useState<Array<{ nodeId: string; message: string; triggerTime: number }>>([]);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  // Get current node
  const currentNode = ALL_NODES.find(node => node.nodeId === currentNodeId) || ALL_NODES[0];

  // Process text with dynamic interpolation
  const processedNode = {
    ...currentNode,
    text: currentNode.dynTextFunction 
      ? currentNode.dynTextFunction({ ...variables, ...flags })
      : interpolateText(currentNode.text, { ...variables, ...flags })
  };

  // Check if a choice is available based on conditions
  const isChoiceAvailable = useCallback((choice: Choice): boolean => {
    if (!choice.conditions) return true;
    return checkConditions(choice.conditions, { ...variables, ...flags });
  }, [variables, flags]);

  // Get available choices for current node
  const getAvailableChoices = useCallback((): Choice[] => {
    return currentNode.choices?.filter(choice => isChoiceAvailable(choice)) || [];
  }, [currentNode, isChoiceAvailable]);

  // Handle choice selection with new schema
  const makeChoice = useCallback((choice: Choice) => {
    // Track analytics
    trackStoryEvent.choice(choice.choiceText);

    // Apply flag updates if present
    if (choice.flagUpdates) {
      const newVariables = applyFlagUpdates({ ...variables, ...flags }, choice.flagUpdates);
      
      // Separate QNCE variables from other flags
      const newQNCEVars = {
        curiosity: typeof newVariables.curiosity === 'number' ? newVariables.curiosity : variables.curiosity,
        coherence: typeof newVariables.coherence === 'number' ? newVariables.coherence : variables.coherence,
        disruption: typeof newVariables.disruption === 'number' ? newVariables.disruption : variables.disruption,
        synchrony: typeof newVariables.synchrony === 'number' ? newVariables.synchrony : variables.synchrony,
      };
      
      setVariables(newQNCEVars);
      
      // Update other flags
      const newFlags = { ...flags };
      Object.entries(newVariables).forEach(([key, value]) => {
        if (!['curiosity', 'coherence', 'disruption', 'synchrony'].includes(key)) {
          newFlags[key] = value;
        }
      });
      setFlags(newFlags);
    }

    // Update history and navigation
    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(choice.nextNodeId);
    setUnlockedNodes(prev => [...new Set([...prev, choice.nextNodeId])]);
    setRecentActions(prev => [...prev.slice(-4), choice.choiceText]);

    // Track story progress
    trackStoryEvent.progress(choice.nextNodeId);
  }, [currentNodeId, variables, flags]);

  // Reset to initial state
  const reset = useCallback(() => {
    setVariables({ curiosity: 3, coherence: 3, disruption: 3, synchrony: 3 });
    setCurrentNodeId('archive_discovery');
    setFlags({});
    setHistory([]);
    setUnlockedNodes(['archive_discovery']);
    setDelayedConsequences([]);
    setRecentActions([]);
  }, []);

  // Initialize from starting point
  const initializeFromStartingPoint = useCallback((startingPointId: string, initialVariables?: Record<string, number>) => {
    if (initialVariables) {
      setVariables(prev => ({ ...prev, ...initialVariables }));
    }
    
    // Map starting point to entry node
    const entryNodeMap: Record<string, string> = {
      'forgotten_truth': 'archive_discovery',
      'template': 'template_start',
    };
    
    const entryNode = entryNodeMap[startingPointId] || 'archive_discovery';
    setCurrentNodeId(entryNode);
    setUnlockedNodes([entryNode]);
    setHistory([]);
    setFlags({});
    setDelayedConsequences([]);
    setRecentActions([]);
  }, []);

  // Get branch nodes for visual tracker
  const getBranchNodes = useCallback((): BranchNode[] => {
    const branchNodes: BranchNode[] = [];
    const processedNodes = new Set<string>();

    // Add current node
    if (!processedNodes.has(currentNodeId)) {
      processedNodes.add(currentNodeId);
      branchNodes.push({
        id: currentNodeId,
        title: currentNode.text.slice(0, 50) + '...',
        isVisited: history.includes(currentNodeId),
        isCurrent: true,
        isAvailable: true,
        position: { x: 200, y: 200 },
        connections: getAvailableChoices().map(choice => choice.nextNodeId)
      });
    }

    // Add connected nodes
    getAvailableChoices().forEach(choice => {
      const nextNodeId = choice.nextNodeId;
      const nextNode = ALL_NODES.find(n => n.nodeId === nextNodeId);
      if (nextNode && !processedNodes.has(nextNodeId)) {
        processedNodes.add(nextNodeId);
        branchNodes.push({
          id: nextNodeId,
          title: choice.choiceText,
          isVisited: history.includes(nextNodeId),
          isCurrent: false,
          isAvailable: isChoiceAvailable(choice),
          position: { x: 300, y: 200 },
          connections: []
        });
      }
    });

    return branchNodes;
  }, [currentNodeId, currentNode, history, getAvailableChoices, isChoiceAvailable]);

  return {
    currentNode: processedNode,
    flags,
    history,
    variables,
    unlockedNodes,
    delayedConsequences,
    recentActions,
    makeChoice,
    reset,
    initializeFromStartingPoint,
    getBranchNodes,
    getAvailableChoices,
    isChoiceAvailable
  };
};
