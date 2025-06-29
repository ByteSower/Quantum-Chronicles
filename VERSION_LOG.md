# VERSION LOG

This file tracks all major changes to the Quantum Chronicles project.

## [2025-06-28] v1.2.1-alpha
- Rolled back to v0.2.0 and re-applied narrative schema
- Rebuilt templateSegment.ts, StoryFlow.tsx & StartScreen.tsx  
- Verified originsUnveiled & template segments smoke-test
- **STAGE A COMPLETE**: Added core narrative schema types
  - Implemented Brain's clean NarrativeSegment, NarrativeNode, Choice interfaces
  - Added FlagCondition, FlagUpdate, FeedbackHook, QNCEVariables types
  - Included utility functions: interpolateText, checkConditions
  - Added nextSegmentId support for segment hopping
- **STAGE B COMPLETE**: Created narrativeUtils.ts with utility functions
  - wrapFeedbackHook for timing and context management
  - flagIncrement, flagDecrement, flagSet helper functions
  - applyFlagUpdates for processing choice effects
- **STAGE C COMPLETE**: Refactored useQNCE hook for Brain's schema
  - Clean implementation following Brain's narrative structure
  - Handles segment loading, nextSegmentId transitions, global decay
  - Dynamic segment registry and node lookup system
  - Proper state management for flags, variables, history
- **STAGE D COMPLETE**: Template & Skeleton segments
  - Updated templateSegment.ts with Brain's complete schema example
  - Created skeleton originsUnveiled.ts with 3-node smoke test
  - Integrated both segments into NARRATIVE_SEGMENTS registry
  - Ready for smoke testing
- **STAGE E COMPLETE**: Smoke-Test successful
  - App runs and loads Origins Unveiled segment correctly
  - 3-node flow functional: discovery → examination → revelation
  - Dynamic text, flag updates, and variable processing working
  - Brain's narrative schema fully operational
- **STAGE F COMPLETE**: Component compatibility fixes
  - Fixed templateSegment.ts export and recreated with Brain's schema
  - Updated StoryFlow.tsx to use correct QNCEReturn interface
  - Fixed type casting for VariableDashboard variables
  - Added null safety checks for currentNode
  - Updated property names to match new schema (nodeId vs id, choiceText vs text)
  - Removed deprecated properties and temporarily disabled VisualBranchTracker
  - All TypeScript errors resolved, app compiles cleanly
- **STAGE G COMPLETE**: Aligned segments with StartScreen
  - Updated StartScreen to offer 'originsUnveiled' and 'template' segments
  - Cleaned up StoryFlow.tsx forgotten_truth references
  - Updated feedback messages to match available segments
  - Both segments now properly accessible from start screen

## [Previous] v0.2.0 (Stable Release)
- Last known stable version
- Basic QNCE functionality working
- Clean UI/UX with card-based start screen
  - 3-node flow functional: discovery → examination → revelation
  - Dynamic text, flag updates, and variable processing working
  - Brain's narrative schema fully operational
- **STAGE F COMPLETE**: Component compatibility fixes
  - Fixed templateSegment.ts export issue and recreated with Brain's schema
  - Updated StoryFlow.tsx to use correct QNCEReturn interface
  - Fixed type casting for VariableDashboard variables (string/number/boolean → number)
  - Added null safety checks for currentNode throughout component
  - Updated property names to match new schema (nodeId vs id, choiceText vs text)
  - Removed deprecated properties (unlockedNodes, delayedConsequences, recentActions, getBranchNodes)
  - Temporarily disabled VisualBranchTracker until getBranchNodes is reimplemented
  - All TypeScript errors resolved, app compiles cleanly

## [Previous] v0.2.0 (Stable Release)
- Last known stable version
- Basic QNCE functionality working
- Clean UI/UX with card-based start screen
