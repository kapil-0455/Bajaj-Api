function findComponents(allNodes, adjacencyList) {
  const undirected = {};
  allNodes.forEach(node => {
    undirected[node] = [];
  });

  Object.keys(adjacencyList).forEach(parent => {
    adjacencyList[parent].forEach(child => {
      undirected[parent].push(child);
      undirected[child].push(parent);
    });
  });

  const visited = new Set();
  const components = [];

  allNodes.forEach(node => {
    if (!visited.has(node)) {
      const comp = [];
      const queue = [node];
      visited.add(node);

      while (queue.length > 0) {
        const curr = queue.shift();
        comp.push(curr);

        const neighbors = undirected[curr] || [];
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      components.push(comp);
    }
  });

  return components;
}

module.exports = { findComponents };
