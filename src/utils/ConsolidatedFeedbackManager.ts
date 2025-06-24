import { useState, useCallback, useRef } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';

// Enhanced feedback data for consolidated system
export interface ConsolidatedFeedbackData {
  // Overall experience rating
  overallRating: number;
  
  // Category-specific ratings
  ratings: {
    onboarding?: number;
    story?: number;
    choices?: number;
    interface?: number;
  };
  
  // User comments by category
  comments: {
    general?: string;
    likes?: string;
    improvements?: string;
    suggestions?: string;
  };
  
  // Selected quick options
  quickResponses: string[];
  
  // Session metadata
  milestone: string;
  sessionDuration: number;
  choiceCount: number;
  segmentsReached: string[];
  timestamp: number;
  
  // QNCE specific data
  qnceVariables?: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
}

interface FeedbackMilestone {
  id: string;
  name: string;
  description: string;
  condition: () => boolean;
  priority: number; // Higher priority milestones override lower ones
  consolidatedPrompt: {
    title: string;
    description: string;
    sections: string[]; // Which feedback sections to show
    quickOptions: string[];
  };
}

class ConsolidatedFeedbackManager {
  private milestones: FeedbackMilestone[] = [];
  private isPopupActive = false; // Global popup lock
  private popupLockTimeout: NodeJS.Timeout | null = null;
  private pendingMilestone: string | null = null;
  private sessionStartTime = Date.now();
  private feedbackData: Partial<ConsolidatedFeedbackData> = {};
  private isEnabled = true;
  private hasShownFeedback = false; // Ensures only one feedback per session
  
  // Debounce rapid interactions
  private lastTriggerTime = 0;
  private readonly DEBOUNCE_MS = 2000; // 2 second debounce
  
  constructor() {
    this.initializeMilestones();
    this.loadSessionData();
  }

  private initializeMilestones() {
    this.milestones = [
      // Story completion - Highest priority
      {
        id: 'story_completion',
        name: 'Story Complete',
        description: 'User completed a major story arc',
        condition: () => true,
        priority: 100,
        consolidatedPrompt: {
          title: 'Thank you for experiencing Quantum Chronicles!',
          description: 'Your feedback helps us create better interactive narratives.',
          sections: ['overall', 'story', 'choices', 'suggestions'],
          quickOptions: [
            'Amazing experience, loved every moment',
            'Great concept but needs refinement',
            'Confusing narrative or choices',
            'Technical issues affected experience',
            'Want more content like this',
            'Recommend to others'
          ]
        }
      },
      
      // Story branch completion - High priority
      {
        id: 'story_branch_completion',
        name: 'Story Branch Complete',
        description: 'User completed a meaningful story branch',
        condition: () => true,
        priority: 90,
        consolidatedPrompt: {
          title: 'You\'ve completed a story path!',
          description: 'How was that narrative journey?',
          sections: ['overall', 'story', 'choices', 'suggestions'],
          quickOptions: [
            'Compelling and well-crafted',
            'Choices felt meaningful',
            'Story flow was smooth',
            'Quantum elements enhanced experience',
            'Want to explore more paths',
            'Some parts were confusing'
          ]
        }
      },
      
      // Session completion - Medium priority (much longer requirement)
      {
        id: 'session_completion',
        name: 'Session Complete',
        description: 'User had a substantial play session',
        condition: () => (Date.now() - this.sessionStartTime) > 18 * 60 * 1000, // 18+ minutes for meaningful feedback
        priority: 70,
        consolidatedPrompt: {
          title: 'Thanks for the extended session!',
          description: 'Your experience helps us improve Quantum Chronicles.',
          sections: ['overall', 'story', 'interface', 'suggestions'],
          quickOptions: [
            'Time flew by, very engaging',
            'Good pacing throughout',
            'Interface worked well',
            'Story kept me interested',
            'Some technical issues',
            'Would recommend to others'
          ]
        }
      },
      
      // Deep engagement milestone - Lower priority (requires significant investment)
      {
        id: 'deep_engagement',
        name: 'Deep Engagement',
        description: 'User has shown deep engagement with multiple aspects',
        condition: () => true, // Will be triggered manually with strict conditions
        priority: 50,
        consolidatedPrompt: {
          title: 'You\'re really exploring Quantum Chronicles!',
          description: 'Share your thoughts on the deeper experience.',
          sections: ['overall', 'story', 'choices'],
          quickOptions: [
            'Complex but rewarding',
            'Quantum mechanics add depth',
            'Variables create meaningful impact',
            'Multiple paths worth exploring',
            'Getting complex to follow',
            'Love the narrative innovation'
          ]
        }
      }
    ];
  }

