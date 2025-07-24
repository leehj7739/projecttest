import React from 'react';

export default function DashboardIntegrations() {
    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="rounded-xl theme-card p-8 shadow">
                <div className="font-bold text-xl theme-text mb-4">Integrations</div>
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold">G</span>
                        <span className="theme-text">Google Drive</span>
                        <button className="ml-auto px-4 py-1 rounded theme-bg theme-accent border border-[var(--color-accent)] hover:opacity-80 transition">Disconnect</button>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">G</span>
                        <span className="theme-text">GitHub</span>
                        <button className="ml-auto px-4 py-1 rounded theme-bg theme-accent border border-[var(--color-accent)] hover:opacity-80 transition">Disconnect</button>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[var(--color-success)] flex items-center justify-center text-white font-bold">S</span>
                        <span className="theme-text">Slack</span>
                        <button className="ml-auto px-4 py-1 rounded theme-bg theme-accent border border-[var(--color-accent)] hover:opacity-80 transition">Disconnect</button>
                    </li>
                </ul>
            </div>
        </div>
    );
} 