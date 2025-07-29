import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ showText = true, className = "" }) {
    return (
        <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-bg)] transition-colors duration-200 ${className}`}
        >
            <img
                src="/scratchalogo.png"
                alt="Scratcha"
                className="h-8 w-auto"
            />
            {showText && (
                <span className="font-bold text-lg theme-text hidden sm:block">
                    Scratcha
                </span>
            )}
        </Link>
    );
} 