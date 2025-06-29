import type { NarrativeSegment } from '../types';
import { ORIGINS_UNVEILED } from './originsUnveiled';
import { memoryEchoes } from './memoryEchoes';

export const forgottenTruthSegment: NarrativeSegment = {
  segmentId: 'forgottenTruth',
  title: 'The Forgotten Truth',
  description: 'An anthology of stories exploring the fragmented memories of a world that is not what it seems.',
  startNodeId: 'ft_hub', 
  nodes: [
    {
        nodeId: 'ft_hub',
        text: 'You stand at a crossroads of memory. Two paths diverge, each a fragment of a forgotten past.',
        choices: [
            {
                choiceText: 'Explore the origins of this technology.',
                nextNodeId: 'ou_intro', // This will be the start node of the origins segment
                nextSegmentId: ORIGINS_UNVEILED.segmentId,
            },
            {
                choiceText: 'Confront the echoes of a past decision.',
                nextNodeId: 'me_intro', // This will be the start node of the memory echoes segment
                nextSegmentId: memoryEchoes.segmentId,
                conditions: [
                    { flag: 'origins_completed', operator: '===', value: true }
                ]
            }
        ]
    },
    {
        nodeId: 'ft_return_hub',
        text: 'You have returned to the crossroads, changed by what you have seen.',
        choices: [
            {
                choiceText: 'Revisit the origins.',
                nextNodeId: 'ou_intro',
                nextSegmentId: ORIGINS_UNVEILED.segmentId,
            },
            {
                choiceText: 'Delve back into the echoes of memory.',
                nextNodeId: 'me_intro',
                nextSegmentId: memoryEchoes.segmentId,
                conditions: [
                    { flag: 'origins_completed', operator: '===', value: true }
                ]
            },
            {
                choiceText: 'Rest and reflect.',
                nextNodeId: 'ft_hub',
            }
        ]
    }
  ],
  initialFlags: {},
  initialVariables: {},
  exitPoints: ['ft_return_hub'],
};
