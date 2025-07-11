import React from 'react';

interface StateDebugOverlayProps {
  nodeId: string;
  flags: Record<string, boolean | number | string>;
  history: string[];
  className?: string;
}

const StateDebugOverlay: React.FC<StateDebugOverlayProps> = ({ nodeId, flags, history, className = '' }) => (
  <div id="debug-panel" className={`fixed top-2.5 left-2.5 bg-gray-100 bg-opacity-90 text-xs text-gray-800 p-2 rounded border border-gray-300 z-50 max-w-xs shadow transition-opacity ${className}`}>
    <div className="font-bold mb-1">[Debug] QNCE State</div>
    <div><span className="font-semibold">Node:</span> {nodeId}</div>
    <div className="font-semibold mt-1">Flags:</div>
    <pre className="whitespace-pre-wrap break-all">{JSON.stringify(flags, null, 2)}</pre>
    <div className="font-semibold mt-1">History:</div>
    <pre className="whitespace-pre-wrap break-all">{JSON.stringify(history)}</pre>
  </div>
);

export default StateDebugOverlay;
