import type { StoryMeta } from '../data/stories';

const STORAGE_KEY = 'qnce-story-progress';

export function loadStories(): StoryMeta[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    // Validate the structure
    if (!Array.isArray(data)) return null;
    
    return data as StoryMeta[];
  } catch (error) {
    console.warn('Failed to load story progress from localStorage:', error);
    return null;
  }
}

export function saveStories(stories: StoryMeta[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch (error) {
    console.warn('Failed to save story progress to localStorage:', error);
  }
}

export function clearStoryProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear story progress from localStorage:', error);
  }
}

// Helper function to find a chapter in the stories array
export function findChapter(stories: StoryMeta[], storyId: string, chapterId: string) {
  const story = stories.find(s => s.storyId === storyId);
  if (!story) return null;
  
  const chapter = story.chapters.find(c => c.chapterId === chapterId);
  return chapter || null;
}

// Helper function to mark a chapter as completed and unlock the next one
export function markChapterComplete(stories: StoryMeta[], storyId: string, chapterId: string): StoryMeta[] {
  return stories.map(story => {
    if (story.storyId !== storyId) return story;
    
    const chapters = story.chapters.map((chapter) => {
      if (chapter.chapterId === chapterId) {
        // Mark current chapter as completed
        return { ...chapter, completed: true };
      }
      return chapter;
    });
    
    // Find the current chapter index and unlock the next one
    const currentIndex = chapters.findIndex(c => c.chapterId === chapterId);
    if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
      chapters[currentIndex + 1] = { ...chapters[currentIndex + 1], unlocked: true };
    }
    
    return { ...story, chapters };
  });
}
