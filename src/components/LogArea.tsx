import React from 'react';

export interface LogEntry {
  message: string;
  type: 'good' | 'bad' | 'info' | 'neutral';
}

const colorMap = {
  good: 'text-green-500',
  bad: 'text-red-500',
  info: 'text-gray-400',
  neutral: 'text-blue-400',
};

const LogArea: React.FC<{ logs: LogEntry[] }> = ({ logs }) => (
  <div className="log-area w-full max-w-md mt-6 bg-gray-900 rounded-lg p-4 shadow-inner min-h-[60px]">
    <div className="text-xs font-mono space-y-1">
      {logs.map((log, idx) => (
        <div key={idx} className={colorMap[log.type] || colorMap.info}>
          {log.message}
        </div>
      ))}
    </div>
  </div>
);

export default LogArea;
