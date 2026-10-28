import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#FAF8F3] text-[#292A26] px-4 py-16">
      <div className="text-center max-w-md space-y-4">
        <h1 className="text-7xl sm:text-8xl font-display font-light text-[#77766F]/40 tracking-tight">404</h1>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" size="md">
              Return To Storefront →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
