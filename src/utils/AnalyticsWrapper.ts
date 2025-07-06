// Disabled analytics wrapper - all tracking disabled for policy compliance

// No-op analytics wrapper class
class AnalyticsWrapper {
  constructor() {
    // Analytics permanently disabled for policy compliance
  }

  // No-op tracking methods
  trackChoiceMade(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackOnboardingEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackEngagementEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackFeedbackEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackNarrativeEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackVariableChange(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackUIInteraction(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  trackDebugEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  initSession(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  endSession(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  setUserProperty(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  // No-op method for any other tracking calls
  track(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }

  // Add trackUIEvent method to match expected interface
  trackUIEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }
}

// Export singleton instance
export const analyticsWrapper = new AnalyticsWrapper();
export default analyticsWrapper;
