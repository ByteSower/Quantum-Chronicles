#!/usr/bin/env node

/**
 * INTERNAL DEVELOPMENT TOOL - Feedback Data Access
 * 
 * This tool is for the development team only and should NOT be included in public builds.
 * It provides access to collected feedback data for analysis and export.
 * 
 * Usage:
 * 1. Run the app in development mode
 * 2. Open browser console and run this script
 * 3. Use the provided commands to access feedback data
 */

// This script can be run in the browser console to access feedback data
const feedbackDataAccessScript = `
(function() {
  console.log('🔐 INTERNAL: Loading Feedback Data Access Tool...');
  console.log('⚠️  This tool is for development team use only!');
  
  // Feedback data access functions
  const getFeedbackData = () => {
    try {
      const consolidated = JSON.parse(localStorage.getItem('qnce_consolidated_feedback') || '[]');
      const legacy = JSON.parse(localStorage.getItem('qnce_user_feedback') || '[]');
      return { consolidated, legacy, total: consolidated.length + legacy.length };
    } catch (error) {
      console.error('Error accessing feedback data:', error);
      return { consolidated: [], legacy: [], total: 0 };
    }
  };

  const getFeedbackSummary = () => {
    const data = getFeedbackData();
    const allRatings = [
      ...data.consolidated.filter(f => f.overallRating).map(f => f.overallRating),
      ...data.legacy.filter(f => f.rating).map(f => f.rating)
    ];
    
    const avgRating = allRatings.length > 0 
      ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length 
      : 0;

    return {
      'Total Submissions': data.total,
      'Consolidated Feedback': data.consolidated.length,
      'Legacy Feedback': data.legacy.length,
      'Average Rating': avgRating > 0 ? avgRating.toFixed(2) + '/5' : 'No ratings',
      'Has Data': data.total > 0 ? 'Yes' : 'No'
    };
  };

  const exportFeedbackData = (format = 'json') => {
    const data = getFeedbackData();
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      summary: getFeedbackSummary(),
      consolidatedFeedback: data.consolidated,
      legacyFeedback: data.legacy
    };

    let content, mimeType, extension;
    
    if (format === 'csv') {
      // Convert to CSV
      const headers = ['timestamp', 'type', 'rating', 'milestone', 'comments'];
      const rows = [headers];
      
      data.consolidated.forEach(feedback => {
        rows.push([
          new Date(feedback.timestamp).toISOString(),
          'consolidated',
          feedback.overallRating || '',
          feedback.milestone || '',
          (feedback.comments?.general || '').replace(/,/g, ';')
        ]);
      });
      
      data.legacy.forEach(feedback => {
        rows.push([
          new Date(feedback.timestamp).toISOString(),
          'legacy',
          feedback.rating || '',
          feedback.category || '',
          (feedback.comment || '').replace(/,/g, ';')
        ]);
      });
      
      content = rows.map(row => row.map(cell => '"' + cell + '"').join(',')).join('\\n');
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = JSON.stringify(exportData, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qnce-feedback-internal-' + new Date().toISOString().split('T')[0] + '.' + extension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('📥 Exported feedback data as ' + format.toUpperCase());
  };

  const clearFeedbackData = () => {
    const confirmed = confirm('⚠️  DANGER: This will permanently delete ALL feedback data. Are you sure?');
    if (confirmed) {
      localStorage.removeItem('qnce_consolidated_feedback');
      localStorage.removeItem('qnce_user_feedback');
      localStorage.removeItem('qnce_feedback_data');
      console.log('🗑️  All feedback data cleared');
    }
  };

  // Create global access object for development team
  window.QNCE_INTERNAL = {
    feedback: {
      getData: getFeedbackData,
      getSummary: getFeedbackSummary,
      export: exportFeedbackData,
      clear: clearFeedbackData
    },
    
    // Quick access functions
    summary: () => {
      const summary = getFeedbackSummary();
      console.log('📊 QNCE Feedback Summary:');
      console.log('========================');
      Object.entries(summary).forEach(([key, value]) => {
        console.log(\`\${key}: \${value}\`);
      });
      console.log('');
      return summary;
    },
    
    data: () => {
      const data = getFeedbackData();
      console.log('� Raw Feedback Data:');
      console.log('====================');
      console.log(\`Consolidated entries: \${data.consolidated.length}\`);
      console.log(\`Legacy entries: \${data.legacy.length}\`);
      console.log('');
      if (data.total > 0) {
        console.log('Use QNCE_INTERNAL.export() to download full data');
      } else {
        console.log('No feedback data collected yet');
      }
      return data;
    },
    
    export: (format = 'json') => exportFeedbackData(format),
    
    help: () => {
      console.log(\`
🔐 QNCE INTERNAL FEEDBACK ACCESS

📊 Data Access:
   QNCE_INTERNAL.summary()          - View summary table
   QNCE_INTERNAL.data()             - View all raw data
   QNCE_INTERNAL.feedback.getData() - Get structured data object

📥 Export:
   QNCE_INTERNAL.export()           - Download as JSON
   QNCE_INTERNAL.export('csv')      - Download as CSV
   QNCE_INTERNAL.feedback.export()  - Same as above

🗑️  Management:
   QNCE_INTERNAL.feedback.clear()   - Clear all data (DANGER!)

⚠️  IMPORTANT: This tool is for internal development use only!
   Do not share access methods with public users.
      \`);
    }
  };

  console.log('✅ QNCE Internal Feedback Access loaded!');
  console.log('📋 Type QNCE_INTERNAL.help() for commands');
  console.log('⚠️  Remember: This is for development team use only!');
})();
`;

console.log('🔐 QNCE Internal Feedback Data Access Tool');
console.log('==========================================');
console.log('');
console.log('This tool provides access to collected feedback data for the development team.');
console.log('');
console.log('🚨 IMPORTANT: This should NOT be included in public builds!');
console.log('');
console.log('Usage:');
console.log('1. Open the QNCE app in a browser');
console.log('2. Open Developer Tools (F12)');
console.log('3. Go to Console tab');
console.log('4. Copy and paste the script below:');
console.log('');
console.log('=== COPY FROM HERE ===');
console.log(feedbackDataAccessScript);
console.log('=== COPY TO HERE ===');
console.log('');
console.log('5. After running the script, use these commands:');
console.log('   • QNCE_INTERNAL.help()     - Show all commands');
console.log('   • QNCE_INTERNAL.summary()  - View feedback summary');
console.log('   • QNCE_INTERNAL.data()     - View all feedback data');
console.log('   • QNCE_INTERNAL.export()   - Download as JSON');
console.log('   • QNCE_INTERNAL.export("csv") - Download as CSV');
console.log('');
console.log('🔒 Security Note:');
console.log('   This tool accesses data stored in browser localStorage.');
console.log('   Data is only accessible from the same domain.');
console.log('   No sensitive personal information is collected.');
console.log('');
console.log('📊 Data Types Collected:');
console.log('   • User ratings (1-5 stars)');
console.log('   • Feedback comments');
console.log('   • Milestone triggers (when feedback was shown)');
console.log('   • Session metadata (duration, choice count)');
console.log('   • Quick response selections');
console.log('');
console.log('⚠️  DO NOT include this tool in public releases!');
