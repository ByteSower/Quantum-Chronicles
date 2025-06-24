/**
 * QNCE Narrative Types - Shared interface definitions for modular narratives
 */

// Import feedback hook functions from analytics
import { FEEDBACK_HOOKS as ANALYTICS_FEEDBACK_HOOKS } from '../utils/analytics';

export interface Choice {
  text: string;
  nextNodeId: string;
  flagEffects?: Record<string, boolean | number | string>;
  variableEffects?: {
    curiosity?: number;
    coherence?: number;
    disruption?: number;
    synchrony?: number;
  };
  requirements?: {
    flags?: Record<string, boolean | number | string>;
    variables?: {
      curiosity?: { min?: number; max?: number };
      coherence?: { min?: number; max?: number };
      disruption?: { min?: number; max?: number };
      synchrony?: { min?: number; max?: number };
    };
  };
  unlocks?: string[];
  consequences?: {
    immediate?: string;
    delayed?: { nodeId: string; message: string }[];
  };
  // Beta testing features
  feedbackHook?: (data: Record<string, unknown>) => void; // Function for feedback collection at this choice point
  assetPlaceholder?: {
    visual?: string; // Placeholder for future visual assets
    audio?: string; // Placeholder for future audio assets
  };
}

export interface NarrativeNode {
  id: string;
  text: string;
  choices: Choice[];
  metadata?: {
    segment: string;
    themes: string[];
    quantumDynamics?: {
      superposition?: boolean;
      entanglement?: string[];
      collapse?: boolean;
    };
  };
  // QNCE dynamic content support
  dynamicText?: {
    template: string; // Text template with {{variableName}} placeholders
    variables: string[]; // List of variable names used in template
  };
  // Beta testing features
  feedbackPrompt?: string; // Optional feedback prompt for this node
  assetPlaceholder?: {
    visual?: string; // Placeholder for future visual assets
    audio?: string; // Placeholder for future audio assets
    music?: string; // Placeholder for future background music
  };
}

export interface NarrativeSegment {
  id: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: NarrativeNode[];
  metadata: {
    version: string;
    dynamicVariables: string[];
    feedbackHooks: (string | ((data: Record<string, unknown>) => void))[];
    placeholderAssets: string[];
  };
  // Access control
  entryPoints?: string[]; // Node IDs that can lead into this segment
  exitPoints?: string[]; // Node IDs that lead out of this segment
  requiredFlags?: Record<string, boolean | number | string>;
  requiredVariables?: {
    curiosity?: { min?: number; max?: number };
    coherence?: { min?: number; max?: number };
    disruption?: { min?: number; max?: number };
    synchrony?: { min?: number; max?: number };
  };
}

export interface SessionState {
  segmentId: string;
  nodeId: string;
  flags: Record<string, boolean | number | string>;
  variables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
  sessionId: string;
  timestamp: number;
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
 * Utility function to validate if a narrative segment can be accessed
 */
export function canAccessSegment(
  segment: NarrativeSegment,
  flags: Record<string, boolean | number | string>,
  variables: { curiosity: number; coherence: number; disruption: number; synchrony: number }
): boolean {
  // Check flag requirements
  if (segment.requiredFlags) {
    for (const [flagName, requiredValue] of Object.entries(segment.requiredFlags)) {
      if (flags[flagName] !== requiredValue) {
        return false;
      }
    }
  }

  // Check variable requirements
  if (segment.requiredVariables) {
    for (const [varName, requirements] of Object.entries(segment.requiredVariables)) {
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
