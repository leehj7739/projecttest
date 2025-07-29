import React from 'react';

export default function Button({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    className = "",
    onClick,
    type = "button"
}) {
    const baseClasses = "font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90 focus:ring-[var(--color-accent)]",
        secondary: "border border-[var(--color-border)] theme-text hover:bg-[var(--color-bg)] focus:ring-[var(--color-accent)]",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    );
} 