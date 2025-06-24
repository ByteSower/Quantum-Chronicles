# Beta Testing Setup Guide

## 🚀 Quick Start with Working Endpoints

The beta configuration has been updated to use local development endpoints that actually work for testing. Here's how to run the full beta environment:

### 1. **Install Mock Server Dependencies**
```bash
# Install mock server dependencies
npm install --package-lock-only express cors nodemon
```

### 2. **Start the Mock Analytics/Feedback Server**
```bash
# Start the mock server (handles analytics and feedback)
node mock-server.js
```
This will run on `http://localhost:3001` and provide:
- Analytics endpoint: `http://localhost:3001/api/events`
- Feedback endpoint: `http://localhost:3001/api/feedback`
- Dashboard view: `http://localhost:3001/api/dashboard`

### 3. **Run the Beta Build**
```bash
# Build and serve the beta app
npm run build
npm run preview
```
This will serve the app on `http://localhost:4173`

### 4. **Monitor Real-Time Data**
- **Analytics Dashboard**: Visit `http://localhost:3001/api/dashboard` to see collected events
- **Console Output**: The mock server logs all events and feedback in real-time
- **Data Files**: Analytics and feedback are saved to `./mock-data/` directory

## 📊 **Working Endpoints Configuration**

Current `.env.beta` configuration:
```bash
VITE_ANALYTICS_ENDPOINT=http://localhost:3001/api/events
VITE_FEEDBACK_ENDPOINT=http://localhost:3001/api/feedback
VITE_AB_TEST_ENDPOINT=http://localhost:3001/api/variants
```

## 🌐 **For Production Deployment**

When you have actual production endpoints, update `.env.beta`:

```bash
# Replace with your actual production endpoints
VITE_ANALYTICS_ENDPOINT=https://your-analytics-domain.com/api/events
VITE_FEEDBACK_ENDPOINT=https://your-feedback-domain.com/api/feedback
VITE_ANALYTICS_API_KEY=your_actual_api_key
VITE_FEEDBACK_API_KEY=your_actual_feedback_key
```

## 🧪 **Testing the Full Experience**

1. Start mock server: `node mock-server.js`
2. Build beta: `npm run build`
3. Serve app: `npm run preview`
4. Open browser: `http://localhost:4173`
5. Monitor dashboard: `http://localhost:3001/api/dashboard`

All feedback prompts, analytics events, and A/B testing will now work with real data collection!

## 📝 **Data Collection**

The mock server saves all data to files:
- `mock-data/analytics-events.jsonl` - All user interaction events
- `mock-data/feedback.jsonl` - All feedback submissions

This data can be analyzed for beta insights and testing validation.
