import React, { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeProvider({ children }) {
    const initializeTheme = useThemeStore(state => state.initializeTheme);

    useEffect(() => {
        // 앱 시작 시 테마 초기화
        initializeTheme();
    }, [initializeTheme]);

    return <>{children}</>;
} 