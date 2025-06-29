# QNCE Internal Development Guide

🔐 **FOR DEVELOPMENT TEAM ONLY** - Do not include in public repository

## Feedback Data Access

### Quick Access via Browser Console

When testing the application, you can access feedback data using browser console commands:

1. Open QNCE app in browser
2. Open Developer Tools (F12) → Console
3. Run the feedback data access script from `dev-tools/feedback-data-access.js`
4. Use these commands:

```javascript
// View summary
QNCE_INTERNAL.summary()

// View all data
QNCE_INTERNAL.data()

// Export as JSON
QNCE_INTERNAL.export()

// Export as CSV
QNCE_INTERNAL.export('csv')

// Get help
QNCE_INTERNAL.help()
```

### Data Storage Locations

Feedback data is stored in browser localStorage:
- **Consolidated feedback**: `qnce_consolidated_feedback`
- **Legacy feedback**: `qnce_user_feedback`
- **Session data**: `qnce_feedback_data`

### Data Structure

#### Consolidated Feedback
```javascript
{
  timestamp: number,
  overallRating: number (1-5),
  milestone: string,
  sessionDuration: number,
  choiceCount: number,
  comments: {
    general?: string,
    likes?: string,
    improvements?: string,
    suggestions?: string
  },
  quickResponses: string[],
  qnceVariables?: {
    curiosity: number,
    coherence: number,
    disruption: number,
    synchrony: number
  }
}
```

#### Legacy Feedback
```javascript
{
  timestamp: number,
  rating: number (1-5),
  category: string,
  comment?: string
}
```

## Development Commands

### Build & Test
```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Beta Deployment (with analytics isolation)
```bash
npm run deploy:beta
```

## Security Notes

- ✅ No personally identifiable information is collected
- ✅ Data stored locally in browser only
- ✅ No server-side data transmission
- ✅ Feedback data access not exposed to public users
- ⚠️ Internal tools should never be included in public builds

## Analytics Events Tracked

### Feedback Events
- `feedback_response_submitted`
- `feedback_prompt_dismissed`
- `milestone_triggered`

### User Engagement
- `choice_made`
- `onboarding_completed` 
- `session_duration`
- `variable_dashboard_interaction`

## File Structure for Internal Tools

```
dev-tools/                    # Internal development tools (gitignored)
├── feedback-data-access.js   # Browser console script for data access
└── README-INTERNAL.md        # This file

src/                          # Public application code
├── utils/
│   ├── ConsolidatedFeedbackManager.ts  # Feedback collection system
│   └── FeedbackManager.ts              # Legacy feedback system
└── components/
    └── ConsolidatedFeedbackPrompt.tsx  # User-facing feedback UI
```

## Deployment Checklist

Before deploying to production:

- [ ] No internal tools in src/ directory
- [ ] No dev-tools/ directory included
- [ ] No console.log statements with sensitive data
- [ ] No debugging flags enabled
- [ ] Feedback data access removed from public UI
- [ ] .gitignore properly excludes internal files
- [ ] Build completes without errors
- [ ] Preview works correctly

## Team Access Only

This guide and the tools it describes are for:
- Core development team
- The Brain (AI assistant)
- Authorized collaborators only

**DO NOT** share these access methods with:
- Public users
- Beta testers (unless specifically authorized)
- External parties
- Public documentation

---

*Last updated: June 2025*
