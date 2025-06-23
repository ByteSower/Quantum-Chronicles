#!/bin/bash

# Quantum Chronicles Beta Deployment Script
# This script builds and deploys the beta version with proper analytics isolation

set -e

echo "🚀 Starting Quantum Chronicles Beta Deployment..."

# Verify we're on the correct branch for beta
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "beta" ] && [ "$CURRENT_BRANCH" != "main" ] && [[ ! "$CURRENT_BRANCH" =~ ^demo- ]]; then
    echo "⚠️  Warning: Not on main, beta, or demo branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Load beta environment variables
if [ -f ".env.beta" ]; then
    echo "📋 Loading beta environment configuration..."
    export $(cat .env.beta | grep -v '^#' | xargs)
else
    echo "❌ .env.beta file not found!"
    exit 1
fi

# Verify all required environment variables are set
required_vars=("VITE_APP_ENV" "VITE_APP_VERSION" "VITE_ANALYTICS_ENABLED")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set!"
        exit 1
    fi
done

echo "✅ Environment: $VITE_APP_ENV"
echo "✅ Version: $VITE_APP_VERSION"
echo "✅ Analytics: $VITE_ANALYTICS_ENABLED"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build for beta with beta environment
echo "🏗️  Building for beta environment..."
cp .env.beta .env.local
npm run build

# Verify build output
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Generate deployment manifest
echo "📄 Generating deployment manifest..."
cat > dist/deployment-info.json << EOF
{
  "environment": "$VITE_APP_ENV",
  "version": "$VITE_APP_VERSION",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "gitCommit": "$(git rev-parse HEAD)",
  "gitBranch": "$(git branch --show-current)",
  "cohortId": "$VITE_COHORT_ID",
  "experimentId": "$VITE_EXPERIMENT_ID",
  "features": {
    "enhancedOnboarding": $VITE_ENHANCED_ONBOARDING,
    "microPrompts": $VITE_MICRO_PROMPTS,
    "feedbackCollection": $VITE_FEEDBACK_COLLECTION,
    "variableDashboard": $VITE_VARIABLE_DASHBOARD
  }
}
EOF

echo "✅ Deployment manifest created"

# Create beta release notes
echo "📝 Generating beta release notes..."
cat > dist/BETA_RELEASE_NOTES.md << 'EOF'
# Quantum Chronicles Beta v0.3.0-beta.1

## 🎯 What's New in This Beta

### Enhanced Feedback Collection System
- **Smart Feedback Prompts**: Contextual feedback requests at key narrative milestones
- **Multiple Trigger Points**: Onboarding completion, first choice, story midpoint, variable dashboard interaction, and session end
- **Analytics Integration**: All feedback events are properly logged with cohort and milestone tagging
- **Accessibility**: Fully accessible feedback interface with keyboard navigation and screen reader support

### Improved Analytics & A/B Testing
- **Beta Environment Isolation**: Analytics data is isolated from production to prevent contamination
- **Enhanced Event Tracking**: Comprehensive tracking of user interactions, choices, and engagement patterns
- **Cohort Tagging**: All events tagged with beta cohort identifier for analysis
- **A/B Test Support**: Enhanced onboarding and micro-prompts feature flags active

### Variable Dashboard Enhancements
- **Interaction Tracking**: Dashboard usage now triggers appropriate feedback collection
- **Performance Improvements**: Optimized rendering and animation performance

## 🧪 Active A/B Tests

1. **Enhanced Onboarding**: Testing guided vs. minimal onboarding experiences
2. **Micro Prompts**: Testing engagement prompts vs. clean narrative flow

## 📊 What We're Measuring

- **Onboarding Completion Rates**: How many users complete the initial experience
- **Choice Engagement**: Patterns in decision-making and choice timing
- **Feedback Quality**: Response rates and feedback sentiment
- **Session Length**: Time spent in different narrative paths
- **Variable Dashboard Usage**: How often users check their quantum state

## 🐛 Known Beta Limitations

- Beta analytics endpoints are placeholders - replace with actual service URLs
- Feedback data stored locally until backend integration complete
- Some A/B test variants may show debug information

## 🔄 Feedback Welcome

As a beta tester, your feedback is crucial! The app will prompt you at key moments, and you can:
- Rate your experience (1-5 stars)
- Choose quick feedback options
- Leave detailed comments
- All feedback helps improve the final release

## 🚀 Next Steps

After this beta period, we'll analyze:
- User engagement patterns
- Feedback sentiment and suggestions
- A/B test performance
- Technical performance metrics

Thank you for being part of the Quantum Chronicles beta!
EOF

echo "✅ Beta release notes created"

# Deployment simulation (replace with actual deployment commands)
echo "🌐 Simulating beta deployment..."
echo "   📤 Would deploy to: http://localhost:3000 (or your actual beta domain)"
echo "   📊 Analytics endpoint: $VITE_ANALYTICS_ENDPOINT"
echo "   💬 Feedback endpoint: $VITE_FEEDBACK_ENDPOINT"
echo "   🚀 Mock server: http://localhost:3001"

# Clean up
rm -f .env.local

echo ""
echo "🎉 Beta deployment preparation complete!"
echo ""
echo "📋 Deployment Summary:"
echo "   Environment: $VITE_APP_ENV"
echo "   Version: $VITE_APP_VERSION"
echo "   Cohort: $VITE_COHORT_ID"
echo "   Build Size: $(du -sh dist | cut -f1)"
echo "   Files: $(find dist -type f | wc -l | tr -d ' ') files"
echo ""
echo "🔗 Next Steps:"
echo "   1. Review dist/BETA_RELEASE_NOTES.md"
echo "   2. Deploy dist/ contents to beta environment"
echo "   3. Verify analytics endpoints are receiving data"
echo "   4. Begin beta user recruitment"
echo "   5. Monitor feedback and engagement metrics"
echo ""
echo "✅ Ready for beta launch!"
