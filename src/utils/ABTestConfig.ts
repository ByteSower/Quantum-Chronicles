// A/B Testing and Feature Flag Configuration

export interface FeatureFlags {
  // Onboarding A/B Test
  enhancedOnboarding: boolean;
  
  // Engagement Features
  scrollDepthTracking: boolean;
  microPrompts: boolean;
  variableTeasers: boolean;
  
  // Performance Features
  lazyLoadDashboard: boolean;
  lazyLoadBranchTracker: boolean;
  
  // Analytics Features
  detailedAnalytics: boolean;
  realTimeTracking: boolean;
}

export interface ABTestConfig {
  // Onboarding variants
  onboardingVariant: 'A' | 'B';
  
  // User identification
  userId: string;
  sessionId: string;
  
  // Test assignment
  assignedAt: number;
  
  // Feature flags based on variant
  features: FeatureFlags;
}

// Default feature flags for each variant
const VARIANT_A_FEATURES: FeatureFlags = {
  enhancedOnboarding: false, // Baseline: current onboarding
  scrollDepthTracking: true,
  microPrompts: false, // Baseline: no micro-prompts
  variableTeasers: true,
  lazyLoadDashboard: false,
  lazyLoadBranchTracker: false,
  detailedAnalytics: true,
  realTimeTracking: true,
};

const VARIANT_B_FEATURES: FeatureFlags = {
  enhancedOnboarding: true, // Enhanced: guided tour with visual callouts
  scrollDepthTracking: true,
  microPrompts: true, // Enhanced: contextual micro-prompts
  variableTeasers: true,
  lazyLoadDashboard: true, // Enhanced: performance optimizations
  lazyLoadBranchTracker: true,
  detailedAnalytics: true,
  realTimeTracking: true,
};

class ABTestManager {
  private config: ABTestConfig | null = null;

  constructor() {
    this.initializeConfig();
  }

  private initializeConfig() {
    if (typeof window === 'undefined') return;

    // Try to get existing config
    const existingConfig = localStorage.getItem('qnce_ab_config');
    if (existingConfig) {
      try {
        this.config = JSON.parse(existingConfig);
        // Validate config structure
        if (this.isValidConfig(this.config)) {
          return;
        }
      } catch (error) {
        console.warn('Invalid AB test config, regenerating:', error);
      }
    }

    // Generate new config
    this.generateNewConfig();
  }

  private isValidConfig(config: any): config is ABTestConfig {
    return (
      config &&
      typeof config.userId === 'string' &&
      typeof config.sessionId === 'string' &&
      (config.onboardingVariant === 'A' || config.onboardingVariant === 'B') &&
      typeof config.assignedAt === 'number' &&
      config.features &&
      typeof config.features === 'object'
    );
  }

  private generateNewConfig() {
    if (typeof window === 'undefined') return;

    // Generate or retrieve user ID
    let userId = localStorage.getItem('qnce_user_id');
    if (!userId) {
      userId = this.generateUUID();
      localStorage.setItem('qnce_user_id', userId);
    }

    // Generate session ID
    let sessionId = sessionStorage.getItem('qnce_session_id');
    if (!sessionId) {
      sessionId = this.generateUUID();
      sessionStorage.setItem('qnce_session_id', sessionId);
    }

    // Determine variant (50/50 split based on user ID hash)
    const variant: 'A' | 'B' = this.hashString(userId) % 2 === 0 ? 'A' : 'B';

    // Create configuration
    this.config = {
      userId,
      sessionId,
      onboardingVariant: variant,
      assignedAt: Date.now(),
      features: variant === 'A' ? { ...VARIANT_A_FEATURES } : { ...VARIANT_B_FEATURES },
    };

    // Store configuration
    localStorage.setItem('qnce_ab_config', JSON.stringify(this.config));
    localStorage.setItem('qnce_ab_variant', variant);

    // Debug logging
    if (import.meta.env.DEV) {
      console.log('🧪 AB Test Assignment:', {
        variant,
        userId: userId.substring(0, 8) + '...',
        features: this.config.features,
      });
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Public API
  public getVariant(): 'A' | 'B' {
    return this.config?.onboardingVariant || 'A';
  }

  public isVariantB(): boolean {
    return this.getVariant() === 'B';
  }

  public getFeatureFlag(flag: keyof FeatureFlags): boolean {
    return this.config?.features[flag] || false;
  }

  public getAllFeatures(): FeatureFlags {
    return this.config?.features || VARIANT_A_FEATURES;
  }

  public getUserId(): string {
    return this.config?.userId || '';
  }

  public getSessionId(): string {
    return this.config?.sessionId || '';
  }

  public getConfig(): ABTestConfig | null {
    return this.config;
  }

  // Force a specific variant (for testing)
  public forceVariant(variant: 'A' | 'B') {
    if (!this.config) return;
    
    this.config.onboardingVariant = variant;
    this.config.features = variant === 'A' ? { ...VARIANT_A_FEATURES } : { ...VARIANT_B_FEATURES };
    
    localStorage.setItem('qnce_ab_config', JSON.stringify(this.config));
    localStorage.setItem('qnce_ab_variant', variant);
    
    console.log('🧪 Forced variant:', variant);
  }

  // Reset AB test (for testing)
  public reset() {
    localStorage.removeItem('qnce_ab_config');
    localStorage.removeItem('qnce_ab_variant');
    this.generateNewConfig();
  }
}

// Export singleton instance
export const abTestManager = new ABTestManager();

// Convenience hooks for React components
export const useFeatureFlag = (flag: keyof FeatureFlags): boolean => {
  return abTestManager.getFeatureFlag(flag);
};

export const useABTestVariant = (): 'A' | 'B' => {
  return abTestManager.getVariant();
};

// Environment variable overrides for development
if (import.meta.env.DEV) {
  // Allow forcing variants via URL params
  const urlParams = new URLSearchParams(window.location?.search || '');
  const forceVariant = urlParams.get('variant');
  if (forceVariant === 'A' || forceVariant === 'B') {
    abTestManager.forceVariant(forceVariant);
  }

  // Expose to window for debugging
  if (typeof window !== 'undefined') {
    (window as any).abTestManager = abTestManager;
  }
}
