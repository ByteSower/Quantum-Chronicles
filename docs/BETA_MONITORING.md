# Beta Monitoring Dashboard Configuration

## Key Metrics to Track

### User Engagement Metrics
- **Session Duration**: Average time spent per session
- **Choice Completion Rate**: Percentage of users who make at least one choice
- **Story Progress**: How far users advance through narrative paths
- **Return Rate**: Users who return for multiple sessions

### Onboarding Metrics
- **Onboarding Completion Rate**: A/B test comparison
  - Variant A (Minimal): Baseline completion rate
  - Variant B (Enhanced): Enhanced onboarding completion rate
- **Time to First Choice**: How quickly users make their first decision
- **Onboarding Abandonment Points**: Where users drop off

### Feedback Collection Metrics
- **Feedback Response Rate**: Percentage of prompts that receive responses
- **Feedback Quality**: Average rating scores by milestone
- **Comment Rate**: Percentage of users leaving detailed comments
- **Feedback Timing**: Response patterns by narrative milestone

### A/B Test Performance
- **Micro Prompts Effectiveness**: Engagement with scroll-based prompts
- **Enhanced Onboarding Impact**: Completion vs. engagement balance
- **Variable Dashboard Usage**: Interaction rates between cohorts

### Technical Performance
- **Load Times**: Page load and component render times
- **Error Rates**: JavaScript errors and failed analytics events
- **Browser Compatibility**: Success rates across different browsers
- **Mobile Performance**: Engagement on mobile vs. desktop

## Analytics Event Categories

### Critical Events to Monitor
```
1. onboarding_started
2. onboarding_completed
3. onboarding_skipped
4. first_choice_completed
5. story_midpoint
6. variable_dashboard_used
7. session_ended
8. feedback_prompt_shown
9. feedback_response_submitted
10. story_completed
```

### Event Data Structure
```json
{
  "eventType": "feedback_response_submitted",
  "timestamp": 1719158400000,
  "cohortId": "beta_cohort_2025_q2",
  "experimentId": "soft_launch_v1",
  "variant": "B",
  "category": "onboarding",
  "milestone": "onboarding_finished",
  "rating": 4,
  "hasComment": true,
  "quickOption": "Clear and helpful"
}
```

## Dashboard Queries (Pseudo-SQL)

### Onboarding Completion Rate by Variant
```sql
SELECT 
  variant,
  COUNT(CASE WHEN eventType = 'onboarding_completed' THEN 1 END) as completed,
  COUNT(CASE WHEN eventType = 'onboarding_started' THEN 1 END) as started,
  (completed / started * 100) as completion_rate
FROM analytics_events 
WHERE cohortId = 'beta_cohort_2025_q2'
GROUP BY variant;
```

### Feedback Response Rate by Milestone
```sql
SELECT 
  milestone,
  COUNT(CASE WHEN eventType = 'feedback_response_submitted' THEN 1 END) as responses,
  COUNT(CASE WHEN eventType = 'feedback_prompt_shown' THEN 1 END) as prompts,
  (responses / prompts * 100) as response_rate,
  AVG(rating) as avg_rating
FROM analytics_events 
WHERE eventType IN ('feedback_response_submitted', 'feedback_prompt_shown')
  AND cohortId = 'beta_cohort_2025_q2'
GROUP BY milestone;
```

### Session Engagement Analysis
```sql
SELECT 
  variant,
  AVG(session_duration_minutes) as avg_session_duration,
  AVG(choices_made) as avg_choices_per_session,
  COUNT(DISTINCT userId) as unique_users,
  COUNT(*) as total_sessions
FROM (
  SELECT 
    userId, 
    variant,
    sessionId,
    MAX(timestamp) - MIN(timestamp) / 60000 as session_duration_minutes,
    COUNT(CASE WHEN eventType = 'choice_made' THEN 1 END) as choices_made
  FROM analytics_events 
  WHERE cohortId = 'beta_cohort_2025_q2'
  GROUP BY userId, sessionId, variant
) sessions
GROUP BY variant;
```

## Alert Thresholds

### Critical Alerts
- **Error Rate > 5%**: Immediate investigation required
- **Onboarding Completion < 30%**: UX issue likely
- **Feedback Response Rate < 10%**: Prompt timing or content issue
- **Session Duration < 2 minutes**: Engagement problem

### Warning Alerts
- **A/B Test Variant Performance Difference > 20%**: Statistical significance
- **Mobile vs Desktop Engagement Difference > 15%**: Responsive design issue
- **Weekly Active Users Declining > 10%**: Retention problem

## Beta Success Criteria

### Primary Goals
1. **Onboarding Completion Rate**: >50% for enhanced variant
2. **Feedback Collection**: >15% response rate across milestones
3. **User Engagement**: >5 minutes average session duration
4. **Error Rate**: <2% across all critical user flows

### Secondary Goals
1. **A/B Test Statistical Significance**: p < 0.05 for key metrics
2. **Qualitative Feedback Quality**: >70% positive sentiment
3. **Variable Dashboard Engagement**: >30% of users interact
4. **Multi-session Return Rate**: >25% of users return

## Data Export Schedule
- **Daily**: Basic engagement metrics
- **Weekly**: Detailed A/B test performance
- **Bi-weekly**: Qualitative feedback analysis
- **End of Beta**: Complete data export for final analysis

## Privacy and Data Handling
- All analytics data anonymized with hashed user IDs
- No personally identifiable information collected
- Feedback comments scrubbed of any personal details
- Data retention: 90 days for beta analysis, then aggregated summaries only
