// Disabled analytics utilities - all tracking disabled for policy compliance

// No-op implementation - all analytics functions disabled
class SimpleAnalytics {
  constructor() {
    // Analytics permanently disabled for policy compliance
  }

  // No-op tracking functions
  trackEvent(..._args: unknown[]): void {
    // Analytics disabled - no tracking performed
  }
}

// Export analytics instance
export const analytics = new SimpleAnalytics();

export const trackUIEvent = {
  feature: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  help: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export const trackStoryEvent = {
  progress: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  choice: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  reset: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export const trackExpansionEvent = {
  segmentEntry: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  originsDiscovery: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  quantumMemoryRevelation: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  realmConvergence: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  catalystIdentity: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  legacyChoices: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  variableMilestone: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  dynamicTextRendered: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export const FEEDBACK_HOOKS = {
  ORIGINS_DISCOVERY: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  QUANTUM_MEMORY_REVELATION: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  REALM_CONVERGENCE: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  CATALYST_IDENTITY: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  LEGACY_CHOICES: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export const trackTutorialEvent = {
  start: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  step: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  complete: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  skip: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  exit: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export const trackSideMenuEvent = {
  open: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  close: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  navigate: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  },
  keyboardNavigation: (..._args: unknown[]): void => {
    // Analytics disabled - no tracking performed
  }
};

export default analytics;
