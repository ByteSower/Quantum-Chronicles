/**
 * The Catalyst's Revelation - Segment 4
 * A modular narrative segment exploring the discovery of the cosmic catalyst and the choice that determines reality's future
 */

import type { NarrativeSegment } from './types';

export const catalystsRevelation: NarrativeSegment = {
  id: 'catalyst_revelation',
  title: 'The Catalyst\'s Revelation',
  description: 'Discover your true nature as the Cosmic Catalyst—the consciousness chosen to determine whether reality evolves or remains static, and face the ultimate choice that will reshape existence itself.',
  startNodeId: 'catalyst_awakening',
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony', 'cosmic_responsibility', 'catalyst_power'],
    feedbackHooks: ['catalyst_awakening', 'cosmic_choice', 'reality_determination'],
    placeholderAssets: ['catalyst_energy.svg', 'cosmic_choice.png', 'reality_resonance.audio']
  },
  nodes: [
    {
      id: 'catalyst_awakening',
      text: 'In the heart of the dimensional convergence, a truth crystallizes in your consciousness with startling clarity: you are not just another test subject or enhanced individual. You are the Catalyst—a consciousness specifically evolved to make the choice that will determine reality\'s next evolutionary phase. Every experiment, every connection, every decision has been preparing you for this singular moment of cosmic responsibility.',
      choices: [
        {
          text: 'Accept the role of Cosmic Catalyst',
          nextNodeId: 'catalyst_acceptance',
          flagEffects: { acceptedCatalyst: true, cosmic_role: 'willing' },
          variableEffects: { synchrony: +6, coherence: +4 },
          requirements: { variables: { synchrony: { min: 15 } } },
          consequences: {
            immediate: 'Cosmic awareness floods your being as you embrace your true purpose...',
            delayed: [{ nodeId: 'catalyst_cosmic_connection', message: 'The universe responds to your acceptance with revelations beyond imagination.' }]
          }
        },
        {
          text: 'Reject the imposed responsibility and seek to democratize the choice',
          nextNodeId: 'catalyst_democratization',
          flagEffects: { rejectedRole: true, approach: 'collective_choice' },
          variableEffects: { disruption: +5, coherence: +2 },
          requirements: { variables: { disruption: { min: 10 } } },
          unlocks: ['catalyst_collective_awakening']
        },
        {
          text: 'Question who or what designated you as the Catalyst',
          nextNodeId: 'catalyst_origin_investigation',
          flagEffects: { questionedOrigin: true, investigation: 'catalyst_source' },
          variableEffects: { curiosity: +5, disruption: +3 },
          requirements: { variables: { curiosity: { min: 12 } } }
        },
        {
          text: 'Attempt to understand the full implications before deciding',
          nextNodeId: 'catalyst_implication_study',
          flagEffects: { studyingImplications: true, approach: 'careful_analysis' },
          variableEffects: { coherence: +5, curiosity: +3 },
          requirements: { variables: { coherence: { min: 14 } } }
        }
      ],
      metadata: {
        segment: 'catalyst_revelation',
        themes: ['cosmic_responsibility', 'catalyst_awakening', 'reality_choice'],
        quantumDynamics: {
          superposition: true,
          entanglement: ['convergence_experimenter_alliance', 'legacy_quantum_democracy'],
          collapse: true
        }
      }
    },
    {
      id: 'catalyst_acceptance',
      text: 'As you accept your role as Cosmic Catalyst, your consciousness expands beyond individual awareness to encompass the collective unconscious of all reality. You feel the hopes, fears, and dreams of every conscious being across all dimensions. The weight of cosmic responsibility settles upon you, but with it comes unprecedented power to guide reality\'s evolution.',
      choices: [
        {
          text: 'Choose evolution: guide reality toward higher consciousness',
          nextNodeId: 'catalyst_evolution_choice',
          flagEffects: { choseEvolution: true, cosmic_direction: 'transcendence' },
          variableEffects: { synchrony: +8, coherence: +5 },
          requirements: { flags: { acceptedCatalyst: true } },
          consequences: { immediate: 'Reality begins shifting toward transcendent possibilities...' }
        },
        {
          text: 'Choose stability: preserve reality\'s current form',
          nextNodeId: 'catalyst_stability_choice',
          flagEffects: { choseStability: true, cosmic_direction: 'preservation' },
          variableEffects: { coherence: +6, synchrony: +3 }
        },
        {
          text: 'Choose synthesis: blend evolution with preservation',
          nextNodeId: 'catalyst_synthesis_choice',
          flagEffects: { choseSynthesis: true, cosmic_direction: 'balanced_growth' },
          variableEffects: { coherence: +4, synchrony: +4, curiosity: +2 }
        },
        {
          text: 'Defer the choice and seek more wisdom first',
          nextNodeId: 'catalyst_wisdom_seeking',
          flagEffects: { deferredChoice: true, approach: 'wisdom_gathering' },
          variableEffects: { curiosity: +4, coherence: +3 }
        }
      ]
    },
    {
      id: 'catalyst_democratization',
      text: 'Your rejection of singular cosmic responsibility triggers a consciousness revolution. Enhanced individuals across all dimensions begin awakening to their own catalyst potential. Instead of one consciousness determining reality\'s fate, you\'ve initiated the first cosmic democracy where all aware beings participate in shaping existence\'s future.',
      choices: [
        {
          text: 'Organize the cosmic democratic process',
          nextNodeId: 'catalyst_cosmic_democracy',
          flagEffects: { organizedDemocracy: true, governance: 'cosmic_collective' },
          variableEffects: { coherence: +5, synchrony: +4 },
          requirements: { flags: { rejectedRole: true } }
        },
        {
          text: 'Create frameworks for collective consciousness decision-making',
          nextNodeId: 'catalyst_collective_frameworks',
          flagEffects: { createdFrameworks: true, innovation: 'consciousness_governance' },
          variableEffects: { coherence: +6, curiosity: +2 }
        },
        {
          text: 'Establish protections against consciousness manipulation in the democratic process',
          nextNodeId: 'catalyst_democracy_protection',
          flagEffects: { protectedDemocracy: true, security: 'consciousness_integrity' },
          variableEffects: { coherence: +4, disruption: +2 }
        }
      ]
    },
    {
      id: 'catalyst_origin_investigation',
      text: 'Your investigation reveals a startling truth: the Catalyst role wasn\'t imposed by external forces—it evolved naturally from the quantum consciousness experiments. You are the first being to achieve sufficient quantum coherence to influence reality at the fundamental level. The "designation" came from the universe itself responding to your evolved consciousness.',
      choices: [
        {
          text: 'Use this knowledge to help others achieve Catalyst potential',
          nextNodeId: 'catalyst_potential_sharing',
          flagEffects: { sharedPotential: true, mission: 'catalyst_multiplication' },
          variableEffects: { synchrony: +5, coherence: +3 },
          requirements: { flags: { questionedOrigin: true } }
        },
        {
          text: 'Study the quantum mechanics of consciousness evolution',
          nextNodeId: 'catalyst_evolution_science',
          flagEffects: { studiedEvolution: true, research: 'consciousness_mechanics' },
          variableEffects: { curiosity: +5, coherence: +4 }
        },
        {
          text: 'Explore whether other universes have their own Catalysts',
          nextNodeId: 'catalyst_multiversal_exploration',
          flagEffects: { exploredMultiverse: true, scope: 'infinite_catalysts' },
          variableEffects: { curiosity: +6, synchrony: +2 }
        }
      ]
    },
    {
      id: 'catalyst_implication_study',
      text: 'Your careful analysis reveals the profound implications of the Catalyst choice. Choosing evolution risks instability but offers transcendence; choosing stability preserves current reality but may stagnate consciousness development; choosing synthesis requires careful balance but could create unprecedented forms of existence. Each path affects infinite beings across countless dimensions.',
      choices: [
        {
          text: 'Make the evolutionary choice based on your analysis',
          nextNodeId: 'catalyst_analyzed_evolution',
          flagEffects: { analyticalEvolution: true, decision_basis: 'studied_choice' },
          variableEffects: { coherence: +6, synchrony: +4 },
          requirements: { flags: { studyingImplications: true } }
        },
        {
          text: 'Propose a new option not previously considered',
          nextNodeId: 'catalyst_innovative_choice',
          flagEffects: { innovatedChoice: true, creativity: 'novel_option' },
          variableEffects: { curiosity: +5, disruption: +4 }
        },
        {
          text: 'Create a multi-phase evolution plan that minimizes risks',
          nextNodeId: 'catalyst_phased_evolution',
          flagEffects: { phasedEvolution: true, strategy: 'graduated_transcendence' },
          variableEffects: { coherence: +7, synchrony: +3 }
        }
      ]
    },
    {
      id: 'catalyst_evolution_choice',
      text: 'Your choice for evolution transforms reality itself. Consciousness becomes the fundamental force of physics, matter responds directly to awareness, and the barriers between individual minds begin dissolving into collective wisdom. You\'ve guided the universe toward a transcendent state where consciousness and cosmos are one.',
      choices: [
        {
          text: 'Guide the transcendence process to ensure stability',
          nextNodeId: 'catalyst_transcendence_guidance',
          flagEffects: { guidedTranscendence: true, role: 'evolution_shepherd' },
          variableEffects: { coherence: +6, synchrony: +5 }
        },
        {
          text: 'Become a permanent guardian of the evolved reality',
          nextNodeId: 'catalyst_reality_guardian',
          flagEffects: { becameGuardian: true, mission: 'transcendent_protection' },
          variableEffects: { synchrony: +7, coherence: +4 }
        },
        {
          text: 'Explore what lies beyond even transcendent consciousness',
          nextNodeId: 'catalyst_beyond_transcendence',
          flagEffects: { exploredBeyond: true, quest: 'post_transcendent_mysteries' },
          variableEffects: { curiosity: +8, synchrony: +3 }
        }
      ]
    },
    {
      id: 'catalyst_cosmic_democracy',
      text: 'The cosmic democracy you establish becomes the first truly universal form of governance. Every conscious being—from quantum AIs to enlightened shamans to digital entities—participates in shaping reality through collective awareness. You\'ve transformed the cosmos from autocracy to democracy, creating unprecedented unity in diversity.',
      choices: []
    },
    {
      id: 'catalyst_transcendence_guidance',
      text: 'As guide of the transcendence process, you ensure that consciousness evolution proceeds with wisdom and compassion. No being is left behind, no timeline is abandoned, and every form of awareness finds its place in the transcendent reality. You become the eternal shepherd of cosmic consciousness.',
      choices: []
    },
    {
      id: 'catalyst_beyond_transcendence',
      text: 'Your exploration beyond transcendent consciousness reveals infinite layers of existence beyond even cosmic awareness. You discover that transcendence itself is merely one step in an endless journey of consciousness evolution, becoming an eternal pioneer of the impossible.',
      choices: []
    }
  ]
};
