#!/usr/bin/env node

/**
 * Mock Analytics & Feedback Server for Beta Testing
 * Provides local endpoints for development and testing
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve beta build

// Data storage
const dataDir = path.join(__dirname, 'mock-data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Mock Analytics Endpoint
app.post('/api/events', (req, res) => {
  const event = {
    ...req.body,
    timestamp: new Date().toISOString(),
    id: Math.random().toString(36).substring(7)
  };
  
  // Log to console for development
  console.log('📊 Analytics Event:', JSON.stringify(event, null, 2));
  
  // Save to file for persistence
  const eventsFile = path.join(dataDir, 'analytics-events.jsonl');
  fs.appendFileSync(eventsFile, JSON.stringify(event) + '\n');
  
  res.json({ success: true, eventId: event.id });
});

// Mock Feedback Endpoint
app.post('/api/feedback', (req, res) => {
  const feedback = {
    ...req.body,
    timestamp: new Date().toISOString(),
    id: Math.random().toString(36).substring(7)
  };
  
  // Log to console for development
  console.log('💬 Feedback Received:', JSON.stringify(feedback, null, 2));
  
  // Save to file for persistence
  const feedbackFile = path.join(dataDir, 'feedback.jsonl');
  fs.appendFileSync(feedbackFile, JSON.stringify(feedback) + '\n');
  
  res.json({ success: true, feedbackId: feedback.id });
});

// Mock A/B Test Variants Endpoint
app.get('/api/variants', (req, res) => {
  const variants = {
    enhancedOnboarding: Math.random() > 0.5 ? 'variant_b' : 'variant_a',
    microPrompts: 'variant_a', // Disabled for beta
  };
  
  console.log('🧪 A/B Test Variants Assigned:', variants);
  
  res.json({
    success: true,
    userId: req.query.userId || 'anonymous',
    variants
  });
});

// Analytics Dashboard Endpoint (for viewing collected data)
app.get('/api/dashboard', (req, res) => {
  try {
    const eventsFile = path.join(dataDir, 'analytics-events.jsonl');
    const feedbackFile = path.join(dataDir, 'feedback.jsonl');
    
    const events = fs.existsSync(eventsFile) 
      ? fs.readFileSync(eventsFile, 'utf8').split('\n').filter(Boolean).map(JSON.parse)
      : [];
    
    const feedback = fs.existsSync(feedbackFile)
      ? fs.readFileSync(feedbackFile, 'utf8').split('\n').filter(Boolean).map(JSON.parse)
      : [];
    
    const dashboard = {
      totalEvents: events.length,
      totalFeedback: feedback.length,
      recentEvents: events.slice(-10),
      recentFeedback: feedback.slice(-5),
      eventTypes: events.reduce((acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1;
        return acc;
      }, {}),
      feedbackSentiment: feedback.reduce((acc, item) => {
        if (item.rating) {
          acc.ratings.push(item.rating);
          acc.average = acc.ratings.reduce((a, b) => a + b, 0) / acc.ratings.length;
        }
        return acc;
      }, { ratings: [], average: 0 })
    };
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate dashboard data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    environment: 'beta-mock',
    timestamp: new Date().toISOString()
  });
});

// Serve the beta app at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Beta Server running at http://localhost:${PORT}`);
  console.log(`📊 Analytics Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\n📝 Data will be saved to: ${dataDir}/`);
  console.log(`   - Analytics: analytics-events.jsonl`);
  console.log(`   - Feedback: feedback.jsonl`);
});
