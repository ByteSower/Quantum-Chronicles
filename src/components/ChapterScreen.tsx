import React from 'react';
import type { StoryMeta, ChapterMeta } from '../narratives/types';

interface ChapterScreenProps {
  story: StoryMeta;
  onSelectChapter: (chapterId: string) => void;
  onBack: () => void;
}

const ChapterScreen: React.FC<ChapterScreenProps> = ({ story, onSelectChapter, onBack }) => {
  const handleChapterClick = (chapter: ChapterMeta) => {
    if (!chapter.unlocked) return;
    onSelectChapter(chapter.chapterId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-indigo-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stories
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {story.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            {story.description}
          </p>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {story.chapters.map((chapter, index) => (
            <div
              key={chapter.chapterId}
              onClick={() => handleChapterClick(chapter)}
              className={`
                relative p-6 rounded-xl border transition-all duration-300 cursor-pointer
                ${chapter.unlocked 
                  ? 'bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105' 
                  : 'bg-slate-800/30 border-slate-600/30 cursor-not-allowed opacity-60'
                }
              `}
            >
              {/* Chapter Number Badge */}
              <div className={`
                absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${chapter.unlocked 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-slate-600 text-slate-400'
                }
              `}>
                {index + 1}
              </div>

              {/* Completion Status */}
              {chapter.completed && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Lock Icon */}
              {!chapter.unlocked && (
                <div className="absolute top-4 right-4 text-slate-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Chapter Content */}
              <div className="pt-2">
                <h3 className={`
                  text-lg font-semibold mb-2 leading-tight
                  ${chapter.unlocked ? 'text-white' : 'text-slate-400'}
                `}>
                  {chapter.title}
                </h3>
                
                <div className={`
                  text-sm
                  ${chapter.unlocked ? 'text-gray-300' : 'text-slate-500'}
                `}>
                  {chapter.completed ? (
                    <span className="text-green-400 font-medium">✓ Completed</span>
                  ) : chapter.unlocked ? (
                    <span className="text-blue-400 font-medium">Available</span>
                  ) : (
                    <span className="text-slate-500">Locked</span>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              {chapter.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-6 bg-slate-800/30 rounded-xl border border-slate-600/30">
          <h3 className="text-xl font-semibold mb-2 text-white">Progress Summary</h3>
          <div className="flex items-center gap-4 text-gray-300">
            <span>
              Completed: {story.chapters.filter(c => c.completed).length} / {story.chapters.length}
            </span>
            <span>•</span>
            <span>
              Available: {story.chapters.filter(c => c.unlocked).length} / {story.chapters.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(story.chapters.filter(c => c.completed).length / story.chapters.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterScreen;
