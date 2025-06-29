import type { NarrativeNode, FeedbackHook, FlagUpdate } from '../narratives/types';

export function wrapFeedbackHook<T extends NarrativeNode>(
  node: T, 
  milestone: FeedbackHook['milestone'], 
  delay = 0
): T {
  return { ...node, feedbackHook: { milestone, delay } };
}

export function flagIncrement(flag: string, amount = 1): FlagUpdate {
  return { flag, operation: 'increment', value: amount };
}

export function flagDecrement(flag: string, amount = 1): FlagUpdate {
  return { flag, operation: 'decrement', value: amount };
}

export function flagSet(flag: string, value: number | boolean): FlagUpdate {
  return { flag, operation: 'set', value };
}
