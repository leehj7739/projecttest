import React from 'react';

export default function FormButton({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
    ...props
}) {
    const baseClasses = "font-semibold rounded-md py-3 transition";

    const variants = {
        primary: "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90",
        secondary: "border border-[var(--color-border)] theme-text hover:bg-[color:var(--color-bg)]",
        outline: "border border-[var(--color-accent)] theme-accent hover:bg-[color:var(--color-bg)]"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
} 