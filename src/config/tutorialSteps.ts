/**
 * Tutorial Steps Configuration
 * 
 * Defines the multi-step tutorial flow for Quantum Chronicles.
 * Each step guides users through different aspects of the QNCE system.
 */

export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  highlight?: string; // CSS selector for elements to highlight
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  action?: {
    text: string;
    callback?: () => void;
  };
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'intro',
    title: 'Welcome to Quantum Chronicles',
    content: `Welcome to the Quantum Narrative Convergence Engine (QNCE)! This is an interactive story where your choices create quantum ripples that fundamentally alter the narrative structure.
    
Every decision you make doesn't just change what happens next—it transforms the very nature of reality within the story.`,
    position: 'center'
  },
  {
    id: 'narrative',
    title: 'Reading the Narrative',
    content: `This is your narrative display. Here you'll read the current story text and watch how it evolves based on your quantum choices.
    
The text will fade in smoothly as new content loads, creating an immersive reading experience.`,
    highlight: '.narrative-display',
    position: 'center'
  },
  {
    id: 'choices',
    title: 'Making Choices',
    content: `These are your choice buttons. Each decision creates quantum ripples that affect the story's trajectory.
    
Choose carefully—your decisions will influence not just the immediate outcome, but the entire quantum signature of your narrative experience.`,
    highlight: '.choice-selector',
    position: 'center'
  },
  {
    id: 'variables',
    title: 'Quantum Variables',
    content: `Track your quantum variables here: Curiosity, Coherence, Disruption, and Synchrony.
    
These values evolve based on your choices and determine which story paths become available to you. Each variable represents a different aspect of your quantum consciousness.`,
    highlight: '.variable-dashboard',
    position: 'top'
  },
  {
    id: 'menu',
    title: 'Navigation Menu',
    content: `Use this menu to access different features:
    
• **Home**: Return to the story beginning
• **Tutorial**: Replay this tutorial anytime
• **Settings**: Customize your experience  
• **Restart**: Start the story fresh
• **Variables**: Toggle the variables dashboard`,
    highlight: 'button[aria-label="Open menu"]',
    position: 'right'
  },
  {
    id: 'feedback',
    title: 'Quantum Effects Log',
    content: `This log shows the quantum effects of your choices:
    
• **Green text**: Favorable narrative convergence
• **Red text**: Narrative disruption or instability
• **Blue text**: Coherence improvements
• **Purple text**: Synchrony shifts

These effects help you understand how your decisions impact the quantum narrative space.`,
    highlight: '.log-area',
    position: 'left'
  },
  {
    id: 'complete',
    title: 'Ready to Begin!',
    content: `You're now ready to experience Quantum Chronicles!
    
Remember: every choice creates quantum ripples. Your unique path through the narrative will be unlike anyone else's.
    
The story begins with a global conspiracy that will challenge everything you think you know about consciousness and reality.`,
    position: 'center',
    action: {
      text: 'Begin Your Quantum Journey'
    }
  }
];

export const TUTORIAL_ANALYTICS_EVENTS = {
  STARTED: 'tutorial_started',
  STEP_VIEWED: 'tutorial_step_viewed', 
  COMPLETED: 'tutorial_completed',
  SKIPPED: 'tutorial_skipped',
  REOPENED: 'tutorial_reopened'
} as const;
