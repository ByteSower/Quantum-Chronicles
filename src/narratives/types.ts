/**
 * QNCE Narrative Schema - Brain's Reference Structure
 * 
 * Clean, modular narrative structure for consistent, QNCE-integrated storytelling.
 * Follows Brain's original schema design for maximum clarity and reusability.
 */

export interface NarrativeSegment {
  segmentId: string; // Changed from id for clarity
  title: string;
  description: string;
  startNodeId: string; // Added startNodeId
  exitPoints: string[]; // Added exitPoints for segment routing
  parentId?: string; // Optional parent segment for organization
  nodes: NarrativeNode[];
  initialFlags: Record<string, boolean | number | string>;
  initialVariables: QNCEVariables;
  globalFlagDecay?: number; // Simplified decay rate
}

export interface NarrativeNode {
  nodeId: string;
  text: string;
  dynTextFunction?: (variables: QNCEVariables) => string;
  textAfter?: (variables: QNCEVariables) => string;
  choices?: Choice[];
  flagConditions?: FlagCondition[];
  assetPlaceholders?: {
    visualCue?: string;
    audioCue?: string;
    hapticCue?: string;
  };
  feedbackHook?: FeedbackHook;
}

export interface Choice {
  choiceText: string;
  nextNodeId: string;
  nextSegmentId?: string; // For hopping between narrative segments
  flagUpdates?: FlagUpdate[];
  conditions?: FlagCondition[];
  feedbackHook?: (context: { nodeId: string; choiceText: string; nextNodeId: string; currentFlags: Record<string, any>; currentVariables: QNCEVariables; timestamp: number }) => void;
}

export interface FlagCondition {
  flag: string;
  operator: '>' | '<' | '>=' | '<=' | '===' | '!==';
  value: number | boolean;
}

export interface FlagUpdate {
  flag: string;
  operation: 'set' | 'increment' | 'decrement';
  value: number | boolean;
}

export interface FeedbackHook {
  milestone: 'story_completion' | 'branch_completion' | 'deep_engagement';
  delay: number; // Delay before feedback prompt in milliseconds
}

export interface QNCEVariables {
  [key: string]: number | string | boolean;
}

/**
 * Utility functions for working with the narrative schema
 */

export function interpolateText(template: string, variables: QNCEVariables): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

export function checkConditions(conditions: FlagCondition[], variables: QNCEVariables): boolean {
  return conditions.every(condition => {
    const value = variables[condition.flag];
    switch (condition.operator) {
      case '>': return (value as number) > (condition.value as number);
      case '<': return (value as number) < (condition.value as number);
      case '>=': return (value as number) >= (condition.value as number);
      case '<=': return (value as number) <= (condition.value as number);
      case '===': return value === condition.value;
      case '!==': return value !== condition.value;
      default: return false;
    }
  });
}
