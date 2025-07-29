import React from 'react';

export default function DashboardLayout({
    title,
    subtitle,
    children,
    headerRight = null
}) {
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold theme-text">{title}</h1>
                    <div className="h-6 w-px bg-[var(--color-border)]"></div>
                    <p className="theme-text/60 text-lg">{subtitle}</p>
                </div>
                {headerRight}
            </div>

            {/* 컨텐츠 */}
            {children}
        </div>
    );
} 