import { z } from 'zod';
import { abTestManager } from './ABTestConfig';

// Event Schema Definitions
const baseEventSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  timestamp: z.number(),
  variant: z.enum(['A', 'B']).optional(), // For A/B testing
});

const choiceMadeSchema = baseEventSchema.extend({
  eventType: z.literal('choice_made'),
  choiceId: z.string(),
  choiceText: z.string(),
  nodeId: z.string(),
  choiceIndex: z.number(),
  isFirstChoice: z.boolean(),
  variables: z.object({
    curiosity: z.number(),
    coherence: z.number(),
    disruption: z.number(),
    synchrony: z.number(),
  }),
});

const onboardingEventSchema = baseEventSchema.extend({
  eventType: z.enum(['onboarding_started', 'onboarding_completed', 'onboarding_skipped']),
  step: z.number().optional(),
  totalSteps: z.number().optional(),
  timeSpent: z.number().optional(), // in seconds
});

const engagementEventSchema = baseEventSchema.extend({
  eventType: z.enum(['engagement_prompt_shown', 'engagement_prompt_clicked', 'engagement_prompt_dismissed']),
  scrollDepth: z.number().optional(),
  timeOnPage: z.number().optional(),
});

const feedbackEventSchema = baseEventSchema.extend({
  eventType: z.enum(['feedback_prompt_shown', 'feedback_prompt_dismissed', 'feedback_response_submitted', 'feedback_quick_option_selected']),
  category: z.enum(['onboarding', 'story', 'choice', 'interaction', 'overall']),
  milestone: z.string(),
  rating: z.number().optional(),
  hasComment: z.boolean().optional(),
  quickOption: z.string().optional(),
});

const narrativeEventSchema = baseEventSchema.extend({
  eventType: z.enum(['story_progress', 'story_reset', 'story_completed']),
  nodeId: z.string(),
  pathTaken: z.array(z.string()).optional(),
  totalChoices: z.number().optional(),
});

const uiEventSchema = baseEventSchema.extend({
  eventType: z.enum(['feature_used', 'modal_opened', 'modal_closed', 'tooltip_viewed']),
  feature: z.string(),
  action: z.string().optional(),
});

// Union of all possible events
const eventSchema = z.union([
  choiceMadeSchema,
  onboardingEventSchema,
  engagementEventSchema,
  feedbackEventSchema,
  narrativeEventSchema,
  uiEventSchema,
]);

// Type inference
export type AnalyticsEvent = z.infer<typeof eventSchema>;
export type ChoiceMadeEvent = z.infer<typeof choiceMadeSchema>;
export type OnboardingEvent = z.infer<typeof onboardingEventSchema>;
export type EngagementEvent = z.infer<typeof engagementEventSchema>;
export type FeedbackEvent = z.infer<typeof feedbackEventSchema>;
export type NarrativeEvent = z.infer<typeof narrativeEventSchema>;
export type UIEvent = z.infer<typeof uiEventSchema>;

// A/B Testing Configuration
export type ABTestVariant = 'A' | 'B';

class AnalyticsWrapper {
  private isEnabled: boolean = false;

  constructor() {
    // Check if Google Analytics is loaded
    this.isEnabled = typeof window !== 'undefined' && 
                    typeof window.gtag === 'function';
  }

  private enrichEvent(event: Partial<AnalyticsEvent>): AnalyticsEvent {
    const baseData = {
      timestamp: Date.now(),
      userId: abTestManager.getUserId(),
      sessionId: abTestManager.getSessionId(),
      variant: abTestManager.getVariant(),
    };

    return { ...baseData, ...event } as AnalyticsEvent;
  }

