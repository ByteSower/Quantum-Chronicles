import { useState, useEffect } from 'react';
import { feedbackDataAccess } from '../utils/FeedbackDataAccess';
import type { FeedbackSummary } from '../utils/FeedbackDataAccess';

interface FeedbackDataPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export function FeedbackDataPanel({ isVisible, onClose }: FeedbackDataPanelProps) {
  const [summary, setSummary] = useState<FeedbackSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'export' | 'analytics'>('summary');

  useEffect(() => {
    if (isVisible) {
      setSummary(feedbackDataAccess.getFeedbackSummary());
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleExport = (format: 'json' | 'csv') => {
    feedbackDataAccess.downloadFeedbackData(format);
  };

  const handleViewInConsole = (type: 'data' | 'analytics') => {
    if (type === 'data') {
      const data = {
        consolidated: feedbackDataAccess.getAllConsolidatedFeedback(),
        legacy: feedbackDataAccess.getAllLegacyFeedback()
      };
      console.log('📊 Feedback Data:', data);
    } else {
      const analytics = feedbackDataAccess.getAnalytics();
      console.log('📈 Feedback Analytics:', analytics);
    }
    alert(`${type === 'data' ? 'Feedback data' : 'Analytics'} logged to browser console (F12 → Console)`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">📊 Feedback Data Access</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
              aria-label="Close feedback data panel"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'summary', label: '📋 Summary', icon: '📋' },
            { id: 'export', label: '📥 Export', icon: '📥' },
            { id: 'analytics', label: '📈 Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'summary' && summary && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Total Submissions</h3>
                  <p className="text-2xl font-bold text-blue-600">{summary.totalSubmissions}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Average Rating</h3>
                  <p className="text-2xl font-bold text-green-600">{summary.averageRating}/5</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Consolidated Feedback</h3>
                  <p className="text-xl font-bold text-purple-600">{summary.consolidatedCount}</p>
                  <p className="text-sm text-purple-600">New system</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Legacy Feedback</h3>
                  <p className="text-xl font-bold text-orange-600">{summary.legacyCount}</p>
                  <p className="text-sm text-orange-600">Old system</p>
                </div>
              </div>

              {Object.keys(summary.milestoneBreakdown).length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Milestone Breakdown</h3>
                  <div className="space-y-1">
                    {Object.entries(summary.milestoneBreakdown).map(([milestone, count]) => (
                      <div key={milestone} className="flex justify-between">
                        <span className="text-sm text-gray-600">{milestone}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {summary.timeRange.first && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Time Range</h3>
                  <p className="text-sm text-gray-600">
                    <strong>First:</strong> {summary.timeRange.first.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Last:</strong> {summary.timeRange.last?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Download Feedback Data</h3>
                <p className="text-gray-600 mb-6">
                  Export all collected feedback data for analysis or backup
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleExport('json')}
                  className="flex flex-col items-center p-6 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-3xl mb-2">📄</div>
                  <h4 className="font-semibold text-blue-800">Download JSON</h4>
                  <p className="text-sm text-gray-600 text-center">
                    Structured data with full details and analytics
                  </p>
                </button>

                <button
                  onClick={() => handleExport('csv')}
                  className="flex flex-col items-center p-6 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-green-800">Download CSV</h4>
                  <p className="text-sm text-gray-600 text-center">
                    Spreadsheet format for Excel/Google Sheets
                  </p>
                </button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">View in Browser Console</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleViewInConsole('data')}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                  >
                    🔍 View Raw Data
                  </button>
                  <button
                    onClick={() => handleViewInConsole('analytics')}
                    className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
                  >
                    📈 View Analytics
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Open browser console (F12) to see detailed output
                </p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Detailed insights into feedback patterns and effectiveness
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">📈 Available Analytics</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Submission trends over time</li>
                  <li>• Rating distribution patterns</li>
                  <li>• Milestone effectiveness analysis</li>
                  <li>• Quick response pattern analysis</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleViewInConsole('analytics')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  📊 View Full Analytics in Console
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Analytics data will be logged to browser console for detailed analysis
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> Use browser console commands for more options
            </p>
            <code className="text-xs bg-gray-200 px-2 py-1 rounded">
              qnceFeedbackAccess.help()
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
