// QNCE Internal Feedback Access - Clean Console Version
// Copy and paste this script into the browser console

(function() {
  console.clear();
  console.log('🔐 QNCE Internal Feedback Access');
  console.log('================================');
  
  // Get feedback data
  const getFeedbackData = () => {
    try {
      const consolidated = JSON.parse(localStorage.getItem('qnce_consolidated_feedback') || '[]');
      const legacy = JSON.parse(localStorage.getItem('qnce_user_feedback') || '[]');
      return { consolidated, legacy, total: consolidated.length + legacy.length };
    } catch (error) {
      console.error('❌ Error accessing data:', error);
      return { consolidated: [], legacy: [], total: 0 };
    }
  };

  // Export function
  const exportData = (format = 'json') => {
    const data = getFeedbackData();
    if (data.total === 0) {
      console.log('⚠️  No feedback data to export');
      return;
    }

    const exportData = {
      exportTimestamp: new Date().toISOString(),
      summary: {
        total: data.total,
        consolidated: data.consolidated.length,
        legacy: data.legacy.length
      },
      consolidatedFeedback: data.consolidated,
      legacyFeedback: data.legacy
    };

    let content, mimeType, extension;
    if (format === 'csv') {
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
      
      content = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
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
    link.download = `qnce-feedback-${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`📥 Downloaded: qnce-feedback-${new Date().toISOString().split('T')[0]}.${extension}`);
  };

  // Check current data
  const data = getFeedbackData();
  
  console.log('📊 Current Status:');
  console.log(`   Total submissions: ${data.total}`);
  console.log(`   Consolidated: ${data.consolidated.length}`);
  console.log(`   Legacy: ${data.legacy.length}`);
  console.log('');
  
  if (data.total > 0) {
    // Calculate average rating
    const allRatings = [
      ...data.consolidated.filter(f => f.overallRating).map(f => f.overallRating),
      ...data.legacy.filter(f => f.rating).map(f => f.rating)
    ];
    
    if (allRatings.length > 0) {
      const avgRating = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
      console.log(`⭐ Average rating: ${avgRating.toFixed(2)}/5`);
    }
    
    // Show recent milestones
    const recentMilestones = data.consolidated
      .filter(f => f.milestone)
      .map(f => f.milestone)
      .slice(-3);
    
    if (recentMilestones.length > 0) {
      console.log(`🎯 Recent milestones: ${recentMilestones.join(', ')}`);
    }
    
    console.log('');
    console.log('📥 Download options:');
    console.log('   exportJSON() - Download as JSON file');
    console.log('   exportCSV()  - Download as CSV file');
    
    // Global functions
    window.exportJSON = () => exportData('json');
    window.exportCSV = () => exportData('csv');
    
  } else {
    console.log('ℹ️  No feedback data collected yet');
    console.log('   Users need to interact with the app and provide feedback');
  }
  
  console.log('');
  console.log('🔍 To view detailed data, check localStorage:');
  console.log('   qnce_consolidated_feedback');
  console.log('   qnce_user_feedback');
  
})();
