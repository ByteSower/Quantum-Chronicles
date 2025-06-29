/**
 * QNCE Hook - Brain's Reference Implementation
 * 
 * Clean implementation following Brain's narrative schema.
 * Handles segment loading, nextSegmentId transitions, global decay, and resets.
 */

import { useState, useCallback } from 'react';
import type { NarrativeSegment, NarrativeNode, Choice, QNCEVariables } from '../narratives/types';
import { checkConditions, interpolateText } from '../narratives/types';
import { applyFlagUpdates } from '../utils/narrativeUtils';
import { TEMPLATE_SEGMENT } from '../narratives/templateSegment';
import { ORIGINS_UNVEILED } from '../narratives/forgottenTruth/originsUnveiled';

// Available narrative segments registry
export const NARRATIVE_SEGMENTS: NarrativeSegment[] = [
  TEMPLATE_SEGMENT,
  ORIGINS_UNVEILED
];

// Flatten all nodes from all segments for lookup
const getAllNodes = (): NarrativeNode[] => NARRATIVE_SEGMENTS.flatMap(segment => segment.nodes);

export interface QNCEReturn {
  currentNode: NarrativeNode | null;
  flags: Record<string, boolean | number | string>;
  history: string[];
  variables: QNCEVariables;
  currentSegmentId: string | null;
  makeChoice: (choiceIndex: number) => void;
  reset: () => void;
  initializeFromStartingPoint: (segmentId: string, initialVariables: QNCEVariables) => void;
  getAvailableChoices: () => Choice[];
  isChoiceAvailable: (choice: Choice) => boolean;
  getCurrentNodeText: () => string;
}

export const useQNCE = (initialSegmentId?: string): QNCEReturn => {
  // Find initial segment or default to first available
  const getInitialSegment = () => {
    if (initialSegmentId) {
      return NARRATIVE_SEGMENTS.find(s => s.segmentId === initialSegmentId) || NARRATIVE_SEGMENTS[0];
    }
    return NARRATIVE_SEGMENTS[0] || null;
  };

  const initialSegment = getInitialSegment();
  
  const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(
    initialSegment?.segmentId || null
  );
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(
    initialSegment?.startNodeId || null
  );
  const [flags, setFlags] = useState<Record<string, boolean | number | string>>(
    initialSegment?.initialFlags || {}
  );
  const [history, setHistory] = useState<string[]>(
    initialSegment?.startNodeId ? [initialSegment.startNodeId] : []
  );
  const [variables, setVariables] = useState<QNCEVariables>(
    initialSegment?.initialVariables || {}
  );

  // Get current node from all available nodes
  const getCurrentNode = useCallback((): NarrativeNode | null => {
    if (!currentNodeId) return null;
    return getAllNodes().find(node => node.nodeId === currentNodeId) || null;
  }, [currentNodeId]);

  const currentNode = getCurrentNode();

  const isChoiceAvailable = useCallback((choice: Choice): boolean => {
    if (!choice.conditions) return true;
    return checkConditions(choice.conditions, { ...flags, ...variables });
  }, [flags, variables]);

  const getCurrentNodeText = useCallback((): string => {
    if (!currentNode) return "Loading...";
    
    // Use dynamic text function if available, otherwise static text
    if (currentNode.dynTextFunction) {
      return currentNode.dynTextFunction({ ...flags, ...variables });
    }
    
    return interpolateText(currentNode.text, { ...flags, ...variables });
  }, [currentNode, flags, variables]);

  const getAvailableChoices = useCallback((): Choice[] => {
    if (!currentNode) return [];
    return currentNode.choices?.filter(isChoiceAvailable) || [];
  }, [currentNode, isChoiceAvailable]);

  const makeChoice = useCallback((choiceIndex: number) => {
    if (!currentNode) return;

    const availableChoices = getAvailableChoices();
    const choice = availableChoices[choiceIndex];
    if (!choice) return;

    // Handle segment hopping
    if (choice.nextSegmentId) {
      const nextSegment = NARRATIVE_SEGMENTS.find(s => s.segmentId === choice.nextSegmentId);
      if (nextSegment) {
        // Apply choice effects first
        const { newFlags, newVariables } = applyFlagUpdates(choice.flagUpdates, flags, variables);
        
        // Merge with new segment's initial state
        setFlags({ ...newFlags, ...nextSegment.initialFlags });
        setVariables({ ...newVariables, ...nextSegment.initialVariables });
        setCurrentSegmentId(nextSegment.segmentId);
        setCurrentNodeId(nextSegment.startNodeId);
        setHistory(prev => [...prev, nextSegment.startNodeId]);
        
        console.log(`[useQNCE] Hopped to segment: ${choice.nextSegmentId}`);
        return;
      } else {
        console.error(`[useQNCE] Segment not found: ${choice.nextSegmentId}`);
        return;
      }
    }

    // Handle normal choice progression
    const { newFlags, newVariables } = applyFlagUpdates(choice.flagUpdates, flags, variables);
    setFlags(newFlags);
    setVariables(newVariables);

    // Apply global decay if configured
    const currentSegment = NARRATIVE_SEGMENTS.find(s => s.segmentId === currentSegmentId);
    if (currentSegment?.globalFlagDecay) {
      setFlags(prevFlags => {
        const decayedFlags = { ...prevFlags };
        for (const [key, value] of Object.entries(decayedFlags)) {
          if (typeof value === 'number') {
            decayedFlags[key] = Math.max(0, value - currentSegment.globalFlagDecay!);
          }
        }
        return decayedFlags;
      });
    }

    // Execute feedback hook if present
    if (choice.feedbackHook) {
      choice.feedbackHook({
        nodeId: currentNode.nodeId,
        choiceText: choice.choiceText,
        nextNodeId: choice.nextNodeId,
        currentFlags: flags,
        currentVariables: variables,
        timestamp: Date.now()
      });
    }

    // Move to next node
    setCurrentNodeId(choice.nextNodeId);
    setHistory(prev => [...prev, choice.nextNodeId]);
  }, [currentNode, getAvailableChoices, flags, variables, currentSegmentId]);

  const initializeFromStartingPoint = useCallback((segmentId: string, initialVariables: QNCEVariables) => {
    const segment = NARRATIVE_SEGMENTS.find(s => s.segmentId === segmentId);
    if (!segment) {
      console.error(`[useQNCE] Segment not found: ${segmentId}`);
      return;
    }

    setCurrentSegmentId(segment.segmentId);
    setCurrentNodeId(segment.startNodeId);
    setFlags(segment.initialFlags);
    setVariables({ ...segment.initialVariables, ...initialVariables });
    setHistory([segment.startNodeId]);
    
    console.log(`[useQNCE] Initialized segment: ${segmentId}`);
  }, []);

  const reset = useCallback(() => {
    const segment = getInitialSegment();
    if (segment) {
      setCurrentSegmentId(segment.segmentId);
      setCurrentNodeId(segment.startNodeId);
      setFlags(segment.initialFlags);
      setVariables(segment.initialVariables);
      setHistory([segment.startNodeId]);
    } else {
      setCurrentSegmentId(null);
      setCurrentNodeId(null);
      setFlags({});
      setVariables({});
      setHistory([]);
    }
  }, [initialSegmentId]);

  return {
    currentNode,
    flags,
    history,
    variables,
    currentSegmentId,
    makeChoice,
    reset,
    initializeFromStartingPoint,
    getAvailableChoices,
    isChoiceAvailable,
    getCurrentNodeText
  };
};
