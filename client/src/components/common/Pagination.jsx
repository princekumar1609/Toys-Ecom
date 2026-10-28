import React from 'react';
import Button from './Button';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-between border border-[#E8E4DC] bg-white px-4 py-3 sm:px-6 rounded-md mt-8 ${className}`}>
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-[#77766F]">
            Page <span className="font-medium text-[#292A26]">{currentPage}</span> of{' '}
            <span className="font-medium text-[#292A26]">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-3 py-1.5 text-xs text-[#77766F] border border-[#E8E4DC] hover:bg-[#F1EEE7] focus:z-20 disabled:opacity-40"
            >
              ←
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-3 py-1.5 text-xs font-medium focus:z-20 transition-colors ${
                  page === currentPage
                    ? 'z-10 bg-[#292A26] text-white border border-[#292A26]'
                    : 'text-[#292A26] border border-[#E8E4DC] hover:bg-[#F1EEE7]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-3 py-1.5 text-xs text-[#77766F] border border-[#E8E4DC] hover:bg-[#F1EEE7] focus:z-20 disabled:opacity-40"
            >
              →
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
