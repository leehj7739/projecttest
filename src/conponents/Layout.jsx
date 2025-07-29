import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import Header from './ui/Header';
import Footer from './ui/Footer';

export default function Layout() {
    const theme = useThemeStore(state => state.theme);

    // zustand theme 변경 시 body 클래스 동기화
    useEffect(() => {
        document.body.classList.remove('light', 'dark', 'ocean', 'outline');
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <div className="min-h-screen flex flex-col theme-bg font-[var(--font-main)]">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 