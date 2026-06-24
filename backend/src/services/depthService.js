function calculateDepth(root, adjacencyList) {
  const children = adjacencyList[root] || [];
  if (children.length === 0) {
    return 1;
  }

  let maxChildDepth = 0;
  children.forEach(child => {
    maxChildDepth = Math.max(maxChildDepth, calculateDepth(child, adjacencyList));
  });

  return 1 + maxChildDepth;
}

module.exports = { calculateDepth };
