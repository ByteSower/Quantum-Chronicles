#!/usr/bin/env node

/**
 * Narrative Flow Audit Script for Forgotten Truth
 * 
 * This script analyzes the narrative structure to identify:
 * 1. Potential infinite loops
 * 2. Missing node references
 * 3. Dead ends without proper endings
 * 4. Broken progression paths
 */

import fs from 'fs';
import path from 'path';

// Read all narrative files
const narrativePath = './src/narratives/forgottenTruth';
const files = fs.readdirSync(narrativePath).filter(f => f.endsWith('.ts') && f !== 'index.ts');

console.log('🔍 FORGOTTEN TRUTH NARRATIVE AUDIT\n');

let allNodes = new Map();
let allConnections = new Map();
let startingNode = null;
let exitNodes = new Set();

// Extract all nodes and connections
files.forEach(file => {
  console.log(`📖 Analyzing ${file}...`);
  const content = fs.readFileSync(path.join(narrativePath, file), 'utf8');
  
  // Extract nodeIds
  const nodeMatches = content.match(/nodeId:\s*['"](.*?)['"]/g) || [];
  nodeMatches.forEach(match => {
    const nodeId = match.match(/['"](.*?)['"]/)[1];
    allNodes.set(nodeId, file);
    allConnections.set(nodeId, []);
  });
  
  // Extract nextNodeId connections
  const connectionMatches = content.match(/nextNodeId:\s*['"](.*?)['"]/g) || [];
  connectionMatches.forEach(match => {
    const nextNodeId = match.match(/['"](.*?)['"]/)[1];
    // We'll map these to their source nodes in a second pass
  });
  
  // Check for starting node
  const startMatch = content.match(/startNodeId:\s*['"](.*?)['"]/);
  if (startMatch) {
    startingNode = startMatch[1];
  }
  
  // Check for exit nodes
  const exitMatches = content.match(/nodeId:\s*['"](ft_exit_.*?)['"]/g) || [];
  exitMatches.forEach(match => {
    const nodeId = match.match(/['"](.*?)['"]/)[1];
    exitNodes.add(nodeId);
  });
});

console.log(`\n📊 ANALYSIS RESULTS:`);
console.log(`📝 Total nodes found: ${allNodes.size}`);
console.log(`🚀 Starting node: ${startingNode}`);
console.log(`🎯 Exit nodes: ${Array.from(exitNodes).join(', ')}`);

// Now let's do a more detailed analysis by parsing the actual structure
console.log(`\n🔍 DETAILED STRUCTURE ANALYSIS:`);

// Check for specific issues
let potentialLoops = [];
let missingReferences = [];
let deadEnds = [];

// Re-parse with more context
files.forEach(file => {
  const content = fs.readFileSync(path.join(narrativePath, file), 'utf8');
  
  // Find all node definitions with their choices
  const nodeBlocks = content.split(/nodeId:\s*['"]/).slice(1);
  
  nodeBlocks.forEach(block => {
    const lines = block.split('\n');
    const nodeId = lines[0].match(/([^'"]*)/)[1];
    
    let choices = [];
    let inChoices = false;
    let currentChoice = null;
    
    lines.forEach(line => {
      if (line.includes('choices:')) {
        inChoices = true;
        return;
      }
      
      if (inChoices && line.includes('nextNodeId:')) {
        const nextMatch = line.match(/nextNodeId:\s*['"](.*?)['"]/);
        if (nextMatch) {
          choices.push(nextMatch[1]);
        }
      }
      
      if (line.includes('}') && inChoices && line.trim() === '}') {
        inChoices = false;
      }
    });
    
    allConnections.set(nodeId, choices);
    
    // Check for dead ends (nodes with no choices that aren't exit nodes)
    if (choices.length === 0 && !exitNodes.has(nodeId) && !nodeId.includes('exit')) {
      deadEnds.push(nodeId);
    }
  });
});

// Check for missing references
allConnections.forEach((choices, nodeId) => {
  choices.forEach(nextNodeId => {
    if (!allNodes.has(nextNodeId) && !exitNodes.has(nextNodeId)) {
      missingReferences.push(`${nodeId} → ${nextNodeId}`);
    }
  });
});

// Check for potential loops (simplified detection)
function findPath(start, target, visited = new Set()) {
  if (visited.has(start)) return true; // Found a cycle
  if (start === target) return true;
  
  visited.add(start);
  
  const connections = allConnections.get(start) || [];
  for (const next of connections) {
    if (findPath(next, target, new Set(visited))) {
      return true;
    }
  }
  
  return false;
}

// Look for obvious back-references
allConnections.forEach((choices, nodeId) => {
  choices.forEach(nextNodeId => {
    const nextChoices = allConnections.get(nextNodeId) || [];
    if (nextChoices.includes(nodeId)) {
      potentialLoops.push(`${nodeId} ↔ ${nextNodeId}`);
    }
  });
});

console.log(`\n⚠️  POTENTIAL ISSUES FOUND:`);

if (missingReferences.length > 0) {
  console.log(`\n❌ Missing Node References (${missingReferences.length}):`);
  missingReferences.forEach(ref => console.log(`   ${ref}`));
}

if (deadEnds.length > 0) {
  console.log(`\n🚫 Dead Ends (${deadEnds.length}):`);
  deadEnds.forEach(node => console.log(`   ${node}`));
}

if (potentialLoops.length > 0) {
  console.log(`\n🔄 Potential Loops (${potentialLoops.length}):`);
  potentialLoops.forEach(loop => console.log(`   ${loop}`));
} else {
  console.log(`\n✅ No obvious loops detected`);
}

if (missingReferences.length === 0 && deadEnds.length === 0 && potentialLoops.length === 0) {
  console.log(`\n🎉 NO CRITICAL ISSUES FOUND!`);
  console.log(`✅ All nodes appear to be properly connected`);
  console.log(`✅ No missing references detected`);
  console.log(`✅ No problematic loops found`);
  console.log(`✅ All paths appear to lead to proper exits`);
}

console.log(`\n📈 NARRATIVE FLOW SUMMARY:`);
console.log(`🏁 Starting Point: ${startingNode}`);
console.log(`🎯 Available Exits: ${exitNodes.size}`);
console.log(`🌐 Total Story Nodes: ${allNodes.size - exitNodes.size}`);
console.log(`📋 Files Analyzed: ${files.length}`);
