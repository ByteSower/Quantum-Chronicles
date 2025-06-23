import React, { useState, useMemo } from 'react';

interface BranchNode {
  id: string;
  title: string;
  isVisited: boolean;
  isCurrent: boolean;
  isAvailable: boolean;
  position: { x: number; y: number };
  connections: string[];
}

interface VisualBranchTrackerProps {
  nodes: BranchNode[];
  selectedPath: string[];
  onNodeSelect?: (nodeId: string) => void;
  className?: string;
}

const VisualBranchTracker: React.FC<VisualBranchTrackerProps> = ({
  nodes,
  selectedPath,
  onNodeSelect,
  className = ''
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  const { svgWidth, svgHeight, nodeSpacing } = useMemo(() => {
    if (nodes.length === 0) return { svgWidth: 800, svgHeight: 400, nodeSpacing: { x: 150, y: 100 } };
    
    const allX = nodes.map(n => n.position.x);
    const allY = nodes.map(n => n.position.y);
    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);
    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    
    const width = Math.max(1200, maxX - minX + 200);
    const height = Math.max(600, maxY - minY + 200);
    
    const spacing = {
      x: Math.max(180, width / Math.max(1, Math.ceil(Math.sqrt(nodes.length)))),
      y: Math.max(120, height / Math.max(1, Math.ceil(nodes.length / 6)))
    };
    
    return { svgWidth: width, svgHeight: height, nodeSpacing: spacing };
  }, [nodes]);

  const getNodeColor = useMemo(() => (node: BranchNode, isHovered: boolean = false) => {
    if (node.isCurrent) return isHovered ? '#a855f7' : '#8b5cf6';
    if (node.isVisited) return isHovered ? '#6366f1' : '#4f46e5';
    if (node.isAvailable) return isHovered ? '#7c3aed' : '#6366f1';
    return isHovered ? '#4b5563' : '#374151';
  }, []);

  const getConnectionColor = useMemo(() => (sourceNode: BranchNode, targetNode: BranchNode) => {
    const isActiveConnection = selectedPath.includes(sourceNode.id) && selectedPath.includes(targetNode.id);
    const isVisitedConnection = sourceNode.isVisited && targetNode.isVisited;
    const isFromCurrent = sourceNode.isCurrent;
    
    if (isActiveConnection) return '#a855f7';
    if (isFromCurrent) return '#06b6d4';
    if (isVisitedConnection) return '#64748b';
    return '#374151';
  }, [selectedPath]);

  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.connections.map(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return null;

        const connectionColor = getConnectionColor(node, target);
        const isActiveConnection = selectedPath.includes(node.id) && selectedPath.includes(target.id);
        const isFromCurrent = node.isCurrent;

        return (
          <g key={`${node.id}-${targetId}`}>
            <line
              x1={node.position.x}
              y1={node.position.y}
              x2={target.position.x}
              y2={target.position.y}
              stroke={connectionColor}
              strokeWidth={isActiveConnection ? 4 : (isFromCurrent ? 3 : 2)}
              strokeDasharray={target.isVisited ? 'none' : '8,4'}
              className="transition-all duration-500 ease-in-out"
              style={{
                filter: isActiveConnection ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' : 'none',
                opacity: isActiveConnection ? 1 : 0.7
              }}
            />
            <polygon
              points={`${target.position.x - 8},${target.position.y - 4} ${target.position.x},${target.position.y} ${target.position.x - 8},${target.position.y + 4}`}
              fill={connectionColor}
              className="transition-all duration-300"
              style={{
                filter: isActiveConnection ? 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.8))' : 'none'
              }}
            />
          </g>
        );
      }).filter(Boolean)
    );
  };

  const renderNodes = () => {
    return nodes.map(node => {
      const isSelected = selectedPath.includes(node.id);
      const isHovered = hoveredNode === node.id;
      const nodeColor = getNodeColor(node, isHovered);
      
      const textOffset = 45;
      const maxTextWidth = Math.min(nodeSpacing.x * 0.8, 120);
      
      return (
        <g 
          key={node.id} 
          className="cursor-pointer group"
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {(node.isCurrent || isHovered) && (
            <circle
              cx={node.position.x}
              cy={node.position.y}
              r={node.isCurrent ? 28 : 24}
              fill="none"
              stroke={node.isCurrent ? '#a855f7' : '#06b6d4'}
              strokeWidth="2"
              className="opacity-60"
              style={{ filter: 'blur(4px)' }}
            />
          )}
          <circle
            cx={node.position.x}
            cy={node.position.y}
            r={node.isCurrent ? 18 : 14}
            fill={nodeColor}
            stroke={isSelected ? '#c084fc' : (isHovered ? '#06b6d4' : '#1f2937')}
            strokeWidth={isSelected ? 4 : (isHovered ? 3 : 2)}
            className="transition-all duration-300 ease-in-out"
            onClick={() => onNodeSelect && onNodeSelect(node.id)}
            style={{
              filter: node.isCurrent ? 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.8))' : 
                      isHovered ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' : 'none',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transformOrigin: 'center'
            }}
          />
          {node.isVisited && !node.isCurrent && (
            <circle
              cx={node.position.x + 8}
              cy={node.position.y - 8}
              r="4"
              fill="#10b981"
              className="transition-opacity duration-300"
            />
          )}
          <foreignObject
            x={node.position.x - maxTextWidth / 2}
            y={node.position.y + textOffset}
            width={maxTextWidth}
            height="60"
            className="pointer-events-none"
          >
            <div 
              className="text-center text-xs font-medium transition-all duration-300 p-1 rounded"
              style={{
                fontSize: isHovered ? '12px' : '10px',
                color: isHovered ? '#ffffff' : '#cbd5e1',
                backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                filter: isHovered ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' : 'none'
              }}
            >
              {node.title}
            </div>
          </foreignObject>
          {node.isCurrent && (
            <>
              <circle
                cx={node.position.x}
                cy={node.position.y}
                r="25"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1"
                strokeDasharray="4,4"
                className="opacity-70"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              <circle
                cx={node.position.x}
                cy={node.position.y}
                r="30"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1"
                strokeDasharray="2,6"
                className="opacity-50"
                style={{ animation: 'spin 30s linear infinite reverse' }}
              />
            </>
          )}
        </g>
      );
    });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.3));
  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className={`visual-branch-tracker relative ${className}`}>
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <span className="mr-2">🌌</span>
            Quantum Narrative Map
          </h3>
          <div className="text-xs text-gray-400">
            {nodes.filter(n => n.isVisited).length} / {nodes.length} nodes explored
          </div>
        </div>
        
        <div className="overflow-x-auto overflow-y-auto max-h-96 border border-gray-600 rounded bg-gray-950">
          <svg 
            width={svgWidth} 
            height={svgHeight} 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto"
            style={{ minHeight: '400px', transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <g transform={`translate(${panOffset.x}, ${panOffset.y})`}>
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1f2937" strokeWidth="1" opacity="0.3"/>
                </pattern>
                <radialGradient id="quantumField" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#312e81" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0f0f23" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#quantumField)" />
              <rect width="100%" height="100%" fill="url(#grid)" />
              <g className="connections">{renderConnections()}</g>
              <g className="nodes">{renderNodes()}</g>
            </g>
          </svg>
        </div>
        
        <div className="absolute top-16 right-6 flex flex-col gap-2">
          <button onClick={handleZoomIn} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs">+</button>
          <button onClick={handleZoomOut} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs">-</button>
          <button onClick={handleResetView} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs">Reset</button>
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>Current</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>Visited</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>Available</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>Locked</div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default VisualBranchTracker;
export type { BranchNode };
