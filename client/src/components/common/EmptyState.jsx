import React from 'react';
import Button from './Button';

export default function EmptyState({
  title = 'No items found',
  description = 'There is no data to display right now.',
  icon = '🧸',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center bg-white rounded-lg border border-[#E8E4DC] my-6 ${className}`}>
      <div className="text-4xl mb-3 text-[#A8B5A0]">{icon}</div>
      <h3 className="text-lg font-medium font-display text-[#292A26] mb-1.5">{title}</h3>
      <p className="text-xs text-[#77766F] max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="secondary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
