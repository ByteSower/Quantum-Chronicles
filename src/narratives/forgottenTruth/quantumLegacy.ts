/**
 * Legacy of Quantum Convergence - Forgotten Truth Expansion Segment 5
 * 
 * This segment explores the long-term consequences and future implications
 * of consciousness evolution, showing how the player's choices throughout
 * the narrative affect the future of human consciousness and civilization.
 * 
 * Entry points: Multiple ending nodes from other segments
 * QNCE Integration: Legacy depends on accumulated choices and variable values
 */

import type { NarrativeSegment, NarrativeNode } from '../types';
import { FEEDBACK_HOOKS, ASSET_PLACEHOLDERS } from '../types';

const LEGACY_NODES: NarrativeNode[] = [
  {
    id: 'forgotten_truth_future_convergence',
    text: 'Years have passed since your quantum consciousness awakening. The choices you made have rippled through time, shaping humanity\'s relationship with consciousness evolution. You now witness the legacy of your decisions as civilization adapts to the new reality of enhanced human awareness. The future holds {{coherence}} different potential paths based on the quantum foundations you helped establish.',
    dynamicText: {
      template: 'Years have passed since your quantum consciousness awakening. The choices you made have rippled through time, shaping humanity\'s relationship with consciousness evolution. You now witness the legacy of your decisions as civilization adapts to the new reality of enhanced human awareness. The future holds {{coherence}} different potential paths based on the quantum foundations you helped establish.',
      variables: ['coherence']
    },
    choices: [
      {
        text: 'Evaluate the long-term impact of consciousness experiments',
        nextNodeId: 'forgotten_truth_impact_assessment',
        flagEffects: { evaluatingImpact: true, perspective: 'analytical' },
        variableEffects: { curiosity: +3, coherence: +2 },
        feedbackHook: FEEDBACK_HOOKS.LEGACY_CHOICES,
        assetPlaceholder: {
          visual: ASSET_PLACEHOLDERS.VISUALS.FUTURE_LEGACY,
          audio: ASSET_PLACEHOLDERS.AUDIO.LEGACY_HARMONY
        }
      },
      {
        text: 'Guide the next generation of consciousness-enhanced individuals',
        nextNodeId: 'forgotten_truth_next_generation',
        flagEffects: { guidingFuture: true, role: 'mentor' },
        variableEffects: { synchrony: +4, coherence: +3 },
        requirements: { variables: { synchrony: { min: 10 } } }
      },
      {
        text: 'Work to establish permanent safeguards against consciousness abuse',
        nextNodeId: 'forgotten_truth_safeguard_legacy',
        flagEffects: { establishingSafeguards: true, purpose: 'protection' },
        variableEffects: { coherence: +4, disruption: -1 },
        requirements: { variables: { coherence: { min: 12 } } }
      },
      {
        text: 'Document the complete history for future civilizations',
        nextNodeId: 'forgotten_truth_historical_record',
        flagEffects: { documentingHistory: true, purpose: 'preservation' },
        variableEffects: { curiosity: +3, coherence: +3 },
        consequences: {
          immediate: 'Your comprehensive documentation becomes the definitive record of consciousness evolution...'
        }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['future_consequences', 'civilization_impact', 'consciousness_evolution'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['past_choices', 'future_outcomes'],
        collapse: false
      }
    },
    feedbackPrompt: 'Reflecting on the entire journey, what legacy do you want to leave for future generations?',
    assetPlaceholder: {
      music: ASSET_PLACEHOLDERS.MUSIC.LEGACY_THEME,
      visual: 'quantum_consciousness_civilization.webp'
    }
  },

  {
    id: 'forgotten_truth_impact_assessment',
    text: 'Your assessment reveals the profound transformation human society has undergone. Consciousness research is now conducted with full ethical oversight, enhanced individuals live openly without fear, and quantum consciousness techniques are used therapeutically to heal trauma. However, new challenges have emerged: consciousness inequality, quantum identity crises, and the need to integrate with non-enhanced humans.',
    choices: [
      {
        text: 'Address consciousness inequality through universal access programs',
        nextNodeId: 'forgotten_truth_universal_consciousness',
        flagEffects: { universalAccess: true, approach: 'egalitarian' },
        variableEffects: { synchrony: +5, coherence: +3 },
        requirements: { variables: { synchrony: { min: 12 } } }
      },
      {
        text: 'Focus on helping enhanced individuals integrate with society',
        nextNodeId: 'forgotten_truth_integration_programs',
        flagEffects: { integrationFocus: true, approach: 'adaptive' },
        variableEffects: { coherence: +4, synchrony: +2 }
      },
      {
        text: 'Develop support systems for quantum identity challenges',
        nextNodeId: 'forgotten_truth_identity_support',
        flagEffects: { identitySupport: true, approach: 'therapeutic' },
        variableEffects: { coherence: +5, curiosity: +2 },
        requirements: { flags: { healingMemories: true } }
      },
      {
        text: 'Research the next stage of human consciousness evolution',
        nextNodeId: 'forgotten_truth_evolution_research',
        flagEffects: { evolutionResearch: true, approach: 'progressive' },
        variableEffects: { curiosity: +4, synchrony: +3 },
        requirements: { variables: { curiosity: { min: 15 } } }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['social_integration', 'consciousness_equality', 'identity_challenges'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['enhanced_humans', 'society_adaptation'],
        collapse: true
      }
    },
    assetPlaceholder: {
      visual: 'consciousness_society_integration.webp',
      audio: 'social_harmony_resonance.ogg'
    }
  },

  {
    id: 'forgotten_truth_next_generation',
    text: 'The next generation of consciousness-enhanced individuals represents humanity\'s future. Unlike the traumatized survivors of early experiments, these young people were born into a world where quantum consciousness is understood and nurtured. They display abilities that surpass even your own, yet maintain profound empathy and wisdom beyond their years.',
    choices: [
      {
        text: 'Establish a school for naturally quantum-conscious children',
        nextNodeId: 'forgotten_truth_quantum_academy_future',
        flagEffects: { futureAcademy: true, focus: 'education' },
        variableEffects: { coherence: +5, synchrony: +4 },
        unlocks: ['forgotten_truth_consciousness_university_future']
      },
      {
        text: 'Research how natural quantum consciousness differs from enhanced',
        nextNodeId: 'forgotten_truth_natural_vs_enhanced',
        flagEffects: { comparativeResearch: true, focus: 'research' },
        variableEffects: { curiosity: +5, coherence: +2 }
      },
      {
        text: 'Help them develop their abilities while preserving their humanity',
        nextNodeId: 'forgotten_truth_balanced_development',
        flagEffects: { balancedDevelopment: true, focus: 'holistic' },
        variableEffects: { coherence: +4, synchrony: +4 },
        requirements: { variables: { coherence: { min: 14 } } }
      },
      {
        text: 'Learn from their evolved perspective on consciousness',
        nextNodeId: 'forgotten_truth_learning_from_future',
        flagEffects: { learningFromFuture: true, role: 'student' },
        variableEffects: { curiosity: +4, synchrony: +3 },
        consequences: {
          immediate: 'The next generation teaches you perspectives on consciousness you never imagined...'
        }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['next_generation', 'natural_evolution', 'consciousness_education'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['evolved_children', 'consciousness_future'],
        collapse: true
      }
    },
    feedbackPrompt: 'What would you want to teach or learn from the next generation of quantum-conscious humans?'
  },

  {
    id: 'forgotten_truth_safeguard_legacy',
    text: 'Your work establishing permanent safeguards creates a global framework that prevents consciousness abuse while encouraging ethical development. The Quantum Consciousness Protection Agency monitors research worldwide, consciousness rights are enshrined in international law, and therapeutic applications help millions heal from various forms of mental trauma.',
    choices: [
      {
        text: 'Extend protections to AI and digital consciousness',
        nextNodeId: 'forgotten_truth_digital_rights',
        flagEffects: { digitalRights: true, scope: 'artificial' },
        variableEffects: { coherence: +4, synchrony: +3 },
        requirements: { flags: { ai_negotiation: true } }
      },
      {
        text: 'Develop interspecies consciousness ethics',
        nextNodeId: 'forgotten_truth_interspecies_ethics',
        flagEffects: { interspeciesEthics: true, scope: 'universal' },
        variableEffects: { coherence: +5, curiosity: +3 },
        requirements: { flags: { learnedCosmicHistory: true } }
      },
      {
        text: 'Create a consciousness violation early warning system',
        nextNodeId: 'forgotten_truth_warning_system',
        flagEffects: { warningSystem: true, purpose: 'prevention' },
        variableEffects: { coherence: +3, disruption: -2 }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['consciousness_protection', 'universal_rights', 'ethical_framework'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['protection_systems', 'consciousness_rights'],
        collapse: true
      }
    }
  },

  {
    id: 'forgotten_truth_universal_consciousness',
    text: 'Your universal access programs democratize consciousness enhancement, ensuring that quantum awareness development is available to all regardless of economic status, nationality, or background. This creates the first truly egalitarian cognitive revolution in human history, though it also brings challenges of managing such widespread consciousness enhancement.',
    choices: [
      {
        text: 'Develop sustainable systems for mass consciousness enhancement',
        nextNodeId: 'forgotten_truth_mass_enhancement',
        flagEffects: { massEnhancement: true, scale: 'global' },
        variableEffects: { synchrony: +6, coherence: +4 },
        requirements: { variables: { synchrony: { min: 16 } } }
      },
      {
        text: 'Focus on quality training for consciousness enhancement facilitators',
        nextNodeId: 'forgotten_truth_facilitator_training',
        flagEffects: { facilitatorTraining: true, approach: 'professional' },
        variableEffects: { coherence: +5, synchrony: +2 }
      },
      {
        text: 'Create cultural adaptation programs for different societies',
        nextNodeId: 'forgotten_truth_cultural_adaptation',
        flagEffects: { culturalAdaptation: true, approach: 'respectful' },
        variableEffects: { coherence: +4, synchrony: +4 }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['universal_access', 'cognitive_equality', 'global_transformation'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['global_consciousness', 'social_equality'],
        collapse: true
      }
    }
  },

  {
    id: 'forgotten_truth_evolution_research',
    text: 'Your research into the next stage of consciousness evolution reveals that humanity is approaching another threshold. The current quantum-enhanced humans may be just the beginning - future evolution could involve collective consciousness networks, reality manipulation abilities, or even transcendence of physical existence entirely. The question is whether humanity is ready for such profound changes.',
    choices: [
      {
        text: 'Advocate for gradual, careful evolution',
        nextNodeId: 'forgotten_truth_gradual_evolution',
        flagEffects: { gradualEvolution: true, pace: 'careful' },
        variableEffects: { coherence: +5, disruption: -1 },
        requirements: { variables: { coherence: { min: 16 } } }
      },
      {
        text: 'Support accelerated evolution for willing volunteers',
        nextNodeId: 'forgotten_truth_accelerated_evolution',
        flagEffects: { acceleratedEvolution: true, pace: 'rapid' },
        variableEffects: { curiosity: +5, disruption: +2 },
        requirements: { variables: { curiosity: { min: 18 } } }
      },
      {
        text: 'Focus on ensuring evolution serves all consciousness, not just human',
        nextNodeId: 'forgotten_truth_inclusive_evolution',
        flagEffects: { inclusiveEvolution: true, scope: 'universal' },
        variableEffects: { synchrony: +5, coherence: +4 },
        requirements: { flags: { cosmicGuardian: true } }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['future_evolution', 'consciousness_transcendence', 'species_development'],
      quantumDynamics: {
        superposition: true,
        entanglement: ['current_evolution', 'future_possibilities'],
        collapse: false
      }
    }
  },

  {
    id: 'forgotten_truth_quantum_academy_future',
    text: 'The school you establish becomes a model for consciousness education worldwide. Students learn not just to develop their quantum abilities, but to use them responsibly and compassionately. Graduates become consciousness healers, reality stability monitors, interdimensional diplomats, and ethical researchers. Your educational approach shapes the character of enhanced humanity for generations.',
    choices: [
      {
        text: 'Establish satellite academies on every continent',
        nextNodeId: 'forgotten_truth_global_academy_network',
        flagEffects: { globalNetwork: true, scale: 'worldwide' },
        variableEffects: { synchrony: +5, coherence: +4 },
        consequences: {
          immediate: 'Your academy network creates a global community of ethically-trained quantum consciousness practitioners...'
        }
      },
      {
        text: 'Develop advanced courses for post-human consciousness',
        nextNodeId: 'forgotten_truth_advanced_curriculum',
        flagEffects: { advancedCurriculum: true, level: 'transcendent' },
        variableEffects: { curiosity: +5, synchrony: +3 },
        requirements: { flags: { newParadigm: true } }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['consciousness_education', 'ethical_training', 'global_impact'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['education_system', 'consciousness_ethics'],
        collapse: true
      }
    }
  },

  // Final convergence node that reflects on the complete journey
  {
    id: 'forgotten_truth_ultimate_legacy',
    text: 'As you reflect on the complete journey from discovering your grandmother\'s journal to helping shape humanity\'s consciousness evolution, you realize that the "forgotten truth" was never just about the experiments. The real truth was about the infinite potential of consciousness itself - its capacity for growth, healing, connection, and transcendence. Your choices have helped humanity remember that consciousness is not a tool to be manipulated, but a gift to be nurtured.',
    choices: [
      {
        text: 'Continue as a guardian of consciousness evolution',
        nextNodeId: 'forgotten_truth_eternal_guardian',
        flagEffects: { eternalGuardian: true, commitment: 'permanent' },
        variableEffects: { coherence: +10, synchrony: +10 }
      },
      {
        text: 'Pass the torch to the next generation and find peace',
        nextNodeId: 'forgotten_truth_peaceful_conclusion',
        flagEffects: { foundPeace: true, resolution: 'complete' },
        variableEffects: { coherence: +8, synchrony: +6, disruption: -5 }
      },
      {
        text: 'Transcend to become part of the quantum consciousness field itself',
        nextNodeId: 'forgotten_truth_quantum_transcendence',
        flagEffects: { quantumTranscendence: true, state: 'transcendent' },
        variableEffects: { synchrony: +15, coherence: +10 },
        requirements: { variables: { synchrony: { min: 20 }, coherence: { min: 18 } } }
      }
    ],
    metadata: {
      segment: 'quantum_legacy',
      themes: ['ultimate_meaning', 'consciousness_gift', 'legacy_reflection'],
      quantumDynamics: {
        superposition: false,
        entanglement: ['journey_completion', 'consciousness_truth'],
        collapse: true
      }
    },
    feedbackPrompt: 'Having completed this consciousness evolution journey, what is the most important truth you want to remember?'
  }
];

export const QUANTUM_LEGACY: NarrativeSegment = {
  id: 'quantum_legacy',
  title: 'Legacy of Quantum Convergence',
  description: 'Witness and shape the long-term consequences of consciousness evolution as humanity adapts to its quantum-enhanced future.',
  startNodeId: 'forgotten_truth_future_convergence',
  nodes: LEGACY_NODES,
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['coherence', 'synchrony', 'curiosity', 'disruption'],
    feedbackHooks: [FEEDBACK_HOOKS.LEGACY_CHOICES],
    placeholderAssets: [
      ASSET_PLACEHOLDERS.VISUALS.FUTURE_LEGACY,
      ASSET_PLACEHOLDERS.AUDIO.LEGACY_HARMONY,
      ASSET_PLACEHOLDERS.MUSIC.LEGACY_THEME
    ]
  },
  entryPoints: [
    // Can be reached from multiple ending points of other segments
    'forgotten_truth_cosmic_healing',
    'forgotten_truth_new_paradigm',
    'forgotten_truth_universal_ethics',
    'forgotten_truth_research_alliance',
    'forgotten_truth_consciousness_university',
    'forgotten_truth_global_protection',
    'forgotten_truth_ethics_council',
    'forgotten_truth_sanctuary_creation'
  ],
  exitPoints: [
    'forgotten_truth_eternal_guardian',
    'forgotten_truth_peaceful_conclusion',
    'forgotten_truth_quantum_transcendence'
  ],
  requiredFlags: {
    // At least one major choice path must be completed
  },
  requiredVariables: {
    coherence: { min: 8 },
    synchrony: { min: 6 }
  }
};
