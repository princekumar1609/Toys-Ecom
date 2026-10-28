import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-md',
  className = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292A26]/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-lg shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-left border border-[#E8E4DC] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-[#E8E4DC] px-6 py-4 bg-[#FAF8F3]/70 flex-shrink-0">
            <h3 className="text-base sm:text-lg font-medium text-[#292A26]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-[#77766F] hover:bg-[#F1EEE7] hover:text-[#292A26] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t border-[#E8E4DC] bg-[#FAF8F3]/70 px-6 py-3.5 flex justify-end gap-3 flex-shrink-0">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
