/**
 * Feedback Data Access Utility
 * Provides methods to access, export, and analyze collected feedback data
 */

export interface FeedbackDataAccess {
  // Data retrieval methods
  getAllConsolidatedFeedback(): any[];
  getAllLegacyFeedback(): any[];
  getFeedbackSummary(): FeedbackSummary;
  
  // Export methods
  exportToJSON(): string;
  exportToCSV(): string;
  downloadFeedbackData(format: 'json' | 'csv'): void;
  
  // Analysis methods
  getAnalytics(): FeedbackAnalytics;
  clearAllFeedbackData(): void;
}

export interface FeedbackSummary {
  totalSubmissions: number;
  consolidatedCount: number;
  legacyCount: number;
  averageRating: number;
  milestoneBreakdown: Record<string, number>;
  timeRange: {
    first: Date | null;
    last: Date | null;
  };
}

export interface FeedbackAnalytics {
  submissionTrends: Array<{
    date: string;
    count: number;
  }>;
  ratingDistribution: Record<number, number>;
  milestoneEffectiveness: Record<string, {
    triggerCount: number;
    completionRate: number;
    averageRating: number;
  }>;
  quickResponsePatterns: Record<string, number>;
}

class FeedbackDataAccessManager implements FeedbackDataAccess {
  
  /**
   * Get all consolidated feedback data
   */
  getAllConsolidatedFeedback(): any[] {
    try {
      return JSON.parse(localStorage.getItem('qnce_consolidated_feedback') || '[]');
    } catch (error) {
      console.error('Error retrieving consolidated feedback:', error);
      return [];
    }
  }

  /**
   * Get all legacy feedback data
   */
  getAllLegacyFeedback(): any[] {
    try {
      return JSON.parse(localStorage.getItem('qnce_user_feedback') || '[]');
    } catch (error) {
      console.error('Error retrieving legacy feedback:', error);
      return [];
    }
  }

  /**
   * Get comprehensive feedback summary
   */
  getFeedbackSummary(): FeedbackSummary {
    const consolidated = this.getAllConsolidatedFeedback();
    const legacy = this.getAllLegacyFeedback();
    
    const allFeedback = [...consolidated, ...legacy];
    
    // Calculate average rating
    const ratingsFromConsolidated = consolidated
      .filter(f => f.overallRating)
      .map(f => f.overallRating);
    const ratingsFromLegacy = legacy
      .filter(f => f.rating)
      .map(f => f.rating);
    const allRatings = [...ratingsFromConsolidated, ...ratingsFromLegacy];
    
    const averageRating = allRatings.length > 0 
      ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length 
      : 0;

    // Milestone breakdown
    const milestoneBreakdown: Record<string, number> = {};
    consolidated.forEach(feedback => {
      if (feedback.milestone) {
        milestoneBreakdown[feedback.milestone] = (milestoneBreakdown[feedback.milestone] || 0) + 1;
      }
    });

    // Time range calculation
    const timestamps = allFeedback
      .filter(f => f.timestamp)
      .map(f => new Date(f.timestamp))
      .sort((a, b) => a.getTime() - b.getTime());

    return {
      totalSubmissions: allFeedback.length,
      consolidatedCount: consolidated.length,
      legacyCount: legacy.length,
      averageRating: Math.round(averageRating * 100) / 100,
      milestoneBreakdown,
      timeRange: {
        first: timestamps.length > 0 ? timestamps[0] : null,
        last: timestamps.length > 0 ? timestamps[timestamps.length - 1] : null
      }
    };
  }

  /**
   * Export all feedback data as JSON
   */
  exportToJSON(): string {
    const data = {
      exportTimestamp: new Date().toISOString(),
      summary: this.getFeedbackSummary(),
      consolidatedFeedback: this.getAllConsolidatedFeedback(),
      legacyFeedback: this.getAllLegacyFeedback(),
      analytics: this.getAnalytics()
    };
    
    return JSON.stringify(data, null, 2);
  }

