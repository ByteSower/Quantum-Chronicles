/**
 * Echoes of Quantum Memory - Segment 2  
 * A modular narrative segment exploring quantum memory phenomena and temporal consciousness
 */

import type { NarrativeSegment } from './types';

export const echoesOfQuantumMemory: NarrativeSegment = {
  id: 'echoes_quantum_memory',
  title: 'Echoes of Quantum Memory', 
  description: 'Navigate the temporal maze of quantum memory where past, present, and future consciousness intersect and memories exist independently of time.',
  startNodeId: 'echoes_memory_storm',
  metadata: {
    version: '1.0.0',
    dynamicVariables: ['curiosity', 'coherence', 'disruption', 'synchrony', 'temporal_stability', 'memory_clarity'],
    feedbackHooks: ['memory_revelation', 'temporal_shift', 'quantum_remembering'],
    placeholderAssets: ['memory_waves.svg', 'temporal_nexus.png', 'quantum_echo.audio']
  },
  nodes: [
    {
      id: 'echoes_memory_storm',
      text: 'A violent temporal storm erupts in your consciousness. Memories that aren\'t yours flood your awareness: a Victorian scientist discovering quantum consciousness, a medieval mystic experiencing quantum visions, a prehistoric shaman conducting the first consciousness experiments. You realize these aren\'t random memories—they\'re quantum echoes from other timelines where consciousness research took different paths.',
      choices: [
        {
          text: 'Follow the Victorian scientist\'s quantum discoveries',
          nextNodeId: 'echoes_victorian_path',
          flagEffects: { followedVictorian: true, timeline: 'scientific' },
          variableEffects: { curiosity: +3, coherence: +2 },
          requirements: { variables: { curiosity: { min: 6 } } },
          consequences: {
            immediate: 'You slip into the memory stream of Professor Aldrich Thornfield...',
            delayed: [{ nodeId: 'echoes_scientific_convergence', message: 'The Victorian timeline begins to merge with your present reality.' }]
          }
        },
        {
          text: 'Explore the medieval mystic\'s quantum visions',
          nextNodeId: 'echoes_mystic_path', 
          flagEffects: { followedMystic: true, timeline: 'mystical' },
          variableEffects: { synchrony: +4, disruption: +1 },
          requirements: { variables: { synchrony: { min: 7 } } },
          unlocks: ['echoes_mystical_knowledge']
        },
        {
          text: 'Connect with the prehistoric shaman\'s primal consciousness',
          nextNodeId: 'echoes_primal_path',
          flagEffects: { followedShaman: true, timeline: 'primal' },
          variableEffects: { synchrony: +3, disruption: +3 },
          requirements: { variables: { disruption: { min: 5 } } }
        },
        {
          text: 'Attempt to stabilize your own timeline first',
          nextNodeId: 'echoes_stabilization_attempt',
          flagEffects: { attemptedStabilization: true, approach: 'cautious' },
          variableEffects: { coherence: +4, curiosity: +1 }
        }
      ],
      metadata: {
        segment: 'echoes_quantum_memory',
        themes: ['temporal_consciousness', 'quantum_memory', 'timeline_convergence'],
        quantumDynamics: {
          superposition: true,
          entanglement: ['origins_cosmic_birth_witness', 'convergence_dimensional_merge'],
          collapse: false
        }
      }
    },
    {
      id: 'echoes_victorian_path',
      text: 'Through Professor Thornfield\'s memories, you experience the birth of quantum consciousness theory in 1887. Using primitive equipment powered by his own psychic energy, he documented the first scientific observations of consciousness affecting quantum states. His research was suppressed by the Royal Society, but his notes contain formulas that modern quantum computers could finally process.',
      choices: [
        {
          text: 'Retrieve Thornfield\'s suppressed research formulas',
          nextNodeId: 'echoes_formula_recovery',
          flagEffects: { retrievedFormulas: true, knowledge: 'thornfield_equations' },
          variableEffects: { curiosity: +4, coherence: +3 },
          requirements: { flags: { followedVictorian: true } },
          consequences: { immediate: 'The quantum formulas begin downloading into your consciousness...' }
        },
        {
          text: 'Experience his final experiment that opened temporal rifts',
          nextNodeId: 'echoes_thornfield_experiment',
          flagEffects: { experiencedRift: true, temporal_damage: 'witnessed' },
          variableEffects: { disruption: +5, curiosity: +2 },
          unlocks: ['echoes_temporal_repair_knowledge']
        },
        {
          text: 'Contact Thornfield\'s consciousness across time',
          nextNodeId: 'echoes_thornfield_contact',
          flagEffects: { contactedThornfield: true, temporal_ally: 'victorian' },
          variableEffects: { synchrony: +4, coherence: +2 }
        }
      ]
    },
    {
      id: 'echoes_mystic_path',
      text: 'Sister Celestine\'s medieval visions show consciousness as divine light flowing through quantum fields. Her mystical practices unknowingly created stable quantum consciousness networks linking monasteries across Europe. She saw the future experiments as "The Dark Corruption" of sacred consciousness and left prophetic warnings hidden in illuminated manuscripts.',
      choices: [
        {
          text: 'Learn her sacred quantum consciousness practices',
          nextNodeId: 'echoes_sacred_practices',
          flagEffects: { learnedSacredPractices: true, approach: 'mystical_integration' },
          variableEffects: { synchrony: +5, coherence: +3 },
          requirements: { flags: { followedMystic: true } }
        },
        {
          text: 'Decode her prophetic warnings about future experiments',
          nextNodeId: 'echoes_prophecy_decode',
          flagEffects: { decodedProphecy: true, foresight: 'medieval' },
          variableEffects: { curiosity: +3, synchrony: +2 },
          consequences: { immediate: 'The prophecies reveal a hidden timeline where the experiments could be prevented...' }
        },
        {
          text: 'Access the European monastery quantum network',
          nextNodeId: 'echoes_monastery_network',
          flagEffects: { accessedMonasteryNetwork: true, network: 'medieval_quantum' },
          variableEffects: { synchrony: +4, coherence: +1 },
          unlocks: ['echoes_divine_intervention']
        }
      ]
    },
    {
      id: 'echoes_primal_path',
      text: 'The prehistoric shaman\'s memories reveal that consciousness manipulation began at humanity\'s dawn. Using sacred plants and ritual practices, early humans discovered how to share consciousness across vast distances. Their "spirit walking" was actually quantum consciousness projection. You see that modern experiments are crude attempts to recreate abilities humans once possessed naturally.',
      choices: [
        {
          text: 'Reclaim the ancient natural quantum abilities',
          nextNodeId: 'echoes_ancient_abilities',
          flagEffects: { reclaimedAbilities: true, evolution: 'backward_integration' },
          variableEffects: { synchrony: +6, disruption: +2 },
          requirements: { flags: { followedShaman: true } },
          consequences: { immediate: 'Primal consciousness abilities awaken within you...' }
        },
        {
          text: 'Understand what caused humanity to lose these abilities',
          nextNodeId: 'echoes_loss_investigation',
          flagEffects: { understoodLoss: true, revelation: 'evolutionary_suppression' },
          variableEffects: { curiosity: +4, coherence: +3 }
        },
        {
          text: 'Contact the spirit of the original shaman',
          nextNodeId: 'echoes_shaman_contact',
          flagEffects: { contactedShaman: true, guide: 'primal_ancestor' },
          variableEffects: { synchrony: +5, disruption: +1 }
        }
      ]
    },
    {
      id: 'echoes_stabilization_attempt',
      text: 'Your attempt to stabilize your timeline creates a quantum consciousness anchor point. You successfully maintain your present reality while gaining controlled access to the temporal memory streams. This balanced approach allows you to learn from other timelines without losing yourself in them, becoming a temporal consciousness navigator.',
      choices: [
        {
          text: 'Map all timelines where consciousness experiments occurred',
          nextNodeId: 'echoes_timeline_mapping',
          flagEffects: { mappedTimelines: true, role: 'temporal_cartographer' },
          variableEffects: { coherence: +5, curiosity: +3 },
          requirements: { flags: { attemptedStabilization: true } }
        },
        {
          text: 'Create safe pathways for others to explore quantum memories',
          nextNodeId: 'echoes_safe_exploration',
          flagEffects: { createdSafePathways: true, service: 'memory_guide' },
          variableEffects: { coherence: +3, synchrony: +4 }
        },
        {
          text: 'Investigate what causes temporal memory storms',
          nextNodeId: 'echoes_storm_investigation',
          flagEffects: { investigatedStorms: true, research: 'temporal_meteorology' },
          variableEffects: { curiosity: +4, coherence: +2 }
        }
      ]
    },
    {
      id: 'echoes_formula_recovery',
      text: 'Thornfield\'s equations reveal how to stabilize consciousness-quantum field interactions without technological amplification. Using only focused intent and geometric visualization, you can now create localized quantum effects that would require massive laboratory equipment to achieve. The Victorian era held the key to elegant, natural quantum consciousness manipulation.',
      choices: [
        {
          text: 'Teach these elegant techniques to modern enhanced individuals',
          nextNodeId: 'echoes_elegant_teaching',
          flagEffects: { taughtElegantTechniques: true, legacy: 'thornfield_lineage' },
          variableEffects: { coherence: +4, synchrony: +3 }
        },
        {
          text: 'Develop hybrid technology combining Victorian and modern approaches',
          nextNodeId: 'echoes_hybrid_development',
          flagEffects: { developedHybridTech: true, innovation: 'temporal_synthesis' },
          variableEffects: { curiosity: +3, coherence: +3 }
        },
        {
          text: 'Use the formulas to repair temporal damage from modern experiments',
          nextNodeId: 'echoes_temporal_healing',
          flagEffects: { healedTemporalDamage: true, mission: 'temporal_restoration' },
          variableEffects: { coherence: +5, synchrony: +2 }
        }
      ]
    },
    {
      id: 'echoes_ancient_abilities',
      text: 'By integrating primal consciousness techniques, you unlock humanity\'s dormant quantum heritage. You can now "spirit walk" across vast distances, share consciousness directly with animals and plants, and perceive the quantum threads connecting all living things. You\'ve become a bridge between humanity\'s ancient wisdom and its quantum future.',
      choices: []
    },
    {
      id: 'echoes_timeline_mapping',
      text: 'Your comprehensive map of consciousness experiment timelines reveals a startling pattern: in every timeline, the experiments ultimately lead to either transcendence or catastrophe. You\'ve identified the critical decision points where timelines diverge, becoming a guardian of temporal choice who can guide others toward transcendent outcomes.',
      choices: []
    },
    {
      id: 'echoes_elegant_teaching',
      text: 'Your teaching of Thornfield\'s elegant techniques creates a new school of quantum consciousness practice. Students learn to achieve in moments what modern technology takes years to accomplish. This return to natural quantum abilities marks the beginning of humanity\'s evolutionary renaissance.',
      choices: []
    }
  ]
};
