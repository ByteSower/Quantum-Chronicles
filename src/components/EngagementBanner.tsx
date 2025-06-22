import React, { useState, useEffect } from 'react';
import { analytics } from '../utils/analytics';

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

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      analytics.trackEvent('engagement_prompt_shown', 'user_interface', 'scroll_trigger');
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  const handleInteraction = () => {
    analytics.trackEvent('engagement_prompt_clicked', 'user_interface', 'scroll_trigger');
    onInteraction();
  };

  const handleDismiss = () => {
    analytics.trackEvent('engagement_prompt_dismissed', 'user_interface', 'scroll_trigger');
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`
        engagement-banner
        fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40
        ${isAnimating ? 'visible' : ''}
      `}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-4 mx-4 max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <p className="text-white text-sm font-medium">
              {message}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInteraction}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200"
            >
              {actionText}
            </button>
            
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Dismiss prompt"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
