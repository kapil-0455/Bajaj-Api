const { validateEdges } = require('./validationService');
const { filterDuplicates } = require('./duplicateService');
const { buildGraph } = require('./graphBuilderService');
const { findComponents } = require('./componentService');
const { hasCycleInComponent } = require('./cycleDetectionService');
const { buildTreeRecursive } = require('./treeBuilderService');
const { calculateDepth } = require('./depthService');
const { generateSummary } = require('./summaryService');

function buildHierarchiesAndSummary(data) {
  const { validRaw, invalid } = validateEdges(data);

  const { unique, duplicates } = filterDuplicates(validRaw);

  const { parentMap, adjacencyList, allNodes } = buildGraph(unique);

  const components = findComponents(allNodes, adjacencyList);

  const nodeFirstIdx = {};
  data.forEach((entry, idx) => {
    if (typeof entry !== 'string') return;
    const trimmed = entry.trim();
    const match = trimmed.match(/^([A-Z])->([A-Z])$/);
    if (match) {
      const [_, parent, child] = match;
      if (nodeFirstIdx[parent] === undefined) nodeFirstIdx[parent] = idx;
      if (nodeFirstIdx[child] === undefined) nodeFirstIdx[child] = idx;
    }
  });

  components.forEach(comp => {
    comp.minInputIdx = Math.min(...comp.map(n => nodeFirstIdx[n] ?? Infinity));
  });
  components.sort((a, b) => a.minInputIdx - b.minInputIdx);

  const hierarchies = [];
  components.forEach(compNodes => {
    const hasCycle = hasCycleInComponent(compNodes, adjacencyList);
    const componentRoots = compNodes.filter(node => parentMap[node] === undefined);

    if (!hasCycle && componentRoots.length > 0) {
      const root = componentRoots.sort()[0];
      hierarchies.push({
        root: root,
        tree: { [root]: buildTreeRecursive(root, adjacencyList) },
        depth: calculateDepth(root, adjacencyList)
      });
    } else {
      const root = [...compNodes].sort()[0];
      hierarchies.push({
        root: root,
        tree: {},
        has_cycle: true
      });
    }
  });

  const summary = generateSummary(hierarchies);

  return {
    hierarchies,
    invalid_entries: invalid,
    duplicate_edges: duplicates,
    summary
  };
}

module.exports = { buildHierarchiesAndSummary };
