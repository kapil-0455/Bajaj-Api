import React from 'react';

export default function TreeView({ label, childrenObj }) {
  const childKeys = Object.keys(childrenObj || {});
  return (
    <div className="pl-4 border-l-2 border-gray-300 my-1">
      <span className="font-semibold text-gray-800">{label}</span>
      {childKeys.length > 0 && (
        <div className="space-y-1 mt-1">
          {childKeys.map(childKey => (
            <TreeView 
              key={childKey} 
              label={childKey} 
              childrenObj={childrenObj[childKey]} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
