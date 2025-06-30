import type { NarrativeSegment, NarrativeNode } from '../types';
import { flagIncrement } from '../../utils/narrativeUtils';
import { nodes as partI } from './forgottenTruth_partI';
import { nodes as partII } from './forgottenTruth_partII';
import { nodes as partIII } from './forgottenTruth_partIII';
import { nodes as partIV } from './forgottenTruth_partIV';
import { nodes as partV } from './forgottenTruth_partV';
import { nodes as partVI } from './forgottenTruth_partVI';
import { nodes as partVII } from './forgottenTruth_partVII';
import { nodes as partVIII } from './forgottenTruth_partVIII';

// Node definitions for each expansion, converted to the new format
// (These would be the full lists of nodes from the deleted files)
const originsNodes: NarrativeNode[] = [
  {
    nodeId: 'origins:origins_gateway',
    text: 'Your investigation into the Quantum Council leads you to an ancient library hidden beneath the Vatican. Here, among manuscripts that predate known history, you discover references to "The First Consciousness" - a civilization that mastered quantum awareness millennia ago. The documents suggest that modern experiments are crude attempts to recreate their lost techniques.',
    choices: [
      {
        choiceText: 'Decipher the ancient quantum consciousness texts',
        nextNodeId: 'origins:ancient_knowledge',
        flagUpdates: [{ flag: 'studiedAncientTexts', operation: 'set', value: true }, { flag: 'knowledgeSourceAncient', operation: 'set', value: true }],
        conditions: [{ flag: 'curiosity', operator: '>=', value: 12 }, { flag: 'coherence', operator: '>=', value: 10 }]
      },
      {
        choiceText: 'Search for physical artifacts of the First Consciousness',
        nextNodeId: 'origins:artifact_quest',
        flagUpdates: [{ flag: 'seekingArtifacts', operation: 'set', value: true }, { flag: 'approachArchaeological', operation: 'set', value: true }]
      },
      {
        choiceText: 'Investigate how the Quantum Council discovered this knowledge',
        nextNodeId: 'origins:council_origins',
        flagUpdates: [{ flag: 'investigatingCouncil', operation: 'set', value: true }, { flag: 'approachContemporary', operation: 'set', value: true }],
        conditions: [{ flag: 'discoveredConspiracy', operator: '===', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:ancient_knowledge',
    text: 'The ancient texts reveal a stunning truth: consciousness was never meant to be confined to individual minds. The First Consciousness achieved collective awareness through quantum resonance techniques, creating a civilization that existed in perpetual harmony between thought and reality. Modern experiments are destructive because they force artificial entanglement instead of natural evolution.',
    choices: [
      {
        choiceText: 'Attempt to recreate their natural consciousness evolution methods',
        nextNodeId: 'origins:natural_evolution',
        flagUpdates: [{ flag: 'adoptedAncientMethods', operation: 'set', value: true }, { flag: 'evolutionNatural', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 15 }]
      },
      {
        choiceText: 'Use this knowledge to heal the damage from modern experiments',
        nextNodeId: 'origins:healing_damage',
        flagUpdates: [{ flag: 'focusOnHealing', operation: 'set', value: true }, { flag: 'approachRedemptive', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:artifact_quest',
    text: 'Your search for physical artifacts leads you to hidden chambers beneath ancient monuments worldwide. In these sacred spaces, you discover crystalline devices that pulse with residual quantum energy. The artifacts appear to be fragments of a vast consciousness network - organic computers that once linked minds across continents. Touching one floods your awareness with visions of the First Consciousness at the height of their power.',
    choices: [
      {
        choiceText: 'Try to activate the artifact network',
        nextNodeId: 'origins:network_activation',
        flagUpdates: [{ flag: 'activatedArtifacts', operation: 'set', value: true }, { flag: 'riskTaker', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 12 }]
      },
      {
        choiceText: 'Study the artifacts to understand their construction',
        nextNodeId: 'origins:artifact_study',
        flagUpdates: [{ flag: 'studiedArtifacts', operation: 'set', value: true }, { flag: 'approachScientific', operation: 'set', value: true }]
      },
      {
        choiceText: 'Protect the artifacts from those who would misuse them',
        nextNodeId: 'origins:artifact_protection',
        flagUpdates: [{ flag: 'protectingArtifacts', operation: 'set', value: true }, { flag: 'guardianMindset', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:network_activation',
    text: 'When you activate the artifact network, reality shifts around you. For a brief moment, you experience consciousness as the First Consciousness did - unbounded, connected to every living thing, aware of the quantum threads that bind all existence. But the modern world cannot sustain such awareness. The network overloads, and you must choose whether to try to stabilize it or let it safely shut down.',
    choices: [
      {
        choiceText: 'Risk everything to stabilize the network',
        nextNodeId: 'origins:transcendence_attempt',
        flagUpdates: [{ flag: 'transcendenceRisk', operation: 'set', value: true }],
        conditions: [{ flag: 'riskTaker', operator: '===', value: true }]
      },
      {
        choiceText: 'Safely shut down the network and preserve the knowledge',
        nextNodeId: 'origins:preserved_wisdom',
        flagUpdates: [{ flag: 'preservedWisdom', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:artifact_study',
    text: 'Your careful study reveals that the artifacts are not just technology - they are crystallized consciousness, frozen moments of the First Consciousness\'s collective awareness. Each device contains the memories, emotions, and knowledge of thousands of beings who willingly merged their essence into these quantum matrices. You realize that reactivating them would not just be using tools, but awakening sleeping minds.',
    choices: [
      {
        choiceText: 'Attempt to communicate with the sleeping consciousness',
        nextNodeId: 'origins:communion_attempt',
        flagUpdates: [{ flag: 'communedWithAncients', operation: 'set', value: true }]
      },
      {
        choiceText: 'Document everything and seal the chambers',
        nextNodeId: 'origins:knowledge_preservation',
        flagUpdates: [{ flag: 'preservedKnowledge', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:artifact_protection',
    text: 'You establish a network of guardians to protect the artifacts from those who would exploit them. Working with enhanced individuals and sympathetic researchers, you create hidden sanctuaries where the ancient devices can rest undisturbed. Your protection efforts attract the attention of the Quantum Council, who see you as either a valuable ally or a dangerous obstacle.',
    choices: [
      {
        choiceText: 'Form an alliance with trustworthy Council members',
        nextNodeId: 'origins:council_alliance',
        flagUpdates: [{ flag: 'councilAlliance', operation: 'set', value: true }]
      },
      {
        choiceText: 'Remain independent and trust no one',
        nextNodeId: 'origins:lone_guardian',
        flagUpdates: [{ flag: 'loneGuardian', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:transcendence_attempt',
    text: 'Your attempt to stabilize the ancient network succeeds beyond your wildest dreams. The First Consciousness awakens within you, not as a possession but as a partnership. You become a bridge between the ancient wisdom and the modern world, tasked with guiding humanity\'s evolution without repeating the mistakes of the past.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:preserved_wisdom',
    text: 'By safely shutting down the network, you preserve both the ancient wisdom and the future\'s potential. The artifacts remain dormant but accessible, waiting for humanity to evolve naturally to the point where they can be safely reactivated. You become the keeper of this knowledge, preparing for the day when the world will be ready.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:communion_attempt',
    text: 'Your attempt to communicate with the sleeping consciousness succeeds. The ancient minds are vast and alien, but kind. They share visions of what was, what is, and what could be. They warn you that the current experiments risk awakening something far more dangerous than consciousness enhancement - they risk tearing the barriers between dimensions where darker entities wait.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:knowledge_preservation',
    text: 'You document everything meticulously and seal the chambers with both physical and quantum locks. Your preservation efforts ensure that the knowledge will survive, but only for those wise enough to seek it out and patient enough to understand it. The ancient wisdom becomes a hidden treasure, waiting for the right time to emerge.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:council_alliance',
    text: 'Your alliance with select Council members creates a new faction dedicated to responsible consciousness research. Together, you work to guide the experiments away from their most dangerous paths while protecting the ancient artifacts from those who would abuse them. It\'s delicate work, but essential for humanity\'s future.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:lone_guardian',
    text: 'As a lone guardian, you become a legend whispered about in consciousness research circles. The mysterious protector who appears whenever someone gets too close to dangerous ancient technologies. Your independence comes at a cost - isolation - but it ensures that no one can corrupt your mission or compromise the artifacts\' safety.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  }
];

// Missing Origins Nodes - Added to fix navigation issues
const missingOriginNodes: NarrativeNode[] = [
  {
    nodeId: 'origins:council_origins',
    text: 'You discover that the Quantum Council\'s knowledge didn\'t originate with them. They found these techniques in ancient texts, artifacts, and sites that predate recorded history. The trail leads to something far older and more dangerous than modern science.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:natural_evolution',
    text: 'Following the ancient methods, you begin to understand that consciousness evolution was meant to be gradual, organic, and consensual. Modern experiments violate this natural process, creating dangerous instabilities that threaten the fabric of reality itself.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
  {
    nodeId: 'origins:healing_damage',
    text: 'Using ancient wisdom, you work to heal the damage caused by forced consciousness manipulation. The process is slow but profound, teaching you that some knowledge comes with the responsibility to repair what has been broken.',
    choices: [
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  }
];

// Placeholder arrays for legacy expansion segments (to be implemented later)
const memoryEchoesNodes: NarrativeNode[] = [];
const realmConvergenceNodes: NarrativeNode[] = [];
const catalystRevelationNodes: NarrativeNode[] = [];
const quantumLegacyNodes: NarrativeNode[] = [];

// Story completion/exit nodes (feedbackHooks removed to prevent conflicts with navigation)
const exitNodes: NarrativeNode[] = [
  {
    nodeId: 'ft_exit_revelation_complete',
    text: 'You have uncovered the full truth behind the consciousness experiments. The revelation has changed not just your understanding, but your very nature. As you contemplate what comes next, you realize this is only the beginning of a new chapter in human evolution. The quantum threads of your choices will echo through time.',
    choices: []
  },
  {
    nodeId: 'ft_exit_coalition_formed', 
    text: 'Your coalition of enhanced individuals has laid the groundwork for humanity\'s conscious evolution. The network of allies you\'ve built spans the globe, ready to guide the species through this transition. Your journey of discovery becomes the foundation for countless others who will follow.',
    choices: []
  },
  {
    nodeId: 'ft_exit_sacrifice_made',
    text: 'Your sacrifice has protected humanity from the dangerous extremes of consciousness manipulation. Though the cost was high, your actions have ensured that the future of human awareness will be shaped by wisdom rather than reckless ambition. The quantum echoes of your choices will resonate through generations.',
    choices: []
  },
  {
    nodeId: 'ft_exit_transcendence',
    text: 'You have transcended the boundaries between individual and collective consciousness. No longer bound by the limitations of a single mind, you exist as a bridge between humanity\'s past and its quantum future. Your transformation opens pathways that others will one day follow.',
    choices: []
  }
];

// Missing core nodes that are referenced but not defined
const missingCoreNodes: NarrativeNode[] = [
  // Connector nodes to return from expansion segments
  {
    nodeId: 'ft_returnFromOrigins',
    text: 'Having explored the ancient origins of consciousness manipulation, you return to your investigation with new understanding. The patterns are becoming clearer - this conspiracy has roots that stretch back millennia.',
    choices: [
      {
        choiceText: 'Continue investigating the global conspiracy',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('coherence', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_returnFromEcho',
    text: 'The memory echoes have revealed crucial pieces of the puzzle. You return to your investigation with fragments of suppressed memories that shed new light on the conspiracy\'s scope.',
    choices: [
      {
        choiceText: 'Continue investigating the global conspiracy',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('curiosity', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_returnFromConvergence',
    text: 'Your journey through converging realms has shown you the true scale of dimensional manipulation. Armed with this knowledge, you return to unraveling the conspiracy that spans multiple realities.',
    choices: [
      {
        choiceText: 'Continue investigating the global conspiracy',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('synchrony', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_returnFromCatalyst',
    text: 'Understanding the catalyst\'s role in the revelation has given you new insight into the forces at play. You return to your investigation with a clearer picture of what drives this conspiracy.',
    choices: [
      {
        choiceText: 'Continue investigating the global conspiracy',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('disruption', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_returnFromLegacy',
    text: 'Examining the quantum legacy has revealed the long-term implications of the conspiracy. You return to your investigation with understanding of what\'s at stake for humanity\'s future.',
    choices: [
      {
        choiceText: 'Continue investigating the global conspiracy',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('coherence', 1)]
      }
    ]
  },
  // Additional missing nodes for choice paths
  {
    nodeId: 'ft_documentNetwork',
    text: 'You meticulously document the quantum network patterns, creating detailed maps of signal flows and synchronization pulses. Your documentation reveals disturbing symmetries - the network isn\'t just coordinating experiments, it\'s learning from them. Each facility feeds data into a central intelligence that grows more sophisticated with every test.',
    choices: [
      {
        choiceText: 'Investigate the central intelligence',
        nextNodeId: 'ft_traceSource',
        flagUpdates: [flagIncrement('curiosity', 2)]
      },
      {
        choiceText: 'Focus on the experimental data being collected',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('coherence', 1)]
      },
      {
        choiceText: 'Try to disrupt the network',
        nextNodeId: 'ft_disruptNetwork',
        flagUpdates: [flagIncrement('disruption', 2)]
      }
    ]
  },

  {
    nodeId: 'ft_disruptNetwork',
    text: 'You attempt to disrupt the quantum network using the patterns you\'ve documented. For a brief moment, you succeed - facilities worldwide go dark. But the network adapts quickly, rerouting through quantum channels you didn\'t know existed. Your interference has been noted, and now something is coming for you.',
    choices: [
      {
        choiceText: 'Go into hiding and continue investigating covertly',
        nextNodeId: 'ft_globalConspiracy',
        flagUpdates: [flagIncrement('coherence', 1)]
      },
      {
        choiceText: 'Expose everything before they can stop you',
        nextNodeId: 'ft_exposeTruth',
        flagUpdates: [flagIncrement('disruption', 3)]
      }
    ]
  },

  {
    nodeId: 'ft_followMoney',
    text: 'Following the money trail reveals a web of shell companies, government black budgets, and private foundations spanning decades. The funding sources include tech billionaires, defense contractors, and what appear to be legitimate medical research institutions. But deeper investigation reveals they\'re all connected to a single shadowy organization that has been manipulating consciousness research since the 1940s.',
    choices: [
      {
        choiceText: 'Investigate the shadowy organization',
        nextNodeId: 'ft_traceSource',
        conditions: [{ flag: 'investigatedMoney', operator: '===', value: true }],
        flagUpdates: [flagIncrement('curiosity', 2)]
      },
      {
        choiceText: 'Focus on the tech billionaire connections',
        nextNodeId: 'ft_traceSource',
        flagUpdates: [flagIncrement('coherence', 1)]
      },
      {
        choiceText: 'Expose the funding network publicly',
        nextNodeId: 'ft_exposeTruth',
        flagUpdates: [flagIncrement('disruption', 2)]
      }
    ]
  },

  {
    nodeId: 'ft_stabilizeReality',
    text: 'You attempt to stabilize the fracturing reality using the techniques you\'ve learned. Drawing on quantum consciousness principles, you focus your enhanced awareness on reinforcing the dimensional barriers. For a moment, the chaotic energies calm, but the effort is exhausting. You realize that stabilization requires more than individual action - it needs coordinated effort from others like you.',
    choices: [
      {
        choiceText: 'Seek out other enhanced individuals to help',
        nextNodeId: 'ft_findAllies',
        flagUpdates: [flagIncrement('synchrony', 2)]
      },
      {
        choiceText: 'Focus on understanding the source of the instability',
        nextNodeId: 'ft_traceSource',
        conditions: [{ flag: 'tracedSource', operator: '!==', value: true }],
        flagUpdates: [flagIncrement('coherence', 2), { flag: 'tracedSource', operation: 'set', value: true }]
      },
      {
        choiceText: 'Accept that some fractures may be irreversible',
        nextNodeId: 'ft_buildCoalition',
        flagUpdates: [flagIncrement('disruption', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_immediateProtection',
    text: 'You focus on creating immediate safeguards for consciousness-enhanced individuals. Working with government contacts and fellow enhanced humans, you establish protection protocols and safe houses. The work is dangerous - powerful forces want to continue the experiments - but your dedication saves lives.',
    choices: [
      {
        choiceText: 'Sacrifice yourself to ensure the protections remain in place',
        nextNodeId: 'ft_exit_sacrifice_made',
        conditions: [{ flag: 'coherence', operator: '>=', value: 10 }],
        flagUpdates: [flagIncrement('coherence', 2)]
      },
      {
        choiceText: 'Build the coalition to continue the work',
        nextNodeId: 'ft_buildCoalition',
        flagUpdates: [flagIncrement('synchrony', 1)]
      },
      {
        choiceText: 'Reveal the truth to protect everyone',
        nextNodeId: 'ft_exit_revelation_complete',
        flagUpdates: [flagIncrement('curiosity', 1)]
      }
    ]
  },
  {
    nodeId: 'ft_exposeTruth',
    text: 'You decide to expose the entire conspiracy to the world. The revelation causes massive upheaval - governments fall, public trust shatters, but the truth finally emerges. Enhanced individuals come forward, and humanity begins to grapple with its quantum future.',
    choices: [
      {
        choiceText: 'Accept your role as a guide for the awakening',
        nextNodeId: 'ft_exit_transcendence',
        conditions: [{ flag: 'synchrony', operator: '>=', value: 8 }],
        flagUpdates: [flagIncrement('synchrony', 3)]
      },
      {
        choiceText: 'Form a coalition to manage the transition',
        nextNodeId: 'ft_exit_coalition_formed',
        flagUpdates: [flagIncrement('coherence', 1)]
      },
      {
        choiceText: 'Document everything for future generations',
        nextNodeId: 'ft_exit_revelation_complete',
        flagUpdates: [flagIncrement('curiosity', 2)]
      }
    ]
  },
  {
    nodeId: 'ft_studyEntity',
    text: 'You carefully study the orchestrating entity\'s methods and motivations. Through quantum consciousness techniques, you begin to understand its true nature - neither malevolent nor benevolent, but utterly focused on humanity\'s survival through transformation.',
    choices: [
      {
        choiceText: 'Merge your consciousness with the entity to understand completely',
        nextNodeId: 'ft_exit_transcendence',
        conditions: [{ flag: 'curiosity', operator: '>=', value: 12 }],
        flagUpdates: [flagIncrement('disruption', 2)]
      },
      {
        choiceText: 'Use your knowledge to build a better coalition',
        nextNodeId: 'ft_buildCoalition',
        flagUpdates: [flagIncrement('coherence', 2)]
      },
      {
        choiceText: 'Share your findings with the world',
        nextNodeId: 'ft_exposeTruth',
        flagUpdates: [flagIncrement('curiosity', 1)]
      }
    ]
  }
];

export const forgottenTruth: NarrativeSegment = {
  segmentId: 'forgottenTruth',
  title: 'The Forgotten Truth',
  description: 'Uncover the hidden conspiracy behind quantum consciousness experiments and discover the ancient origins of human awareness manipulation across time and dimension.',
  startNodeId: 'ft_journalDiscovery',
  exitPoints: [],
  initialFlags: {
    curiosity: 0,
    coherence: 0,
    synchrony: 0,
    disruption: 0
  },
  initialVariables: {},
  globalFlagDecay: 0.1,
  nodes: [
    // TRUE BEGINNING - The Journal Discovery
    {
      nodeId: 'ft_journalDiscovery',
      text: 'In the quiet town of Millbrook, you\'ve always felt something was missing from your memories. Today, you found an old journal hidden in your grandmother\'s attic. The first entry reads: "The truth they made us forget is more dangerous than any lie." Your hands tremble as you realize this is your handwriting—but you have no memory of writing it.',
      choices: [
        {
          choiceText: 'Read the journal immediately',
          nextNodeId: 'ft_readJournal',
          flagUpdates: [flagIncrement('curiosity', 2)],
        },
        {
          choiceText: 'Research your grandmother\'s past first',
          nextNodeId: 'ft_researchGrandmother',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
        {
          choiceText: 'Confront your family about the memories',
          nextNodeId: 'ft_confrontFamily',
          flagUpdates: [flagIncrement('disruption', 1)],
        }
      ]
    },

    // Bridge nodes from the journal discovery to the main investigation
    {
      nodeId: 'ft_readJournal',
      text: 'The journal entries reveal a chilling story: experiments on consciousness, memory manipulation, and a place called the Blackwood Institute. The final entry, dated just days before your grandmother\'s mysterious disappearance, reads: "They\'re coming for me. If you\'re reading this, you need to know the truth about what they did to us." This isn\'t fiction—it\'s a warning.',
      choices: [
        {
          choiceText: 'Investigate the Blackwood Institute',
          nextNodeId: 'ft_investigateInstitute',
          flagUpdates: [flagIncrement('curiosity', 1)],
        },
        {
          choiceText: 'Search for more evidence of the experiments',
          nextNodeId: 'ft_globalConspiracy',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_researchGrandmother',
      text: 'Your research into your grandmother\'s past reveals disturbing gaps. Official records are heavily redacted, but you find traces: medical files from an institute that "officially" never existed, payments from government sources, and testimonies from other families about similar disappearances in the 1980s.',
      choices: [
        {
          choiceText: 'Follow the trail of the mysterious institute',
          nextNodeId: 'ft_investigateInstitute',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
        {
          choiceText: 'Contact other affected families',
          nextNodeId: 'ft_globalConspiracy',
          flagUpdates: [flagIncrement('synchrony', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_confrontFamily',
      text: 'When you confront your family about the missing memories, their reactions are telling. Your mother becomes visibly distressed, your father leaves the room, and your uncle finally breaks: "We promised never to speak of it. After what happened to your grandmother, we thought... we thought it was safer if you never remembered." The conspiracy runs deeper than you imagined.',
      choices: [
        {
          choiceText: 'Demand to know everything they\'re hiding',
          nextNodeId: 'ft_globalConspiracy',
          flagUpdates: [flagIncrement('disruption', 2)],
        },
        {
          choiceText: 'Gently ask them to help you understand',
          nextNodeId: 'ft_investigateInstitute',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_investigateInstitute',
      text: 'The Blackwood Institute officially closed in 1987, but your research reveals disturbing patterns. Former patients describe memory gaps, shared nightmares, and abilities they can\'t explain. As you dig deeper into public records and news archives, you begin to see connections that paint a terrifying picture.',
      choices: [
        {
          choiceText: 'Follow the trail of former patients',
          nextNodeId: 'ft_globalConspiracy',
          flagUpdates: [flagIncrement('curiosity', 1)],
        },
        {
          choiceText: 'Investigate other similar facilities',
          nextNodeId: 'ft_globalConspiracy',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    // CORE NODE #1 - Entry point that can branch into Origins
    {
      nodeId: 'ft_globalConspiracy',
      text: 'Your investigation reveals that consciousness experiments aren\'t isolated incidents - they\'re part of a coordinated global conspiracy. Hidden facilities operate on every continent, their work synchronized through encrypted quantum channels. But as you dig deeper, you sense something far older lurking beneath the modern facade.',
      choices: [
        {
          choiceText: 'Follow the ancient symbols carved into facility walls',
          nextNodeId: 'origins:origins_gateway',
          conditions: [{ flag: 'curiosity', operator: '>=', value: 3 }],
          flagUpdates: [flagIncrement('curiosity', 2)],
        },
        {
          choiceText: 'Investigate the quantum synchronization network',
          nextNodeId: 'ft_quantumNetwork',
          flagUpdates: [flagIncrement('coherence', 1)]
        },
        {
          choiceText: 'Track funding sources across governments',
          nextNodeId: 'ft_followMoney',
          conditions: [{ flag: 'investigatedMoney', operator: '!==', value: true }],
          flagUpdates: [flagIncrement('disruption', 1), { flag: 'investigatedMoney', operation: 'set', value: true }]
        },
        {
          choiceText: 'Delve deeper into the ancient origins that predate all modern experiments',
          nextNodeId: 'ft_echoProtocolIntro',
          conditions: [{ flag: 'curiosity', operator: '>=', value: 5 }, { flag: 'exploredHistory', operator: '!==', value: true }],
          flagUpdates: [flagIncrement('curiosity', 3), { flag: 'exploredHistory', operation: 'set', value: true }],
        }
      ]
    },

    // CORE NODE #2 - Can branch into Memory Echoes
    {
      nodeId: 'ft_quantumNetwork',
      text: 'The quantum synchronization network spans the globe like a neural web. Each facility pulses with the same rhythm, suggesting a central controlling intelligence. As you trace the signals, fragmentary memories that aren\'t your own begin bleeding into your consciousness.',
      choices: [
        {
          choiceText: 'Open yourself to the memory fragments',
          nextNodeId: 'partII:intro',
          conditions: [{ flag: 'coherence', operator: '>=', value: 2 }],
          flagUpdates: [flagIncrement('synchrony', 3)],
        },
        {
          choiceText: 'Shield your mind and trace the source',
          nextNodeId: 'ft_traceSource',
          flagUpdates: [flagIncrement('coherence', 2)]
        },
        {
          choiceText: 'Document the network patterns',
          nextNodeId: 'ft_documentNetwork',
          flagUpdates: [flagIncrement('curiosity', 1)]
        }
      ]
    },

    // CORE NODE #3 - Can branch into Realm Convergence
    {
      nodeId: 'ft_traceSource',
      text: 'Following the quantum signals leads you to a discovery that defies physics: the network isn\'t just connecting facilities on Earth. The readings show connections to parallel dimensions, alternate realities where consciousness research took different paths. Reality itself seems to be fracturing.',
      choices: [
        {
          choiceText: 'Investigate the dimensional fractures',
          nextNodeId: 'partIII:intro',
          conditions: [{ flag: 'disruption', operator: '>=', value: 4 }],
          flagUpdates: [
            flagIncrement('synchrony', 2),
            flagIncrement('disruption', 1),
          ],
        },
        {
          choiceText: 'Focus on stabilizing your own reality',
          nextNodeId: 'ft_stabilizeReality',
          conditions: [{ flag: 'tracedSource', operator: '===', value: true }],
          flagUpdates: [flagIncrement('coherence', 3)]
        },
        {
          choiceText: 'Seek others who can see the fractures',
          nextNodeId: 'ft_findAllies',
          flagUpdates: [flagIncrement('synchrony', 2)]
        }
      ]
    },

    // CORE NODE #4 - Can branch into Catalyst Revelation
    {
      nodeId: 'ft_findAllies',
      text: 'Your search for allies leads to others touched by quantum consciousness experiments. Together, you discover that someone - or something - has been orchestrating events from the shadows. The experiments, the network, even your own awakening: all part of a larger design by an entity of immense power.',
      choices: [
        {
          choiceText: 'Confront the orchestrating entity directly',
          nextNodeId: 'partIV:intro',
          conditions: [{ flag: 'synchrony', operator: '>=', value: 6 }],
          flagUpdates: [
            flagIncrement('synchrony', 3),
            flagIncrement('disruption', 2),
          ],
        },
        {
          choiceText: 'Study the entity\'s methods first',
          nextNodeId: 'ft_studyEntity',
          flagUpdates: [flagIncrement('curiosity', 3)]
        },
        {
          choiceText: 'Build a coalition of enhanced individuals',
          nextNodeId: 'ft_buildCoalition',
          flagUpdates: [flagIncrement('coherence', 2), flagIncrement('synchrony', 1)]
        },
        {
          choiceText: 'Complete your investigation and reveal the truth',
          nextNodeId: 'ft_exit_revelation_complete',
          conditions: [{ flag: 'curiosity', operator: '>=', value: 10 }],
          flagUpdates: [flagIncrement('coherence', 1)]
        }
      ]
    },

    // CORE NODE #5 - Can branch into Legacy 
    {
      nodeId: 'ft_buildCoalition',
      text: 'Your coalition of consciousness-enhanced individuals becomes a force for change. Together, you begin to shape how humanity will evolve beyond this crisis. The choices you make now will echo through time, determining the future of human consciousness itself.',
      choices: [
        {
          choiceText:
            'Focus on the long-term future of consciousness evolution',
          nextNodeId: 'partV:intro',
          conditions: [{ flag: 'coherence', operator: '>=', value: 8 }],
          flagUpdates: [
            flagIncrement('synchrony', 4),
            flagIncrement('coherence', 2),
          ],
        },
        {
          choiceText: 'Unite the coalition to shape humanity\'s future',
          nextNodeId: 'ft_exit_coalition_formed',
          conditions: [{ flag: 'coherence', operator: '>=', value: 12 }],
          flagUpdates: [flagIncrement('synchrony', 2)]
        },
        {
          choiceText: 'Establish immediate protections for enhanced individuals',
          nextNodeId: 'ft_immediateProtection',
          conditions: [{ flag: 'protectionBuilt', operator: '!==', value: true }],
          flagUpdates: [flagIncrement('coherence', 3), { flag: 'protectionBuilt', operation: 'set', value: true }]
        },
        {
          choiceText: 'Work to expose the truth to the world',
          nextNodeId: 'ft_exposeTruth',
          flagUpdates: [flagIncrement('disruption', 3), flagIncrement('curiosity', 1)]
        }
      ]
    },

    // EPIC CONNECTOR NODES - Bridge from investigation to deep lore
    {
      nodeId: 'ft_echoProtocolIntro',
      text: 'As you delve deeper into the conspiracy, you begin to understand that the current experiments are merely echoes of something far older. The true origin of this technology stretches back to the dawn of human consciousness itself. You feel drawn to explore this ancient history across multiple epochs and dimensions.',
      choices: [
        {
          choiceText: 'Part I: The Garden That Wasn\'t - Explore the ancient origins',
          nextNodeId: 'partI:intro',
          flagUpdates: [flagIncrement('curiosity', 2)],
        },
        {
          choiceText: 'Part II: The Echo Protocol - Discover the failsafe system',
          nextNodeId: 'partII:intro', 
          flagUpdates: [flagIncrement('coherence', 2)],
        },
        {
          choiceText: 'Part III: The Keepers - Meet the ancient guardians',
          nextNodeId: 'partIII:intro',
          flagUpdates: [flagIncrement('synchrony', 2)],
        },
        {
          choiceText: 'Part IV: Antarctic Discovery - Uncover the frozen truth',
          nextNodeId: 'partIV:intro',
          flagUpdates: [flagIncrement('disruption', 2)],
        },
        {
          choiceText: 'Part V: Echo Awakens - Witness the protocol\'s activation',
          nextNodeId: 'partV:intro',
          conditions: [{ flag: 'curiosity', operator: '>=', value: 8 }],
          flagUpdates: [flagIncrement('curiosity', 3)],
        },
        {
          choiceText: 'Part VI: Fractured Timeline - Navigate temporal chaos',
          nextNodeId: 'partVI:intro',
          conditions: [{ flag: 'coherence', operator: '>=', value: 8 }],
          flagUpdates: [flagIncrement('coherence', 3)],
        },
        {
          choiceText: 'Part VII: New Guardians - Join the cosmic order',
          nextNodeId: 'partVII:intro',
          conditions: [{ flag: 'synchrony', operator: '>=', value: 8 }],
          flagUpdates: [flagIncrement('synchrony', 3)],
        },
        {
          choiceText: 'Part VIII: The Ones Who Shaped - Face the ultimate truth',
          nextNodeId: 'partVIII:intro',
          conditions: [{ flag: 'disruption', operator: '>=', value: 8 }],
          flagUpdates: [flagIncrement('disruption', 3)],
        },
        {
          choiceText: 'Continue with the modern investigation',
          nextNodeId: 'ft_exposeTruth',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_keepersReveal',
      text: 'Your investigation has uncovered references to ancient secret societies that have been guarding knowledge for millennia. These "Keepers" seem to be the true power behind modern consciousness research. Understanding their factions might be key to stopping them.',
      choices: [
        {
          choiceText: 'Learn about the secret Keeper factions',
          nextNodeId: 'partIII:intro',
          flagUpdates: [flagIncrement('coherence', 2)],
        },
        {
          choiceText: 'Focus on their recent activities',
          nextNodeId: 'ft_traceSource',
          flagUpdates: [flagIncrement('disruption', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_antarcticaDiscovery',
      text: 'Intelligence reports suggest something significant has been discovered in Antarctica - something that has all the secret factions mobilizing simultaneously. This discovery may be the key to understanding everything.',
      choices: [
        {
          choiceText: 'Investigate the Antarctic discovery',
          nextNodeId: 'partIV:intro',
          flagUpdates: [flagIncrement('curiosity', 3)],
        },
        {
          choiceText: 'Stay focused on local threats',
          nextNodeId: 'ft_immediateProtection',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_characterFocus',
      text: 'The convergence of events has brought three key individuals to your attention: Dr. Lian Evasco, Amari Kessler, and Elias Soriat. Understanding their roles in this cosmic drama may be crucial.',
      choices: [
        {
          choiceText: 'Follow the unfolding events with these key players',
          nextNodeId: 'partV:intro',
          flagUpdates: [flagIncrement('synchrony', 2)],
        },
        {
          choiceText: 'Focus on your own role in events',
          nextNodeId: 'ft_buildCoalition',
          flagUpdates: [flagIncrement('coherence', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_finalChoice',
      text: 'The moment of ultimate decision has arrived. The fate of human consciousness hangs in the balance, and you must choose how to proceed.',
      choices: [
        {
          choiceText: 'Witness the final convergence',
          nextNodeId: 'partV:intro',
          flagUpdates: [flagIncrement('synchrony', 3)],
        },
        {
          choiceText: 'Take direct action',
          nextNodeId: 'ft_immediateProtection',
          flagUpdates: [flagIncrement('disruption', 2)],
        }
      ]
    },

    {
      nodeId: 'ft_synthesis',
      text: 'Through the fracturing of time itself, you witness the ultimate synthesis - humanity choosing a path neither of power nor avoidance, but of conscious responsibility.',
      choices: [
        {
          choiceText: 'Explore the new paradigm',
          nextNodeId: 'partVII:intro',
          flagUpdates: [flagIncrement('coherence', 3)],
        },
        {
          choiceText: 'Focus on immediate implications',
          nextNodeId: 'ft_buildCoalition',
          flagUpdates: [flagIncrement('disruption', 1)],
        }
      ]
    },

    {
      nodeId: 'ft_cosmicGardeners',
      text: 'Humanity has evolved into something unprecedented - cosmic gardeners tending the growth of consciousness throughout the universe. The implications are staggering.',
      choices: [
        {
          choiceText: 'Learn about the Shapers who came before',
          nextNodeId: 'partVIII:intro',
          flagUpdates: [flagIncrement('curiosity', 4)],
        },
        {
          choiceText: 'Return to your personal journey',
          nextNodeId: 'ft_finalTranscendence',
          flagUpdates: [flagIncrement('coherence', 2)],
        }
      ]
    },

    {
      nodeId: 'ft_finalTranscendence',
      text: 'Having witnessed the full scope of humanity\'s cosmic destiny, you understand your role in this vast tapestry. The forgotten truth has been remembered, and the future is bright with possibility.',
      choices: [
        {
          choiceText: 'Complete your journey',
          nextNodeId: 'ft_exit_transcendence',
          flagUpdates: [flagIncrement('coherence', 5)],
        }
      ]
    },

    // EXISTING EXPANSION NODES START HERE
    ...originsNodes,
    ...missingOriginNodes,
    ...memoryEchoesNodes,
    ...realmConvergenceNodes,
    ...catalystRevelationNodes,
    ...quantumLegacyNodes,
    ...missingCoreNodes,
    ...partI,
    ...partII,
    ...partIII,
    ...partIV,
    ...partV,
    ...partVI,
    ...partVII,
    ...partVIII,
    ...exitNodes,
  ],
};
