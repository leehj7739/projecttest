import React from 'react';

export default function DashboardSettings() {
    return (
        <div className="max-w-xl mx-auto flex flex-col gap-8">
            <div className="rounded-xl theme-card p-8 shadow">
                <div className="font-bold text-xl theme-text mb-4">Profile Settings</div>
                <form className="flex flex-col gap-4">
                    <label className="theme-text font-semibold">Name
                        <input type="text" className="w-full mt-1 px-3 py-2 rounded border border-[var(--color-border)] theme-bg theme-text" defaultValue="heejun lee" />
                    </label>
                    <label className="theme-text font-semibold">Email
                        <input type="email" className="w-full mt-1 px-3 py-2 rounded border border-[var(--color-border)] theme-bg theme-text" defaultValue="leehj7739@gmail.com" />
                    </label>
                    <label className="theme-text font-semibold">Password
                        <input type="password" className="w-full mt-1 px-3 py-2 rounded border border-[var(--color-border)] theme-bg theme-text" placeholder="새 비밀번호" />
                    </label>
                    <button className="mt-4 px-6 py-2 rounded theme-card theme-accent border border-[var(--color-accent)] font-bold hover:opacity-80 transition self-end">Save Changes</button>
                </form>
            </div>
        </div>
    );
} 