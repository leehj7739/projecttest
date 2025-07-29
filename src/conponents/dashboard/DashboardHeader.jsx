import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useDevModeStore } from '../../store/devModeStore';

export default function DashboardHeader() {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const userDropdownRef = useRef(null);
    const navigate = useNavigate();

    const isDevMode = useDevModeStore(state => state.isDevMode);
    const toggleDevMode = useDevModeStore(state => state.toggleDevMode);

    const {
        isAuthenticated,
        logout,
        getUserDisplayName,
        getUserInitial,
        getSessionInfo,
        isAdmin,
        canManageApps
    } = useAuth();

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            setIsUserDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleDashboardClick = () => {
        setIsUserDropdownOpen(false);
        navigate('/dashboard');
    };

    const sessionInfo = getSessionInfo();

    return (
        <header className="w-full theme-card border-b border-[var(--color-border)] sticky top-0 z-30">
            <div className="flex items-center justify-between h-16 px-6">
                {/* 좌측: 로고 */}
                <div className="flex items-center">
                    <Logo showText={true} />
                </div>

                {/* 중앙: 타이틀 */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-xl font-bold theme-text">Dashboard</h1>
                </div>

                {/* 우측 영역 */}
                <div className="flex gap-3 items-center">
                    {/* 모드 전환 UI */}
                    <button
                        onClick={toggleDevMode}
                        className={`px-3 py-2 rounded font-semibold border border-[var(--color-border)] theme-card theme-text focus:outline-none flex items-center gap-2 min-w-[90px] text-sm ${isDevMode ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
                        aria-label="모드 전환"
                    >
                        {isDevMode ? '개발 모드' : '일반 모드'}
                    </button>

                    {/* 사용자 정보 */}
                    {isAuthenticated && (
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded font-semibold theme-accent border border-[var(--color-accent)] hover:bg-[var(--color-bg)] transition"
                            >
                                <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-bg)] font-bold">
                                    {getUserInitial()}
                                </div>
                                <span className="hidden md:inline-block">
                                    {getUserDisplayName()}
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* 사용자 드롭다운 메뉴 */}
                            {isUserDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 theme-card border border-[var(--color-border)] rounded-lg shadow-lg z-50">
                                    <div className="p-4 border-b border-[var(--color-border)]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-bg)] font-bold text-lg">
                                                {getUserInitial()}
                                            </div>
                                            <div>
                                                <p className="font-semibold theme-text">
                                                    {getUserDisplayName()}
                                                </p>
                                                <p className="text-sm theme-text/60">
                                                    {sessionInfo?.isActive ? '활성' : '비활성'} 세션
                                                </p>
                                                {isAdmin() && (
                                                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mt-1">
                                                        관리자
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            onClick={handleDashboardClick}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-[var(--color-bg)] transition theme-text"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            대시보드
                                        </button>

                                        {canManageApps() && (
                                            <button
                                                onClick={() => {
                                                    setIsUserDropdownOpen(false);
                                                    navigate('/dashboard/app');
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-[var(--color-bg)] transition theme-text"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                APP 관리
                                            </button>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-red-50 hover:text-red-600 transition theme-text"
                                            disabled={isLoggingOut}
                                        >
                                            {isLoggingOut ? (
                                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8 0 004.644 9m0 0H9m11 11v-5h-.581m-15.356 0A8.001 8 0 0019.356 9m0 0H14m-2-2V4.644M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            )}
                                            로그아웃
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
} 