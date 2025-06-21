// Analytics Dashboard for Development - Shows what events are being tracked
import React, { useState, useEffect } from 'react';

interface AnalyticsEvent {
  timestamp: string;
  action: string;
  category: string;
  label?: string;
  value?: number;
  parameters?: Record<string, any>;
}

const AnalyticsDebugPanel: React.FC = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Override console.log to capture analytics events in development
    if (import.meta.env.DEV) {
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        if (args[0] === '📊 Analytics Event:') {
          const event = args[1];
          setEvents(prev => [{
            timestamp: new Date().toLocaleTimeString(),
            action: event.action,
            category: event.category,
            label: event.label,
            value: event.value,
            parameters: event.custom_parameters
          }, ...prev.slice(0, 49)]); // Keep last 50 events
        }
        originalLog.apply(console, args);
      };

      return () => {
        console.log = originalLog;
      };
    }
  }, []);

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-mono hover:bg-indigo-700 transition-colors"
        title="Toggle Analytics Debug Panel"
      >
        📊 {events.length}
      </button>

      {/* Analytics panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 w-96 h-96 bg-gray-900 border border-indigo-500 rounded-lg z-50 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <h3 className="text-white text-sm font-bold">📊 Analytics Events</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setEvents([])}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {events.length === 0 ? (
              <div className="text-gray-500 text-xs text-center mt-8">
                No events tracked yet.<br />
                Interact with the story to see analytics.
              </div>
            ) : (
              events.map((event, index) => (
                <div key={index} className="bg-gray-800 rounded p-2 text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-indigo-300 font-mono">{event.action}</span>
                    <span className="text-gray-500">{event.timestamp}</span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-purple-300">{event.category}</span>
                    {event.label && <span className="text-gray-500"> → {event.label}</span>}
                    {event.value !== undefined && <span className="text-yellow-300"> ({event.value})</span>}
                  </div>
                  {event.parameters && (
                    <div className="mt-1 text-gray-400 text-xs">
                      {Object.entries(event.parameters).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="truncate">
                          {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyticsDebugPanel;
