import { useState } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import type { FeedbackData } from '../components/FeedbackPrompt';

interface FeedbackTrigger {
  id: string;
  category: FeedbackData['category'];
  milestone: string;
  condition: () => boolean;
  cooldownMs: number;
  maxShowCount: number;
  title?: string;
  description?: string;
  quickOptions?: string[];
}

class FeedbackManager {
  private triggers: FeedbackTrigger[] = [];
  private shownPrompts = new Set<string>();
  private lastShownTimes = new Map<string, number>();
  private showCounts = new Map<string, number>();
  private isEnabled = true;

  constructor() {
    this.initializeDefaultTriggers();
    this.loadPersistedData();
  }

  private initializeDefaultTriggers() {
    this.triggers = [
      // Onboarding completion feedback
      {
        id: 'onboarding_complete',
        category: 'onboarding',
        milestone: 'onboarding_finished',
        condition: () => true,
        cooldownMs: 0, // No cooldown for onboarding
        maxShowCount: 1,
        title: 'How was getting started?',
        description: 'Help us improve the onboarding experience for future users.',
        quickOptions: [
          'Clear and helpful',
          'Too long or complex', 
          'Missing important info',
          'Perfect as is'
        ]
      },
      
      // After first choice
      {
        id: 'first_choice_made',
        category: 'choice',
        milestone: 'first_choice_completed',
        condition: () => true,
        cooldownMs: 0,
        maxShowCount: 1,
        title: 'How was making your first choice?',
        description: 'Your feedback helps us refine the choice-making experience.',
        quickOptions: [
          'Intuitive and engaging',
          'Confusing or unclear',
          'Too many options',
          'Not enough context'
        ]
      },

      // After significant story progress
      {
        id: 'story_engagement',
        category: 'story',
        milestone: 'story_midpoint',
        condition: () => true,
        cooldownMs: 10 * 60 * 1000, // 10 minutes
        maxShowCount: 2,
        title: 'How are you enjoying the story?',
        description: 'Tell us about your narrative experience so far.',
        quickOptions: [
          'Compelling and immersive',
          'Hard to follow',
          'Too slow or fast paced',
          'Love the quantum theme'
        ]
      },

      // Variable dashboard interaction
      {
        id: 'variable_interaction',
        category: 'interaction',
        milestone: 'variable_dashboard_used',
        condition: () => true,
        cooldownMs: 5 * 60 * 1000, // 5 minutes
        maxShowCount: 1,
        title: 'How useful are the variable displays?',
        description: 'Help us improve how we show your character development.',
        quickOptions: [
          'Very helpful for decisions',
          'Too technical or complex',
          'Want more explanation',
          'Just right'
        ]
      },

      // Session completion feedback
      {
        id: 'session_complete',
        category: 'overall',
        milestone: 'session_ended',
        condition: () => true,
        cooldownMs: 30 * 60 * 1000, // 30 minutes
        maxShowCount: 3,
        title: 'How was your overall experience?',
        description: 'Share your thoughts on Quantum Chronicles.',
        quickOptions: [
          'Excellent, very engaging',
          'Good but could improve',
          'Okay, has potential',
          'Needs significant work'
        ]
      },

      // Story completion feedback
      {
        id: 'story_complete',
        category: 'story',
        milestone: 'story_completed',
        condition: () => true,
        cooldownMs: 0, // No cooldown for story completion
        maxShowCount: 1,
        title: 'Congratulations on completing the story!',
        description: 'How was your complete narrative experience?',
        quickOptions: [
          'Amazing journey, loved it',
          'Good story, some issues',
          'Confusing or hard to follow',
          'Want more like this'
        ]
      },

      // Extended engagement feedback 
      {
        id: 'deep_engagement',
        category: 'story',
        milestone: 'story_engagement',
        condition: () => true,
        cooldownMs: 15 * 60 * 1000, // 15 minutes
        maxShowCount: 2,
        title: 'How is your quantum journey going?',
        description: 'Your feedback helps us improve the narrative flow.',
        quickOptions: [
          'Deeply immersed',
          'Some confusing parts',
          'Pacing feels off',
          'Love the interactivity'
        ]
      }
    ];
  }

  private loadPersistedData() {
    try {
      const savedData = localStorage.getItem('qnce_feedback_data');
      if (savedData) {
        const { shownPrompts, lastShownTimes, showCounts } = JSON.parse(savedData);
        this.shownPrompts = new Set(shownPrompts || []);
        this.lastShownTimes = new Map(lastShownTimes || []);
        this.showCounts = new Map(showCounts || []);
      }
    } catch (error) {
      console.warn('Failed to load feedback data:', error);
    }
  }

