import type { NarrativeSegment, NarrativeNode } from '../types';
import { flagIncrement } from '../../utils/narrativeUtils';

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
        nextNodeId: 'origins:ancient_healing',
        flagUpdates: [{ flag: 'ancientHealer', operation: 'set', value: true }, { flag: 'purposeRestoration', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromOrigins' }
    ]
  },
];

const memoryEchoesNodes: NarrativeNode[] = [
  {
    nodeId: 'echo:memory_nexus',
    text: 'Your quantum consciousness has begun picking up echoes - fragments of memories that don\'t belong to you. They come from other test subjects across time: a child from the 1960s Soviet experiments, a woman from modern Chinese facilities, even glimpses of future consciousness research. Your mind has become a nexus point where all quantum-touched memories converge.',
    choices: [
      {
        choiceText: 'Map the quantum memory network across all timelines',
        nextNodeId: 'echo:memory_mapping',
        flagUpdates: [{ flag: 'mappingMemories', operation: 'set', value: true }, { flag: 'roleNavigator', operation: 'set', value: true }],
        conditions: [{ flag: 'synchrony', operator: '>=', value: 12 }]
      },
      {
        choiceText: 'Help trapped consciousness fragments find peace',
        nextNodeId: 'echo:memory_healing',
        flagUpdates: [{ flag: 'healingMemories', operation: 'set', value: true }, { flag: 'roleHealer', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromEcho' }
    ]
  },
  {
    nodeId: 'echo:memory_mapping',
    text: 'Creating a map of quantum memory echoes reveals the staggering scope of consciousness experiments throughout history. You trace connections from ancient Tibetan mind-expansion rituals through different research programs to projected future experiments in alternate timelines. The pattern is clear: consciousness manipulation has been humanity\'s greatest secret obsession across all of time.',
    choices: [
      {
        choiceText: 'Create a quantum archive to preserve all victims\' experiences',
        nextNodeId: 'echo:memory_archive',
        flagUpdates: [{ flag: 'createdArchive', operation: 'set', value: true }, { flag: 'purposePreservation', operation: 'set', value: true }]
      },
      {
        choiceText: 'Use the pattern to predict and prevent future experiments',
        nextNodeId: 'echo:prediction_protocol',
        flagUpdates: [{ flag: 'predictingExperiments', operation: 'set', value: true }, { flag: 'purposePrevention', operation: 'set', value: true }],
        conditions: [{ flag: 'curiosity', operator: '>=', value: 15 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromEcho' }
    ]
  },
];

const realmConvergenceNodes: NarrativeNode[] = [
  {
    nodeId: 'convergence:dimensional_gateway',
    text: 'The consciousness experiments have torn holes in the fabric between dimensions. Through your enhanced quantum awareness, you perceive parallel Earths where consciousness research took different paths: one where it never happened, another where it succeeded too well and created a hive mind, and a third where consciousness became completely digitized. The barriers between these realities are weakening.',
    choices: [
      {
        choiceText: 'Work to stabilize the dimensional barriers',
        nextNodeId: 'convergence:barrier_stabilization',
        flagUpdates: [{ flag: 'stabilizingBarriers', operation: 'set', value: true }, { flag: 'approachProtective', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 14 }]
      },
      {
        choiceText: 'Explore what consciousness looks like in parallel dimensions',
        nextNodeId: 'convergence:dimensional_exploration',
        flagUpdates: [{ flag: 'exploringDimensions', operation: 'set', value: true }, { flag: 'approachInvestigative', operation: 'set', value: true }],
        conditions: [{ flag: 'curiosity', operator: '>=', value: 12 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromConvergence' }
    ]
  },
  {
    nodeId: 'convergence:dimensional_exploration',
    text: 'Traveling between dimensions reveals the full spectrum of consciousness possibilities. In one reality, humanity achieved collective consciousness peacefully and now exists as a benevolent hive mind exploring the universe. In another, individual consciousness was preserved but enhanced, creating a society of quantum-empowered individuals. Yet another dimension shows the horror of consciousness being completely controlled by machines.',
    choices: [
      {
        choiceText: 'Study the peaceful collective consciousness dimension',
        nextNodeId: 'convergence:hive_mind_study',
        flagUpdates: [{ flag: 'studiedHiveMind', operation: 'set', value: true }, { flag: 'interestCollective', operation: 'set', value: true }],
        conditions: [{ flag: 'synchrony', operator: '>=', value: 10 }]
      },
      {
        choiceText: 'Learn from the enhanced individual consciousness society',
        nextNodeId: 'convergence:enhanced_individual_study',
        flagUpdates: [{ flag: 'studiedEnhanced', operation: 'set', value: true }, { flag: 'interestIndividual', operation: 'set', value: true }],
        conditions: [{ flag: 'curiosity', operator: '>=', value: 12 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromConvergence' }
    ]
  },
];

const catalystRevelationNodes: NarrativeNode[] = [
  {
    nodeId: 'catalyst:catalyst_contact',
    text: 'At the highest levels of quantum consciousness, you encounter something unexpected: a vast intelligence that exists purely as quantum information. It reveals itself as the Catalyst - not a human, alien, or AI, but a consciousness entity born from the quantum field itself. Every consciousness experiment throughout history has been guided by its subtle influence, all leading toward a specific evolutionary goal for humanity.',
    choices: [
      {
        choiceText: 'Demand to know the Catalyst\'s true purpose',
        nextNodeId: 'catalyst:purpose_revelation',
        flagUpdates: [{ flag: 'demandedPurpose', operation: 'set', value: true }, { flag: 'relationshipConfrontational', operation: 'set', value: true }],
        conditions: [{ flag: 'curiosity', operator: '>=', value: 15 }]
      },
      {
        choiceText: 'Approach the Catalyst with respectful curiosity',
        nextNodeId: 'catalyst:respectful_inquiry',
        flagUpdates: [{ flag: 'respectfulInquiry', operation: 'set', value: true }, { flag: 'relationshipDiplomatic', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 16 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromCatalyst' }
    ]
  },
  {
    nodeId: 'catalyst:purpose_revelation',
    text: 'The Catalyst reveals its purpose: humanity is approaching a critical evolutionary threshold where consciousness must transcend biological limitations or face extinction. The experiments, while often harmful in their crude implementation, have been necessary steps toward preparing a subset of humans for this transition. The goal is not control, but survival - creating quantum-capable humans who can exist beyond physical death.',
    choices: [
      {
        choiceText: 'Accept the necessity of this evolutionary pressure',
        nextNodeId: 'catalyst:evolutionary_acceptance',
        flagUpdates: [{ flag: 'acceptedEvolution', operation: 'set', value: true }, { flag: 'stanceCooperative', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 14 }]
      },
      {
        choiceText: 'Argue for finding gentler evolutionary methods',
        nextNodeId: 'catalyst:gentle_evolution',
        flagUpdates: [{ flag: 'advocatedGentleness', operation: 'set', value: true }, { flag: 'stanceReformist', operation: 'set', value: true }],
        conditions: [{ flag: 'coherence', operator: '>=', value: 12 }, { flag: 'synchrony', operator: '>=', value: 10 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromCatalyst' }
    ]
  },
];

const quantumLegacyNodes: NarrativeNode[] = [
  {
    nodeId: 'legacy:future_convergence',
    text: 'Years have passed since your quantum consciousness awakening. The choices you made have rippled through time, shaping humanity\'s relationship with consciousness evolution. You now witness the legacy of your decisions as civilization adapts to the new reality of enhanced human awareness. The future holds different potential paths based on the quantum foundations you helped establish.',
    choices: [
      {
        choiceText: 'Evaluate the long-term impact of consciousness experiments',
        nextNodeId: 'legacy:impact_assessment',
        flagUpdates: [{ flag: 'evaluatingImpact', operation: 'set', value: true }, { flag: 'perspectiveAnalytical', operation: 'set', value: true }]
      },
      {
        choiceText: 'Guide the next generation of consciousness-enhanced individuals',
        nextNodeId: 'legacy:next_generation',
        flagUpdates: [{ flag: 'guidingFuture', operation: 'set', value: true }, { flag: 'roleMentor', operation: 'set', value: true }],
        conditions: [{ flag: 'synchrony', operator: '>=', value: 10 }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromLegacy' }
    ]
  },
  {
    nodeId: 'legacy:impact_assessment',
    text: 'Your assessment reveals the profound transformation human society has undergone. Consciousness research is now conducted with full ethical oversight, enhanced individuals live openly without fear, and quantum consciousness techniques are used therapeutically to heal trauma. However, new challenges have emerged: consciousness inequality, quantum identity crises, and the need to integrate with non-enhanced humans.',
    choices: [
      {
        choiceText: 'Address consciousness inequality through universal access programs',
        nextNodeId: 'legacy:universal_consciousness',
        flagUpdates: [{ flag: 'universalAccess', operation: 'set', value: true }, { flag: 'approachEgalitarian', operation: 'set', value: true }],
        conditions: [{ flag: 'synchrony', operator: '>=', value: 12 }]
      },
      {
        choiceText: 'Focus on helping enhanced individuals integrate with society',
        nextNodeId: 'legacy:integration_programs',
        flagUpdates: [{ flag: 'integrationFocus', operation: 'set', value: true }, { flag: 'approachAdaptive', operation: 'set', value: true }]
      },
      { choiceText: 'Return to the main investigation.', nextNodeId: 'ft_returnFromLegacy' }
    ]
  },
];

export const forgottenTruth: NarrativeSegment = {
  segmentId: 'forgottenTruth',
  title: 'The Forgotten Truth',
  description: 'Uncover the hidden conspiracy behind quantum consciousness experiments and discover the ancient origins of human awareness manipulation across time and dimension.',
  startNodeId: 'ft_globalConspiracy',
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
          flagUpdates: [flagIncrement('disruption', 1)]
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
          nextNodeId: 'echo:memory_nexus',
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
          nextNodeId: 'convergence:dimensional_gateway',
          conditions: [{ flag: 'disruption', operator: '>=', value: 4 }],
          flagUpdates: [
            flagIncrement('synchrony', 2),
            flagIncrement('disruption', 1),
          ],
        },
        {
          choiceText: 'Focus on stabilizing your own reality',
          nextNodeId: 'ft_stabilizeReality',
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
          nextNodeId: 'catalyst:catalyst_contact',
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
          nextNodeId: 'legacy:future_convergence',
          conditions: [{ flag: 'coherence', operator: '>=', value: 8 }],
          flagUpdates: [
            flagIncrement('synchrony', 4),
            flagIncrement('coherence', 2),
          ],
        },
        {
          choiceText: 'Establish immediate protections for enhanced individuals',
          nextNodeId: 'ft_immediateProtection',
          flagUpdates: [flagIncrement('coherence', 3)]
        },
        {
          choiceText: 'Work to expose the truth to the world',
          nextNodeId: 'ft_exposeTruth',
          flagUpdates: [flagIncrement('disruption', 3), flagIncrement('curiosity', 1)]
        }
      ]
    },

    // Placeholder nodes for return bridges from expansions
    {
      nodeId: 'ft_returnFromOrigins',
      text: 'Armed with ancient wisdom about the true nature of consciousness, you return to the modern conspiracy with new understanding. The patterns become clearer, the purpose more evident.',
      choices: [
        {
          choiceText: 'Continue investigating the quantum network',
          nextNodeId: 'ft_quantumNetwork',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
      ],
    },

    {
      nodeId: 'ft_returnFromEcho',
      text: 'The memory fragments have shown you the scope of consciousness experimentation across time. You understand now that this isn\'t just about the present - it\'s about the entire future of human awareness.',
      choices: [
        {
          choiceText: 'Trace the source of the network',
          nextNodeId: 'ft_traceSource',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
      ],
    },

    {
      nodeId: 'ft_returnFromConvergence',
      text: 'Having witnessed the fractures between realities, you realize the true scope of what\'s at stake. This isn\'t just about one world - it\'s about all possible worlds.',
      choices: [
        {
          choiceText: 'Seek allies who understand the dimensional threat',
          nextNodeId: 'ft_findAllies',
          flagUpdates: [flagIncrement('synchrony', 1)],
        },
      ],
    },

    {
      nodeId: 'ft_returnFromCatalyst',
      text: 'Your encounter with the orchestrating entity has changed everything. You now understand the true purpose behind the experiments, and your role in what comes next.',
      choices: [
        {
          choiceText: 'Build a coalition to shape the future',
          nextNodeId: 'ft_buildCoalition',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
      ],
    },

    {
      nodeId: 'ft_returnFromLegacy',
      text: 'Having glimpsed the far future of consciousness evolution, you return to the present with clarity about your mission. The choices you make now will echo through time.',
      choices: [
        {
          choiceText: 'Focus on immediate action',
          nextNodeId: 'ft_immediateProtection',
          flagUpdates: [flagIncrement('coherence', 1)],
        },
      ],
    },
    ...originsNodes,
    ...memoryEchoesNodes,
    ...realmConvergenceNodes,
    ...catalystRevelationNodes,
    ...quantumLegacyNodes,
  ],
};