  private sendToGA(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    try {
      window.gtag('event', event.eventType, {
        event_category: this.getCategoryFromEventType(event.eventType),
        event_label: this.getLabelFromEvent(event),
        custom_map: {
          user_id: event.userId,
          session_id: event.sessionId,
          ab_variant: event.variant,
        },
        ...this.getCustomParameters(event),
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }

  private getCategoryFromEventType(eventType: string): string {
    if (eventType.includes('choice')) return 'narrative_interaction';
    if (eventType.includes('onboarding')) return 'education';
    if (eventType.includes('engagement')) return 'user_engagement';
    if (eventType.includes('feedback')) return 'user_feedback';
    if (eventType.includes('story')) return 'narrative_flow';
    return 'user_interface';
  }

  private getLabelFromEvent(event: AnalyticsEvent): string {
    switch (event.eventType) {
      case 'choice_made':
        return `${(event as ChoiceMadeEvent).nodeId}_choice_${(event as ChoiceMadeEvent).choiceIndex}`;
      case 'onboarding_completed':
        return `variant_${event.variant}`;
      case 'story_progress':
        return (event as NarrativeEvent).nodeId;
      default:
        return event.eventType;
    }
  }

  private getCustomParameters(event: AnalyticsEvent): Record<string, unknown> {
    const params: Record<string, unknown> = {};

    switch (event.eventType) {
      case 'choice_made': {
        const choiceEvent = event as ChoiceMadeEvent;
        params.choice_id = choiceEvent.choiceId;
        params.node_id = choiceEvent.nodeId;
        params.is_first_choice = choiceEvent.isFirstChoice;
        params.curiosity = choiceEvent.variables.curiosity;
        params.coherence = choiceEvent.variables.coherence;
        params.disruption = choiceEvent.variables.disruption;
        params.synchrony = choiceEvent.variables.synchrony;
        break;
      }
      
      case 'onboarding_completed':
      case 'onboarding_skipped': {
        const onboardingEvent = event as OnboardingEvent;
        if (onboardingEvent.timeSpent) params.time_spent = onboardingEvent.timeSpent;
        if (onboardingEvent.step) params.final_step = onboardingEvent.step;
        break;
      }

      case 'feedback_response_submitted':
      case 'feedback_prompt_shown':
      case 'feedback_prompt_dismissed':
      case 'feedback_quick_option_selected': {
        const feedbackEvent = event as FeedbackEvent;
        params.feedback_category = feedbackEvent.category;
        params.milestone = feedbackEvent.milestone;
        if (feedbackEvent.rating) params.rating = feedbackEvent.rating;
        if (feedbackEvent.hasComment !== undefined) params.has_comment = feedbackEvent.hasComment;
        if (feedbackEvent.quickOption) params.quick_option = feedbackEvent.quickOption;
        break;
      }
    }

    return params;
  }

  // Public API Methods
  public trackEvent(eventData: Partial<AnalyticsEvent>): void {
    try {
      const enrichedEvent = this.enrichEvent(eventData);
      const validatedEvent = eventSchema.parse(enrichedEvent);
      
      this.sendToGA(validatedEvent);
      
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log('📊 Analytics Event:', validatedEvent);
      }
    } catch (error) {
      console.error('Invalid analytics event:', error);
      console.error('Event data:', eventData);
    }
  }

  // Convenience methods for specific event types
  public trackChoiceMade(data: Omit<ChoiceMadeEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>): void {
    this.trackEvent({ ...data, eventType: 'choice_made' });
  }

  public trackOnboardingEvent(
    eventType: 'onboarding_started' | 'onboarding_completed' | 'onboarding_skipped',
    data?: Partial<Omit<OnboardingEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>>
  ): void {
    this.trackEvent({ ...data, eventType });
  }

  public trackEngagementEvent(
    eventType: 'engagement_prompt_shown' | 'engagement_prompt_clicked' | 'engagement_prompt_dismissed',
    data?: Partial<Omit<EngagementEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>>
  ): void {
    this.trackEvent({ ...data, eventType });
  }

  public trackFeedbackEvent(
    eventType: 'feedback_prompt_shown' | 'feedback_prompt_dismissed' | 'feedback_response_submitted' | 'feedback_quick_option_selected',
    data: Omit<FeedbackEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>
  ): void {
    this.trackEvent({ ...data, eventType });
  }

  public trackNarrativeEvent(
    eventType: 'story_progress' | 'story_reset' | 'story_completed',
    data: Omit<NarrativeEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>
  ): void {
    this.trackEvent({ ...data, eventType });
  }

  public trackUIEvent(
    eventType: 'feature_used' | 'modal_opened' | 'modal_closed' | 'tooltip_viewed',
    data: Omit<UIEvent, 'eventType' | 'timestamp' | 'userId' | 'sessionId' | 'variant'>
  ): void {
    this.trackEvent({ ...data, eventType });
  }

  // A/B Testing utilities
  public getABTestVariant(): ABTestVariant | null {
    return abTestManager.getVariant();
  }

  public isVariantB(): boolean {
    return abTestManager.isVariantB();
  }

  public getUserId(): string | null {
    return abTestManager.getUserId() || null;
  }

  public getSessionId(): string | null {
    return abTestManager.getSessionId() || null;
  }
}

// Export singleton instance
export const analyticsWrapper = new AnalyticsWrapper();

// Legacy compatibility - gradually migrate from this
export const analytics = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackEvent: (action: string, category: string, _label?: string) => {
    analyticsWrapper.trackEvent({
      eventType: 'feature_used' as const,
      feature: action,
      action: category,
    });
  }
};
