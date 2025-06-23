import React, { useState, useEffect } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import { accessibilityManager } from '../utils/accessibility';

export interface FeedbackData {
  rating: number;
  comment?: string;
  category: 'onboarding' | 'story' | 'choice' | 'interaction' | 'overall';
  milestone: string;
  timestamp: number;
}

interface FeedbackPromptProps {
  isVisible: boolean;
  onSubmit: (feedback: FeedbackData) => void;
  onDismiss: () => void;
  category: FeedbackData['category'];
  milestone: string;
  title?: string;
  description?: string;
  quickOptions?: string[];
}

const FeedbackPrompt: React.FC<FeedbackPromptProps> = ({
  isVisible,
  onSubmit,
  onDismiss,
  category,
  milestone,
  title,
  description,
  quickOptions = []
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedQuickOption, setSelectedQuickOption] = useState<string>('');
  const [showDetailedForm, setShowDetailedForm] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Track feedback prompt shown
      analyticsWrapper.trackFeedbackEvent('feedback_prompt_shown', {
        category,
        milestone
      });
      
      // Announce to screen readers
      accessibilityManager.announce(`Feedback prompt appeared for ${category}`, 'polite');
    }
  }, [isVisible, category, milestone]);

  const handleSubmit = async () => {
    if (rating === 0 && !selectedQuickOption) return;

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      rating,
      comment: comment.trim() || selectedQuickOption,
      category,
      milestone,
      timestamp: Date.now()
    };

    try {
      // Track feedback submission
      analyticsWrapper.trackFeedbackEvent('feedback_response_submitted', {
        category,
        milestone,
        rating,
        hasComment: !!feedbackData.comment,
        quickOption: selectedQuickOption
      });

      onSubmit(feedbackData);
      
      // Reset form
      setRating(0);
      setComment('');
      setSelectedQuickOption('');
      setShowDetailedForm(false);
      
      // Announce success
      accessibilityManager.announce('Thank you for your feedback!', 'polite');
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      accessibilityManager.announce('Feedback submission failed. Please try again.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    // Track dismissal
    analyticsWrapper.trackFeedbackEvent('feedback_prompt_dismissed', {
      category,
      milestone
    });
    
    onDismiss();
  };

  const handleQuickOption = (option: string) => {
    setSelectedQuickOption(option);
    
    // Track quick option selection
    analyticsWrapper.trackFeedbackEvent('feedback_quick_option_selected', {
      category,
      milestone,
      quickOption: option
    });
  };

  const renderStarRating = () => (
    <div className="flex justify-center gap-1 mb-4" role="radiogroup" aria-label="Rate your experience from 1 to 5 stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' && star > 1) setRating(star - 1);
            if (e.key === 'ArrowRight' && star < 5) setRating(star + 1);
          }}
          className={`text-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded ${
            star <= rating ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-500'
          }`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          aria-pressed={star <= rating}
          role="radio"
          aria-checked={star === rating}
        >
          ★
        </button>
      ))}
    </div>
  );

  const getDefaultTitle = () => {
    switch (category) {
      case 'onboarding': return 'How was the getting started experience?';
      case 'story': return 'How are you enjoying the story so far?';
      case 'choice': return 'How was that decision-making experience?';
      case 'interaction': return 'How did that interaction feel?';
      case 'overall': return 'How would you rate your overall experience?';
      default: return 'How was your experience?';
    }
  };

  const getDefaultDescription = () => {
    switch (category) {
      case 'onboarding': return 'Your feedback helps us improve the introduction for new users.';
      case 'story': return 'Tell us what you think about the narrative and flow.';
      case 'choice': return 'Help us understand how choice interactions feel.';
      case 'interaction': return 'Your input helps us refine the user experience.';
      case 'overall': return 'Share your thoughts on the overall experience.';
      default: return 'Your feedback is valuable to us.';
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleDismiss}
        aria-hidden="true"
      />
      
      {/* Feedback Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200"
          aria-label="Close feedback prompt"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 
            id="feedback-title"
            className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent"
          >
            {title || getDefaultTitle()}
          </h3>
          <p 
            id="feedback-description"
            className="text-slate-300 text-sm"
          >
            {description || getDefaultDescription()}
          </p>
        </div>

        {/* Quick Options */}
        {quickOptions.length > 0 && !showDetailedForm && (
          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">Quick feedback:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickOption(option)}
                  className={`p-3 rounded-lg text-sm text-left transition-all duration-200 ${
                    selectedQuickOption === option
                      ? 'bg-indigo-600 text-white border border-indigo-500'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                  }`}
                  aria-pressed={selectedQuickOption === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Form */}
        {(showDetailedForm || quickOptions.length === 0) && (
          <>
            {/* Star Rating */}
            <div className="mb-6">
              <p className="text-slate-300 text-sm mb-3 text-center">Rate your experience:</p>
              {renderStarRating()}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label htmlFor="feedback-comment" className="block text-slate-300 text-sm mb-2">
                Additional comments (optional):
              </label>
              <textarea
                id="feedback-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 resize-none"
                rows={3}
                maxLength={500}
              />
              <div className="text-xs text-slate-500 mt-1">
                {comment.length}/500 characters
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          {!showDetailedForm && quickOptions.length > 0 && (
            <button
              onClick={() => setShowDetailedForm(true)}
              className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors duration-200"
            >
              Give detailed feedback
            </button>
          )}
          
          <div className="flex gap-3 ml-auto">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
              disabled={isSubmitting}
            >
              Skip
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || ((rating === 0 && !selectedQuickOption) && (showDetailedForm || quickOptions.length === 0))}
              className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPrompt;
