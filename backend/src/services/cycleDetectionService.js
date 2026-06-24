function hasCycleInComponent(nodes, adjacencyList) {
  const visited = new Set();
  const pathVisited = new Set();
  let cycleFound = false;

  function dfs(node) {
    visited.add(node);
    pathVisited.add(node);

    const neighbors = adjacencyList[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
        if (cycleFound) return;
      } else if (pathVisited.has(neighbor)) {
        cycleFound = true;
        return;
      }
    }

    pathVisited.delete(node);
  }

  for (const node of nodes) {
    if (!visited.has(node)) {
      dfs(node);
      if (cycleFound) return true;
    }
  }

  return false;
}

module.exports = { hasCycleInComponent };
