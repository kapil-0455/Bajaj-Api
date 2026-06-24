import React from 'react';

export default function Header({ response }) {
  return (
    <header className="border-b border-gray-200 pb-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Chitkara Full Stack Challenge</h1>
      <p className="text-sm text-gray-500">Round 1: Graph-Tree validator and cycle detector</p>
      
      {response && (
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4 text-xs text-gray-600">
          <p><strong>User ID:</strong> {response.user_id}</p>
          <p><strong>Email ID:</strong> {response.email_id}</p>
          <p><strong>College Roll Number:</strong> {response.college_roll_number}</p>
        </div>
      )}
    </header>
  );
}