  private loadSessionData() {
    // Initialize session tracking
    this.sessionStartTime = Date.now();
    this.feedbackData = {
      timestamp: this.sessionStartTime,
      sessionDuration: 0,
      choiceCount: 0,
      segmentsReached: [],
      quickResponses: [],
      ratings: {},
      comments: {}
    };
  }

  /**
   * Single popup enforcement - only one feedback popup can be active at a time
   */
  private acquirePopupLock(): boolean {
    if (this.isPopupActive) {
      console.log('🔒 Feedback popup already active, ignoring trigger');
      return false;
    }
    
    this.isPopupActive = true;
    
    // Auto-release lock after 5 minutes as fallback
    this.popupLockTimeout = setTimeout(() => {
      this.releasePopupLock();
      console.log('⏰ Feedback popup lock auto-released after timeout');
    }, 5 * 60 * 1000);
    
    return true;
  }

  private releasePopupLock() {
    this.isPopupActive = false;
    this.pendingMilestone = null;
    
    if (this.popupLockTimeout) {
      clearTimeout(this.popupLockTimeout);
      this.popupLockTimeout = null;
    }
  }

  /**
   * Debounced trigger checking to prevent rapid-fire feedback requests
   */
  public checkForFeedback(milestone: string, metadata?: any): FeedbackMilestone | null {
    // Debounce rapid triggers
    const now = Date.now();
    if (now - this.lastTriggerTime < this.DEBOUNCE_MS) {
      console.log('🚫 Feedback trigger debounced:', milestone);
      return null;
    }
    this.lastTriggerTime = now;

    // Only show feedback once per session
    if (this.hasShownFeedback) {
      console.log('🚫 Feedback already shown this session');
      return null;
    }

    // Check if feedback is enabled
    if (!this.isEnabled) {
      console.log('🚫 Feedback system disabled');
      return null;
    }

    // Try to acquire popup lock
    if (!this.acquirePopupLock()) {
      // Store as pending if another popup is active
      this.pendingMilestone = milestone;
      return null;
    }

    // Find the matching milestone
    const milestoneData = this.milestones.find(m => m.id === milestone);
    if (!milestoneData) {
      this.releasePopupLock();
      return null;
    }

    // Check milestone condition
    if (!milestoneData.condition()) {
      this.releasePopupLock();
      return null;
    }

    // Update session metadata
    this.updateSessionMetadata(metadata);

    // Track the trigger
    analyticsWrapper.trackFeedbackEvent('feedback_prompt_shown', {
      category: 'overall' as const,
      milestone: milestone
    });

    console.log('✅ Triggering consolidated feedback for:', milestone);
    return milestoneData;
  }

  private updateSessionMetadata(metadata?: any) {
    if (metadata) {
      this.feedbackData.sessionDuration = Date.now() - this.sessionStartTime;
      
      if (metadata.choiceCount) {
        this.feedbackData.choiceCount = metadata.choiceCount;
      }
      
      if (metadata.currentSegment) {
        if (!this.feedbackData.segmentsReached?.includes(metadata.currentSegment)) {
          this.feedbackData.segmentsReached?.push(metadata.currentSegment);
        }
      }
      
      if (metadata.qnceVariables) {
        this.feedbackData.qnceVariables = metadata.qnceVariables;
      }
    }
  }

