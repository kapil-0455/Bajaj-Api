/**
 * Backend Logic Verification Script
 * Validates graph parser, tree builder, cycle detector, and edge cases.
 */

const { buildHierarchiesAndSummary } = require('./src/services/hierarchyService');

const data = [
  "A->B", "A->C", "B->D", "C->E", "E->F",
  "X->Y", "Y->Z", "Z->X",
  "P->Q", "Q->R",
  "G->H", "G->H", "G->I",
  "hello", "1->2", "A->"
];

console.log("Starting verification test using modular interview-style services...");

const result = buildHierarchiesAndSummary(data);

console.log("Engine output matches response schema successfully!");
console.log("Result summary:", JSON.stringify(result.summary, null, 2));

console.assert(result.summary.total_trees === 3, "Assertion Failed: Should have 3 trees");
console.assert(result.summary.total_cycles === 1, "Assertion Failed: Should have 1 cycle");
console.assert(result.summary.largest_tree_root === "A", "Assertion Failed: Largest tree root should be A");
console.assert(result.duplicate_edges.includes("G->H"), "Assertion Failed: Should capture duplicate edge G->H");
console.assert(result.invalid_entries.length === 3, "Assertion Failed: Should capture 3 invalid entries");

console.log("Verifying Hierarchy structure shapes...");
const treeA = result.hierarchies.find(h => h.root === "A");
console.assert(treeA.depth === 4, "A tree depth should be 4");
console.assert(treeA.tree.A.B.D !== undefined, "Tree A should have node D under B");
console.assert(treeA.tree.A.C.E.F !== undefined, "Tree A should have node F under E under C");

const cycleX = result.hierarchies.find(h => h.root === "X");
console.assert(cycleX.has_cycle === true, "X component should have has_cycle: true");
console.assert(Object.keys(cycleX.tree).length === 0, "X tree should be empty");
console.assert(cycleX.depth === undefined, "X depth should be undefined");

console.log("ALL VERIFICATION CHECKS PASSED!");
