// Simple analytics utilities for Google Analytics integration

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
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
    analytics.trackEvent('choice_made', 'narrative', choiceId),

  reset: (segmentId: string) =>
    analytics.trackEvent('story_reset', 'narrative', segmentId)
};

// Enhanced tracking for QNCE expansion features
export const trackExpansionEvent = {
  segmentEntry: (segmentName: string, nodeId: string) => 
    analytics.trackEvent('expansion_segment_entered', 'narrative_expansion', `${segmentName}:${nodeId}`),
  
  originsDiscovery: (discoveryType: string) =>
    analytics.trackEvent('origins_discovery', 'narrative_expansion', discoveryType),
  
  quantumMemoryRevelation: (memoryType: string) =>
    analytics.trackEvent('quantum_memory_accessed', 'narrative_expansion', memoryType),
  
  realmConvergence: (dimensionType: string) =>
    analytics.trackEvent('realm_convergence', 'narrative_expansion', dimensionType),
  
  catalystIdentity: (revelationType: string) =>
    analytics.trackEvent('catalyst_revealed', 'narrative_expansion', revelationType),
  
  legacyChoices: (legacyPath: string) =>
    analytics.trackEvent('legacy_path_chosen', 'narrative_expansion', legacyPath),
  
  // QNCE variable milestone tracking
  variableMilestone: (variable: string, threshold: number, currentValue: number) =>
    analytics.trackEvent('qnce_milestone', 'game_progression', `${variable}_${threshold}_value_${currentValue}`),
  
  // Dynamic text interpolation usage
  dynamicTextRendered: (nodeId: string, variableCount: number) =>
    analytics.trackEvent('dynamic_text_rendered', 'narrative_enhancement', `${nodeId}_vars_${variableCount}`)
};

// Feedback hook implementations matching our expansion segments
export const FEEDBACK_HOOKS = {
  ORIGINS_DISCOVERY: (data: Record<string, unknown>) => {
    trackExpansionEvent.originsDiscovery(String(data.discoveryType || 'unknown'));
    console.log('🔍 Origins Discovery:', data);
  },
  
  QUANTUM_MEMORY_REVELATION: (data: Record<string, unknown>) => {
    trackExpansionEvent.quantumMemoryRevelation(String(data.memoryType || 'unknown'));
    console.log('🧠 Quantum Memory Accessed:', data);
  },
  
  REALM_CONVERGENCE: (data: Record<string, unknown>) => {
    trackExpansionEvent.realmConvergence(String(data.dimensionType || 'unknown'));
    console.log('🌌 Realm Convergence Event:', data);
  },
  
  CATALYST_IDENTITY: (data: Record<string, unknown>) => {
    trackExpansionEvent.catalystIdentity(String(data.revelationType || 'unknown'));
    console.log('✨ Catalyst Identity Revealed:', data);
  },
  
  LEGACY_CHOICES: (data: Record<string, unknown>) => {
    trackExpansionEvent.legacyChoices(String(data.legacyPath || 'unknown'));
    console.log('🔮 Legacy Path Chosen:', data);
  }
};

export default analytics;
