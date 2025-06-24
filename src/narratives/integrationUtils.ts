/**
 * Narrative Segment Integration Utilities
 * 
 * Utilities for integrating narrative segments into the main QNCE system,
 * including dynamic text interpolation, session-based state management,
 * and feedback collection for beta testing.
 */

import type { NarrativeNode, NarrativeSegment, SessionState } from './types';
import { interpolateText, canAccessSegment } from './types';

/**
 * Process a narrative node with dynamic text interpolation
 */
export function processNarrativeNode(
  node: NarrativeNode,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number },
  flags: Record<string, boolean | number | string>
): NarrativeNode {
  let processedNode = { ...node };

  // Apply dynamic text interpolation if available
  if (node.dynamicText) {
    const interpolatedText = interpolateText(node.dynamicText.template, {
      ...variables,
      ...flags
    });
    processedNode.text = interpolatedText;
  }

  return processedNode;
}

/**
 * Check if a narrative segment is accessible based on current state
 */
export function isSegmentAccessible(
  segment: NarrativeSegment,
  currentNodeId: string,
  flags: Record<string, boolean | number | string>,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number }
): boolean {
  // Check if current node is an entry point for this segment
  const hasEntryPoint = segment.entryPoints?.includes(currentNodeId) || false;
  
  // Check if segment requirements are met
  const meetsRequirements = canAccessSegment(segment, flags, variables);
  
  return hasEntryPoint && meetsRequirements;
}

/**
 * Find all accessible segments based on current state
 */
export function findAccessibleSegments(
  segments: NarrativeSegment[],
  currentNodeId: string,
  flags: Record<string, boolean | number | string>,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number }
): NarrativeSegment[] {
  return segments.filter(segment => 
    isSegmentAccessible(segment, currentNodeId, flags, variables)
  );
}

/**
 * Generate session-based feedback prompts
 */
export function generateFeedbackPrompt(
  node: NarrativeNode,
  sessionId: string
): { promptId: string; prompt: string; nodeId: string } | null {
  if (!node.feedbackPrompt) return null;
  
  return {
    promptId: `${sessionId}_${node.id}_feedback`,
    prompt: node.feedbackPrompt,
    nodeId: node.id
  };
}

/**
 * Track asset placeholder usage for development planning
 */
export function trackAssetUsage(
  node: NarrativeNode
): { visuals: string[]; audio: string[]; music: string[] } {
  const assets = {
    visuals: [] as string[],
    audio: [] as string[],
    music: [] as string[]
  };

  if (node.assetPlaceholder) {
    if (node.assetPlaceholder.visual) {
      assets.visuals.push(node.assetPlaceholder.visual);
    }
    if (node.assetPlaceholder.audio) {
      assets.audio.push(node.assetPlaceholder.audio);
    }
    if (node.assetPlaceholder.music) {
      assets.music.push(node.assetPlaceholder.music);
    }
  }

  // Also check choice-level asset placeholders
  node.choices.forEach(choice => {
    if (choice.assetPlaceholder) {
      if (choice.assetPlaceholder.visual) {
        assets.visuals.push(choice.assetPlaceholder.visual);
      }
      if (choice.assetPlaceholder.audio) {
        assets.audio.push(choice.assetPlaceholder.audio);
      }
    }
  });

  return assets;
}

/**
 * Create session state snapshot for persistence
 */
export function createSessionSnapshot(
  segmentId: string,
  nodeId: string,
  flags: Record<string, boolean | number | string>,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number },
  sessionId: string
): SessionState {
  return {
    segmentId,
    nodeId,
    flags,
    variables,
    sessionId,
    timestamp: Date.now()
  };
}

/**
 * Validate session state for integrity
 */
export function validateSessionState(state: SessionState): boolean {
  // Check required fields
  if (!state.segmentId || !state.nodeId || !state.sessionId) {
    return false;
  }

  // Check variable ranges
  const { variables } = state;
  if (variables.curiosity < 0 || variables.coherence < 0 || 
      variables.disruption < 0 || variables.synchrony < 0) {
    return false;
  }

  // Check timestamp validity
  if (!state.timestamp || state.timestamp > Date.now()) {
    return false;
  }

  return true;
}

/**
 * Beta testing utility: collect choice analytics
 */
export function collectChoiceAnalytics(
  nodeId: string,
  choiceIndex: number,
  choiceText: string,
  sessionId: string,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number }
): {
  nodeId: string;
  choiceIndex: number;
  choiceText: string;
  sessionId: string;
  variables: typeof variables;
  timestamp: number;
} {
  return {
    nodeId,
    choiceIndex,
    choiceText,
    sessionId,
    variables: { ...variables },
    timestamp: Date.now()
  };
}

/**
 * Generate dynamic choices based on current state
 */
export function generateDynamicChoices(
  node: NarrativeNode,
  flags: Record<string, boolean | number | string>,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number }
) {
  return node.choices.filter(choice => {
    // Check flag requirements
    if (choice.requirements?.flags) {
      for (const [flagName, requiredValue] of Object.entries(choice.requirements.flags)) {
        if (flags[flagName] !== requiredValue) {
          return false;
        }
      }
    }

    // Check variable requirements
    if (choice.requirements?.variables) {
      for (const [varName, requirements] of Object.entries(choice.requirements.variables)) {
        const currentValue = variables[varName as keyof typeof variables];
        if (requirements.min !== undefined && currentValue < requirements.min) {
          return false;
        }
        if (requirements.max !== undefined && currentValue > requirements.max) {
          return false;
        }
      }
    }

    return true;
  });
}
