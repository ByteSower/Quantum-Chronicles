/**
 * Origins Unveiled - Skeleton for Smoke Testing
 * 
 * Minimal 3-node implementation for testing Brain's narrative schema.
 * This demonstrates segment initialization, choice processing, and completion.
 */

import type { NarrativeSegment } from '../types';
import { flagSet, flagIncrement } from '../../utils/narrativeUtils';

export const ORIGINS_UNVEILED: NarrativeSegment = {
  segmentId: 'originsUnveiled',
  title: 'Origins Unveiled',
  description: 'Discover the first traces of the quantum technology.',
  startNodeId: 'ou_discovery',
  exitPoints: ['ou_revelation'],
  initialFlags: {
    discovered_artifact: false,
    investigation_depth: 0
  },
  initialVariables: {
    curiosity: 6,
    coherence: 4,
    disruption: 3,
    synchrony: 5
  },
  globalFlagDecay: 0.05,
  nodes: [
    {
      nodeId: 'ou_discovery',
      text: 'You stumble upon a strange, crystalline device buried in the old archives. Its surface shimmers with an otherworldly light.',
      choices: [
        {
          choiceText: 'Examine the device carefully',
          nextNodeId: 'ou_examination',
          flagUpdates: [
            flagSet('discovered_artifact', true),
            flagIncrement('investigation_depth', 1)
          ]
        },
        {
          choiceText: 'Touch the device directly',
          nextNodeId: 'ou_revelation',
          flagUpdates: [
            flagSet('discovered_artifact', true),
            flagIncrement('investigation_depth', 2)
          ]
        }
      ]
    },
    {
      nodeId: 'ou_examination',
      text: 'As you study the device, you notice intricate patterns etched into its surface. They seem to shift and change as you watch.',
      dynTextFunction: (variables) => {
        const curiosity = variables.curiosity as number || 0;
        if (curiosity > 7) {
          return 'Your heightened curiosity allows you to decipher some of the shifting patterns. They appear to be... coordinates?';
        }
        return 'The patterns are mesmerizing but incomprehensible to you.';
      },
      choices: [
        {
          choiceText: 'Document your findings',
          nextNodeId: 'ou_revelation',
          flagUpdates: [flagIncrement('investigation_depth', 1)]
        }
      ]
    },
    {
      nodeId: 'ou_revelation',
      text: 'Suddenly, the device pulses with energy and your mind is flooded with visions of the past.',
      textAfter: (variables) => {
        const depth = variables.investigation_depth as number || 0;
        if (depth >= 3) {
          return 'Your thorough investigation has revealed deep secrets about the quantum technology.';
        } else if (depth >= 2) {
          return 'You have gained some understanding of the device\'s purpose.';
        }
        return 'The visions are brief but profound.';
      },
      choices: []
    }
  ]
};
