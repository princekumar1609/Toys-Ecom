import React from 'react';

export default function LoadingState({
  text = 'Loading content...',
  type = 'spinner',
  count = 3,
  className = '',
}) {
  if (type === 'skeleton') {
    return (
      <div className={`space-y-4 w-full animate-pulse ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="h-16 bg-gray-200 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[200px] ${className}`}>
      <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
}
