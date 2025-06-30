import React, { useState } from 'react';

interface StarRatingOverlayProps {
  isVisible: boolean;
  title?: string;
  description?: string;
  onSubmit: (rating: number, comment?: string) => void;
  onSkip: () => void;
}

export const StarRatingOverlay: React.FC<StarRatingOverlayProps> = ({
  isVisible,
  title = "How was your experience?",
  description = "Your feedback helps us improve the story.",
  onSubmit,
  onSkip
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment.trim() || undefined);
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating <= 3) {
      setShowComment(true);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        className={`text-4xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded ${
          star <= (hoveredRating || rating) 
            ? 'text-yellow-400' 
            : 'text-gray-400'
        }`}
        onClick={() => handleStarClick(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-title"
      >
        <div className="text-center mb-6">
          <h3 id="rating-title" className="text-xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-300 text-sm">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {renderStars()}
        </div>

        {rating > 0 && (
          <div className="text-center mb-4">
            <p className="text-slate-300 text-sm">
              {rating === 1 && "We're sorry this didn't meet your expectations"}
              {rating === 2 && "Thanks for the feedback - we'll work to improve"}
              {rating === 3 && "Thank you for the honest rating"}
              {rating === 4 && "Great to hear you enjoyed it!"}
              {rating === 5 && "Fantastic! We're thrilled you loved it!"}
            </p>
          </div>
        )}

        {showComment && (
          <div className="mb-6">
            <label htmlFor="feedback-comment" className="block text-slate-300 text-sm mb-2">
              What could we improve? (optional)
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your feedback helps us create better stories..."
              className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={3}
              maxLength={300}
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 py-2 px-4 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              rating > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarRatingOverlay;
