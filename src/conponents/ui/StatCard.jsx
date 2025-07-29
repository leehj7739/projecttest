import React from 'react';

export default function StatCard({
    title,
    value,
    change,
    changeType = 'neutral', // 'positive', 'negative', 'neutral'
    icon,
    color = 'blue'
}) {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500'
    };

    const changeColorClasses = {
        positive: 'text-green-400',
        negative: 'text-red-400',
        neutral: 'text-gray-400'
    };

    return (
        <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="theme-text/60 text-sm">{title}</p>
                    <p className="text-2xl font-bold theme-text">{value}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
            {change && (
                <p className={`text-sm mt-2 ${changeColorClasses[changeType]}`}>
                    {change}
                </p>
            )}
        </div>
    );
} 