export interface ChapterMeta {
  chapterId: string;
  title: string;
  unlocked: boolean;
  completed: boolean;
}

export interface StoryMeta {
  storyId: string;
  title: string;
  description: string;
  thumbnail: string;
  chapters: ChapterMeta[];
}

export const stories: StoryMeta[] = [
  {
    storyId: 'forgottenTruth',
    title: 'The Forgotten Truth',
    description: 'Uncover ancient secrets that reshape reality itself. A journey through quantum mysteries, cosmic conspiracies, and the true nature of human consciousness.',
    thumbnail: '/Quantum-Chronicles/images/thumbnails/TFT-Thumbnail.png',
    chapters: [
      { chapterId: 'partI', title: 'I. The Garden That Wasn\'t', unlocked: true, completed: false },
      { chapterId: 'partII', title: 'II. The Echo Protocol', unlocked: false, completed: false },
      { chapterId: 'partIII', title: 'III. The Keepers', unlocked: false, completed: false },
      { chapterId: 'partIV', title: 'IV. The Antarctic Discovery', unlocked: false, completed: false },
      { chapterId: 'partV', title: 'V. The Echo Awakens', unlocked: false, completed: false },
      { chapterId: 'partVI', title: 'VI. The Fractured Timeline', unlocked: false, completed: false },
      { chapterId: 'partVII', title: 'VII. The New Guardians', unlocked: false, completed: false },
      { chapterId: 'partVIII', title: 'VIII. The Ones Who Shaped', unlocked: false, completed: false },
    ]
  },
  // Additional stories can be added here in the future
];
