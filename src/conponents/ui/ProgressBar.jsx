import React from 'react';

export default function ProgressBar({
    percentage,
    size = "md",
    showLabel = true,
    showPercentage = true,
    className = ""
}) {
    const sizeClasses = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4'
    };

    const getColor = (percentage) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getTextColor = (percentage) => {
        if (percentage >= 90) return 'text-red-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm theme-text">사용량</span>
                    {showPercentage && (
                        <span className={`text-sm font-medium ${getTextColor(percentage)}`}>
                            {percentage}%
                        </span>
                    )}
                </div>
            )}
            <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
                <div
                    className={`${getColor(percentage)} ${sizeClasses[size]} rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
        </div>
    );
} 