  /**
   * Export feedback data as CSV
   */
  exportToCSV(): string {
    const consolidated = this.getAllConsolidatedFeedback();
    const legacy = this.getAllLegacyFeedback();
    
    // CSV headers
    const headers = [
      'timestamp',
      'type',
      'overall_rating',
      'milestone',
      'session_duration',
      'choice_count',
      'general_comments',
      'likes',
      'improvements',
      'suggestions',
      'quick_responses'
    ];

    // Convert data to CSV rows
    const rows: string[][] = [headers];
    
    // Add consolidated feedback
    consolidated.forEach(feedback => {
      rows.push([
        new Date(feedback.timestamp).toISOString(),
        'consolidated',
        feedback.overallRating?.toString() || '',
        feedback.milestone || '',
        feedback.sessionDuration?.toString() || '',
        feedback.choiceCount?.toString() || '',
        feedback.comments?.general || '',
        feedback.comments?.likes || '',
        feedback.comments?.improvements || '',
        feedback.comments?.suggestions || '',
        feedback.quickResponses?.join('; ') || ''
      ]);
    });

    // Add legacy feedback
    legacy.forEach(feedback => {
      rows.push([
        new Date(feedback.timestamp).toISOString(),
        'legacy',
        feedback.rating?.toString() || '',
        feedback.category || '',
        '',
        '',
        feedback.comment || '',
        '',
        '',
        '',
        ''
      ]);
    });

    // Convert to CSV string
    return rows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`)
         .join(',')
    ).join('\n');
  }

  /**
   * Download feedback data as a file
   */
  downloadFeedbackData(format: 'json' | 'csv' = 'json'): void {
    const data = format === 'json' ? this.exportToJSON() : this.exportToCSV();
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qnce-feedback-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get detailed analytics on feedback data
   */
  getAnalytics(): FeedbackAnalytics {
    const consolidated = this.getAllConsolidatedFeedback();
    const legacy = this.getAllLegacyFeedback();
    
    // Submission trends (by day)
    const submissionTrends: Array<{date: string, count: number}> = [];
    const dateGroups: Record<string, number> = {};
    
    [...consolidated, ...legacy].forEach(feedback => {
      if (feedback.timestamp) {
        const date = new Date(feedback.timestamp).toISOString().split('T')[0];
        dateGroups[date] = (dateGroups[date] || 0) + 1;
      }
    });
    
    Object.entries(dateGroups).forEach(([date, count]) => {
      submissionTrends.push({ date, count });
    });
    submissionTrends.sort((a, b) => a.date.localeCompare(b.date));

    // Rating distribution
    const ratingDistribution: Record<number, number> = {};
    [...consolidated, ...legacy].forEach(feedback => {
      const rating = feedback.overallRating || feedback.rating;
      if (rating) {
        ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
      }
    });

    // Milestone effectiveness
    const milestoneEffectiveness: Record<string, any> = {};
    consolidated.forEach(feedback => {
      if (feedback.milestone) {
        if (!milestoneEffectiveness[feedback.milestone]) {
          milestoneEffectiveness[feedback.milestone] = {
            triggerCount: 0,
            completionRate: 0,
            averageRating: 0,
            ratings: []
          };
        }
        milestoneEffectiveness[feedback.milestone].triggerCount++;
        if (feedback.overallRating) {
          milestoneEffectiveness[feedback.milestone].ratings.push(feedback.overallRating);
        }
      }
    });

    // Calculate averages for milestones
    Object.keys(milestoneEffectiveness).forEach(milestone => {
      const data = milestoneEffectiveness[milestone];
      if (data.ratings.length > 0) {
        data.averageRating = data.ratings.reduce((sum: number, rating: number) => sum + rating, 0) / data.ratings.length;
        data.completionRate = data.ratings.length / data.triggerCount;
      }
      delete data.ratings; // Clean up temporary array
    });

    // Quick response patterns
    const quickResponsePatterns: Record<string, number> = {};
    consolidated.forEach(feedback => {
      if (feedback.quickResponses && Array.isArray(feedback.quickResponses)) {
        feedback.quickResponses.forEach((response: string) => {
          quickResponsePatterns[response] = (quickResponsePatterns[response] || 0) + 1;
        });
      }
    });

    return {
      submissionTrends,
      ratingDistribution,
      milestoneEffectiveness,
      quickResponsePatterns
    };
  }

  /**
   * Clear all feedback data (use with caution)
   */
  clearAllFeedbackData(): void {
    const confirmed = window.confirm(
      'Are you sure you want to clear ALL feedback data? This action cannot be undone.'
    );
    
    if (confirmed) {
      localStorage.removeItem('qnce_consolidated_feedback');
      localStorage.removeItem('qnce_user_feedback');
      localStorage.removeItem('qnce_feedback_data');
      console.log('✅ All feedback data cleared');
    }
  }
}

// Create singleton instance
export const feedbackDataAccess = new FeedbackDataAccessManager();

// Console helpers for easy access in browser dev tools
if (typeof window !== 'undefined') {
  (window as any).qnceFeedbackAccess = {
    summary: () => {
      const summary = feedbackDataAccess.getFeedbackSummary();
      console.table(summary);
      return summary;
    },
    
    data: () => {
      const data = {
        consolidated: feedbackDataAccess.getAllConsolidatedFeedback(),
        legacy: feedbackDataAccess.getAllLegacyFeedback()
      };
      console.log('📊 Feedback Data:', data);
      return data;
    },
    
    analytics: () => {
      const analytics = feedbackDataAccess.getAnalytics();
      console.log('📈 Feedback Analytics:', analytics);
      return analytics;
    },
    
    export: (format: 'json' | 'csv' = 'json') => {
      feedbackDataAccess.downloadFeedbackData(format);
      console.log(`📥 Downloading feedback data as ${format.toUpperCase()}`);
    },
    
    clear: () => {
      feedbackDataAccess.clearAllFeedbackData();
    },
    
    help: () => {
      console.log(`
🔍 QNCE Feedback Data Access Commands:

📊 qnceFeedbackAccess.summary()    - View feedback summary
📋 qnceFeedbackAccess.data()       - View raw feedback data  
📈 qnceFeedbackAccess.analytics()  - View detailed analytics
📥 qnceFeedbackAccess.export()     - Download as JSON
📥 qnceFeedbackAccess.export('csv') - Download as CSV
🗑️  qnceFeedbackAccess.clear()     - Clear all data (careful!)
❓ qnceFeedbackAccess.help()       - Show this help

Example usage:
> qnceFeedbackAccess.summary()
> qnceFeedbackAccess.export('csv')
      `);
    }
  };
  
  console.log('🔍 QNCE Feedback Data Access loaded! Type qnceFeedbackAccess.help() for commands.');
}

export default feedbackDataAccess;
