import { forgottenTruth } from './src/narratives/forgottenTruth/forgottenTruth';

// Test to verify all nodeId references are valid
function validateNodeReferences() {
  const allNodes = forgottenTruth.nodes;
  const nodeIds = new Set(allNodes.map(node => node.nodeId));
  const missingNodes = [];
  
  console.log(`Total nodes: ${allNodes.length}`);
  console.log(`Unique nodeIds: ${nodeIds.size}`);
  
  // Check all choice references
  allNodes.forEach(node => {
    if (node.choices) {
      node.choices.forEach(choice => {
        if (!nodeIds.has(choice.nextNodeId)) {
          missingNodes.push(`${node.nodeId} -> ${choice.nextNodeId}`);
        }
      });
    }
  });
  
  if (missingNodes.length > 0) {
    console.error('Missing node references:');
    missingNodes.forEach(ref => console.error(ref));
  } else {
    console.log('All node references are valid!');
  }
  
  return missingNodes;
}

validateNodeReferences();
