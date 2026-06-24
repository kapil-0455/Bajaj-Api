function buildGraph(uniqueEdges) {
  const parentMap = {};
  const adjacencyList = {};
  const allNodes = new Set();

  uniqueEdges.forEach(edge => {
    const { parent, child } = edge;
    allNodes.add(parent);
    allNodes.add(child);

    if (parentMap[child] !== undefined) {
      return;
    }
    parentMap[child] = parent;

    if (!adjacencyList[parent]) {
      adjacencyList[parent] = [];
    }
    adjacencyList[parent].push(child);
  });

  return { parentMap, adjacencyList, allNodes: Array.from(allNodes) };
}

module.exports = { buildGraph };
