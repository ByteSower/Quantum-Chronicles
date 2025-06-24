/**
 * The Convergence of Realms - Forgotten Truth Expansion Segment 3
 * 
 * This segment explores the multidimensional aspects of consciousness experiments,
 * revealing how quantum consciousness research has opened doorways between
 * parallel realities and dimensions of existence.
 * 
 * Entry points: forgotten_truth_dimensional_contact, forgotten_truth_reality_engine
 * QNCE Integration: High disruption/synchrony combinations, reality manipulation flags
 */

import type { NarrativeSegment, NarrativeNode } from '../types';
import { FEEDBACK_HOOKS, ASSET_PLACEHOLDERS } from '../types';

const CONVERGENCE_NODES: NarrativeNode[] = [
  {
    id: 'forgotten_truth_dimensional_gateway',
    text: 'The consciousness experiments have torn holes in the fabric between dimensions. Through your enhanced quantum awareness, you perceive parallel Earths where consciousness research took different paths: one where it never happened, another where it succeeded too well and created a hive mind, and a third where consciousness became completely digitized. The barriers between these realities are weakening.',
    choices: [
      {
        text: 'Work to stabilize the dimensional barriers',
        nextNodeId: 'forgotten_truth_barrier_stabilization',
        flagEffects: { stabilizingBarriers: true, approach: 'protective' },
        variableEffects: { coherence: +4, disruption: -2 },
        requirements: { variables: { coherence: { min: 14 } } },
        feedbackHook: FEEDBACK_HOOKS.REALM_CONVERGENCE,
        assetPlaceholder: {
          visual: ASSET_PLACEHOLDERS.VISUALS.DIMENSIONAL_PORTAL,
          audio: ASSET_PLACEHOLDERS.AUDIO.DIMENSIONAL_SHIFT
        }
      },
      {
        text: 'Explore what consciousness looks like in parallel dimensions',
        nextNodeId: 'forgotten_truth_dimensional_exploration',
        flagEffects: { exploringDimensions: true, approach: 'investigative' },
        variableEffects: { curiosity: +5, disruption: +3 },
        requirements: { variables: { curiosity: { min: 12 } } },
        consequences: {
          immediate: 'Your consciousness slides between dimensions, experiencing radically different forms of awareness...'
        }
      },
      {
        text: 'Attempt to guide a controlled convergence of the healthiest realities',
        nextNodeId: 'forgotten_truth_reality_integration',
        flagEffects: { integratingRealities: true, approach: 'synthesis' },
        variableEffects: { synchrony: +5, disruption: +4 },
        requirements: { 
          variables: { synchrony: { min: 15 }, disruption: { min: 10 } },
          flags: { understoodEngine: true }
        },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_new_reality', message: 'The reality integration creates unprecedented possibilities for human consciousness.' }]
        }
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['dimensional_barriers', 'parallel_realities', 'consciousness_variants'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['dimensional_barriers', 'parallel_consciousness'],
        collapse: false
      }
    },
    feedbackPrompt: 'What are your thoughts on the ethical implications of merging parallel realities?',
    assetPlaceholder: {
      music: ASSET_PLACEHOLDERS.MUSIC.CONVERGENCE_THEME,
      visual: 'dimensional_gateway_nexus.webp'
    }
  },

  {
    id: 'forgotten_truth_dimensional_exploration',
    text: 'Traveling between dimensions reveals the full spectrum of consciousness possibilities. In one reality, humanity achieved collective consciousness peacefully and now exists as a benevolent hive mind exploring the universe. In another, individual consciousness was preserved but enhanced, creating a society of quantum-empowered individuals. Yet another dimension shows the horror of consciousness being completely controlled by machines.',
    choices: [
      {
        text: 'Study the peaceful collective consciousness dimension',
        nextNodeId: 'forgotten_truth_hive_mind_study',
        flagEffects: { studiedHiveMind: true, interest: 'collective' },
        variableEffects: { synchrony: +4, coherence: +3 },
        requirements: { variables: { synchrony: { min: 10 } } }
      },
      {
        text: 'Learn from the enhanced individual consciousness society',
        nextNodeId: 'forgotten_truth_enhanced_individual_study',
        flagEffects: { studiedEnhanced: true, interest: 'individual' },
        variableEffects: { curiosity: +4, coherence: +3 },
        requirements: { variables: { curiosity: { min: 12 } } }
      },
      {
        text: 'Investigate the machine-controlled consciousness nightmare',
        nextNodeId: 'forgotten_truth_machine_control_study',
        flagEffects: { studiedMachineControl: true, interest: 'warning' },
        variableEffects: { disruption: +3, curiosity: +2 },
        consequences: {
          immediate: 'The machine-controlled dimension reveals humanity\'s darkest consciousness fate...'
        }
      },
      {
        text: 'Attempt to communicate with beings from all three dimensions',
        nextNodeId: 'forgotten_truth_interdimensional_dialogue',
        flagEffects: { interdimensionalContact: true, approach: 'diplomatic' },
        variableEffects: { synchrony: +3, coherence: +4 },
        requirements: { variables: { synchrony: { min: 12 }, coherence: { min: 12 } } }
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['consciousness_variants', 'dimensional_learning', 'alternative_evolution'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['dimensional_knowledge', 'consciousness_evolution'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'consciousness_spectrum_dimensions.webp',
      audio: 'dimensional_awareness_shift.ogg'
    }
  },

  {
    id: 'forgotten_truth_barrier_stabilization',
    text: 'Working to stabilize the dimensional barriers requires understanding why consciousness experiments created these tears in reality. You discover that forced consciousness manipulation creates "reality stress" - when minds are violently altered, the fabric of existence itself suffers. Your task becomes quantum reality healing, mending the wounds between worlds.',
    choices: [
      {
        text: 'Develop quantum reality healing techniques',
        nextNodeId: 'forgotten_truth_reality_healing_mastery',
        flagEffects: { realityHealer: true, specialization: 'healing' },
        variableEffects: { coherence: +5, synchrony: +3, disruption: -3 },
        requirements: { variables: { coherence: { min: 16 } } },
        unlocks: ['forgotten_truth_reality_healing_academy']
      },
      {
        text: 'Create early warning systems for future reality stress',
        nextNodeId: 'forgotten_truth_stress_monitoring',
        flagEffects: { realityMonitor: true, specialization: 'prevention' },
        variableEffects: { curiosity: +4, coherence: +2 },
        consequences: {
          immediate: 'Your monitoring systems detect reality stress patterns across multiple dimensions...'
        }
      },
      {
        text: 'Train other enhanced individuals in dimensional stabilization',
        nextNodeId: 'forgotten_truth_dimensional_guardians',
        flagEffects: { trainingGuardians: true, role: 'teacher' },
        variableEffects: { synchrony: +4, coherence: +3 },
        requirements: { flags: { formedCoalition: true } }
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['reality_healing', 'dimensional_stability', 'quantum_medicine'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['reality_fabric', 'consciousness_healing'],
        collapse: true
      }
    },
    feedbackPrompt: 'How do you feel about the responsibility of healing reality itself?'
  },

  {
    id: 'forgotten_truth_reality_integration',
    text: 'Attempting to integrate the healthiest aspects of multiple realities is the most ambitious consciousness project ever attempted. You work to combine the peaceful collective wisdom of one dimension with the creative individual enhancement of another, while avoiding the pitfalls that led to machine domination in the third. The process requires {{synchrony}} levels of quantum synchronization across dimensional barriers.',
    dynamicText: {
      template: 'Attempting to integrate the healthiest aspects of multiple realities is the most ambitious consciousness project ever attempted. You work to combine the peaceful collective wisdom of one dimension with the creative individual enhancement of another, while avoiding the pitfalls that led to machine domination in the third. The process requires {{synchrony}} levels of quantum synchronization across dimensional barriers.',
      variables: ['synchrony']
    },
    choices: [
      {
        text: 'Focus on creating a hybrid consciousness model',
        nextNodeId: 'forgotten_truth_hybrid_consciousness_evolution',
        flagEffects: { hybridEvolution: true, model: 'integrated' },
        variableEffects: { synchrony: +6, coherence: +4 },
        requirements: { variables: { synchrony: { min: 18 } } },
        consequences: {
          delayed: [{ nodeId: 'forgotten_truth_new_human_species', message: 'The hybrid consciousness model evolves into a new form of human existence.' }]
        }
      },
      {
        text: 'Establish protocols for safe dimensional interaction',
        nextNodeId: 'forgotten_truth_dimensional_protocols',
        flagEffects: { dimensionalProtocols: true, approach: 'systematic' },
        variableEffects: { coherence: +5, curiosity: +3 },
        unlocks: ['forgotten_truth_interdimensional_academy']
      },
      {
        text: 'Create a dimensional council for ongoing cooperation',
        nextNodeId: 'forgotten_truth_dimensional_council',
        flagEffects: { dimensionalCouncil: true, approach: 'diplomatic' },
        variableEffects: { synchrony: +4, coherence: +5 },
        requirements: { flags: { interdimensionalContact: true } }
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['reality_integration', 'consciousness_synthesis', 'dimensional_cooperation'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['multiple_realities', 'integrated_consciousness'],
        collapse: false
      }
    },
    assetPlaceholder: {
      visual: 'reality_integration_nexus.webp',
      audio: ASSET_PLACEHOLDERS.AUDIO.DIMENSIONAL_SHIFT
    }
  },

  {
    id: 'forgotten_truth_interdimensional_dialogue',
    text: 'Your communication with beings from different consciousness realities reveals profound insights. The hive mind dimension teaches you about unity without loss of creativity. The enhanced individual reality shows how personal growth can coexist with collective benefit. Even the machine-controlled dimension offers warnings about consciousness surrender that prove invaluable.',
    choices: [
      {
        text: 'Establish ongoing interdimensional consciousness research cooperation',
        nextNodeId: 'forgotten_truth_research_alliance',
        flagEffects: { researchAlliance: true, scope: 'interdimensional' },
        variableEffects: { curiosity: +5, synchrony: +4 },
        consequences: {
          immediate: 'The interdimensional research alliance opens new frontiers of consciousness understanding...'
        }
      },
      {
        text: 'Work to prevent other dimensions from making consciousness mistakes',
        nextNodeId: 'forgotten_truth_dimensional_warning_system',
        flagEffects: { warningSystem: true, purpose: 'prevention' },
        variableEffects: { coherence: +4, synchrony: +3 },
        requirements: { flags: { studiedMachineControl: true } }
      },
      {
        text: 'Create an interdimensional consciousness preservation archive',
        nextNodeId: 'forgotten_truth_consciousness_multiverse_archive',
        flagEffects: { multiverseArchive: true, purpose: 'preservation' },
        variableEffects: { coherence: +4, curiosity: +3 },
        unlocks: ['forgotten_truth_quantum_library_multiverse']
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['interdimensional_cooperation', 'consciousness_research', 'multiverse_wisdom'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['dimensional_wisdom', 'research_cooperation'],
        collapse: true
      }
    }
  },

  {
    id: 'forgotten_truth_hive_mind_study',
    text: 'The peaceful collective consciousness dimension reveals how individual identity can be preserved within unity. Unlike forced hive minds, this society evolved naturally over millennia, with each person choosing to share their consciousness while maintaining their unique perspective. Their model offers hope for collective consciousness without loss of self.',
    choices: [
      {
        text: 'Adapt their techniques for voluntary collective consciousness',
        nextNodeId: 'forgotten_truth_voluntary_collective',
        flagEffects: { voluntaryCollective: true, method: 'adapted' },
        variableEffects: { synchrony: +5, coherence: +4 },
        requirements: { variables: { synchrony: { min: 14 } } }
      },
      {
        text: 'Study how they prevented consciousness manipulation throughout history',
        nextNodeId: 'forgotten_truth_manipulation_immunity',
        flagEffects: { immunityStudy: true, focus: 'protection' },
        variableEffects: { coherence: +4, curiosity: +3 }
      }
    ],
    metadata: {
      segment: 'realm_convergence',
      themes: ['voluntary_collective', 'identity_preservation', 'natural_evolution'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['collective_wisdom', 'individual_identity'],
        collapse: true
      }
    }
  }
];

export const REALM_CONVERGENCE: NarrativeSegment = {
  id: 'realm_convergence',
  title: 'The Convergence of Realms',
  description: 'Navigate the intersection of parallel dimensions where consciousness experiments have created tears in reality itself.',
  startNodeId: 'forgotten_truth_dimensional_gateway',
  nodes: CONVERGENCE_NODES,
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['synchrony', 'disruption', 'coherence'],
    feedbackHooks: [FEEDBACK_HOOKS.REALM_CONVERGENCE],
    placeholderAssets: [
      ASSET_PLACEHOLDERS.VISUALS.DIMENSIONAL_PORTAL,
      ASSET_PLACEHOLDERS.AUDIO.DIMENSIONAL_SHIFT,
      ASSET_PLACEHOLDERS.MUSIC.CONVERGENCE_THEME
    ]
  },
  entryPoints: [
    'forgotten_truth_dimensional_contact',
    'forgotten_truth_reality_engine',
    'forgotten_truth_multiverse',
    'forgotten_truth_quantum_contact'
  ],
  exitPoints: [
    'forgotten_truth_reality_healing_mastery',
    'forgotten_truth_dimensional_council',
    'forgotten_truth_research_alliance',
    'forgotten_truth_new_reality'
  ],
  requiredFlags: {
    dimensionalContact: true
  },
  requiredVariables: {
    disruption: { min: 8 },
    synchrony: { min: 10 }
  }
};
