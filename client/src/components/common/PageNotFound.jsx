import React from 'react';

export default function PageNotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-900 font-sans antialiased min-h-screen">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
                <p className="text-gray-600">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}