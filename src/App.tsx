import { useState, useEffect, lazy, Suspense } from 'react';
import StartScreen from './components/StartScreen';
import ChapterScreen from './components/ChapterScreen';
import StoryFlow from './components/StoryFlow';
import { SideMenu } from './components/SideMenu';
import { stories as initialStories } from './data/stories';
import { loadStories, saveStories, markChapterComplete } from './utils/storage';
import type { StoryMeta } from './narratives/types';

// Lazy load modal components
const AboutModal = lazy(() => import('./components/AboutModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const AboutQNCEModal = lazy(() => import('./components/AboutQNCEModal'));
import { analytics, trackUIEvent } from './utils/analytics';
import './index.css';

type AppView = 'stories' | 'chapters' | 'flow';

function App() {
  const [view, setView] = useState<AppView>('stories');
  const [activeStory, setActiveStory] = useState<string>('');
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [storyData, setStoryData] = useState<StoryMeta[]>(initialStories);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAboutQNCE, setShowAboutQNCE] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [storyKey, setStoryKey] = useState(0);
  const [settings, setSettings] = useState({
    developerMode: false,
    showVariableDashboard: true,
    showDebugInfo: false
  });

  // Load saved progress on app start
  useEffect(() => {
    const savedStories = loadStories();
    if (savedStories) {
      // Merge saved progress with initial stories
      const mergedStories = initialStories.map(initialStory => {
        const savedStory = savedStories.find(s => s.storyId === initialStory.storyId);
        if (savedStory) {
          // Merge chapter progress
          const mergedChapters = initialStory.chapters.map(initialChapter => {
            const savedChapter = savedStory.chapters.find(c => c.chapterId === initialChapter.chapterId);
            return savedChapter ? { ...initialChapter, ...savedChapter } : initialChapter;
          });
          return { ...initialStory, chapters: mergedChapters };
        }
        return initialStory;
      });
      setStoryData(mergedStories);
    }

    // Initialize analytics
    trackUIEvent.feature('app', 'initialized');
    analytics.trackEvent('session_start', 'engagement', 'story_chapters_navigation');
  }, []);

  // Save progress whenever story data changes
  useEffect(() => {
    saveStories(storyData);
  }, [storyData]);

  const handleSelectStory = (storyId: string) => {
    setActiveStory(storyId);
    setView('chapters');
    trackUIEvent.feature('navigation', 'select_story');
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapter(chapterId);
    setView('flow');
    trackUIEvent.feature('navigation', 'select_chapter');
  };

  const handleChapterComplete = () => {
    if (activeStory && activeChapter) {
      const updatedStories = markChapterComplete(storyData, activeStory, activeChapter);
      setStoryData(updatedStories);
      
      // Return to chapter screen
      setView('chapters');
      setActiveChapter('');
      
      trackUIEvent.feature('narrative', 'chapter_complete');
    }
  };

  const handleJumpToChapter = (chapterId: string) => {
    const story = storyData.find(s => s.storyId === activeStory);
    const chapter = story?.chapters.find(c => c.chapterId === chapterId);
    
    if (chapter && chapter.unlocked) {
      setActiveChapter(chapterId);
      setView('flow');
      trackUIEvent.feature('navigation', 'jump_to_chapter');
    }
  };

  const handleHome = () => {
    setView('stories');
    setActiveStory('');
    setActiveChapter('');
    setStoryKey(prevKey => prevKey + 1);
    trackUIEvent.feature('navigation', 'home');
  };

  const handleBackToChapters = () => {
    setView('chapters');
    setActiveChapter('');
    trackUIEvent.feature('navigation', 'back_to_chapters');
  };

  const handleBackToStories = () => {
    setView('stories');
    setActiveStory('');
    setActiveChapter('');
    trackUIEvent.feature('navigation', 'back_to_stories');
  };

  const handleRestart = () => {
    setStoryKey(prevKey => prevKey + 1);
    trackUIEvent.feature('navigation', 'restart_story');
  };

  const handleToggleVariables = () => {
    setShowVariables(prev => !prev);
    setSettings(prev => ({
      ...prev,
      showVariableDashboard: !prev.showVariableDashboard
    }));
  };

  // Get current story data for SideMenu
  const currentStory = storyData.find(s => s.storyId === activeStory);

  return (
    <>
      <SideMenu
        onHome={handleHome}
        onTutorial={() => setShowTutorial(true)}
        onSettings={() => setShowSettings(true)}
        onShowAbout={() => setShowAbout(true)}
        onRestart={handleRestart}
        onToggleVariables={handleToggleVariables}
        onJumpToChapter={handleJumpToChapter}
        activeStory={currentStory}
        view={view}
      />
      
      {view === 'stories' && (
        <StartScreen
          stories={storyData}
          onSelectStory={handleSelectStory}
        />
      )}
      
      {view === 'chapters' && currentStory && (
        <ChapterScreen
          story={currentStory}
          onSelectChapter={handleSelectChapter}
          onBack={handleBackToStories}
        />
      )}
      
      {view === 'flow' && activeStory && activeChapter && (
        <StoryFlow
          key={storyKey}
          segmentId={`${activeStory}_${activeChapter}`}
          settings={settings}
          onComplete={handleChapterComplete}
          onBack={handleBackToChapters}
        />
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onUpdateSettings={setSettings}
        />
        <AboutQNCEModal
          isOpen={showAboutQNCE}
          onClose={() => setShowAboutQNCE(false)}
        />
        
        {showTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md">
              <h3 className="text-lg font-bold mb-4">Tutorial Coming Soon</h3>
              <p className="mb-4">Enhanced tutorial system will be implemented in the next feature.</p>
              <button 
                onClick={() => setShowTutorial(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {showVariables && (
          <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg z-40 max-w-xs">
            <h4 className="font-bold mb-2">Variables Dashboard</h4>
            <p className="text-sm text-gray-600 mb-2">Enhanced dashboard coming soon.</p>
            <button 
              onClick={() => setShowVariables(false)}
              className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default App;
