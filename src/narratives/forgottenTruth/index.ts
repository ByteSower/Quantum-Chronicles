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

import { forgottenTruth } from './forgottenTruth';
import type { NarrativeSegment } from '../types';

/**
 * A collection of all narrative segments available in the QNCE.
 * This is the primary export that the useQNCE hook will use to load narrative data.
 *
 * As of v1.2.0, all expansions are unified into the forgottenTruth segment.
 */
export const NARRATIVE_SEGMENTS: Record<string, NarrativeSegment> = {
  forgottenTruth,
};

export { forgottenTruth };
