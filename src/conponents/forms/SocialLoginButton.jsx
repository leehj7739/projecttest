import React from 'react';

export default function SocialLoginButton({
    icon,
    children,
    onClick,
    className = ""
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 justify-center w-full border border-[var(--color-border)] rounded-md py-3 theme-text font-semibold hover:bg-[color:var(--color-bg)] transition ${className}`}
        >
            {icon}
            {children}
        </button>
    );
} 