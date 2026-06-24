import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ErrorMessage from './components/ErrorMessage';
import ResponseCard from './components/ResponseCard';
import { sendGraphRequest } from './services/api';

export default function App() {
  const [rawInput, setRawInput] = useState(`["A->B", "A->C", "B->D", "C->E", "E->F", "X->Y", "Y->Z", "Z->X", "P->Q", "Q->R", "G->H", "G->H", "G->I", "hello", "1->2", "A->"]`);
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL || 'http://localhost:5000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const parseEdges = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item));
      }
    } catch (e) {
      // Fallback
    }
    return trimmed
      .split(/[,\n;]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const parsedData = parseEdges(rawInput);

    if (parsedData.length === 0) {
      setError("Please enter at least one edge.");
      setLoading(false);
      return;
    }

    try {
      const responseData = await sendGraphRequest(apiUrl, parsedData);
      setResponse(responseData);
    } catch (err) {
      setError(err.message || "Failed to reach the API server.");
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (type) => {
    setError(null);
    if (type === 'mix') {
      setRawInput(`["A->B", "A->C", "B->D", "C->E", "E->F", "X->Y", "Y->Z", "Z->X", "P->Q", "Q->R", "G->H", "G->H", "G->I", "hello", "1->2", "A->"]`);
    } else if (type === 'simple') {
      setRawInput(`["A->B", "A->C", "B->D"]`);
    } else if (type === 'cycle') {
      setRawInput(`["X->Y", "Y->Z", "Z->X"]`);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <Header response={response} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <InputForm
              rawInput={rawInput}
              setRawInput={setRawInput}
              handleSubmit={handleSubmit}
              loading={loading}
              loadPreset={loadPreset}
            />

            <ErrorMessage message={error} />
          </div>

          <div>
            {!response && !loading && (
              <div className="border border-dashed border-gray-300 p-8 rounded text-center text-gray-400 text-sm">
                Enter edges and submit to see results.
              </div>
            )}

            {loading && (
              <div className="text-center py-8 text-gray-500 text-sm">
                Analyzing graph data...
              </div>
            )}

            {response && !loading && (
              <ResponseCard response={response} />
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
