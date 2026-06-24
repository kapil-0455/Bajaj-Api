function generateSummary(hierarchies) {
  let totalTrees = 0;
  let totalCycles = 0;
  let largestTreeRoot = "";
  let maxDepth = -1;

  hierarchies.forEach(h => {
    if (h.has_cycle) {
      totalCycles++;
    } else {
      totalTrees++;
      if (h.depth > maxDepth) {
        maxDepth = h.depth;
        largestTreeRoot = h.root;
      } else if (h.depth === maxDepth) {
        if (h.root < largestTreeRoot || largestTreeRoot === "") {
          largestTreeRoot = h.root;
        }
      }
    }
  });

  return {
    total_trees: totalTrees,
    total_cycles: totalCycles,
    largest_tree_root: largestTreeRoot
  };
}

module.exports = { generateSummary };
