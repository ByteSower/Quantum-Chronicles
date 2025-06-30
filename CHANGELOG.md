# Changelog

All notable changes to Quantum Chronicles will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1-beta.2] - 2025-06-30

### Fixed
- StoryFlow Back button now consistently remounts and resets state (fixes stuck navigation)
- Removed obsolete Animation Speed toggle from Settings Modal

### Changed
- Settings switches: better alignment, hover/scale effects, shadows, 300ms transitions

### QA
- Verified useQNCE hook resets on chapter switch
- Comprehensive smoke tests passed (Stories→Chapters→Flow navigation)

## [1.2.1-beta.1] - 2025-06-30

### Added
- Story→Chapter→Flow three-tier navigation system
- Persistent progress tracking with localStorage
- Chapter unlocking based on completion status
- Professional UI polish with multi-genre teaser cards
- Complete narrative audit and fixes for "The Forgotten Truth"
- Automated narrative validation with audit-narrative.js

### Changed
- Major navigation refactor from single story flow to chapter-based system
- Enhanced UI with thumbnails, progress bars, and visual indicators
- Improved accessibility with ARIA compliance and keyboard navigation
- Mobile-first responsive design optimization

### Fixed
- Eliminated all infinite loops and missing node references in narratives
- Resolved navigation dead ends and progression issues
- Enhanced state management with improved useQNCE hook

## [1.2.1-stable] - 2025-06-27

### Added
- Core QNCE narrative engine
- Interactive choice mechanics
- Variable tracking system
- Basic UI components
- GitHub Pages deployment
- Repository cleanup and documentation

### Technical
- Initial TypeScript + React + Vite setup
- Tailwind CSS styling framework
- Basic narrative structure implementation
