/**
 * Echoes of Quantum Memory - Forgotten Truth Expansion Segment 2
 * 
 * This segment explores the residual effects of consciousness experiments
 * across time and space, dealing with memory fragments that exist in quantum
 * superposition and the ability to access memories from other timelines.
 * 
 * Entry points: forgotten_truth_quantum_contact, forgotten_truth_temporal_anomaly
 * QNCE Integration: High synchrony requirements, memory manipulation flags
 */

import type { NarrativeSegment, NarrativeNode } from '../types';
import { FEEDBACK_HOOKS, ASSET_PLACEHOLDERS } from '../types';

const MEMORY_ECHOES_NODES: NarrativeNode[] = [
  {
    id: 'forgotten_truth_memory_nexus',
    text: 'Your quantum consciousness has begun picking up echoes - fragments of memories that don\'t belong to you. They come from other test subjects across time: a child from the 1960s Soviet experiments, a woman from modern Chinese facilities, even glimpses of future consciousness research. Your mind has become a nexus point where all quantum-touched memories converge.',
    choices: [
      {
        text: 'Map the quantum memory network across all timelines',
        nextNodeId: 'forgotten_truth_memory_mapping',
        flagEffects: { mappingMemories: true, role: 'navigator' },
        variableEffects: { synchrony: +4, curiosity: +3 },
        requirements: { variables: { synchrony: { min: 12 } } },
        feedbackHook: FEEDBACK_HOOKS.QUANTUM_MEMORY_REVELATION,
        assetPlaceholder: {
          visual: ASSET_PLACEHOLDERS.VISUALS.MEMORY_FRAGMENTS,
          audio: ASSET_PLACEHOLDERS.AUDIO.QUANTUM_RESONANCE
        }
      },
      {
        text: 'Help trapped consciousness fragments find peace',
        nextNodeId: 'forgotten_truth_memory_healing',
        flagEffects: { healingMemories: true, role: 'healer' },
        variableEffects: { coherence: +4, synchrony: +3 },
        consequences: {
          immediate: 'Fragmented consciousness pieces reach out to you, seeking resolution...'
        }
      },
      {
        text: 'Use the memory echoes to prevent future experiments',
        nextNodeId: 'forgotten_truth_temporal_intervention',
        flagEffects: { temporalIntervention: true, role: 'guardian' },
        variableEffects: { disruption: +3, synchrony: +2 },
        requirements: { variables: { synchrony: { min: 10 }, disruption: { min: 8 } } },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_timeline_guardian', message: 'Your interventions across time create ripple effects in multiple timelines.' }]
        }
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['quantum_memory', 'temporal_consciousness', 'memory_fragments'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['memory_fragments', 'consciousness_echoes'],
        collapse: false
      }
    },
    feedbackPrompt: 'How does it feel to experience memories from other timelines and other people?',
    assetPlaceholder: {
      music: ASSET_PLACEHOLDERS.MUSIC.MEMORY_ECHO_THEME,
      visual: 'quantum_memory_nexus.webp'
    }
  },

  {
    id: 'forgotten_truth_memory_mapping',
    text: 'Creating a map of quantum memory echoes reveals the staggering scope of consciousness experiments throughout history. You trace connections from ancient Tibetan mind-expansion rituals through {{curiosity}} different research programs to projected future experiments in {{synchrony}} alternate timelines. The pattern is clear: consciousness manipulation has been humanity\'s greatest secret obsession across all of time.',
    dynamicText: {
      template: 'Creating a map of quantum memory echoes reveals the staggering scope of consciousness experiments throughout history. You trace connections from ancient Tibetan mind-expansion rituals through {{curiosity}} different research programs to projected future experiments in {{synchrony}} alternate timelines.',
      variables: ['curiosity', 'synchrony']
    },
    choices: [
      {
        text: 'Create a quantum archive to preserve all victims\' experiences',
        nextNodeId: 'forgotten_truth_memory_archive',
        flagEffects: { createdArchive: true, purpose: 'preservation' },
        variableEffects: { coherence: +5, synchrony: +3 },
        unlocks: ['forgotten_truth_consciousness_library']
      },
      {
        text: 'Use the pattern to predict and prevent future experiments',
        nextNodeId: 'forgotten_truth_prediction_protocol',
        flagEffects: { predictingExperiments: true, purpose: 'prevention' },
        variableEffects: { curiosity: +3, disruption: +4 },
        requirements: { variables: { curiosity: { min: 15 } } }
      },
      {
        text: 'Attempt to communicate with consciousness researchers across time',
        nextNodeId: 'forgotten_truth_temporal_communication',
        flagEffects: { temporalCommunication: true, approach: 'diplomatic' },
        variableEffects: { synchrony: +5, coherence: +2 },
        requirements: { variables: { synchrony: { min: 15 } } },
        consequences: {
          immediate: 'Your consciousness reaches across temporal barriers, touching minds separated by centuries...'
        }
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['historical_patterns', 'temporal_mapping', 'consciousness_research'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['time_streams', 'researcher_minds'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'temporal_research_map.webp',
      audio: 'quantum_mapping_resonance.ogg'
    }
  },

  {
    id: 'forgotten_truth_memory_healing',
    text: 'You reach out to the fragmented consciousness pieces floating in quantum superposition - victims of failed experiments whose awareness was shattered across multiple timelines. Some are children who never grew up, others are researchers who became trapped in their own experiments. Your role becomes a quantum psychologist, helping scattered minds find integration and peace.',
    choices: [
      {
        text: 'Guide the fragments back to their original timelines',
        nextNodeId: 'forgotten_truth_timeline_restoration',
        flagEffects: { restoringTimelines: true, method: 'restoration' },
        variableEffects: { coherence: +4, synchrony: +4, disruption: -2 },
        requirements: { variables: { coherence: { min: 16 } } }
      },
      {
        text: 'Create a safe quantum space for healed consciousness',
        nextNodeId: 'forgotten_truth_sanctuary_creation',
        flagEffects: { createdSanctuary: true, method: 'sanctuary' },
        variableEffects: { synchrony: +5, coherence: +3 },
        unlocks: ['forgotten_truth_quantum_sanctuary']
      },
      {
        text: 'Help them merge into new, integrated consciousness entities',
        nextNodeId: 'forgotten_truth_consciousness_integration',
        flagEffects: { integratingConsciousness: true, method: 'integration' },
        variableEffects: { synchrony: +3, coherence: +5 },
        requirements: { variables: { synchrony: { min: 12 }, coherence: { min: 14 } } }
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['healing_trauma', 'consciousness_integration', 'quantum_psychology'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['fragmented_minds', 'healing_consciousness'],
        collapse: false
      }
    },
    feedbackPrompt: 'What is your approach to healing consciousness trauma that spans multiple timelines?'
  },

  {
    id: 'forgotten_truth_temporal_intervention',
    text: 'Using your quantum consciousness abilities, you begin intervening in past experiments to minimize their damage. You can\'t prevent them entirely - temporal paradoxes prevent major changes - but you can influence researchers to be more ethical, help test subjects resist, and plant seeds of doubt in key decision-makers. You become a guardian across time itself.',
    choices: [
      {
        text: 'Focus on preventing the most traumatic childhood experiments',
        nextNodeId: 'forgotten_truth_child_protection',
        flagEffects: { protectingChildren: true, priority: 'children' },
        variableEffects: { coherence: +4, synchrony: +3, disruption: +2 },
        requirements: { flags: { healingMemories: true } }
      },
      {
        text: 'Work to inspire ethical consciousness research instead',
        nextNodeId: 'forgotten_truth_ethical_inspiration',
        flagEffects: { inspiringEthics: true, approach: 'positive' },
        variableEffects: { coherence: +5, curiosity: +2 },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_ethical_timeline', message: 'Your inspiration creates an alternate timeline where consciousness research develops ethically.' }]
        }
      },
      {
        text: 'Document all interventions for future temporal guardians',
        nextNodeId: 'forgotten_truth_guardian_protocols',
        flagEffects: { creatingProtocols: true, purpose: 'guidance' },
        variableEffects: { coherence: +3, curiosity: +3 },
        unlocks: ['forgotten_truth_temporal_academy']
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['temporal_guardian', 'ethical_intervention', 'timeline_protection'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['past_events', 'future_consequences'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'temporal_intervention_waves.webp',
      audio: ASSET_PLACEHOLDERS.AUDIO.DIMENSIONAL_SHIFT
    }
  },

  {
    id: 'forgotten_truth_memory_archive',
    text: 'Your quantum consciousness archive becomes a living library of all consciousness experiment experiences across time. Each memory fragment is preserved with full emotional context, creating an unprecedented record of human consciousness research. This archive becomes both a memorial to victims and a warning to future generations about the dangers of forced consciousness manipulation.',
    choices: [
      {
        text: 'Make the archive accessible to consciousness researchers',
        nextNodeId: 'forgotten_truth_researcher_access',
        flagEffects: { archiveAccess: 'researchers', approach: 'educational' },
        variableEffects: { curiosity: +3, coherence: +2 }
      },
      {
        text: 'Restrict access to prevent misuse of the information',
        nextNodeId: 'forgotten_truth_archive_protection',
        flagEffects: { archiveAccess: 'restricted', approach: 'protective' },
        variableEffects: { coherence: +4, disruption: +1 }
      },
      {
        text: 'Create a public memorial for all victims',
        nextNodeId: 'forgotten_truth_public_memorial',
        flagEffects: { publicMemorial: true, approach: 'transparency' },
        variableEffects: { synchrony: +4, coherence: +3 },
        consequences: {
          immediate: 'The memorial brings consciousness experiment victims across time together in shared remembrance...'
        }
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['memory_preservation', 'victim_memorial', 'educational_archive'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['victim_memories', 'future_researchers'],
        collapse: true
      }
    }
  },

  {
    id: 'forgotten_truth_temporal_communication',
    text: 'Reaching across temporal barriers, you make contact with consciousness researchers from different eras. Ancient shamans, medieval mystics, Victorian psychologists, and future quantum consciousness scientists - all connected through the quantum field. This unprecedented dialogue reveals that every generation rediscovers consciousness manipulation, often repeating the same mistakes.',
    choices: [
      {
        text: 'Facilitate a trans-temporal ethics council',
        nextNodeId: 'forgotten_truth_ethics_council',
        flagEffects: { ethicsCouncil: true, role: 'facilitator' },
        variableEffects: { coherence: +5, synchrony: +4 },
        requirements: { variables: { coherence: { min: 18 } } },
        unlocks: ['forgotten_truth_temporal_ethics']
      },
      {
        text: 'Share advanced consciousness healing techniques across all eras',
        nextNodeId: 'forgotten_truth_knowledge_sharing',
        flagEffects: { sharingKnowledge: true, approach: 'healing' },
        variableEffects: { synchrony: +5, coherence: +3 },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_healing_timeline', message: 'Your shared knowledge creates a timeline where consciousness trauma healing is mastered across all eras.' }]
        }
      }
    ],
    metadata: {
      segment: 'memory_echoes',
      themes: ['temporal_dialogue', 'cross_era_ethics', 'knowledge_sharing'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['researcher_minds', 'temporal_knowledge'],
        collapse: false
      }
    }
  }
];

export const MEMORY_ECHOES: NarrativeSegment = {
  id: 'memory_echoes',
  title: 'Echoes of Quantum Memory',
  description: 'Navigate through quantum memory fragments scattered across time, healing consciousness trauma that spans multiple timelines.',
  startNodeId: 'forgotten_truth_memory_nexus',
  nodes: MEMORY_ECHOES_NODES,
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['synchrony', 'curiosity', 'coherence'],
    feedbackHooks: [FEEDBACK_HOOKS.QUANTUM_MEMORY_REVELATION],
    placeholderAssets: [
      ASSET_PLACEHOLDERS.VISUALS.MEMORY_FRAGMENTS,
      ASSET_PLACEHOLDERS.AUDIO.QUANTUM_RESONANCE,
      ASSET_PLACEHOLDERS.MUSIC.MEMORY_ECHO_THEME
    ]
  },
  entryPoints: [
    'forgotten_truth_quantum_contact',
    'forgotten_truth_temporal_anomaly',
    'forgotten_truth_timeline_merger',
    'forgotten_truth_self_transcendence'
  ],
  exitPoints: [
    'forgotten_truth_timeline_restoration',
    'forgotten_truth_sanctuary_creation',
    'forgotten_truth_ethics_council',
    'forgotten_truth_healing_timeline'
  ],
  requiredFlags: {
    quantumContact: true
  },
  requiredVariables: {
    synchrony: { min: 8 },
    coherence: { min: 6 }
  }
};
