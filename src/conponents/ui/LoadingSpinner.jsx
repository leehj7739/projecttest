import React from 'react';

export default function LoadingSpinner({
    message = "로딩 중...",
    size = "h-8 w-8",
    className = ""
}) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="text-center">
                <div className={`animate-spin rounded-full ${size} border-b-2 border-[var(--color-accent)] mx-auto mb-2`}></div>
                <p className="theme-text/60">{message}</p>
            </div>
        </div>
    );
} 