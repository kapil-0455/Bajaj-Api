import React from 'react';

export default function SummaryCard({ summary }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="border border-gray-200 p-2 rounded">
        <div className="text-xs text-gray-500">Trees</div>
        <div className="text-lg font-bold">{summary.total_trees}</div>
      </div>
      <div className="border border-gray-200 p-2 rounded">
        <div className="text-xs text-gray-500">Cycles</div>
        <div className="text-lg font-bold text-red-600">{summary.total_cycles}</div>
      </div>
      <div className="border border-gray-200 p-2 rounded">
        <div className="text-xs text-gray-500">Deepest</div>
        <div className="text-lg font-bold text-blue-600">{summary.largest_tree_root || "None"}</div>
      </div>
    </div>
  );
}
