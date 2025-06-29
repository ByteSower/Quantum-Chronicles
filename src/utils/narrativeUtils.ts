/**
 * QNCE Narrative Utilities - Brain's Reference Implementation
 * 
 * Utility functions for working with Brain's narrative schema.
 * Handles flag updates, feedback hooks, and choice processing.
 */

import type { FlagUpdate, QNCEVariables, FeedbackHook } from '../narratives/types';

/**
 * Wraps a feedback hook function with timing and context
 */
export function wrapFeedbackHook(
  hook: FeedbackHook,
  context: { nodeId: string; timestamp: number }
): () => void {
  return () => {
    setTimeout(() => {
      // Trigger feedback collection
      console.log(`[FeedbackHook] ${hook.milestone} at ${context.nodeId}`);
      // This can be extended to integrate with actual feedback systems
    }, hook.delay);
  };
}

/**
 * Helper function to increment a flag value
 */
export function flagIncrement(flag: string, amount: number = 1): FlagUpdate {
  return {
    flag,
    operation: 'increment',
    value: amount
  };
}

/**
 * Helper function to decrement a flag value
 */
export function flagDecrement(flag: string, amount: number = 1): FlagUpdate {
  return {
    flag,
    operation: 'decrement', 
    value: amount
  };
}

/**
 * Helper function to set a flag value
 */
export function flagSet(flag: string, value: number | boolean): FlagUpdate {
  return {
    flag,
    operation: 'set',
    value
  };
}

/**
 * Apply flag updates to current flags and variables
 */
export function applyFlagUpdates(
  flagUpdates: FlagUpdate[] | undefined,
  currentFlags: Record<string, boolean | number | string>,
  currentVariables: QNCEVariables
): { newFlags: Record<string, boolean | number | string>; newVariables: QNCEVariables } {
  const newFlags = { ...currentFlags };
  const newVariables = { ...currentVariables };

  if (!flagUpdates) {
    return { newFlags, newVariables };
  }

  flagUpdates.forEach(update => {
    const currentValue = newFlags[update.flag] || newVariables[update.flag];
    
    switch (update.operation) {
      case 'set':
        if (update.flag in newFlags) {
          newFlags[update.flag] = update.value;
        } else {
          newVariables[update.flag] = update.value;
        }
        break;
        
      case 'increment':
        if (typeof currentValue === 'number' && typeof update.value === 'number') {
          if (update.flag in newFlags) {
            newFlags[update.flag] = currentValue + update.value;
          } else {
            newVariables[update.flag] = currentValue + update.value;
          }
        }
        break;
        
      case 'decrement':
        if (typeof currentValue === 'number' && typeof update.value === 'number') {
          if (update.flag in newFlags) {
            newFlags[update.flag] = currentValue - update.value;
          } else {
            newVariables[update.flag] = currentValue - update.value;
          }
        }
        break;
    }
  });

  return { newFlags, newVariables };
}
