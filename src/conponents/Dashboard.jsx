import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import DashboardHeader from './dashboard/DashboardHeader';

export default function Dashboard() {
    return (
        <div className="min-h-screen theme-bg flex flex-col theme-text">
            <DashboardHeader />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-10 theme-bg overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
} 