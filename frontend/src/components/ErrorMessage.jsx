import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs">
      {message}
    </div>
  );
}
