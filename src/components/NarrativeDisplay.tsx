import React, { useEffect, useState } from 'react';

interface NarrativeDisplayProps {
  text: string;
  animationDuration?: number;
}

const NarrativeDisplay: React.FC<NarrativeDisplayProps> = ({ 
  text, 
  animationDuration = 500
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div 
      className={`max-h-96 overflow-y-auto px-2 py-2 bg-white/90 text-gray-900 rounded-lg shadow mb-6 transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${animationDuration}ms` }}
    >
      <p className="text-sm sm:text-base md:text-lg leading-normal text-center font-semibold px-4">{text}</p>
    </div>
  );
};

export default NarrativeDisplay;
