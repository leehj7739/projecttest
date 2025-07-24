import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

const THEMES = [
    { value: 'light', label: '라이트' },
    { value: 'dark', label: '다크' },
    { value: 'ocean', label: '오션' },
];

export default function Layout() {
    const theme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);

    // zustand theme 변경 시 body 클래스 동기화
    useEffect(() => {
        document.body.classList.remove('light', 'dark', 'ocean');
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <div className="min-h-screen flex flex-col theme-bg font-[var(--font-main)]">
            {/* 헤더 */}
            <header className="w-full border-b border-[var(--color-card)] bg-[color:var(--color-card)]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
                    {/* 로고 */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl theme-accent">
                        <span className="text-2xl">⌨️</span>
                        스크래치 캡차
                    </Link>
                    {/* 네비게이션 */}
                    <nav className="hidden md:flex gap-6 theme-text font-medium">
                        <Link to="/overview" className="hover:theme-accent">개요</Link>
                        <Link to="/pricing" className="hover:theme-accent">요금제</Link>
                        <Link to="/demo" className="hover:theme-accent">데모</Link>
                    </nav>
                    {/* 우측 버튼 + 테마 드롭다운 */}
                    <div className="flex gap-2 items-center">
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
                        <Link to="/signin" className="hidden md:inline-block px-4 py-2 rounded font-semibold theme-accent border border-[var(--color-accent)] hover:bg-[color:var(--color-bg)] transition">Sign in</Link>
                    </div>
                </div>
            </header>
            {/* 메인 컨텐츠 */}
            <main className="flex-1">
                <Outlet />
            </main>
            {/* 푸터 */}
            <footer className="w-full theme-card border-t border-[var(--color-card)] pt-12 pb-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-12">
                    {/* 좌측: 이메일, 소셜 */}
                    <div className="flex flex-col gap-4 min-w-[180px]">
                        <span className="font-medium theme-text">hi@cursor.com</span>
                        <div className="flex gap-3 theme-accent text-xl">
                            <a href="#" aria-label="X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47A.75.75 0 1 0 6.47 7.53L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z" /></svg></a>
                            <a href="#" aria-label="GitHub"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" /></svg></a>
                            <a href="#" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.1 5 12 5 12 5h-.1s-4.1 0-7.1.1c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.1 6.9.1s4.1 0 7.1-.1c.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.3V8.7l6.4 3.3-6.4 3.3z" /></svg></a>
                        </div>
                        <span className="text-xs theme-accent mt-4">© 2025 Made by <span className="font-semibold">Anysphere</span></span>
                    </div>
                    {/* 중앙: 카테고리별 링크 */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                        <div>
                            <div className="font-semibold theme-text mb-2">Product</div>
                            <ul className="space-y-1 theme-accent">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Enterprise</a></li>
                                <li><a href="#">Downloads</a></li>
                                <li><a href="#">Students</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold theme-text mb-2">Resources</div>
                            <ul className="space-y-1 theme-accent">
                                <li><a href="#">Docs</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Forum</a></li>
                                <li><a href="#">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold theme-text mb-2">Company</div>
                            <ul className="space-y-1 theme-accent">
                                <li><a href="#">Anysphere</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Community</a></li>
                                <li><a href="#">Customers</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold theme-text mb-2">Legal</div>
                            <ul className="space-y-1 theme-accent">
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Security</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* 우측: 언어, 인증 */}
                    <div className="flex flex-col gap-4 min-w-[160px] items-end">
                        <select className="border border-[var(--color-card)] rounded px-2 py-1 text-sm theme-text bg-[color:var(--color-card)]">
                            <option>English</option>
                            <option>한국어</option>
                        </select>
                        <div className="flex items-center gap-2 text-xs theme-accent">
                            <span>🔒 SOC 2 Certified</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 