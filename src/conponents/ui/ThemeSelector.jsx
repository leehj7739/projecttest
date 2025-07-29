import React from 'react';
import { useThemeStore } from '../../store/themeStore';

const THEMES = [
    { value: 'light', label: '라이트' },
    { value: 'dark', label: '다크' },
    { value: 'ocean', label: '오션' },
    { value: 'outline', label: '외곽선' },
];

export default function ThemeSelector() {
    const theme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);

    return (
        <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="px-3 py-2 rounded font-semibold border border-[var(--color-border)] bg-[color:var(--color-card)] theme-text focus:outline-none appearance-none"
            aria-label="테마 선택"
        >
            {THEMES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
            ))}
        </select>
    );
} 