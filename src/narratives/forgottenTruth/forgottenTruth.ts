import type { NarrativeSegment } from '../types';
import { flagIncrement } from '../../utils/narrativeUtils';

// Import nodes from individual expansion files (we'll convert these to new format)
// For now, let's start with a basic structure and core nodes

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
          nextNodeId: 'origins:ft_ancientSymbolsEntry',
          conditions: [{ flag: 'curiosity', operator: '>=', value: 3 }],
          flagUpdates: [flagIncrement('curiosity', 2)]
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
          nextNodeId: 'echo:ft_memoryNexusEntry',
          conditions: [{ flag: 'coherence', operator: '>=', value: 2 }],
          flagUpdates: [flagIncrement('synchrony', 3)]
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
          nextNodeId: 'convergence:ft_dimensionalEntry',
          conditions: [{ flag: 'disruption', operator: '>=', value: 4 }],
          flagUpdates: [flagIncrement('synchrony', 2), flagIncrement('disruption', 1)]
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
          nextNodeId: 'catalyst:ft_entityConfrontation',
          conditions: [{ flag: 'synchrony', operator: '>=', value: 6 }],
          flagUpdates: [flagIncrement('synchrony', 3), flagIncrement('disruption', 2)]
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
          choiceText: 'Focus on the long-term future of consciousness evolution',
          nextNodeId: 'legacy:ft_futureEvolution',
          conditions: [{ flag: 'coherence', operator: '>=', value: 8 }],
          flagUpdates: [flagIncrement('synchrony', 4), flagIncrement('coherence', 2)]
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
          flagUpdates: [flagIncrement('coherence', 1)]
        }
      ]
    },

    {
      nodeId: 'ft_returnFromEcho',
      text: 'The memory fragments have shown you the scope of consciousness experimentation across time. You understand now that this isn\'t just about the present - it\'s about the entire future of human awareness.',
      choices: [
        {
          choiceText: 'Trace the source of the network',
          nextNodeId: 'ft_traceSource',
          flagUpdates: [flagIncrement('coherence', 1)]
        }
      ]
    },

    {
      nodeId: 'ft_returnFromConvergence',
      text: 'Having witnessed the fractures between realities, you realize the true scope of what\'s at stake. This isn\'t just about one world - it\'s about all possible worlds.',
      choices: [
        {
          choiceText: 'Seek allies who understand the dimensional threat',
          nextNodeId: 'ft_findAllies',
          flagUpdates: [flagIncrement('synchrony', 1)]
        }
      ]
    },

    {
      nodeId: 'ft_returnFromCatalyst',
      text: 'Your encounter with the orchestrating entity has changed everything. You now understand the true purpose behind the experiments, and your role in what comes next.',
      choices: [
        {
          choiceText: 'Build a coalition to shape the future',
          nextNodeId: 'ft_buildCoalition',
          flagUpdates: [flagIncrement('coherence', 1)]
        }
      ]
    },

    {
      nodeId: 'ft_returnFromLegacy',
      text: 'Having glimpsed the far future of consciousness evolution, you return to the present with clarity about your mission. The choices you make now will echo through time.',
      choices: [
        {
          choiceText: 'Focus on immediate action',
          nextNodeId: 'ft_immediateProtection',
          flagUpdates: [flagIncrement('coherence', 1)]
        }
      ]
    }

    // Note: Expansion nodes will be added here with proper namespacing
    // They will be imported and transformed from the existing files
  ]
};
