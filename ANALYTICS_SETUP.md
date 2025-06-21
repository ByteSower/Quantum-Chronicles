# Analytics & Release Automation Setup

## 🤖 Automated Release Workflows

We've set up **GitHub Actions** to automate your release process. Here's what happens automatically:

### How It Works:
1. **Push a git tag** like `v0.3.0`
2. **GitHub automatically**:
   - ✅ Builds the project
   - ✅ Runs tests (when you add them)
   - ✅ Creates a GitHub Release with notes
   - ✅ Deploys to GitHub Pages
   - ✅ Notifies you of success

### Workflow Files Created:
- `.github/workflows/release.yml` - Automated releases when you push tags
- `.github/workflows/ci.yml` - Tests and builds on every push/PR

### How to Use:
```bash
# When ready for a new release:
npm version patch  # Updates package.json to 0.2.1
git push origin demo-v0.1.0
git push origin v0.2.1  # This triggers the automated release
```

**That's it!** Everything else happens automatically.

## 📊 Enhanced Analytics System

### What We Track Now:

#### 📖 **Story Analytics** (Most Important for Your Narrative)
- **Story Progression**: Which nodes users visit and how deep they go
- **Choice Patterns**: What choices are popular vs. ignored
- **Variable Changes**: How choices affect Curiosity, Coherence, Disruption, Synchrony
- **Completion Rates**: How many users finish stories and which endings they reach
- **Drop-off Points**: Where users abandon the story (critical for improvements)

#### 🎮 **User Engagement**
- **Feature Usage**: Developer mode, help system, settings engagement
- **Help System**: What topics users need help with most
- **Session Duration**: How long users engage with the story
- **Time Per Choice**: How long users take to make decisions

#### ⚛️ **Quantum Variable Tracking**
- **Field Strength Changes**: Overall narrative energy
- **Variable Correlations**: Which combinations create the best stories
- **State Transitions**: How variables evolve through story paths

### Analytics Files:
- `src/utils/analytics.ts` - Main analytics system
- `src/components/AnalyticsDebugPanel.tsx` - Development debugging tool

### What You'll See in Google Analytics:

#### Custom Events Categories:
- **narrative** - Story progression and choices
- **quantum_mechanics** - Variable changes and states  
- **engagement** - User behavior and completion
- **user_interface** - Feature usage and help
- **education** - Help system engagement
- **technical** - Performance metrics

#### Sample Events You'll See:
```
Event: choice_made
Category: narrative
Label: forgotten_truth_journal
Custom Parameters:
  - choice_text: "Read the journal immediately"
  - variable_changes: {curiosity: +2, disruption: +1}
  - choice_impact: 2

Event: story_progress  
Category: narrative
Label: forgotten_truth_revelation
Custom Parameters:
  - story_path: "intro -> journal -> revelation"
  - node_depth: 3

Event: help_accessed
Category: education
Label: about_qnce
Custom Parameters:
  - help_type: "modal"
  - topic: "quantum_variables"
```

## 🔧 Development Tools

### Analytics Debug Panel
- **Only shows in development mode**
- **Real-time event tracking** - See events as they happen
- **Bottom-right corner** - Shows event count
- **Click to expand** - See full event details

### How to Use During Development:
1. Run `npm run dev`
2. Look for 📊 button in bottom-right corner
3. Click to see real-time analytics events
4. Interact with the story to see events flow in

## 🎯 What This Gives You

### For Story Development:
- **See which story paths are popular**
- **Identify where users get stuck or lost**
- **Understand which choices feel meaningful**
- **Track how variables create narrative flow**

### For User Experience:
- **Know what help users need most**
- **See if developer mode is valuable**
- **Understand mobile vs desktop usage**
- **Track performance issues**

### For Marketing & Growth:
- **Completion rates per story branch**
- **Time spent engaging with content**
- **Feature adoption rates**
- **User journey mapping**

## 📈 Google Analytics Dashboard

You already have Google Analytics (`G-4FBGSF8JYN`) set up. The new events will appear in:

1. **Realtime** → Events (see live activity)
2. **Events** → All Events (see event patterns)
3. **Explore** → Create custom reports for story analytics

### Recommended Custom Reports:
1. **Story Completion Funnel** - Track user journey through narrative
2. **Choice Popularity** - See which choices users make most
3. **Variable Impact** - Correlate variable changes with engagement
4. **Help Usage** - Understand what users find confusing

## 🚀 Next Steps

1. **Test the analytics** - Use the debug panel to see events
2. **Create GitHub releases** - Use the automated workflows
3. **Monitor Google Analytics** - Watch for the new custom events
4. **Iterate on story** - Use data to improve narrative flow

The system is now tracking rich narrative data to help you create better interactive stories! 🎭✨
