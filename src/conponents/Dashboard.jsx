import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menu = [
    {
        name: 'Overview', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
        ), path: ''
    },
    {
        name: 'Settings', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.3-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09c.7 0 1.3-.4 1.51-1V3a2 2 0 1 1 4 0v.09c0 .7.4 1.3 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .7.4 1.3 1 1.51z" /></svg>
        ), path: 'settings'
    },
    {
        name: 'Integrations', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
        ), path: 'integrations'
    },
    {
        name: 'Usage', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18" /><rect x="7" y="13" width="3" height="5" /><rect x="12" y="9" width="3" height="9" /><rect x="17" y="5" width="3" height="13" /></svg>
        ), path: 'usage'
    },
];

export default function Dashboard() {
    const location = useLocation();
    return (
        <div className="min-h-screen bg-[#18181b] flex text-white">
            {/* 사이드바 */}
            <aside className="w-64 min-h-screen bg-[#18181b] border-r border-gray-800 flex flex-col px-6 py-8">
                {/* 로고 */}
                <div className="mb-10 flex items-center gap-2">
                    <img src="https://assets-global.website-files.com/63f5c1b7b2b0b2b2b2b0b2b2/63f5c1b7b2b0b2b2b2b0b2b2_cursor-logo.png" alt="logo" className="w-8 h-8" />
                    <span className="font-bold text-lg tracking-tight">Cursor</span>
                </div>
                {/* 유저 정보 (예시) */}
                <div className="mb-8">
                    <div className="font-semibold text-white">heejun lee <span className="inline-block align-middle ml-1"><svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg></span></div>
                    <div className="text-gray-400 text-sm">Pro · leehj7739@gmail.com</div>
                </div>
                {/* 메뉴 */}
                <nav className="flex flex-col gap-1">
                    {menu.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${location.pathname.endsWith(item.path) ? 'bg-[#232326] text-white' : 'text-gray-400 hover:bg-[#232326] hover:text-white'}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>
            {/* 메인 컨텐츠: Outlet만 남김 */}
            <main className="flex-1 p-10 bg-[#18181b] min-h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
} 