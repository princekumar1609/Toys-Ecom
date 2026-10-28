import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav className={`flex text-xs uppercase tracking-wider text-[#77766F] py-3 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-1.5 flex-wrap">
        <li className="inline-flex items-center">
          <Link to="/" className="text-[#77766F] hover:text-[#292A26] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const targetPath = item.path || item.link;
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-[#E8E4DC]">/</span>
              {isLast || !targetPath ? (
                <span className="font-semibold text-[#292A26] truncate max-w-[200px] sm:max-w-none">{item.label}</span>
              ) : (
                <Link to={targetPath} className="text-[#77766F] hover:text-[#292A26] transition-colors truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
