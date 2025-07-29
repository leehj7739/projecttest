import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#18181b] flex text-white">
            <Sidebar />
            <main className="flex-1 p-10 bg-[#18181b] min-h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
} 