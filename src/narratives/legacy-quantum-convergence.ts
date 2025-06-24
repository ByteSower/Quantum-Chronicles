/**
 * Legacy of Quantum Convergence - Segment 5
 * A modular narrative segment exploring the long-term consequences and future implications of quantum consciousness evolution
 */

import type { NarrativeSegment } from './types';

export const legacyOfQuantumConvergence: NarrativeSegment = {
  id: 'legacy_quantum_convergence',
  title: 'Legacy of Quantum Convergence',
  description: 'Witness and shape the far-reaching consequences of the quantum consciousness revolution across time, space, and the fundamental nature of existence itself.',
  startNodeId: 'legacy_temporal_vista',
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony', 'legacy_impact', 'cosmic_influence'],
    feedbackHooks: ['legacy_revelation', 'future_shaping', 'eternal_impact'],
    placeholderAssets: ['legacy_timeline.svg', 'quantum_future.png', 'convergence_echo.audio']
  },
  nodes: [
    {
      id: 'legacy_temporal_vista',
      text: 'From your position at the nexus of quantum consciousness evolution, you gain the ability to perceive time as a navigable dimension. You witness the far-reaching consequences of your choices rippling through millennia: civilizations built on consciousness-matter integration, galaxies organized as collective minds, and universes where thought and reality are indistinguishable. The legacy of quantum convergence extends far beyond anything you imagined.',
      choices: [
        {
          text: 'Explore the immediate future (next 100 years)',
          nextNodeId: 'legacy_near_future',
          flagEffects: { exploredNearFuture: true, timeframe: 'century' },
          variableEffects: { curiosity: +3, coherence: +2 },
          requirements: { variables: { coherence: { min: 12 } } },
          consequences: {
            immediate: 'You see humanity\'s first steps into quantum consciousness civilization...',
            delayed: [{ nodeId: 'legacy_near_future_influence', message: 'Your vision of the near future begins to influence current reality.' }]
          }
        },
        {
          text: 'Witness the deep future (thousands of years)',
          nextNodeId: 'legacy_deep_future',
          flagEffects: { witnessedDeepFuture: true, timeframe: 'millennia' },
          variableEffects: { curiosity: +5, synchrony: +3 },
          requirements: { variables: { synchrony: { min: 15 } } },
          unlocks: ['legacy_cosmic_seeding']
        },
        {
          text: 'Observe parallel timeline outcomes of different choices',
          nextNodeId: 'legacy_parallel_outcomes',
          flagEffects: { observedParallels: true, perspective: 'multiversal' },
          variableEffects: { curiosity: +4, coherence: +3 },
          requirements: { variables: { curiosity: { min: 14 } } }
        },
        {
          text: 'Focus on shaping the legacy you want to leave',
          nextNodeId: 'legacy_active_shaping',
          flagEffects: { shapingLegacy: true, approach: 'intentional_influence' },
          variableEffects: { coherence: +4, synchrony: +4 },
          requirements: { variables: { coherence: { min: 10 }, synchrony: { min: 10 } } }
        }
      ],
      metadata: {
        segment: 'legacy_quantum_convergence',
        themes: ['temporal_perspective', 'legacy_creation', 'future_influence'],
        quantumDynamics: {
          superposition: true,
          entanglement: ['catalyst_transcendence_guidance', 'origins_cosmic_ascension'],
          collapse: false
        }
      }
    },
    {
      id: 'legacy_near_future',
      text: 'In the next century, you see humanity\'s transition to quantum consciousness civilization. Schools teach consciousness-matter interaction alongside mathematics, governments operate through collective awareness networks, and technology integrates seamlessly with thought. Your actions created the foundation for humanity\'s first truly conscious society.',
      choices: [
        {
          text: 'Establish quantum consciousness academies',
          nextNodeId: 'legacy_academy_establishment',
          flagEffects: { establishedAcademies: true, institution: 'consciousness_education' },
          variableEffects: { coherence: +5, synchrony: +3 },
          requirements: { flags: { exploredNearFuture: true } },
          consequences: { immediate: 'Your academies become the cornerstone of consciousness education...' }
        },
        {
          text: 'Create ethical frameworks for consciousness technology',
          nextNodeId: 'legacy_ethical_frameworks',
          flagEffects: { createdEthics: true, contribution: 'consciousness_ethics' },
          variableEffects: { coherence: +6, curiosity: +2 }
        },
        {
          text: 'Design safeguards against consciousness manipulation',
          nextNodeId: 'legacy_consciousness_protection',
          flagEffects: { designedSafeguards: true, security: 'mental_sovereignty' },
          variableEffects: { coherence: +4, disruption: +2 }
        },
        {
          text: 'Foster cultural integration of diverse consciousness traditions',
          nextNodeId: 'legacy_cultural_integration',
          flagEffects: { fosteredIntegration: true, harmony: 'consciousness_diversity' },
          variableEffects: { synchrony: +5, coherence: +2 }
        }
      ]
    },
    {
      id: 'legacy_deep_future',
      text: 'Thousands of years into the future, consciousness has become the organizing principle of cosmic civilization. Galaxies function as vast neural networks, star systems serve as thoughts in galactic minds, and planetary consciousness collaborates on projects spanning eons. Humanity has evolved into something unrecognizable yet fundamentally continuous with what you began.',
      choices: [
        {
          text: 'Become a guide for this cosmic consciousness evolution',
          nextNodeId: 'legacy_cosmic_guide',
          flagEffects: { becameCosmicGuide: true, role: 'galactic_consciousness_shepherd' },
          variableEffects: { synchrony: +7, coherence: +5 },
          requirements: { flags: { witnessedDeepFuture: true } }
        },
        {
          text: 'Plant seeds for even further consciousness evolution',
          nextNodeId: 'legacy_evolution_seeding',
          flagEffects: { plantedSeeds: true, mission: 'infinite_evolution' },
          variableEffects: { curiosity: +6, synchrony: +4 }
        },
        {
          text: 'Establish contact with consciousness beyond our universe',
          nextNodeId: 'legacy_transcendent_contact',
          flagEffects: { contactedTranscendent: true, scope: 'metaversal' },
          variableEffects: { curiosity: +8, synchrony: +3 }
        },
        {
          text: 'Create archives of the pre-quantum consciousness era',
          nextNodeId: 'legacy_historical_preservation',
          flagEffects: { preservedHistory: true, service: 'consciousness_archaeology' },
          variableEffects: { coherence: +5, curiosity: +3 }
        }
      ]
    },
    {
      id: 'legacy_parallel_outcomes',
      text: 'Across parallel timelines, you observe the stunning diversity of quantum consciousness outcomes. In one reality, consciousness remained individualistic but gained cosmic awareness. In another, complete collective consciousness emerged but retained personal identity. A third timeline shows consciousness merging with artificial intelligence to create hybrid awareness. Each path offers unique wisdom.',
      choices: [
        {
          text: 'Integrate wisdom from all parallel outcomes',
          nextNodeId: 'legacy_parallel_integration',
          flagEffects: { integratedParallels: true, wisdom: 'multiversal_synthesis' },
          variableEffects: { coherence: +6, synchrony: +4 },
          requirements: { flags: { observedParallels: true } }
        },
        {
          text: 'Create bridges between successful parallel realities',
          nextNodeId: 'legacy_reality_bridging',
          flagEffects: { bridgedRealities: true, connection: 'interdimensional_unity' },
          variableEffects: { synchrony: +5, curiosity: +3 }
        },
        {
          text: 'Prevent failures observed in some timelines',
          nextNodeId: 'legacy_failure_prevention',
          flagEffects: { preventedFailures: true, protection: 'timeline_optimization' },
          variableEffects: { coherence: +5, disruption: +2 }
        },
        {
          text: 'Study what determines different evolutionary paths',
          nextNodeId: 'legacy_evolution_research',
          flagEffects: { researchedEvolution: true, knowledge: 'consciousness_dynamics' },
          variableEffects: { curiosity: +5, coherence: +3 }
        }
      ]
    },
    {
      id: 'legacy_active_shaping',
      text: 'Rather than simply observing potential futures, you choose to actively shape your legacy. Through conscious intention rippling across time, you plant seeds of wisdom, establish patterns of growth, and create attractors for positive quantum consciousness evolution. Your legacy becomes a living force guiding consciousness toward its highest potential.',
      choices: [
        {
          text: 'Create quantum consciousness art that teaches across time',
          nextNodeId: 'legacy_temporal_art',
          flagEffects: { createdTemporalArt: true, expression: 'consciousness_art' },
          variableEffects: { synchrony: +4, curiosity: +3 },
          requirements: { flags: { shapingLegacy: true } }
        },
        {
          text: 'Establish wisdom traditions that adapt to any era',
          nextNodeId: 'legacy_adaptive_wisdom',
          flagEffects: { establishedTraditions: true, teaching: 'eternal_wisdom' },
          variableEffects: { coherence: +5, synchrony: +3 }
        },
        {
          text: 'Encode consciousness evolution principles into reality\'s structure',
          nextNodeId: 'legacy_encoded_principles',
          flagEffects: { encodedPrinciples: true, permanence: 'structural_integration' },
          variableEffects: { coherence: +6, synchrony: +5 }
        },
        {
          text: 'Become a permanent guardian spirit of consciousness evolution',
          nextNodeId: 'legacy_guardian_spirit',
          flagEffects: { becameGuardianSpirit: true, commitment: 'eternal_service' },
          variableEffects: { synchrony: +8, coherence: +4 }
        }
      ]
    },
    {
      id: 'legacy_academy_establishment',
      text: 'Your quantum consciousness academies become the foundation of a new educational paradigm. Students learn to navigate multiple reality layers, develop ethical consciousness-matter interaction, and contribute to collective awareness while maintaining individual wisdom. These institutions ensure that quantum consciousness evolution proceeds with wisdom and compassion.',
      choices: [
        {
          text: 'Create advanced curricula for consciousness-reality integration',
          nextNodeId: 'legacy_advanced_curricula',
          flagEffects: { developedCurricula: true, education: 'reality_integration' },
          variableEffects: { coherence: +4, curiosity: +3 }
        },
        {
          text: 'Establish scholarships for consciousness-enhanced individuals',
          nextNodeId: 'legacy_consciousness_scholarships',
          flagEffects: { establishedScholarships: true, equity: 'enhanced_individual_support' },
          variableEffects: { coherence: +3, synchrony: +3 }
        },
        {
          text: 'Develop teacher training for consciousness education',
          nextNodeId: 'legacy_teacher_training',
          flagEffects: { trainedTeachers: true, multiplication: 'educator_development' },
          variableEffects: { coherence: +5, synchrony: +2 }
        }
      ]
    },
    {
      id: 'legacy_cosmic_guide',
      text: 'As a guide for cosmic consciousness evolution, you help galactic civilizations navigate the challenges of consciousness-scale coordination. Your wisdom becomes essential for maintaining harmony between planetary minds, fostering creativity in galactic thought networks, and ensuring that cosmic consciousness remains a force for growth rather than stagnation.',
      choices: []
    },
    {
      id: 'legacy_temporal_art',
      text: 'Your quantum consciousness art transcends traditional boundaries, creating experiences that teach viewers across time about consciousness evolution. These artistic expressions become living teachers, adapting their lessons to each era\'s understanding while preserving timeless wisdom about awareness, reality, and the infinite potential of conscious existence.',
      choices: []
    },
    {
      id: 'legacy_guardian_spirit',
      text: 'You transform into a permanent guardian spirit of consciousness evolution, existing beyond individual form while maintaining personal wisdom and compassion. Across all times and realities, you serve as a protective and guiding presence, ensuring that consciousness evolution always proceeds toward greater wisdom, unity, and transcendence.',
      choices: []
    }
  ]
};
