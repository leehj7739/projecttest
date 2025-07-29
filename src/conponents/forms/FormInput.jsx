import React from 'react';

export default function FormInput({
    id,
    type = "text",
    placeholder,
    label,
    error,
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm theme-text font-medium" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`rounded-md px-4 py-3 bg-[color:var(--color-bg)] border border-[var(--color-border)] theme-text placeholder-[color:var(--color-text)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:opacity-50 ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
} 