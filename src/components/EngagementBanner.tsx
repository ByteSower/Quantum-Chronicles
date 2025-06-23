import React, { useState, useEffect, useRef } from 'react';
import { analyticsWrapper } from '../utils/AnalyticsWrapper';
import { accessibilityManager, a11y } from '../utils/accessibility';

interface EngagementBannerProps {
  isVisible: boolean;
  onInteraction: () => void;
  onDismiss: () => void;
  message?: string;
  actionText?: string;
}

const EngagementBanner: React.FC<EngagementBannerProps> = ({
  isVisible,
  onInteraction,
  onDismiss,
  message = "Want to make a choice now? Click here!",
  actionText = "Make Choice"
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerId = a11y.generateId('engagement-banner');

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Announce engagement prompt to screen readers
      accessibilityManager.announce('Engagement prompt appeared. ' + message, 'polite');
      // Note: engagement_prompt_shown is tracked in StoryFlow when banner is triggered
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, message]);

  const handleInteraction = () => {
    analyticsWrapper.trackEngagementEvent('engagement_prompt_clicked');
    onInteraction();
  };

  const handleDismiss = () => {
    analyticsWrapper.trackEngagementEvent('engagement_prompt_dismissed');
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={bannerRef}
      className={`
        engagement-banner
        fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40
        ${isAnimating ? 'visible' : ''}
      `}
      role="alert"
      aria-live="polite"
      aria-labelledby={bannerId}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-4 mx-4 max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <p 
              id={bannerId}
              className="text-white text-sm font-medium"
            >
              {message}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInteraction}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200"
              aria-label={`${actionText}: ${message}`}
            >
              {actionText}
            </button>
            
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Dismiss engagement prompt"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementBanner;
