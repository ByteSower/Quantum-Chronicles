/**
 * Forgotten Truth Narrative Expansion - Complete Collection
 * 
 * This module exports all five expansion segments for the Forgotten Truth narrative:
 * 1. Origins Unveiled - Ancient roots of consciousness experiments
 * 2. Echoes of Quantum Memory - Memory fragments across time
 * 3. The Convergence of Realms - Multidimensional consciousness
 * 4. The Catalyst's Revelation - The cosmic consciousness entity
 * 5. Legacy of Quantum Convergence - Future consequences and impact
 * 
 * These segments are designed to be modular, QNCE-integrated extensions
 * that deepen and expand the existing Forgotten Truth storyline.
 */

export { ORIGINS_UNVEILED } from './originsUnveiled';
export { MEMORY_ECHOES } from './memoryEchoes';
export { REALM_CONVERGENCE } from './realmConvergence';
export { CATALYST_REVELATION } from './catalystRevelation';
export { QUANTUM_LEGACY } from './quantumLegacy';

import { ORIGINS_UNVEILED } from './originsUnveiled';
import { MEMORY_ECHOES } from './memoryEchoes';
import { REALM_CONVERGENCE } from './realmConvergence';
import { CATALYST_REVELATION } from './catalystRevelation';
import { QUANTUM_LEGACY } from './quantumLegacy';

// Export all segments as a collection for easy integration
export const FORGOTTEN_TRUTH_EXPANSIONS = [
  ORIGINS_UNVEILED,
  MEMORY_ECHOES,
  REALM_CONVERGENCE,
  CATALYST_REVELATION,
  QUANTUM_LEGACY,
] as const;

/**
 * Get all narrative nodes from all expansion segments
 */
export function getAllExpansionNodes() {
  return FORGOTTEN_TRUTH_EXPANSIONS.flatMap(segment => segment.nodes);
}

/**
 * Get entry points for all expansion segments
 */
export function getAllEntryPoints() {
  return FORGOTTEN_TRUTH_EXPANSIONS.flatMap(segment => segment.entryPoints || []);
}

/**
 * Get all feedback hooks from expansion segments
 */
export function getAllFeedbackHooks() {
  return FORGOTTEN_TRUTH_EXPANSIONS.flatMap(segment => segment.metadata.feedbackHooks);
}

/**
 * Get all asset placeholders from expansion segments
 */
export function getAllAssetPlaceholders() {
  return FORGOTTEN_TRUTH_EXPANSIONS.flatMap(segment => segment.metadata.placeholderAssets);
}

/**
 * Metadata about the complete expansion collection
 */
export const EXPANSION_METADATA = {
  version: '1.0.0',
  totalSegments: FORGOTTEN_TRUTH_EXPANSIONS.length,
  totalNodes: getAllExpansionNodes().length,
  totalEntryPoints: getAllEntryPoints().length,
  themes: [
    'ancient_wisdom',
    'quantum_memory',
    'dimensional_convergence', 
    'cosmic_consciousness',
    'future_legacy'
  ],
  dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony'],
  betaFeatures: {
    feedbackCollection: true,
    assetPlaceholders: true,
    dynamicTextInterpolation: true,
    sessionBasedProgression: true
  }
} as const;
