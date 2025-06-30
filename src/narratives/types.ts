/**
 * QNCE Narrative Types - Shared interface definitions for modular narratives
 */

// Import feedback hook functions from analytics
import { FEEDBACK_HOOKS as ANALYTICS_FEEDBACK_HOOKS } from '../utils/analytics';

export type QNCEVariables = Record<string, number | boolean>;

export interface FlagUpdate {
  flag: string;
  operation: 'increment' | 'decrement' | 'set';
  value: number | boolean;
}

export interface VariableUpdate {
  variable: keyof QNCEVariables;
  operation: 'add' | 'subtract' | 'set';
  value: number;
}

export interface FlagCondition {
  flag: string;
  operator: '>' | '<' | '>=' | '<=' | '===' | '!==';
  value: number | boolean;
}

export interface FeedbackHook {
  milestone: 'branch_completion' | 'deep_engagement' | 'story_completion';
  delay: number;
}

export interface Choice {
  choiceText: string;
  nextNodeId: string; // namespaced ID like 'origins:ft_scanFragments'
  flagUpdates?: FlagUpdate[];
  variableUpdates?: VariableUpdate[];
  conditions?: FlagCondition[];
}

export interface NarrativeNode {
  nodeId: string;
  text?: string;
  dynTextFunction?: (vars: QNCEVariables) => string;
  textAfter?: (vars: QNCEVariables) => string;
  assetPlaceholders?: {
    visualCue?: string;
    audioCue?: string;
    hapticCue?: string;
  };
  choices?: Choice[];
  feedbackHook?: FeedbackHook;
}

export interface NarrativeSegment {
  segmentId: string;
  title: string;
  description: string;
  startNodeId: string;
  exitPoints: string[];
  initialFlags: Record<string, number | boolean>;
  initialVariables: Record<string, any>;
  globalFlagDecay: number;
  nodes: NarrativeNode[];
}

/**
 * Story and Chapter metadata for navigation UI
 */
export interface ChapterMeta {
  chapterId: string;
  title: string;
  unlocked: boolean;
  completed: boolean;
}

export interface StoryMeta {
  storyId: string;
  title: string;
  description: string;
  thumbnail: string;
  chapters: ChapterMeta[];
}

/**
 * Utility function to replace dynamic variables in text templates
 * Example: "Your {{variableName}} is {{value}}" with variables {variableName: "curiosity", value: 15}
 */
export function interpolateText(
  template: string, 
  variables: Record<string, any>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    return variables[varName] !== undefined ? String(variables[varName]) : match;
  });
}

/**
 * Beta testing feedback collection points
 */
export const FEEDBACK_HOOKS = ANALYTICS_FEEDBACK_HOOKS;

/**
 * Asset placeholder categories for future development
 */
export const ASSET_PLACEHOLDERS = {
  VISUALS: {
    ANCIENT_SYMBOLS: 'ancient_quantum_symbols.webp',
    MEMORY_FRAGMENTS: 'floating_memory_fragments.webp',
    DIMENSIONAL_PORTAL: 'swirling_dimensional_portal.webp',
    CATALYST_REVEAL: 'mysterious_catalyst_figure.webp',
    FUTURE_LEGACY: 'quantum_enhanced_civilization.webp',
  },
  AUDIO: {
    WHISPERS_OF_TIME: 'whispers_of_ancient_time.ogg',
    QUANTUM_RESONANCE: 'quantum_field_resonance.ogg',
    DIMENSIONAL_SHIFT: 'reality_fabric_shifting.ogg',
    REVELATION_CHORD: 'truth_revelation_chord.ogg',
    LEGACY_HARMONY: 'quantum_consciousness_harmony.ogg',
  },
  MUSIC: {
    ORIGINS_THEME: 'deep_time_exploration_theme.ogg',
    MEMORY_ECHO_THEME: 'fragmented_memory_melody.ogg',
    CONVERGENCE_THEME: 'dimensional_convergence_symphony.ogg',
    CATALYST_THEME: 'mysterious_orchestration.ogg',
    LEGACY_THEME: 'transcendent_future_anthem.ogg',
  }
} as const;
