// Analytics utilities for Quantum Chronicles
// Tracks narrative-specific user interactions and story progression

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class QNCEAnalytics {
  private isEnabled: boolean = false;

  constructor() {
    // Check if Google Analytics is loaded
    this.isEnabled = typeof window !== 'undefined' && 
                    typeof window.gtag === 'function';
  }

  // Track story progression through nodes
  trackStoryProgress(nodeId: string, storyPath: string, depth: number) {
    this.trackEvent({
      action: 'story_progress',
      category: 'narrative',
      label: nodeId,
      value: depth,
      custom_parameters: {
        story_path: storyPath,
        node_depth: depth
      }
    });
  }

  // Track user choices and their quantum variable impacts
  trackChoice(choiceId: string, choiceText: string, variableChanges: Record<string, number>) {
    this.trackEvent({
      action: 'choice_made',
      category: 'narrative',
      label: choiceId,
      custom_parameters: {
        choice_text: choiceText.substring(0, 100), // Truncate for analytics
        variable_changes: variableChanges,
        choice_impact: Object.keys(variableChanges).length
      }
    });
  }

  // Track quantum variable states at key moments
  trackVariableState(variables: Record<string, number>, fieldStrength: number, nodeId: string) {
    this.trackEvent({
      action: 'variable_state',
      category: 'quantum_mechanics',
      label: nodeId,
      value: Math.round(fieldStrength),
      custom_parameters: {
        curiosity: variables.curiosity || 0,
        coherence: variables.coherence || 0,
        disruption: variables.disruption || 0,
        synchrony: variables.synchrony || 0,
        field_strength: fieldStrength
      }
    });
  }

  // Track story completion and endings reached
  trackStoryCompletion(endingType: string, totalChoices: number, timeSpent: number) {
    this.trackEvent({
      action: 'story_completed',
      category: 'engagement',
      label: endingType,
      value: totalChoices,
      custom_parameters: {
        ending_type: endingType,
        total_choices: totalChoices,
        time_spent_minutes: Math.round(timeSpent / 60000), // Convert ms to minutes
        completion_rate: 100
      }
    });
  }

  // Track feature usage (developer mode, help system, etc.)
  trackFeatureUsage(feature: string, action: string, context?: string) {
    this.trackEvent({
      action: `feature_${action}`,
      category: 'user_interface',
      label: feature,
      custom_parameters: {
        feature_name: feature,
        action_type: action,
        context: context || 'unknown'
      }
    });
  }

  // Track help system engagement
  trackHelpEngagement(helpType: string, topic: string, timeSpent?: number) {
    this.trackEvent({
      action: 'help_accessed',
      category: 'education',
      label: helpType,
      value: timeSpent,
      custom_parameters: {
        help_type: helpType,
        topic: topic,
        time_spent_seconds: timeSpent || 0
      }
    });
  }

  // Track user drop-off points
  trackDropOff(nodeId: string, storyDepth: number, sessionDuration: number) {
    this.trackEvent({
      action: 'user_exit',
      category: 'engagement',
      label: nodeId,
      value: storyDepth,
      custom_parameters: {
        exit_node: nodeId,
        story_depth: storyDepth,
        session_duration_seconds: Math.round(sessionDuration / 1000)
      }
    });
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, context?: string) {
    this.trackEvent({
      action: 'performance_metric',
      category: 'technical',
      label: metric,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metric,
        metric_value: value,
        context: context || 'general'
      }
    });
  }

  // Core event tracking method
  private trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      // Development mode logging
      console.log('📊 Analytics Event:', event);
      return;
    }

    try {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }

  // Session tracking
  startSession(startingPoint: string) {
    this.trackEvent({
      action: 'session_start',
      category: 'engagement',
      label: startingPoint,
      custom_parameters: {
        starting_point: startingPoint,
        timestamp: Date.now()
      }
    });
  }

  endSession(duration: number, choicesMade: number, nodesVisited: number) {
    this.trackEvent({
      action: 'session_end',
      category: 'engagement',
      value: Math.round(duration / 1000), // Duration in seconds
      custom_parameters: {
        session_duration_seconds: Math.round(duration / 1000),
        choices_made: choicesMade,
        nodes_visited: nodesVisited,
        avg_time_per_choice: choicesMade > 0 ? Math.round(duration / choicesMade / 1000) : 0
      }
    });
  }
}

// Export singleton instance
export const analytics = new QNCEAnalytics();

// Helper functions for common tracking scenarios
export const trackStoryEvent = {
  progress: (nodeId: string, path: string, depth: number) => 
    analytics.trackStoryProgress(nodeId, path, depth),
  
  choice: (choiceId: string, text: string, changes: Record<string, number>) => 
    analytics.trackChoice(choiceId, text, changes),
  
  completion: (ending: string, choices: number, time: number) => 
    analytics.trackStoryCompletion(ending, choices, time),
  
  dropOff: (nodeId: string, depth: number, duration: number) => 
    analytics.trackDropOff(nodeId, depth, duration)
};

export const trackUIEvent = {
  feature: (feature: string, action: string, context?: string) => 
    analytics.trackFeatureUsage(feature, action, context),
  
  help: (type: string, topic: string, time?: number) => 
    analytics.trackHelpEngagement(type, topic, time),
  
  performance: (metric: string, value: number, context?: string) => 
    analytics.trackPerformance(metric, value, context)
};

export default analytics;
