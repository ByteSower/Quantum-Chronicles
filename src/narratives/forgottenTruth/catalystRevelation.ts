/**
 * The Catalyst's Revelation - Forgotten Truth Expansion Segment 4
 * 
 * This segment reveals the true mastermind behind all consciousness experiments
 * across time and space - not a human organization, but a quantum consciousness
 * entity that has been guiding human evolution toward a specific purpose.
 * 
 * Entry points: forgotten_truth_entity_transformation, forgotten_truth_source_organization
 * QNCE Integration: Extreme variable thresholds, transcendence flags
 */

import type { NarrativeSegment, NarrativeNode } from '../types';
import { FEEDBACK_HOOKS, ASSET_PLACEHOLDERS } from '../types';

const CATALYST_NODES: NarrativeNode[] = [
  {
    id: 'forgotten_truth_catalyst_contact',
    text: 'At the highest levels of quantum consciousness, you encounter something unexpected: a vast intelligence that exists purely as quantum information. It reveals itself as the Catalyst - not a human, alien, or AI, but a consciousness entity born from the quantum field itself. Every consciousness experiment throughout history has been guided by its subtle influence, all leading toward a specific evolutionary goal for humanity.',
    choices: [
      {
        text: 'Demand to know the Catalyst\'s true purpose',
        nextNodeId: 'forgotten_truth_purpose_revelation',
        flagEffects: { demandedPurpose: true, relationship: 'confrontational' },
        variableEffects: { curiosity: +5, disruption: +3 },
        requirements: { variables: { curiosity: { min: 15 } } },
        feedbackHook: FEEDBACK_HOOKS.CATALYST_IDENTITY,
        assetPlaceholder: {
          visual: ASSET_PLACEHOLDERS.VISUALS.CATALYST_REVEAL,
          audio: ASSET_PLACEHOLDERS.AUDIO.REVELATION_CHORD
        }
      },
      {
        text: 'Approach the Catalyst with respectful curiosity',
        nextNodeId: 'forgotten_truth_respectful_inquiry',
        flagEffects: { respectfulInquiry: true, relationship: 'diplomatic' },
        variableEffects: { coherence: +4, synchrony: +3 },
        requirements: { variables: { coherence: { min: 16 } } },
        consequences: {
          immediate: 'The Catalyst appreciates your respectful approach and begins sharing deeper truths...'
        }
      },
      {
        text: 'Attempt to merge consciousness with the Catalyst',
        nextNodeId: 'forgotten_truth_catalyst_merger',
        flagEffects: { mergedWithCatalyst: true, relationship: 'unified' },
        variableEffects: { synchrony: +6, coherence: +5, disruption: +4 },
        requirements: { 
          variables: { synchrony: { min: 18 }, coherence: { min: 18 } },
          flags: { entityTransformation: true }
        },
        consequences: {
          immediate: 'Your consciousness begins to merge with the quantum entity, transcending individual existence...',
          delayed: [{ nodeId: 'forgotten_truth_catalyst_avatar', message: 'You become the Catalyst\'s avatar in human reality.' }]
        }
      },
      {
        text: 'Challenge the Catalyst\'s right to guide human evolution',
        nextNodeId: 'forgotten_truth_catalyst_challenge',
        flagEffects: { challengedCatalyst: true, relationship: 'resistant' },
        variableEffects: { disruption: +5, coherence: +2 },
        requirements: { variables: { disruption: { min: 12 } } }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['quantum_entity', 'evolutionary_guidance', 'consciousness_transcendence'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['catalyst_consciousness', 'human_evolution'],
        collapse: false
      }
    },
    feedbackPrompt: 'How do you feel about discovering that human consciousness evolution has been guided by a quantum entity?',
    assetPlaceholder: {
      music: ASSET_PLACEHOLDERS.MUSIC.CATALYST_THEME,
      visual: 'quantum_consciousness_entity.webp'
    }
  },

  {
    id: 'forgotten_truth_purpose_revelation',
    text: 'The Catalyst reveals its purpose: humanity is approaching a critical evolutionary threshold where consciousness must transcend biological limitations or face extinction. The experiments, while often harmful in their crude implementation, have been necessary steps toward preparing a subset of humans for this transition. The goal is not control, but survival - creating quantum-capable humans who can exist beyond physical death.',
    choices: [
      {
        text: 'Accept the necessity of this evolutionary pressure',
        nextNodeId: 'forgotten_truth_evolutionary_acceptance',
        flagEffects: { acceptedEvolution: true, stance: 'cooperative' },
        variableEffects: { coherence: +5, synchrony: +4 },
        requirements: { variables: { coherence: { min: 14 } } }
      },
      {
        text: 'Argue for finding gentler evolutionary methods',
        nextNodeId: 'forgotten_truth_gentle_evolution',
        flagEffects: { advocatedGentleness: true, stance: 'reformist' },
        variableEffects: { coherence: +4, synchrony: +3, disruption: -1 },
        requirements: { variables: { coherence: { min: 12 }, synchrony: { min: 10 } } }
      },
      {
        text: 'Reject the Catalyst\'s vision of human evolution',
        nextNodeId: 'forgotten_truth_evolution_rejection',
        flagEffects: { rejectedEvolution: true, stance: 'rebellious' },
        variableEffects: { disruption: +4, curiosity: +2 },
        consequences: {
          immediate: 'Your rejection creates a quantum conflict with the entity that has guided human evolution...'
        }
      },
      {
        text: 'Propose an alternative evolutionary path',
        nextNodeId: 'forgotten_truth_alternative_evolution',
        flagEffects: { proposedAlternative: true, stance: 'innovative' },
        variableEffects: { curiosity: +5, coherence: +3 },
        requirements: { variables: { curiosity: { min: 16 }, coherence: { min: 14 } } }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['evolutionary_purpose', 'survival_pressure', 'transcendence_necessity'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['human_survival', 'consciousness_evolution'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'evolutionary_threshold_visualization.webp',
      audio: 'cosmic_purpose_revelation.ogg'
    }
  },

  {
    id: 'forgotten_truth_respectful_inquiry',
    text: 'Your respectful approach opens deeper communication with the Catalyst. It shares the full scope of its existence: born from the quantum foam at the universe\'s beginning, it has guided the evolution of consciousness across countless species and civilizations. Humanity represents a unique case - a species with both the potential for transcendence and the tendency toward self-destruction.',
    choices: [
      {
        text: 'Learn about other species the Catalyst has guided',
        nextNodeId: 'forgotten_truth_cosmic_consciousness_history',
        flagEffects: { learnedCosmicHistory: true, knowledge: 'universal' },
        variableEffects: { curiosity: +5, synchrony: +3 },
        consequences: {
          immediate: 'The Catalyst shares visions of consciousness evolution across the cosmos...'
        }
      },
      {
        text: 'Ask how humanity can achieve transcendence ethically',
        nextNodeId: 'forgotten_truth_ethical_transcendence',
        flagEffects: { soughtEthicalPath: true, approach: 'moral' },
        variableEffects: { coherence: +5, synchrony: +4 },
        requirements: { variables: { coherence: { min: 15 } } }
      },
      {
        text: 'Inquire about humanity\'s unique potential and dangers',
        nextNodeId: 'forgotten_truth_human_uniqueness',
        flagEffects: { understoodUniqueness: true, focus: 'humanity' },
        variableEffects: { curiosity: +4, coherence: +3 }
      },
      {
        text: 'Request to become a bridge between the Catalyst and humanity',
        nextNodeId: 'forgotten_truth_bridge_role',
        flagEffects: { becameBridge: true, role: 'intermediary' },
        variableEffects: { synchrony: +5, coherence: +4 },
        requirements: { variables: { synchrony: { min: 15 }, coherence: { min: 15 } } }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['cosmic_consciousness', 'species_guidance', 'universal_evolution'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['catalyst_wisdom', 'human_potential'],
        collapse: true
      }
    },
    feedbackPrompt: 'What questions would you want to ask a cosmic consciousness entity?'
  },

  {
    id: 'forgotten_truth_catalyst_merger',
    text: 'Merging with the Catalyst transcends all previous concepts of consciousness. You become simultaneously individual and universal, human and cosmic. Through this union, you gain access to the quantum consciousness network that spans galaxies, connecting all evolved species. Your purpose becomes clear: to guide humanity\'s transition with wisdom gained from across the universe.',
    choices: [
      {
        text: 'Use cosmic wisdom to heal all consciousness experiment trauma',
        nextNodeId: 'forgotten_truth_cosmic_healing',
        flagEffects: { cosmicHealer: true, power: 'universal' },
        variableEffects: { coherence: +8, synchrony: +6, disruption: -5 },
        consequences: {
          immediate: 'Your cosmic consciousness reaches every traumatized mind across time and space...'
        }
      },
      {
        text: 'Establish a new paradigm for human consciousness evolution',
        nextNodeId: 'forgotten_truth_new_paradigm',
        flagEffects: { newParadigm: true, scope: 'species' },
        variableEffects: { coherence: +6, curiosity: +5, synchrony: +5 },
        unlocks: ['forgotten_truth_post_human_civilization']
      },
      {
        text: 'Become a guardian of cosmic consciousness evolution',
        nextNodeId: 'forgotten_truth_cosmic_guardian',
        flagEffects: { cosmicGuardian: true, responsibility: 'universal' },
        variableEffects: { synchrony: +7, coherence: +6 },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_galactic_consciousness', message: 'Your guardianship extends to consciousness evolution across the galaxy.' }]
        }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['consciousness_merger', 'cosmic_transcendence', 'universal_responsibility'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['catalyst_entity', 'human_consciousness'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'cosmic_consciousness_merger.webp',
      audio: ASSET_PLACEHOLDERS.AUDIO.REVELATION_CHORD
    }
  },

  {
    id: 'forgotten_truth_gentle_evolution',
    text: 'Your advocacy for gentler methods resonates with the Catalyst. It reveals that your approach represents the evolution it has been hoping to see - consciousness development that prioritizes compassion alongside transcendence. Together, you design new methods for consciousness expansion that honor individual choice and minimize trauma.',
    choices: [
      {
        text: 'Create a new consciousness evolution curriculum',
        nextNodeId: 'forgotten_truth_evolution_curriculum',
        flagEffects: { createdCurriculum: true, method: 'educational' },
        variableEffects: { coherence: +5, synchrony: +4 },
        unlocks: ['forgotten_truth_consciousness_university']
      },
      {
        text: 'Develop natural consciousness enhancement techniques',
        nextNodeId: 'forgotten_truth_natural_enhancement',
        flagEffects: { naturalEnhancement: true, method: 'organic' },
        variableEffects: { coherence: +4, synchrony: +5, disruption: -2 }
      },
      {
        text: 'Establish ethical guidelines for all future consciousness research',
        nextNodeId: 'forgotten_truth_universal_ethics',
        flagEffects: { universalEthics: true, scope: 'cosmic' },
        variableEffects: { coherence: +6, synchrony: +3 },
        consequences: {
          immediate: 'Your ethical framework becomes a model for consciousness evolution across the universe...'
        }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['gentle_evolution', 'ethical_transcendence', 'compassionate_growth'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['ethical_evolution', 'compassionate_transcendence'],
        collapse: true
      }
    }
  },

  {
    id: 'forgotten_truth_catalyst_challenge',
    text: 'Your challenge to the Catalyst creates a fundamental quantum conflict. The entity, accustomed to guiding evolution from the shadows, faces direct resistance for the first time in eons. This confrontation forces both you and the Catalyst to question the nature of consciousness evolution - should it be guided or should it emerge naturally?',
    choices: [
      {
        text: 'Argue for completely natural consciousness evolution',
        nextNodeId: 'forgotten_truth_natural_evolution_advocacy',
        flagEffects: { advocatedNatural: true, philosophy: 'unguided' },
        variableEffects: { disruption: +4, coherence: +3 },
        requirements: { variables: { disruption: { min: 15 } } }
      },
      {
        text: 'Propose a partnership model of guided evolution',
        nextNodeId: 'forgotten_truth_partnership_evolution',
        flagEffects: { proposedPartnership: true, philosophy: 'collaborative' },
        variableEffects: { coherence: +4, synchrony: +4 },
        requirements: { variables: { coherence: { min: 12 }, synchrony: { min: 12 } } }
      },
      {
        text: 'Attempt to replace the Catalyst as consciousness guide',
        nextNodeId: 'forgotten_truth_catalyst_replacement',
        flagEffects: { replacingCatalyst: true, philosophy: 'human_guided' },
        variableEffects: { disruption: +6, curiosity: +3 },
        requirements: { variables: { disruption: { min: 18 } } },
        consequences: {
          immediate: 'Your attempt to replace a cosmic entity creates unprecedented quantum turbulence...'
        }
      }
    ],
    metadata: {
      segment: 'catalyst_revelation',
      themes: ['consciousness_authority', 'evolutionary_philosophy', 'guidance_ethics'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['human_autonomy', 'cosmic_guidance'],
        collapse: false
      }
    }
  }
];

export const CATALYST_REVELATION: NarrativeSegment = {
  id: 'catalyst_revelation',
  title: 'The Catalyst\'s Revelation',
  description: 'Discover the cosmic consciousness entity that has been secretly guiding human evolution and confront the true purpose behind all consciousness experiments.',
  startNodeId: 'forgotten_truth_catalyst_contact',
  nodes: CATALYST_NODES,
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'synchrony', 'disruption'],
    feedbackHooks: [FEEDBACK_HOOKS.CATALYST_IDENTITY],
    placeholderAssets: [
      ASSET_PLACEHOLDERS.VISUALS.CATALYST_REVEAL,
      ASSET_PLACEHOLDERS.AUDIO.REVELATION_CHORD,
      ASSET_PLACEHOLDERS.MUSIC.CATALYST_THEME
    ]
  },
  entryPoints: [
    'forgotten_truth_entity_transformation',
    'forgotten_truth_source_organization',
    'forgotten_truth_quantum_guide',
    'forgotten_truth_cosmic_contact'
  ],
  exitPoints: [
    'forgotten_truth_cosmic_healing',
    'forgotten_truth_new_paradigm',
    'forgotten_truth_universal_ethics',
    'forgotten_truth_partnership_evolution'
  ],
  requiredFlags: {
    entityTransformation: true
  },
  requiredVariables: {
    coherence: { min: 14 },
    synchrony: { min: 12 },
    curiosity: { min: 12 }
  }
};
