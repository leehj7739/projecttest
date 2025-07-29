import React from 'react';

export default function Card({
    children,
    className = "",
    padding = "p-6",
    title,
    subtitle
}) {
    return (
        <div className={`theme-card rounded-lg border border-[var(--color-border)] ${padding} ${className}`}>
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h3 className="text-lg font-semibold theme-text">{title}</h3>}
                    {subtitle && <p className="text-sm theme-text/60 mt-1">{subtitle}</p>}
                </div>
            )}
            {children}
        </div>
    );
} 