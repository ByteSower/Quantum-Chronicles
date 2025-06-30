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
  const [showMoreComingSoon, setShowMoreComingSoon] = useState(false);
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
      
      // Check if this is Chapter 8 completion for "More Coming Soon" popup
      if (activeChapter === 'partVIII') {
        console.log('🎉 Chapter 8 completed! Showing More Coming Soon popup');
        setTimeout(() => {
          setShowMoreComingSoon(true);
        }, 1500); // Small delay to let feedback complete first
      }
      
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
    setStoryKey(prevKey => prevKey + 1); // Force StoryFlow remount to reset narrative state
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

        {showMoreComingSoon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl max-w-md border border-purple-500/30 text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🌌</div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  More Adventures Await!
                </h3>
                <p className="mb-6 text-gray-300 leading-relaxed">
                  You've completed "The Forgotten Truth"! More quantum narratives and expanded chapters are being crafted. 
                  Each new story will offer deeper choice mechanics and mind-bending adventures.
                </p>
                <div className="bg-purple-900/30 rounded-lg p-4 mb-6 border border-purple-500/20">
                  <div className="text-sm text-purple-300 font-semibold mb-2">Coming Soon:</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• New storylines in multiple genres</div>
                    <div>• Enhanced choice consequences</div>
                    <div>• Character progression systems</div>
                    <div>• Multiplayer narrative experiences</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMoreComingSoon(false)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                >
                  Continue Exploring
                </button>
              </div>
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
