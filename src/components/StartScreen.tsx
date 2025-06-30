import React from 'react';
import type { StoryMeta } from '../narratives/types';

interface StartScreenProps {
  stories: StoryMeta[];
  onSelectStory: (storyId: string) => void;
  onShowAbout: () => void;
  onShowSettings: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ stories, onSelectStory, onShowAbout, onShowSettings }) => {
  const getStoryProgress = (story: StoryMeta) => {
    const completedChapters = story.chapters.filter(c => c.completed).length;
    const totalChapters = story.chapters.length;
    return { completed: completedChapters, total: totalChapters };
  };

  const getStoryStatus = (story: StoryMeta) => {
    const progress = getStoryProgress(story);
    if (progress.completed === 0) return 'New';
    if (progress.completed === progress.total) return 'Complete';
    return 'In Progress';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-6xl w-full mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Quantum Chronicles
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 mb-2 font-light">
          An Interactive Narrative Experience
        </p>
        <p className="text-sm text-slate-400 mb-12">
          Where every choice ripples through the quantum fabric of reality
        </p>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {stories.map((story) => {
            const progress = getStoryProgress(story);
            const status = getStoryStatus(story);
            
            return (
              <button
                key={story.storyId}
                onClick={() => onSelectStory(story.storyId)}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl overflow-hidden hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300 transform hover:scale-105 group min-h-[300px] flex flex-col shadow-lg hover:shadow-xl"
              >
                {/* Large Thumbnail - takes up most of the card */}
                <div className="w-full flex-1 relative overflow-hidden">
                  {story.thumbnail ? (
                    <img 
                      src={story.thumbnail} 
                      alt={`${story.title} thumbnail`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center ${story.thumbnail ? 'hidden' : ''}`}>
                    <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                {/* Content Footer */}
                <div className="p-4 bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-1 text-indigo-300 group-hover:text-indigo-200">
                    {story.title}
                  </h3>
                  <p className="text-slate-300 mb-3 text-sm leading-relaxed line-clamp-2">
                    {story.description}
                  </p>

                  {/* Progress and Status */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">
                        Chapters: {progress.completed}/{progress.total}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        status === 'Complete' ? 'bg-green-900/50 text-green-300' :
                        status === 'In Progress' ? 'bg-blue-900/50 text-blue-300' :
                        'bg-gray-700/50 text-gray-400'
                      }`}>
                        {status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Coming Soon Cards - Multiple Genre Teasers */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6 text-left opacity-60 relative group cursor-not-allowed min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-gray-400">
              🔒
            </div>
            
            {/* Placeholder thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-lg mb-4 flex items-center justify-center border border-red-600/20">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-gray-400">
                Quantum Storms
              </h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed flex-1">
                High-octane action narrative where reality-bending experiments go catastrophically wrong. Fight through collapsing dimensions while making split-second choices that determine the fate of multiple timelines.
              </p>

              <div className="mt-auto">
                <div className="bg-gray-700/50 rounded p-3 text-xs text-gray-400 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Future Updates</span>
                  </div>
                  <p>Action-packed quantum adventure coming soon.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6 text-left opacity-60 relative group cursor-not-allowed min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-gray-400">
              🔒
            </div>
            
            {/* Placeholder thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center border border-pink-600/20">
              <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m1 6V4a3 3 0 000-6m0 6v6m0-6h6m-3 0a3 3 0 000-6" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-gray-400">
                Probability Cafe
              </h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed flex-1">
                A lighthearted comedy adventure in a coffee shop where quantum mechanics meets daily life. Navigate romantic mishaps, timeline mix-ups, and the eternal question: decaf or full quantum?
              </p>

              <div className="mt-auto">
                <div className="bg-gray-700/50 rounded p-3 text-xs text-gray-400 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Future Updates</span>
                  </div>
                  <p>Quantum comedy romance in development.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6 text-left opacity-60 relative group cursor-not-allowed min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-gray-400">
              🔒
            </div>
            
            {/* Placeholder thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-lg mb-4 flex items-center justify-center border border-cyan-600/20">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-gray-400">
                The EPR Paradox
              </h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed flex-1">
                Journey back to 1935 and witness the historic Einstein-Podolsky-Rosen debate. Experience the birth of quantum mechanics through the eyes of the greatest physicists, where every theoretical choice reshapes scientific history.
              </p>

              <div className="mt-auto">
                <div className="bg-gray-700/50 rounded p-3 text-xs text-gray-400 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Future Updates</span>
                  </div>
                  <p>Historical physics drama in development.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6 text-left opacity-60 relative group cursor-not-allowed min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-gray-400">
              🔒
            </div>
            
            {/* Placeholder thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-lg mb-4 flex items-center justify-center border border-green-600/20">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-gray-400">
                Quantum Senshi Chronicles
              </h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed flex-1">
                Anime-inspired adventure where magical girls discover their powers are actually quantum field manipulations. Save the multiverse while navigating high school drama and interdimensional romance.
              </p>

              <div className="mt-auto">
                <div className="bg-gray-700/50 rounded p-3 text-xs text-gray-400 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Future Updates</span>
                  </div>
                  <p>Magical quantum anime story coming soon.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-xl p-6 text-left opacity-60 relative group cursor-not-allowed min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-gray-400">
              🔒
            </div>
            
            {/* Placeholder thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-lg mb-4 flex items-center justify-center border border-yellow-600/20">
              <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-gray-400">
                More Genres Coming Soon
              </h3>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed flex-1">
                Additional interactive narratives spanning every genre imaginable. From horror to slice-of-life, each story will offer unique quantum choice mechanics and immersive storytelling experiences.
              </p>

              <div className="mt-auto">
                <div className="bg-gray-700/50 rounded p-3 text-xs text-gray-400 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">⚡</span>
                    <span className="font-semibold">Future Updates</span>
                  </div>
                  <p>Expanding library of interactive stories.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onShowAbout}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50"
          >
            About Quantum Chronicles
          </button>
          <button
            onClick={onShowSettings}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-300 border border-slate-600/50"
          >
            Settings
          </button>
        </div>

        {/* Attribution */}
        <div className="mt-12 text-xs text-slate-500">
          <p>Created by ByteSower • Follow us for more interactive experiences!</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
