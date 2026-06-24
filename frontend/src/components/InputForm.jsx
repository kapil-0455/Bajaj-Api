import React from 'react';

export default function InputForm({
  rawInput,
  setRawInput,
  apiUrl,
  setApiUrl,
  handleSubmit,
  loading,
  loadPreset
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1">Graph Edges:</label>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder='["A->B", "A->C"]'
        />
      </div>

      <div className="space-x-2">
        <button 
          onClick={() => loadPreset('mix')} 
          className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 rounded text-gray-700"
        >
          Complex Mix
        </button>
        <button 
          onClick={() => loadPreset('simple')} 
          className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 rounded text-gray-700"
        >
          Simple Tree
        </button>
        <button 
          onClick={() => loadPreset('cycle')} 
          className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-1 rounded text-gray-700"
        >
          Only Cycle
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">API Endpoint URL:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-xs font-mono focus:outline-none"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-sm disabled:bg-blue-300"
      >
        {loading ? "Analyzing..." : "Submit Analysis"}
      </button>
    </div>
  );
}
