/**
 * The Convergence of Realms - Third segment of "The Forgotten Truth"
 * 
 * This segment explores parallel realities and reality manipulation, building
 * toward the Catalyst's Revelation. Higher disruption/synchrony thresholds
 * and reality-based flag conditions create advanced gameplay mechanics.
 */

import type { NarrativeSegment, QNCEVariables } from '../types';
import { flagIncrement, flagDecrement } from '../../utils/narrativeUtils';

export const convergenceOfRealms: NarrativeSegment = {
  segmentId: 'convergenceOfRealms',
  title: 'The Convergence of Realms',
  description: 'Navigate parallel realities and master reality manipulation before facing the Catalyst.',
  parentId: 'forgottenTruth',
  startNodeId: 'ft_parallelEntry',
  exitPoints: ['ft_catalystGateway'],
  initialFlags: { curiosity: 0, coherence: 0, synchrony: 0, disruption: 0, reality_stability: 100 },
  initialVariables: {},
  globalFlagDecay: 0.15, // Higher decay for advanced segment
  nodes: [
    {
      nodeId: 'ft_parallelEntry',
      text: `You step through the dimensional gateway into a realm where multiple realities overlay like translucent films. Here, every choice echoes across infinite possibilities.`,
      assetPlaceholders: { visualCue: 'parallel_realms.gif', audioCue: 'reality_hum.mp3', hapticCue: 'dimensional_vibration' },
      choices: [
        { 
          choiceText: 'Attempt to manipulate the overlapping realities', 
          nextNodeId: 'ft_realityManipulation', 
          flagUpdates: [flagIncrement('disruption', 2), flagDecrement('reality_stability', 10)],
          conditions: [{ flag: 'synchrony', operator: '>=', value: 3 }]
        },
        { 
          choiceText: 'Observe the reality patterns carefully', 
          nextNodeId: 'ft_realityObservation', 
          flagUpdates: [flagIncrement('coherence', 2)]
        },
        { 
          choiceText: 'Try to stabilize the fluctuations', 
          nextNodeId: 'ft_realityStabilization', 
          flagUpdates: [flagIncrement('synchrony', 1), flagIncrement('reality_stability', 5)]
        }
      ]
    },
    {
      nodeId: 'ft_realityManipulation',
      text: '', // Dynamic content based on player flags
      dynTextFunction: (vars: QNCEVariables) => {
        const disruption = vars.disruption as number || 0;
        const stability = vars.reality_stability as number || 100;
        
        if (disruption >= 5 && stability < 50) {
          return `Your manipulation tears holes in reality itself. Through the rifts, you see glimpses of the Catalyst—a being of pure quantum consciousness that seems to notice your intrusion. Reality bends to your will, but at what cost?`;
        } else if (disruption >= 3) {
          return `The realities shift under your influence, creating new possibilities. You feel the intoxicating power of reshaping existence, though the fabric of space-time groans under the strain.`;
        }
        return `You manage to create small ripples in the reality field, enough to open new pathways but not enough to fundamentally alter the structure of existence.`;
      },
      textAfter: (vars: QNCEVariables) => `(Disruption: ${vars.disruption} | Reality Stability: ${vars.reality_stability}%)`,
      assetPlaceholders: { visualCue: 'reality_manipulation.gif', audioCue: 'reality_tear.mp3', hapticCue: 'reality_shift' },
      choices: [
        { choiceText: 'Push the manipulation further', nextNodeId: 'ft_catalystGateway', flagUpdates: [flagIncrement('disruption', 3)] },
        { choiceText: 'Step back before going too far', nextNodeId: 'ft_realityObservation' }
      ]
    },
    {
      nodeId: 'ft_realityObservation',
      text: `You study the intricate dance of parallel realities, learning their patterns and flows. Each reality tells a different story—versions where the Shapers never fell, where quantum consciousness was never discovered, where humanity took different paths entirely.`,
      assetPlaceholders: { visualCue: 'reality_patterns.png', audioCue: 'wisdom_tones.mp3' },
      choices: [
        { choiceText: 'Seek the pathway to the Catalyst', nextNodeId: 'ft_catalystGateway' }
      ]
    },
    {
      nodeId: 'ft_realityStabilization',
      text: `You focus your energy on stabilizing the chaotic reality fluctuations. The overlapping dimensions settle into a more harmonious pattern, revealing hidden pathways and connections between worlds.`,
      assetPlaceholders: { visualCue: 'reality_stabilized.png', audioCue: 'harmony_restoration.mp3' },
      choices: [
        { choiceText: 'Follow the stabilized pathway', nextNodeId: 'ft_catalystGateway' }
      ]
    },
    {
      nodeId: 'ft_catalystGateway',
      text: `Before you materializes the ultimate gateway—a portal that pulses with the essence of the Catalyst itself. This is the threshold to the final revelation, where all truths will converge and all choices will find their ultimate meaning.`,
      assetPlaceholders: { visualCue: 'catalyst_gateway.gif', audioCue: 'ultimate_revelation.mp3', hapticCue: 'final_convergence' },
      feedbackHook: { milestone: 'story_completion', delay: 3000 },
      choices: [
        { choiceText: 'Enter the Catalyst\'s domain', nextNodeId: '__NEXT_SEGMENT__' },
        { choiceText: 'Return to explore other paths', nextNodeId: '__HUB__' }
      ]
    }
  ]
};
