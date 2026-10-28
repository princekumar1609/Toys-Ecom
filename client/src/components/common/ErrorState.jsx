import React from 'react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-[#E8E4DC] my-6 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-[#C98268]/15 border border-[#C98268]/30 flex items-center justify-center text-[#C98268] mb-3 font-serif text-lg">
        !
      </div>
      <h3 className="text-base font-medium text-[#292A26] mb-1">{title}</h3>
      <p className="text-xs text-[#77766F] max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm">
          Try Again
        </Button>
      )}
    </div>
  );
}
