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
          <div key={idx} className="h-16 bg-[#F1EEE7] rounded-md w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[200px] ${className}`}>
      <div className="w-8 h-8 border-2 border-[#E8E4DC] border-t-[#292A26] rounded-full animate-spin mb-3" />
      <p className="text-xs uppercase tracking-wider text-[#77766F] font-medium">{text}</p>
    </div>
  );
}