  private persistData() {
    try {
      const dataToSave = {
        shownPrompts: Array.from(this.shownPrompts),
        lastShownTimes: Array.from(this.lastShownTimes.entries()),
        showCounts: Array.from(this.showCounts.entries())
      };
      localStorage.setItem('qnce_feedback_data', JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Failed to persist feedback data:', error);
    }
  }

  public shouldShowFeedback(milestone: string): FeedbackTrigger | null {
    if (!this.isEnabled) return null;

    const trigger = this.triggers.find(t => t.milestone === milestone);
    if (!trigger) return null;

    // Check if we've already shown this too many times
    const showCount = this.showCounts.get(trigger.id) || 0;
    if (showCount >= trigger.maxShowCount) return null;

    // Check cooldown
    const lastShown = this.lastShownTimes.get(trigger.id);
    if (lastShown && Date.now() - lastShown < trigger.cooldownMs) return null;

    // Check custom condition
    if (!trigger.condition()) return null;

    return trigger;
  }

  public markFeedbackShown(triggerId: string) {
    this.shownPrompts.add(triggerId);
    this.lastShownTimes.set(triggerId, Date.now());
    this.showCounts.set(triggerId, (this.showCounts.get(triggerId) || 0) + 1);
    this.persistData();

    // Track feedback prompt trigger
    analyticsWrapper.trackFeedbackEvent('feedback_prompt_shown', {
      category: 'interaction' as const,
      milestone: triggerId
    });
  }

  public submitFeedback(feedback: FeedbackData) {
    // Store feedback locally for potential offline analysis
    try {
      const existingFeedback = JSON.parse(localStorage.getItem('qnce_user_feedback') || '[]');
      existingFeedback.push(feedback);
      localStorage.setItem('qnce_user_feedback', JSON.stringify(existingFeedback));
    } catch (error) {
      console.warn('Failed to store feedback locally:', error);
    }

    // Track the submission
    analyticsWrapper.trackFeedbackEvent('feedback_response_submitted', {
      category: feedback.category,
      milestone: feedback.milestone,
      rating: feedback.rating,
      hasComment: !!feedback.comment,
      quickOption: feedback.comment && feedback.comment.length < 100 ? feedback.comment : undefined
    });

    // TODO: In production, also send to backend API
    if (import.meta.env.DEV) {
      console.log('💬 Feedback submitted:', feedback);
    }
  }

  public getFeedbackSummary() {
    try {
      const feedback = JSON.parse(localStorage.getItem('qnce_user_feedback') || '[]');
      return {
        totalFeedback: feedback.length,
        byCategory: feedback.reduce((acc: Record<string, number>, fb: FeedbackData) => {
          acc[fb.category] = (acc[fb.category] || 0) + 1;
          return acc;
        }, {}),
        averageRating: feedback.length > 0 
          ? feedback.reduce((sum: number, fb: FeedbackData) => sum + fb.rating, 0) / feedback.length 
          : 0
      };
    } catch {
      return { totalFeedback: 0, byCategory: {}, averageRating: 0 };
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public isPromptEnabled(): boolean {
    return this.isEnabled;
  }

  // Beta testing utilities
  public resetFeedbackData() {
    this.shownPrompts.clear();
    this.lastShownTimes.clear();
    this.showCounts.clear();
    localStorage.removeItem('qnce_feedback_data');
    localStorage.removeItem('qnce_user_feedback');
  }

  public getBetaTestingInfo() {
    return {
      promptsShown: Array.from(this.shownPrompts),
      showCounts: Object.fromEntries(this.showCounts),
      feedbackSummary: this.getFeedbackSummary(),
      isEnabled: this.isEnabled
    };
  }
}

// Hook for using feedback manager in React components
export function useFeedbackManager() {
  const [feedbackManager] = useState(() => new FeedbackManager());
  const [currentPrompt, setCurrentPrompt] = useState<{
    trigger: FeedbackTrigger;
    isVisible: boolean;
  } | null>(null);

  const checkForFeedback = (milestone: string) => {
    const trigger = feedbackManager.shouldShowFeedback(milestone);
    if (trigger) {
      feedbackManager.markFeedbackShown(trigger.id);
      setCurrentPrompt({ trigger, isVisible: true });
    }
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    feedbackManager.submitFeedback(feedback);
    setCurrentPrompt(null);
  };

  const handleFeedbackDismiss = () => {
    setCurrentPrompt(null);
  };

  const dismissCurrentPrompt = () => {
    setCurrentPrompt(null);
  };

  return {
    feedbackManager,
    currentPrompt,
    checkForFeedback,
    handleFeedbackSubmit,
    handleFeedbackDismiss,
    dismissCurrentPrompt,
    setEnabled: feedbackManager.setEnabled.bind(feedbackManager),
    getFeedbackSummary: feedbackManager.getFeedbackSummary.bind(feedbackManager),
    getBetaTestingInfo: feedbackManager.getBetaTestingInfo.bind(feedbackManager)
  };
}

export default FeedbackManager;
