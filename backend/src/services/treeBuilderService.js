function buildTreeRecursive(root, adjacencyList) {
  const treeObj = {};
  const children = adjacencyList[root] || [];
  
  const sortedChildren = [...children].sort();
  sortedChildren.forEach(child => {
    treeObj[child] = buildTreeRecursive(child, adjacencyList);
  });
  
  return treeObj;
}

module.exports = { buildTreeRecursive };
