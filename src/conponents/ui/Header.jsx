import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';
import ThemeSelector from './ThemeSelector';

export default function Header() {
    return (
        <header className="w-full border-b border-[var(--color-card)] bg-[color:var(--color-card)]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
                <Logo />
                <Navigation />
                <div className="flex gap-2 items-center">
                    <ThemeSelector />
                    <Link to="/signin" className="hidden md:inline-block px-4 py-2 rounded font-semibold theme-accent border border-[var(--color-accent)] hover:bg-[color:var(--color-bg)] transition">
                        Sign in
                    </Link>
                </div>
            </div>
        </header>
    );
} 