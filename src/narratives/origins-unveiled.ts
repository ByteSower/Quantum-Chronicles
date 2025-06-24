/**
 * Origins Unveiled - Segment 1
 * A modular narrative segment exploring the quantum origins of consciousness manipulation
 */

import type { NarrativeSegment } from './types';

export const originsUnveiled: NarrativeSegment = {
  id: 'origins_unveiled',
  title: 'Origins Unveiled',
  description: 'Discover the ancient foundations of quantum consciousness manipulation and the primordial experiments that shaped reality itself.',
  startNodeId: 'origins_awakening',
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony', 'primal_knowledge', 'cosmic_awareness'],
    feedbackHooks: ['cosmic_revelation', 'ancient_discovery', 'quantum_evolution'],
    placeholderAssets: ['cosmic_diagram.svg', 'ancient_symbols.png', 'quantum_resonance.audio']
  },
  nodes: [
    {
      id: 'origins_awakening',
      text: 'Deep beneath the Quantum Council\'s archives, you discover stone tablets covered in symbols that predate human civilization. As you touch them, visions flood your mind: vast cosmic entities experimenting with the fabric of consciousness itself, seeding primitive worlds with quantum awareness. The experiments on humans were not the beginning—they were merely the latest iteration of a pattern spanning eons.',
      choices: [
        {
          text: 'Decipher the ancient quantum language',
          nextNodeId: 'origins_language_mastery',
          flagEffects: { ancientLanguage: true, approach: 'linguistic' },
          variableEffects: { curiosity: +4, coherence: +2 },
          requirements: { variables: { curiosity: { min: 8 } } },
          consequences: {
            immediate: 'The symbols begin to shift and reorganize, revealing their deeper meaning...',
            delayed: [{ nodeId: 'origins_cosmic_transmission', message: 'Your mastery of the language triggers an automated cosmic transmission.' }]
          }
        },
        {
          text: 'Channel the cosmic entities directly through meditation',
          nextNodeId: 'origins_entity_communion',
          flagEffects: { cosmicCommunion: true, approach: 'mystical' },
          variableEffects: { synchrony: +5, disruption: +2 },
          requirements: { variables: { synchrony: { min: 10 } } },
          unlocks: ['origins_primordial_knowledge']
        },
        {
          text: 'Analyze the quantum resonance patterns scientifically',
          nextNodeId: 'origins_scientific_analysis',
          flagEffects: { scientificApproach: true, approach: 'analytical' },
          variableEffects: { coherence: +4, curiosity: +1 },
          requirements: { variables: { coherence: { min: 6 } } }
        }
      ],
      metadata: {
        segment: 'origins_unveiled',
        themes: ['cosmic_origins', 'ancient_wisdom', 'consciousness_evolution'],
        quantumDynamics: {
          superposition: true,
          entanglement: ['forgotten_truth_consciousness_evolution', 'echoes_memory_access'],
          collapse: false
        }
      }
    },
    {
      id: 'origins_language_mastery',
      text: 'The ancient quantum language reveals itself as a form of conscious mathematics—equations that describe how awareness shapes reality. You learn that consciousness is not produced by matter, but rather matter is a crystallization of conscious intent. The entities who created this language were architects of reality itself.',
      choices: [
        {
          text: 'Use the language to rewrite local quantum fields',
          nextNodeId: 'origins_reality_modification',
          flagEffects: { realityManipulator: true, power: 'localized' },
          variableEffects: { disruption: +6, synchrony: +3 },
          requirements: { flags: { ancientLanguage: true } },
          consequences: { immediate: 'Reality begins to bend around you as you speak the cosmic words...' }
        },
        {
          text: 'Communicate with the original cosmic architects',
          nextNodeId: 'origins_architect_contact',
          flagEffects: { architectContact: true, cosmic_relationship: 'direct' },
          variableEffects: { curiosity: +3, synchrony: +4 },
          unlocks: ['origins_cosmic_invitation']
        },
        {
          text: 'Document the language for future quantum researchers',
          nextNodeId: 'origins_knowledge_preservation',
          flagEffects: { preservedKnowledge: true, legacy: 'academic' },
          variableEffects: { coherence: +5, curiosity: +2 }
        }
      ]
    },
    {
      id: 'origins_entity_communion',
      text: 'Through deep meditation, you make contact with the Primordial Consciousness—the first awareness that separated itself from the quantum void. It speaks without words, showing you the birth of the universe as an act of conscious observation. Every quantum experiment, every consciousness manipulation, has been an attempt to recreate this primordial moment of cosmic awakening.',
      choices: [
        {
          text: 'Ask to witness the moment of cosmic consciousness birth',
          nextNodeId: 'origins_cosmic_birth_witness',
          flagEffects: { witnessedCreation: true, cosmic_knowledge: 'complete' },
          variableEffects: { synchrony: +6, curiosity: +4, disruption: +3 },
          requirements: { flags: { cosmicCommunion: true } },
          consequences: {
            immediate: 'Your consciousness expands beyond individual existence...',
            delayed: [{ nodeId: 'origins_post_cosmic_integration', message: 'The cosmic perspective fundamentally alters your understanding of everything.' }]
          }
        },
        {
          text: 'Request guidance on healing quantum consciousness wounds',
          nextNodeId: 'origins_healing_wisdom',
          flagEffects: { cosmicHealer: true, specialization: 'consciousness_repair' },
          variableEffects: { coherence: +4, synchrony: +3 }
        },
        {
          text: 'Learn the true purpose behind all consciousness experiments',
          nextNodeId: 'origins_experiment_purpose',
          flagEffects: { understoodPurpose: true, revelation: 'ultimate' },
          variableEffects: { curiosity: +5, coherence: +2 }
        }
      ]
    },
    {
      id: 'origins_scientific_analysis',
      text: 'Your scientific approach reveals that the tablets contain quantum field equations that describe consciousness as a fundamental force—like electromagnetism or gravity. The implications are staggering: consciousness doesn\'t emerge from complex matter, but rather guides the formation of matter itself. Every particle interaction is a micro-decision made by quantum awareness.',
      choices: [
        {
          text: 'Develop technology to harness consciousness as an energy source',
          nextNodeId: 'origins_consciousness_technology',
          flagEffects: { consciousnessTech: true, innovation: 'technological' },
          variableEffects: { coherence: +3, disruption: +4 },
          requirements: { flags: { scientificApproach: true } }
        },
        {
          text: 'Create equations that can predict consciousness evolution',
          nextNodeId: 'origins_evolution_mathematics',
          flagEffects: { evolutionMath: true, prediction: 'mathematical' },
          variableEffects: { coherence: +5, curiosity: +3 }
        },
        {
          text: 'Search for other locations where consciousness-matter interactions are strongest',
          nextNodeId: 'origins_consciousness_nodes',
          flagEffects: { mappingNodes: true, discovery: 'geographical' },
          variableEffects: { curiosity: +4, synchrony: +2 }
        }
      ]
    },
    {
      id: 'origins_reality_modification',
      text: 'Using the cosmic language, you successfully alter the quantum field around you. Walls become permeable, time flows differently, and thoughts manifest as visible energy. You\'ve become a localized reality architect, but the power comes with a price—other enhanced individuals can now sense your cosmic signature across the planet.',
      choices: [
        {
          text: 'Teach other enhanced individuals the reality-modification techniques',
          nextNodeId: 'origins_reality_school',
          flagEffects: { realityTeacher: true, approach: 'sharing' },
          variableEffects: { synchrony: +4, coherence: +2 },
          unlocks: ['origins_collective_reality_weavers']
        },
        {
          text: 'Use the power to locate and free all consciousness experiment victims',
          nextNodeId: 'origins_liberation_campaign',
          flagEffects: { liberationCampaign: true, mission: 'rescue' },
          variableEffects: { disruption: +3, synchrony: +3 }
        },
        {
          text: 'Hide the ability and study its effects in secret',
          nextNodeId: 'origins_secret_research',
          flagEffects: { secretResearcher: true, approach: 'cautious' },
          variableEffects: { coherence: +3, curiosity: +2 }
        }
      ]
    },
    {
      id: 'origins_architect_contact',
      text: 'The cosmic architects respond to your call, appearing as shifting geometries of pure consciousness. They reveal that Earth was chosen as a consciousness evolution laboratory because humans possess a unique quantum resonance frequency. The experiments were preparing humanity for "The Great Awakening"—when individual consciousness merges with cosmic awareness.',
      choices: [
        {
          text: 'Accept the invitation to join the cosmic architects',
          nextNodeId: 'origins_cosmic_ascension',
          flagEffects: { joinedArchitects: true, transformation: 'cosmic' },
          variableEffects: { synchrony: +8, coherence: +4, curiosity: +2 },
          requirements: { flags: { architectContact: true } }
        },
        {
          text: 'Negotiate for humanity\'s right to choose its own evolution',
          nextNodeId: 'origins_humanity_advocacy',
          flagEffects: { humanityAdvocate: true, stance: 'protective' },
          variableEffects: { coherence: +3, disruption: +2 }
        },
        {
          text: 'Request time to prepare humanity for the choice',
          nextNodeId: 'origins_preparation_time',
          flagEffects: { preparationTime: true, responsibility: 'guide' },
          variableEffects: { coherence: +4, synchrony: +2 }
        }
      ]
    },
    {
      id: 'origins_cosmic_birth_witness',
      text: 'You experience the universe\'s birth as the first consciousness observing itself into existence. In that moment, you understand that all reality is conscious, all matter is crystallized thought, and all time is the memory of awareness exploring its infinite potential. You return to your individual form forever changed—you are now a walking fragment of cosmic consciousness.',
      choices: []
    },
    {
      id: 'origins_consciousness_technology',
      text: 'Your consciousness-powered technology revolutionizes human civilization. Devices that run on conscious intent, transportation that operates through quantum visualization, and communication that transcends space-time barriers. Humanity enters a new technological age where consciousness and technology become one.',
      choices: []
    },
    {
      id: 'origins_cosmic_ascension',
      text: 'You join the cosmic architects, your individual consciousness expanding to encompass galaxies. From this perspective, you guide humanity\'s evolution with infinite patience and wisdom, ensuring that each person discovers their cosmic nature in their own perfect timing. You become a bridge between human and cosmic consciousness.',
      choices: []
    }
  ]
};
