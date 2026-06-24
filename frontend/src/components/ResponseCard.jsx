import React, { useState } from 'react';
import SummaryCard from './SummaryCard';
import TreeView from './TreeView';

export default function ResponseCard({ response }) {
  const [copied, setCopied] = useState(false);

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      <SummaryCard summary={response.summary} />

      <div>
        <h3 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">Parsed Hierarchies:</h3>
        {response.hierarchies.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No nodes detected.</p>
        ) : (
          <div className="space-y-4">
            {response.hierarchies.map((h, i) => (
              <div key={i} className="border border-gray-200 p-3 rounded bg-white">
                <div className="flex justify-between items-center text-xs border-b pb-1 mb-2">
                  <span>Root: <strong>{h.root}</strong></span>
                  {h.has_cycle ? (
                    <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">Cycle Detected</span>
                  ) : (
                    <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Depth: {h.depth}</span>
                  )}
                </div>

                {h.has_cycle ? (
                  <p className="text-xs text-gray-500">Component forms a closed cycle loop.</p>
                ) : (
                  <div className="text-xs">
                    <TreeView label={h.root} childrenObj={h.tree[h.root]} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <h4 className="font-bold mb-1">Invalid Entries ({response.invalid_entries.length}):</h4>
          {response.invalid_entries.length === 0 ? (
            <span className="text-gray-400 italic">None</span>
          ) : (
            <ul className="list-disc list-inside text-gray-650">
              {response.invalid_entries.map((entry, idx) => (
                <li key={idx}>"{entry}"</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4 className="font-bold mb-1">Duplicate Edges ({response.duplicate_edges.length}):</h4>
          {response.duplicate_edges.length === 0 ? (
            <span className="text-gray-400 italic">None</span>
          ) : (
            <ul className="list-disc list-inside text-gray-650">
              {response.duplicate_edges.map((edge, idx) => (
                <li key={idx}>{edge}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border border-gray-200 p-3 rounded bg-gray-50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold">API JSON Response:</span>
          <button 
            onClick={copyResponse}
            className="text-xs bg-white border border-gray-300 hover:bg-gray-100 px-2 py-0.5 rounded"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-[10px] font-mono p-2 bg-white border rounded overflow-x-auto max-h-40">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>

    </div>
  );
}
