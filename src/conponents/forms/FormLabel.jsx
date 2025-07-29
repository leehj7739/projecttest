import React from 'react';

export default function FormLabel({
    htmlFor,
    children,
    required = false,
    className = ""
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium theme-text mb-2 ${className}`}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
} 