import React, { useEffect, useState, useRef } from 'react';
import { accessibilityManager, a11y } from '../utils/accessibility';

interface NarrativeDisplayProps {
  text: string;
  animationDuration?: number;
  variables?: Record<string, number | string | boolean>;
}

const NarrativeDisplay: React.FC<NarrativeDisplayProps> = ({ 
  text, 
  animationDuration = 500,
  variables = {}
}) => {
  const [visible, setVisible] = useState(false);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const contentId = a11y.generateId('narrative-content');
  
  // Enhanced text processing with dynamic interpolation
  const processedText = React.useMemo(() => {
    if (!variables || Object.keys(variables).length === 0) {
      return text;
    }
    
    // Replace {{variable}} patterns with actual values
    return text.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
      const value = variables[variableName];
      if (value !== undefined) {
        return String(value);
      }
      return match; // Return original if variable not found
    });
  }, [text, variables]);
  
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setVisible(true);
      // Announce new narrative content to screen readers
      accessibilityManager.announceContentChange('story', processedText);
    }, 50);
    return () => clearTimeout(timeout);
  }, [processedText]);

  return (
    <div 
      ref={narrativeRef}
      className={`narrative-display max-h-96 overflow-y-auto px-2 py-2 bg-white/90 text-gray-900 rounded-lg shadow mb-6 transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}
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
        {processedText}
      </p>
    </div>
  );
};

export default NarrativeDisplay;
