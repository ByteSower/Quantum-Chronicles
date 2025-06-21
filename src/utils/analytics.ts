// Simple analytics utilities for Google Analytics integration

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class SimpleAnalytics {
  private isEnabled: boolean = false;

  constructor() {
    // Check if Google Analytics is loaded
    this.isEnabled = typeof window !== 'undefined' && 
                    typeof window.gtag === 'function';
  }

  // Track basic events
  trackEvent(action: string, category: string, label?: string) {
    if (this.isEnabled) {
      try {
        window.gtag('event', action, {
          event_category: category,
          event_label: label
        });
      } catch (error) {
        console.warn('Analytics tracking error:', error);
      }
    }
  }
}

// Export singleton instance
export const analytics = new SimpleAnalytics();

// Simple tracking helpers
export const trackUIEvent = {
  feature: (feature: string, action: string) => 
    analytics.trackEvent(`feature_${action}`, 'user_interface', feature),
  
  help: (topic: string) => 
    analytics.trackEvent('help_accessed', 'education', topic)
};

export const trackStoryEvent = {
  progress: (nodeId: string) => 
    analytics.trackEvent('story_progress', 'narrative', nodeId),
  
  choice: (choiceId: string) => 
    analytics.trackEvent('choice_made', 'narrative', choiceId)
};

export default analytics;
