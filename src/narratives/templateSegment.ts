/**
 * Template Segment - Brain's Reference Implementation
 * 
 * Clean, complete example following Brain's narrative schema.
 * Use as template for creating new narrative segments.
 */

import type { NarrativeSegment } from './types';

export const TEMPLATE_SEGMENT: NarrativeSegment = {
  segmentId: 'template',
  title: 'Template Segment',
  description: 'A complete example segment following Brain\'s schema',
  startNodeId: 'start',
  exitPoints: ['end'],
  nodes: [
    {
      nodeId: 'start',
      text: 'This is the starting node of the template segment. Your curiosity is {{curiosity}}.',
      choices: [
        {
          choiceText: 'Continue to the next node',
          nextNodeId: 'middle',
          flagUpdates: [
            { flag: 'curiosity', operation: 'increment', value: 1 }
          ]
        }
      ]
    },
    {
      nodeId: 'middle',
      text: 'You are now in the middle node. Your coherence level is {{coherence}}.',
      choices: [
        {
          choiceText: 'Proceed to the end',
          nextNodeId: 'end',
          flagUpdates: [
            { flag: 'coherence', operation: 'increment', value: 1 }
          ]
        }
      ]
    },
    {
      nodeId: 'end',
      text: 'This is the end of the template segment. You have completed the journey!',
      choices: []
    }
  ],
  initialFlags: {
    templateComplete: false
  },
  initialVariables: {
    curiosity: 5,
    coherence: 5,
    disruption: 3,
    synchrony: 7
  },
  globalFlagDecay: 0.95
};