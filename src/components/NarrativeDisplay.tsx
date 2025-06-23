import React, { useEffect, useState, useRef } from 'react';
import { accessibilityManager, a11y } from '../utils/accessibility';

interface NarrativeDisplayProps {
  text: string;
  animationDuration?: number;
}

const NarrativeDisplay: React.FC<NarrativeDisplayProps> = ({ 
  text, 
  animationDuration = 500
}) => {
  const [visible, setVisible] = useState(false);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const contentId = a11y.generateId('narrative-content');
  
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setVisible(true);
      // Announce new narrative content to screen readers
      accessibilityManager.announceContentChange('story', text);
    }, 50);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div 
      ref={narrativeRef}
      className={`max-h-96 overflow-y-auto px-2 py-2 bg-white/90 text-gray-900 rounded-lg shadow mb-6 transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${animationDuration}ms` }}
      role="main"
      aria-live="polite"
      aria-label="Story narrative"
    >
      <p 
        id={contentId}
        className="text-sm sm:text-base md:text-lg leading-normal text-center font-semibold px-4"
        aria-label="Current story text"
      >
        {text}
      </p>
    </div>
  );
};

export default NarrativeDisplay;
