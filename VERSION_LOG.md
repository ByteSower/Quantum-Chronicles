# Quantum Chronicles Version Log

## Version History & Development Tracking

### v1.2.1-stable (Current Main Branch)
**Commit:** `88eca56`  
**Date:** June 27, 2025  
**Status:** 🟢 Stable Production Release

**Features:**
- ✅ Core QNCE narrative engine
- ✅ Interactive choice mechanics
- ✅ Variable tracking system
- ✅ Basic UI components
- ✅ GitHub Pages deployment
- ✅ Repository cleanup and documentation

**Branch:** `main`  
**Deployment:** https://bytesower.github.io/Quantum-Chronicles/

---

### v1.3.0-dev (Develop Branch)
**Base Commit:** `88eca56`  
**Date:** June 29, 2025  
**Status:** 🟡 Active Development

**Development Strategy:**
- 🎯 **Unified Narrative Refactor:** Merged all expansion modules into a single, cohesive narrative structure (`forgottenTruth.ts`).
- 🔄 **Engine Overhaul:** Refactored the `useQNCE` hook to support the new unified schema, including namespaced node IDs and in-story branching.
- 📋 **UI Simplification:** Removed the `StartScreen` and streamlined the app to launch directly into the `StoryFlow`.
- 🧪 **Component Updates:** Updated all major UI components (`NarrativeDisplay`, `ChoiceSelector`, `StateDebugOverlay`, `App`, `StoryFlow`) to align with the new engine and data structures.

**Completed Features:**
- [x] **Narrative Schema Migration:** Updated `types.ts` and all related files to a new, unified narrative schema.
- [x] **Unified Narrative Structure:** Merged all expansion modules into a single `forgottenTruth.ts` segment.
- [x] **Engine Refactor:** Overhauled `useQNCE.ts` for the new schema.
- [x] **UI Refactor:** Removed `StartScreen` and updated all components for the new engine.
- [x] **Unified Button Menu:** Implemented `SideMenu` component with global navigation for tutorial, settings, restart, and variables.

**In Progress:**
- [ ] Enhanced tutorial system
- [ ] Refined feedback mechanics
- [ ] Improved settings modal
- [ ] Variable dashboard enhancements
- [ ] Visual branch tracking

**Branch:** `develop`

---

## Development Guidelines

### Feature Branch Naming
- `feature/button-menu` - UI component features
- `feature/tutorial-enhancement` - User experience improvements
- `feature/narrative-schema` - Core engine changes
- `feature/performance` - Optimization work
- `feature/accessibility` - A11y improvements

### Commit Message Format
```
[feature-name]: Brief description

- Detailed change 1
- Detailed change 2
- Testing notes
```

### Version Bumping Rules
- **Patch (x.x.X):** Bug fixes, minor improvements
- **Minor (x.X.x):** New features, backward compatible
- **Major (X.x.x):** Breaking changes, major refactors

### Release Criteria
- ✅ All features tested in `develop`
- ✅ No breaking changes to existing functionality
- ✅ Documentation updated
- ✅ Performance regression checks passed
- ✅ Accessibility standards maintained

---

*This log tracks all development progress from the stable base at commit 88eca56.*
