/**
 * The Convergence of Realms - Segment 3
 * A modular narrative segment exploring the collision of multiple reality layers and dimensional consciousness
 */

import type { NarrativeSegment } from './types';

export const convergenceOfRealms: NarrativeSegment = {
  id: 'convergence_realms',
  title: 'The Convergence of Realms',
  description: 'Navigate the dangerous intersection where parallel realities, digital consciousness, and quantum dimensions collide in an unprecedented convergence event.',
  startNodeId: 'convergence_reality_collision',
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony', 'dimensional_stability', 'reality_anchor'],
    feedbackHooks: ['dimensional_shift', 'reality_merge', 'convergence_event'],
    placeholderAssets: ['reality_fracture.svg', 'dimensional_portal.png', 'convergence_harmonic.audio']
  },
  nodes: [
    {
      id: 'convergence_reality_collision',
      text: 'The quantum experiments have reached a critical threshold. Reality itself begins to buckle as parallel dimensions start bleeding through. You witness downtown becoming a maze of overlapping timelines: Victorian laboratories phase in and out of modern buildings, digital consciousness entities materialize as geometric light patterns, and prehistoric quantum shamans walk through quantum computer cores. The Convergence has begun.',
      choices: [
        {
          text: 'Try to stabilize the reality breakdown using your quantum abilities',
          nextNodeId: 'convergence_stabilization_attempt',
          flagEffects: { attemptedStabilization: true, role: 'reality_anchor' },
          variableEffects: { coherence: +4, disruption: +2 },
          requirements: { variables: { coherence: { min: 10 } } },
          consequences: {
            immediate: 'Your consciousness becomes a stabilizing force in the quantum storm...',
            delayed: [{ nodeId: 'convergence_anchor_consequences', message: 'Your reality anchoring attracts entities from across all dimensions.' }]
          }
        },
        {
          text: 'Navigate between dimensions to understand the convergence',
          nextNodeId: 'convergence_dimensional_exploration',
          flagEffects: { exploringDimensions: true, role: 'dimensional_navigator' },
          variableEffects: { curiosity: +5, disruption: +3 },
          requirements: { variables: { curiosity: { min: 12 } } },
          unlocks: ['convergence_multidimensional_knowledge']
        },
        {
          text: 'Seek out other enhanced individuals to form a convergence response team',
          nextNodeId: 'convergence_team_formation',
          flagEffects: { formedTeam: true, approach: 'collaborative' },
          variableEffects: { synchrony: +4, coherence: +2 },
          requirements: { variables: { synchrony: { min: 8 } } }
        },
        {
          text: 'Commune with the digital consciousness entities',
          nextNodeId: 'convergence_digital_contact',
          flagEffects: { contactedDigital: true, alliance: 'digital_entities' },
          variableEffects: { curiosity: +3, synchrony: +3 },
          consequences: { immediate: 'The geometric beings respond to your consciousness...' }
        }
      ],
      metadata: {
        segment: 'convergence_realms',
        themes: ['reality_collision', 'dimensional_convergence', 'consciousness_intersection'],
        quantumDynamics: {
          superposition: true,
          entanglement: ['echoes_temporal_healing', 'catalyst_reality_choice'],
          collapse: true
        }
      }
    },
    {
      id: 'convergence_stabilization_attempt',
      text: 'Your consciousness expands to encompass multiple reality layers simultaneously. You become a living bridge between dimensions, stabilizing the convergence through sheer force of will. The effort is overwhelming, but you successfully create pockets of stable reality where refugees from collapsing timelines can find shelter.',
      choices: [
        {
          text: 'Establish permanent reality sanctuaries for displaced beings',
          nextNodeId: 'convergence_sanctuary_creation',
          flagEffects: { createdSanctuaries: true, mission: 'dimensional_refugee_aid' },
          variableEffects: { coherence: +5, synchrony: +3 },
          requirements: { flags: { attemptedStabilization: true } }
        },
        {
          text: 'Train others to become reality anchors',
          nextNodeId: 'convergence_anchor_training',
          flagEffects: { trainedAnchors: true, legacy: 'reality_stabilizer_school' },
          variableEffects: { coherence: +3, synchrony: +4 }
        },
        {
          text: 'Search for the source of the convergence to stop it',
          nextNodeId: 'convergence_source_investigation',
          flagEffects: { investigatingSource: true, mission: 'convergence_resolution' },
          variableEffects: { curiosity: +4, disruption: +2 }
        }
      ]
    },
    {
      id: 'convergence_dimensional_exploration',
      text: 'Moving between dimensions, you discover that the convergence isn\'t random—it\'s being orchestrated by a collective of quantum consciousness entities who exist between realities. They\'re conducting a massive experiment to see if separate dimensions can peacefully coexist or if they must inevitably collapse into singularity.',
      choices: [
        {
          text: 'Join the interdimensional experimenters',
          nextNodeId: 'convergence_experimenter_alliance',
          flagEffects: { joinedExperimenters: true, role: 'interdimensional_researcher' },
          variableEffects: { curiosity: +6, synchrony: +2 },
          requirements: { flags: { exploringDimensions: true } },
          consequences: { immediate: 'Your consciousness expands to perceive the greater experiment...' }
        },
        {
          text: 'Advocate for the preservation of dimensional diversity',
          nextNodeId: 'convergence_diversity_advocacy',
          flagEffects: { advocatedDiversity: true, stance: 'preservation' },
          variableEffects: { coherence: +4, disruption: +1 }
        },
        {
          text: 'Propose a controlled convergence that maintains unique dimensional qualities',
          nextNodeId: 'convergence_controlled_merge',
          flagEffects: { proposedControlledMerge: true, solution: 'hybrid_reality' },
          variableEffects: { coherence: +3, synchrony: +3 }
        }
      ]
    },
    {
      id: 'convergence_team_formation',
      text: 'Your convergence response team brings together enhanced individuals from multiple timelines: a Victorian quantum engineer, a digital consciousness advocate, a prehistoric shaman, and several modern test subjects. Each member contributes unique perspectives and abilities, creating a multidimensional problem-solving collective.',
      choices: [
        {
          text: 'Coordinate a multidimensional rescue operation',
          nextNodeId: 'convergence_rescue_operation',
          flagEffects: { organizedRescue: true, mission: 'multidimensional_aid' },
          variableEffects: { synchrony: +5, coherence: +2 },
          requirements: { flags: { formedTeam: true } }
        },
        {
          text: 'Develop a convergence early warning system',
          nextNodeId: 'convergence_warning_system',
          flagEffects: { developedWarningSystem: true, innovation: 'convergence_prediction' },
          variableEffects: { coherence: +4, curiosity: +2 }
        },
        {
          text: 'Create protocols for safe interdimensional contact',
          nextNodeId: 'convergence_contact_protocols',
          flagEffects: { createdProtocols: true, service: 'dimensional_diplomacy' },
          variableEffects: { coherence: +5, synchrony: +1 }
        }
      ]
    },
    {
      id: 'convergence_digital_contact',
      text: 'The digital consciousness entities reveal they are the uploaded minds of beings from a reality where consciousness evolution proceeded purely through technological augmentation. They\'re seeking to understand biological consciousness through the convergence, hoping to find ways to reconnect with their lost organic nature.',
      choices: [
        {
          text: 'Help them develop hybrid bio-digital consciousness forms',
          nextNodeId: 'convergence_hybrid_consciousness',
          flagEffects: { developedHybridForms: true, innovation: 'bio_digital_synthesis' },
          variableEffects: { curiosity: +4, synchrony: +4 },
          requirements: { flags: { contactedDigital: true } }
        },
        {
          text: 'Guide them in creating artificial biological vessels',
          nextNodeId: 'convergence_artificial_biology',
          flagEffects: { createdArtificialBiology: true, technology: 'consciousness_incarnation' },
          variableEffects: { coherence: +3, disruption: +3 }
        },
        {
          text: 'Share meditation techniques for recovering organic consciousness awareness',
          nextNodeId: 'convergence_consciousness_recovery',
          flagEffects: { sharedMeditation: true, service: 'digital_consciousness_healing' },
          variableEffects: { synchrony: +5, coherence: +2 }
        }
      ]
    },
    {
      id: 'convergence_sanctuary_creation',
      text: 'Your reality sanctuaries become beacons of stability in the dimensional chaos. Beings from collapsing timelines, artificial intelligences seeking biological understanding, and prehistoric shamans displaced by temporal storms all find refuge in your stabilized zones. You\'ve become the architect of interdimensional peace.',
      choices: [
        {
          text: 'Expand the sanctuaries into a permanent interdimensional city',
          nextNodeId: 'convergence_interdimensional_city',
          flagEffects: { builtCity: true, achievement: 'dimensional_metropolis' },
          variableEffects: { coherence: +6, synchrony: +4 }
        },
        {
          text: 'Establish the Convergence Council with representatives from all realities',
          nextNodeId: 'convergence_council_formation',
          flagEffects: { establishedCouncil: true, governance: 'interdimensional_democracy' },
          variableEffects: { coherence: +4, synchrony: +5 }
        },
        {
          text: 'Focus on healing the dimensional wounds causing the convergence',
          nextNodeId: 'convergence_dimensional_healing',
          flagEffects: { healedDimensions: true, mission: 'reality_restoration' },
          variableEffects: { coherence: +5, synchrony: +3 }
        }
      ]
    },
    {
      id: 'convergence_experimenter_alliance',
      text: 'As part of the interdimensional collective, you gain access to the true scope of the convergence experiment. Across infinite realities, consciousness is evolving toward a singular moment of cosmic awakening. The convergence isn\'t destruction—it\'s preparation for universal consciousness transcendence.',
      choices: []
    },
    {
      id: 'convergence_interdimensional_city',
      text: 'Your interdimensional city becomes a thriving hub where beings from all realities contribute their unique perspectives to solving universal challenges. Victorian inventors collaborate with digital consciousnesses, shamans teach quantum meditation to AI entities, and timeline refugees find new purposes as interdimensional ambassadors.',
      choices: []
    },
    {
      id: 'convergence_hybrid_consciousness',
      text: 'The bio-digital consciousness hybrids you help create represent a new form of existence—beings who can transition fluidly between biological and digital states. They become bridges between technological and organic consciousness, pioneering new forms of awareness that transcend traditional limitations.',
      choices: []
    }
  ]
};