  /**
   * Submit consolidated feedback and release popup lock
   */
  public submitConsolidatedFeedback(feedback: ConsolidatedFeedbackData) {
    try {
      // Store complete feedback data
      const completeFeedback = {
        ...this.feedbackData,
        ...feedback,
        submittedAt: Date.now()
      };

      // Save to local storage
      const existingFeedback = JSON.parse(localStorage.getItem('qnce_consolidated_feedback') || '[]');
      existingFeedback.push(completeFeedback);
      localStorage.setItem('qnce_consolidated_feedback', JSON.stringify(existingFeedback));

      // Track submission
      analyticsWrapper.trackFeedbackEvent('feedback_response_submitted', {
        category: 'overall' as const,
        milestone: feedback.milestone
      });

      this.hasShownFeedback = true;
      console.log('✅ Consolidated feedback submitted successfully');
      
    } catch (error) {
      console.error('❌ Failed to submit consolidated feedback:', error);
    } finally {
      this.releasePopupLock();
    }
  }

  /**
   * Dismiss feedback and release popup lock
   */
  public dismissFeedback(milestone: string) {
    analyticsWrapper.trackFeedbackEvent('feedback_prompt_dismissed', {
      category: 'overall' as const,
      milestone: milestone
    });
    
    this.hasShownFeedback = true; // Don't show again this session
    this.releasePopupLock();
    console.log('🚫 Consolidated feedback dismissed for:', milestone);
  }

  /**
   * Emergency reset - force release popup lock
   */
  public forceReleasePopupLock() {
    console.log('🚨 Force releasing feedback popup lock');
    this.releasePopupLock();
  }

  /**
   * Get system status for debugging
   */
  public getSystemStatus() {
    return {
      isPopupActive: this.isPopupActive,
      pendingMilestone: this.pendingMilestone,
      hasShownFeedback: this.hasShownFeedback,
      isEnabled: this.isEnabled,
      sessionDuration: Date.now() - this.sessionStartTime,
      lastTriggerTime: this.lastTriggerTime
    };
  }

  /**
   * Control methods
   */
  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.releasePopupLock();
    }
  }

  public resetSession() {
    this.hasShownFeedback = false;
    this.releasePopupLock();
    this.sessionStartTime = Date.now();
    this.loadSessionData();
  }
}

// React hook for consolidated feedback manager
export function useConsolidatedFeedbackManager() {
  const [manager] = useState(() => new ConsolidatedFeedbackManager());
  const [currentMilestone, setCurrentMilestone] = useState<FeedbackMilestone | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Tracking refs for session data
  const choiceCountRef = useRef(0);
  const currentSegmentRef = useRef('');

  const checkForFeedback = useCallback((milestone: string, metadata?: any) => {
    const milestoneData = manager.checkForFeedback(milestone, {
      ...metadata,
      choiceCount: choiceCountRef.current,
      currentSegment: currentSegmentRef.current
    });
    
    if (milestoneData) {
      setCurrentMilestone(milestoneData);
      setIsVisible(true);
    }
  }, [manager]);

  const handleFeedbackSubmit = useCallback((feedback: ConsolidatedFeedbackData) => {
    manager.submitConsolidatedFeedback(feedback);
    setCurrentMilestone(null);
    setIsVisible(false);
  }, [manager]);

  const handleFeedbackDismiss = useCallback(() => {
    if (currentMilestone) {
      manager.dismissFeedback(currentMilestone.id);
    }
    setCurrentMilestone(null);
    setIsVisible(false);
  }, [manager, currentMilestone]);

  const updateSessionData = useCallback((data: { choiceCount?: number; currentSegment?: string }) => {
    if (data.choiceCount !== undefined) {
      choiceCountRef.current = data.choiceCount;
    }
    if (data.currentSegment) {
      currentSegmentRef.current = data.currentSegment;
    }
  }, []);

  return {
    manager,
    currentMilestone,
    isVisible,
    checkForFeedback,
    handleFeedbackSubmit,
    handleFeedbackDismiss,
    updateSessionData,
    setEnabled: manager.setEnabled.bind(manager),
    getSystemStatus: manager.getSystemStatus.bind(manager),
    forceReleasePopupLock: manager.forceReleasePopupLock.bind(manager),
    resetSession: manager.resetSession.bind(manager)
  };
}

export default ConsolidatedFeedbackManager;
