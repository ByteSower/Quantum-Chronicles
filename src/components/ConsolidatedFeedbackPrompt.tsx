import React, { useState, useEffect } from 'react';
import { accessibilityManager } from '../utils/accessibility';
import type { ConsolidatedFeedbackData } from '../utils/ConsolidatedFeedbackManager';

interface ConsolidatedFeedbackPromptProps {
  isVisible: boolean;
  milestone: {
    id: string;
    name: string;
    consolidatedPrompt: {
      title: string;
      description: string;
      sections: string[];
      quickOptions: string[];
    };
  };
  sessionData: {
    choiceCount: number;
    sessionDuration: number;
    segmentsReached: string[];
    qnceVariables?: {
      curiosity: number;
      coherence: number;
      disruption: number;
      synchrony: number;
    };
  };
  onSubmit: (feedback: ConsolidatedFeedbackData) => void;
  onDismiss: () => void;
}

const ConsolidatedFeedbackPrompt: React.FC<ConsolidatedFeedbackPromptProps> = ({
  isVisible,
  milestone,
  sessionData,
  onSubmit,
  onDismiss
}) => {
  // Form state
  const [overallRating, setOverallRating] = useState<number>(0);
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({
    general: '',
    likes: '',
    improvements: '',
    suggestions: ''
  });
  const [selectedQuickOptions, setSelectedQuickOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Reset form when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      setOverallRating(0);
      setCategoryRatings({});
      setComments({
        general: '',
        likes: '',
        improvements: '',
        suggestions: ''
      });
      setSelectedQuickOptions([]);
      setCurrentSection(0);
      
      // Announce to screen readers
      accessibilityManager.announce(
        `Feedback form opened for ${milestone.name}`, 
        'polite'
      );
    }
  }, [isVisible, milestone.name]);

  const sections = milestone.consolidatedPrompt.sections;
  const isLastSection = currentSection === sections.length - 1;
  const isFirstSection = currentSection === 0;

  const handleSubmit = async () => {
    if (overallRating === 0) return;

    setIsSubmitting(true);

    const feedbackData: ConsolidatedFeedbackData = {
      overallRating,
      ratings: categoryRatings,
      comments,
      quickResponses: selectedQuickOptions,
      milestone: milestone.id,
      sessionDuration: sessionData.sessionDuration,
      choiceCount: sessionData.choiceCount,
      segmentsReached: sessionData.segmentsReached,
      timestamp: Date.now(),
      qnceVariables: sessionData.qnceVariables
    };

    try {
      onSubmit(feedbackData);
      accessibilityManager.announce('Thank you for your comprehensive feedback!', 'polite');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      accessibilityManager.announce('Feedback submission failed. Please try again.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickOptionToggle = (option: string) => {
    setSelectedQuickOptions(prev => 
      prev.includes(option)
        ? prev.filter(opt => opt !== option)
        : [...prev, option]
    );
  };

  const renderStarRating = (
    value: number, 
    onChange: (rating: number) => void, 
    label: string,
    id: string
  ) => (
    <div className="mb-4">
      <label className="block text-slate-300 text-sm mb-2">{label}:</label>
      <div 
        className="flex justify-center gap-1" 
        role="radiogroup" 
        aria-label={`${label} rating from 1 to 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' && star > 1) onChange(star - 1);
              if (e.key === 'ArrowRight' && star < 5) onChange(star + 1);
            }}
            className={`text-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded ${
              star <= value ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-500'
            }`}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            aria-pressed={star <= value}
            role="radio"
            aria-checked={star === value}
            id={`${id}-star-${star}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'overall':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-indigo-300">Overall Experience</h4>
            {renderStarRating(
              overallRating,
              setOverallRating,
              'How would you rate your overall experience',
              'overall'
            )}
            
            <div>
              <label htmlFor="general-comment" className="block text-slate-300 text-sm mb-2">
                General thoughts (optional):
              </label>
              <textarea
                id="general-comment"
                value={comments.general}
                onChange={(e) => setComments(prev => ({ ...prev, general: e.target.value }))}
                placeholder="Share your overall thoughts about Quantum Chronicles..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={3}
                maxLength={300}
              />
              <div className="text-xs text-slate-500 mt-1">
                {comments.general.length}/300 characters
              </div>
            </div>
          </div>
        );

      case 'story':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-indigo-300">Story & Narrative</h4>
            {renderStarRating(
              categoryRatings.story || 0,
              (rating) => setCategoryRatings(prev => ({ ...prev, story: rating })),
              'How engaging was the story',
              'story'
            )}
            
            <div>
              <label htmlFor="likes-comment" className="block text-slate-300 text-sm mb-2">
                What did you enjoy most?
              </label>
              <textarea
                id="likes-comment"
                value={comments.likes}
                onChange={(e) => setComments(prev => ({ ...prev, likes: e.target.value }))}
                placeholder="Tell us what you loved about the story..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={2}
                maxLength={200}
              />
            </div>
          </div>
        );

      case 'choices':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-indigo-300">Choices & Interaction</h4>
            {renderStarRating(
              categoryRatings.choices || 0,
              (rating) => setCategoryRatings(prev => ({ ...prev, choices: rating })),
              'How did the choice system feel',
              'choices'
            )}
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <p className="text-sm text-slate-300 mb-1">
                Your session: {sessionData.choiceCount} choices made
              </p>
              {sessionData.qnceVariables && (
                <div className="text-xs text-slate-400">
                  Variables: Curiosity {sessionData.qnceVariables.curiosity}, 
                  Coherence {sessionData.qnceVariables.coherence}, 
                  Disruption {sessionData.qnceVariables.disruption}, 
                  Synchrony {sessionData.qnceVariables.synchrony}
                </div>
              )}
            </div>
          </div>
        );

      case 'interface':
      case 'onboarding':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-indigo-300">
              {sectionType === 'interface' ? 'User Interface' : 'Getting Started'}
            </h4>
            {renderStarRating(
              categoryRatings[sectionType] || 0,
              (rating) => setCategoryRatings(prev => ({ ...prev, [sectionType]: rating })),
              sectionType === 'interface' ? 'How intuitive was the interface' : 'How clear was the onboarding',
              sectionType
            )}
          </div>
        );

      case 'suggestions':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-indigo-300">Your Suggestions</h4>
            
            <div>
              <label htmlFor="improvements-comment" className="block text-slate-300 text-sm mb-2">
                What could be improved?
              </label>
              <textarea
                id="improvements-comment"
                value={comments.improvements}
                onChange={(e) => setComments(prev => ({ ...prev, improvements: e.target.value }))}
                placeholder="Share your ideas for improvement..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={2}
                maxLength={200}
              />
            </div>
            
            <div>
              <label htmlFor="suggestions-comment" className="block text-slate-300 text-sm mb-2">
                Feature suggestions:
              </label>
              <textarea
                id="suggestions-comment"
                value={comments.suggestions}
                onChange={(e) => setComments(prev => ({ ...prev, suggestions: e.target.value }))}
                placeholder="What features would you like to see?"
                className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={2}
                maxLength={200}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consolidated-feedback-title"
    >
      {/* Enhanced backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onDismiss}
        aria-hidden="true"
      />
      
      {/* Consolidated Feedback Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close feedback form"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <h3 
            id="consolidated-feedback-title"
            className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent"
          >
            {milestone.consolidatedPrompt.title}
          </h3>
          <p className="text-slate-300 text-sm">
            {milestone.consolidatedPrompt.description}
          </p>
          
          {/* Progress indicator */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSection ? 'bg-indigo-400' :
                    index < currentSection ? 'bg-indigo-600' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Options (shown first) */}
        {currentSection === 0 && milestone.consolidatedPrompt.quickOptions.length > 0 && (
          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">Quick feedback (select all that apply):</p>
            <div className="grid grid-cols-1 gap-2">
              {milestone.consolidatedPrompt.quickOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickOptionToggle(option)}
                  className={`p-3 rounded-lg text-sm text-left transition-all duration-200 ${
                    selectedQuickOptions.includes(option)
                      ? 'bg-indigo-600 text-white border border-indigo-500'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50'
                  }`}
                  aria-pressed={selectedQuickOptions.includes(option)}
                >
                  <span className="flex items-center">
                    <span className={`mr-2 ${selectedQuickOptions.includes(option) ? 'text-white' : 'text-slate-500'}`}>
                      {selectedQuickOptions.includes(option) ? '✓' : '○'}
                    </span>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Section Content */}
        {sections[currentSection] && (
          <div className="mb-6">
            {renderSection(sections[currentSection])}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={isFirstSection}
            className={`px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
              isFirstSection 
                ? 'text-slate-500 cursor-not-allowed' 
                : 'text-indigo-300 hover:text-indigo-200 hover:bg-slate-700/50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onDismiss}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
              disabled={isSubmitting}
            >
              Skip
            </button>
            
            {isLastSection ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || overallRating === 0}
                className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentSection(prev => prev + 1)}
                className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedFeedbackPrompt;
