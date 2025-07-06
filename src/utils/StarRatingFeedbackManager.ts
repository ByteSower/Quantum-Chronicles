import { useState, useCallback } from 'react';
import { analytics } from './analytics';

export interface StarRatingSessionData {
  nodeId: string;
  choiceCount: number;
  sessionDuration: number;
}

export interface StarRatingFeedbackData {
  rating: number;
  comment?: string;
  milestone: string;
  timestamp: number;
  sessionData?: {
    nodeId: string;
    choiceCount: number;
    sessionDuration: number;
  };
}

class StarRatingFeedbackManager {
  private sessionStartTime: number;
  private feedbackSubmitted: Set<string> = new Set();

  constructor() {
    this.sessionStartTime = Date.now();
  }

  shouldShowFeedback(milestone: string): boolean {
    console.log('⭐ StarRating shouldShowFeedback check:', { 
      milestone, 
      isStoryCompletion: milestone === 'story_completion',
      notAlreadySubmitted: !this.feedbackSubmitted.has(milestone),
      alreadySubmitted: Array.from(this.feedbackSubmitted)
    });
    // Only show at story completion points and only once per session
    return milestone === 'story_completion' && !this.feedbackSubmitted.has(milestone);
  }

  submitFeedback(data: StarRatingFeedbackData) {
    // Track analytics
    analytics.trackEvent('star_rating_submitted', 'feedback', `${data.milestone}_rating_${data.rating}`);
    
    if (data.comment) {
      analytics.trackEvent('feedback_comment_provided', 'feedback', data.milestone);
    }

    // Mark as submitted
    this.feedbackSubmitted.add(data.milestone);

    // Log feedback (in production, this would go to your analytics service)
    console.log('Star Rating Feedback:', data);
  }

  skipFeedback(milestone: string) {
    analytics.trackEvent('star_rating_skipped', 'feedback', milestone);
    this.feedbackSubmitted.add(milestone);
  }

  getSessionDuration(): number {
    return Date.now() - this.sessionStartTime;
  }
}

export function useStarRatingFeedback() {
  const [manager] = useState(() => new StarRatingFeedbackManager());
  const [isVisible, setIsVisible] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<string>('');
  const [sessionData, setSessionData] = useState<StarRatingSessionData>({
    nodeId: '',
    choiceCount: 0,
    sessionDuration: 0
  });

  const checkForFeedback = useCallback((milestone: string, nodeId: string, choiceCount: number) => {
    console.log('⭐ checkForFeedback called:', { milestone, nodeId, choiceCount });
    
    // Check if any feedback popup is already active to prevent conflicts
    const feedbackStatus = JSON.parse(localStorage.getItem('qnce_feedback_system_status') || '{}');
    if (feedbackStatus.isPopupActive) {
      console.log('⭐ Star rating feedback blocked - another feedback popup is active');
      return;
    }
    
    if (manager.shouldShowFeedback(milestone)) {
      console.log('⭐ Setting star rating visible!');
      setCurrentMilestone(milestone);
      setSessionData({
        nodeId,
        choiceCount,
        sessionDuration: manager.getSessionDuration()
      });
      setIsVisible(true);
    } else {
      console.log('⭐ Star rating feedback not shown - conditions not met');
    }
  }, [manager]);

  const handleSubmit = useCallback((rating: number, comment?: string) => {
    const feedback: StarRatingFeedbackData = {
      rating,
      comment,
      milestone: currentMilestone,
      timestamp: Date.now(),
      sessionData
    };

    manager.submitFeedback(feedback);
    setIsVisible(false);
    setCurrentMilestone('');
  }, [manager, currentMilestone, sessionData]);

  const handleSkip = useCallback(() => {
    manager.skipFeedback(currentMilestone);
    setIsVisible(false);
    setCurrentMilestone('');
  }, [manager, currentMilestone]);

  return {
    isVisible,
    currentMilestone,
    checkForFeedback,
    handleSubmit,
    handleSkip
  };
}

export default StarRatingFeedbackManager;
