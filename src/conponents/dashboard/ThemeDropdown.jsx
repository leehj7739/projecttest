import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { themes } from './MenuData.jsx';

export default function ThemeDropdown() {
    const { theme, setTheme } = useThemeStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setIsDropdownOpen(false);
    };

    const currentTheme = themes.find(t => t.value === theme);

    return (
        <div className="mt-auto" ref={dropdownRef}>
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[var(--color-border)] theme-text hover:bg-[var(--color-bg)] transition-colors duration-200"
                >
                    <div className="flex items-center gap-2">
                        <span>{currentTheme?.icon}</span>
                        <span className="text-sm">{currentTheme?.label}</span>
                    </div>
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 theme-card border border-[var(--color-border)] rounded-lg shadow-lg z-50">
                        {themes.map((themeOption) => (
                            <button
                                key={themeOption.value}
                                onClick={() => handleThemeChange(themeOption.value)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-200 ${theme === themeOption.value
                                    ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                    : 'theme-text hover:bg-[var(--color-bg)]'
                                    }`}
                            >
                                <span>{themeOption.icon}</span>
                                <span>{themeOption.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 