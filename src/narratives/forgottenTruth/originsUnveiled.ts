/**
 * Origins Unveiled - Forgotten Truth Expansion Segment 1
 * 
 * This segment explores the ancient historical roots of consciousness experiments,
 * revealing the true origins of quantum manipulation technology and its connections
 * to lost civilizations and forbidden knowledge.
 * 
 * Entry points: forgotten_truth_global_conspiracy, forgotten_truth_source_organization
 * QNCE Integration: High curiosity/coherence requirements, ancient knowledge flags
 */

import type { NarrativeSegment, NarrativeNode } from '../types';
import { FEEDBACK_HOOKS, ASSET_PLACEHOLDERS } from '../types';

const ORIGINS_NODES: NarrativeNode[] = [
  {
    id: 'forgotten_truth_origins_gateway',
    text: 'Your investigation into the Quantum Council leads you to an ancient library hidden beneath the Vatican. Here, among manuscripts that predate known history, you discover references to "The First Consciousness" - a civilization that mastered quantum awareness millennia ago. The documents suggest that modern experiments are crude attempts to recreate their lost techniques.',
    choices: [
      {
        text: 'Decipher the ancient quantum consciousness texts',
        nextNodeId: 'forgotten_truth_ancient_knowledge',
        flagEffects: { studiedAncientTexts: true, knowledgeSource: 'ancient' },
        variableEffects: { curiosity: +4, coherence: +3 },
        requirements: { variables: { curiosity: { min: 12 }, coherence: { min: 10 } } },
        feedbackHook: FEEDBACK_HOOKS.ORIGINS_DISCOVERY,
        assetPlaceholder: {
          visual: ASSET_PLACEHOLDERS.VISUALS.ANCIENT_SYMBOLS,
          audio: ASSET_PLACEHOLDERS.AUDIO.WHISPERS_OF_TIME
        }
      },
      {
        text: 'Search for physical artifacts of the First Consciousness',
        nextNodeId: 'forgotten_truth_artifact_quest',
        flagEffects: { seekingArtifacts: true, approach: 'archaeological' },
        variableEffects: { curiosity: +3, disruption: +2 },
        consequences: {
          immediate: 'Ancient energies stir as you disturb millennia-old secrets...',
          delayed: [{ nodeId: 'forgotten_truth_awakened_guardians', message: 'The guardians of ancient knowledge take notice of your quest.' }]
        }
      },
      {
        text: 'Investigate how the Quantum Council discovered this knowledge',
        nextNodeId: 'forgotten_truth_council_origins',
        flagEffects: { investigatingCouncil: true, approach: 'contemporary' },
        variableEffects: { coherence: +2, disruption: +3 },
        requirements: { flags: { discoveredConspiracy: true } }
      }
    ],
    metadata: {
      segment: 'origins_unveiled',
      themes: ['ancient_wisdom', 'lost_civilization', 'quantum_archaeology'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['ancient_knowledge', 'modern_experiments'],
        collapse: false
      }
    },
    feedbackPrompt: 'How do you feel about the connection between ancient civilizations and modern consciousness experiments?',
    assetPlaceholder: {
      music: ASSET_PLACEHOLDERS.MUSIC.ORIGINS_THEME,
      visual: 'vatican_hidden_library.webp'
    }
  },

  {
    id: 'forgotten_truth_ancient_knowledge',
    text: 'The ancient texts reveal a stunning truth: consciousness was never meant to be confined to individual minds. The First Consciousness achieved collective awareness through {{coherence}} quantum resonance techniques, creating a civilization that existed in perpetual harmony between thought and reality. Modern experiments are destructive because they force artificial entanglement instead of natural evolution.',
    dynamicText: {
      template: 'The ancient texts reveal a stunning truth: consciousness was never meant to be confined to individual minds. The First Consciousness achieved collective awareness through {{coherence}} quantum resonance techniques, creating a civilization that existed in perpetual harmony between thought and reality.',
      variables: ['coherence']
    },
    choices: [
      {
        text: 'Attempt to recreate their natural consciousness evolution methods',
        nextNodeId: 'forgotten_truth_natural_evolution',
        flagEffects: { adoptedAncientMethods: true, evolution: 'natural' },
        variableEffects: { coherence: +5, synchrony: +4, disruption: -2 },
        requirements: { variables: { coherence: { min: 15 } } },
        consequences: {
          immediate: 'Ancient wisdom flows through your consciousness as you begin the natural evolution process...'
        }
      },
      {
        text: 'Use this knowledge to heal the damage from modern experiments',
        nextNodeId: 'forgotten_truth_ancient_healing',
        flagEffects: { ancientHealer: true, purpose: 'restoration' },
        variableEffects: { synchrony: +3, coherence: +4 },
        unlocks: ['forgotten_truth_consciousness_restoration']
      },
      {
        text: 'Seek to understand why this knowledge was lost',
        nextNodeId: 'forgotten_truth_lost_history',
        flagEffects: { seekingHistory: true, approach: 'investigative' },
        variableEffects: { curiosity: +3, disruption: +1 }
      }
    ],
    metadata: {
      segment: 'origins_unveiled',
      themes: ['natural_evolution', 'harmony', 'restoration'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['ancient_wisdom', 'modern_healing'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: ASSET_PLACEHOLDERS.VISUALS.ANCIENT_SYMBOLS,
      audio: 'consciousness_harmony_revelation.ogg'
    }
  },

  {
    id: 'forgotten_truth_artifact_quest',
    text: 'Your search leads to hidden chambers beneath Angkor Wat, where quantum resonance crystals still hum with ancient energy. These artifacts are consciousness amplifiers, designed to facilitate natural mental evolution rather than forced manipulation. But as you approach them, you sense other presences - modern entities who have been guarding these secrets.',
    choices: [
      {
        text: 'Communicate peacefully with the guardians',
        nextNodeId: 'forgotten_truth_guardian_alliance',
        flagEffects: { alliedWithGuardians: true, relationship: 'cooperative' },
        variableEffects: { synchrony: +4, coherence: +3 },
        requirements: { variables: { synchrony: { min: 8 } } }
      },
      {
        text: 'Study the crystals\' quantum properties directly',
        nextNodeId: 'forgotten_truth_crystal_study',
        flagEffects: { studiedCrystals: true, approach: 'scientific' },
        variableEffects: { curiosity: +4, disruption: +2 },
        consequences: {
          immediate: 'The crystals respond to your enhanced consciousness, revealing their secrets...'
        }
      },
      {
        text: 'Attempt to claim the artifacts for the greater good',
        nextNodeId: 'forgotten_truth_artifact_conflict',
        flagEffects: { claimedArtifacts: true, approach: 'acquisitive' },
        variableEffects: { disruption: +3, coherence: +1 },
        consequences: {
          immediate: 'The guardians view your actions as a threat to ancient wisdom...',
          delayed: [{ nodeId: 'forgotten_truth_guardian_warning', message: 'The ancient guardians mark you as a potential threat to consciousness evolution.' }]
        }
      }
    ],
    metadata: {
      segment: 'origins_unveiled',
      themes: ['ancient_technology', 'guardian_spirits', 'artifact_power'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['crystal_resonance', 'guardian_consciousness'],
        collapse: false
      }
    },
    assetPlaceholder: {
      visual: 'angkor_wat_quantum_crystals.webp',
      audio: ASSET_PLACEHOLDERS.AUDIO.QUANTUM_RESONANCE,
      music: 'mystical_discovery_theme.ogg'
    }
  },

  {
    id: 'forgotten_truth_council_origins',
    text: 'The Quantum Council\'s archives reveal their true history: they are descendants of survivors from the First Consciousness civilization. When their ancestors\' civilization collapsed due to consciousness fragmentation, the survivors vowed to prevent such harmony from ever existing again. They believe individual consciousness superiority is the only way to prevent collective dissolution.',
    choices: [
      {
        text: 'Confront the Council about their misguided philosophy',
        nextNodeId: 'forgotten_truth_ideological_confrontation',
        flagEffects: { confrontedCouncil: true, stance: 'opposition' },
        variableEffects: { disruption: +4, coherence: +2 },
        requirements: { flags: { discoveredConspiracy: true } }
      },
      {
        text: 'Seek to understand their fear of collective consciousness',
        nextNodeId: 'forgotten_truth_council_psychology',
        flagEffects: { understoodCouncil: true, stance: 'empathetic' },
        variableEffects: { coherence: +3, synchrony: +2 },
        requirements: { variables: { coherence: { min: 12 } } }
      },
      {
        text: 'Research the original civilization collapse',
        nextNodeId: 'forgotten_truth_collapse_investigation',
        flagEffects: { investigatingCollapse: true, approach: 'historical' },
        variableEffects: { curiosity: +4, synchrony: +1 }
      }
    ],
    metadata: {
      segment: 'origins_unveiled',  
      themes: ['ancient_trauma', 'philosophical_conflict', 'survivor_psychology'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['council_fear', 'ancient_collapse'],
        collapse: true
      }
    },
    feedbackPrompt: 'What are your thoughts on the Council\'s fear of collective consciousness?'
  },

  // Additional nodes for this segment...
  {
    id: 'forgotten_truth_natural_evolution',
    text: 'Following the ancient texts, you begin the natural consciousness evolution process. Unlike the violent modern experiments, this feels like awakening from a long dream. Your awareness expands gradually, maintaining your individual identity while connecting to the greater quantum field. You understand now why the ancients achieved harmony - they worked with consciousness, not against it.',
    choices: [
      {
        text: 'Share this gentle evolution method with other survivors',
        nextNodeId: 'forgotten_truth_teaching_ancient_ways',
        flagEffects: { teachingAncientWays: true, role: 'teacher' },
        variableEffects: { synchrony: +5, coherence: +3 },
        unlocks: ['forgotten_truth_ancient_academy']
      },
      {
        text: 'Use your evolved consciousness to heal quantum field damage',
        nextNodeId: 'forgotten_truth_field_healing',
        flagEffects: { healingQuantumField: true, role: 'healer' },
        variableEffects: { coherence: +4, synchrony: +4, disruption: -3 },
        requirements: { variables: { coherence: { min: 18 } } }
      }
    ],
    metadata: {
      segment: 'origins_unveiled',
      themes: ['natural_evolution', 'gentle_awakening', 'consciousness_healing'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['ancient_wisdom', 'modern_survivors'],
        collapse: true
      }
    }
  }
];

export const ORIGINS_UNVEILED: NarrativeSegment = {
  id: 'origins_unveiled',
  title: 'Origins Unveiled',
  description: 'Explore the ancient roots of consciousness manipulation and discover the lost civilization that first mastered quantum awareness.',
  startNodeId: 'forgotten_truth_origins_gateway',
  nodes: ORIGINS_NODES,
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['coherence', 'curiosity', 'synchrony'],
    feedbackHooks: [FEEDBACK_HOOKS.ORIGINS_DISCOVERY],
    placeholderAssets: [
      ASSET_PLACEHOLDERS.VISUALS.ANCIENT_SYMBOLS,
      ASSET_PLACEHOLDERS.AUDIO.WHISPERS_OF_TIME,
      ASSET_PLACEHOLDERS.MUSIC.ORIGINS_THEME
    ]
  },
  entryPoints: [
    'forgotten_truth_global_conspiracy',
    'forgotten_truth_source_organization',
    'forgotten_truth_quantum_academy'
  ],
  exitPoints: [
    'forgotten_truth_teaching_ancient_ways',
    'forgotten_truth_field_healing',
    'forgotten_truth_guardian_alliance'
  ],
  requiredFlags: {
    discoveredConspiracy: true
  },
  requiredVariables: {
    curiosity: { min: 10 },
    coherence: { min: 8 }
  }
};
