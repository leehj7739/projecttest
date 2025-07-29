import React from 'react';

export default function MainPage() {

    return (
        <div className="min-h-screen theme-bg">
            {/* 히어로 섹션 */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold theme-text mb-6">
                            스크래치 캡차
                        </h1>
                        <p className="text-xl md:text-2xl theme-text/80 mb-8 max-w-3xl mx-auto">
                            AI가 해결할 수 없는 스크래치 캡차로 봇을 차단하고,
                            실제 사용자만 접근할 수 있도록 보호하세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] font-bold rounded-lg text-lg hover:opacity-90 transition">
                                무료로 시작하기
                            </button>
                            <button className="px-8 py-4 border border-[var(--color-border)] theme-text font-bold rounded-lg text-lg hover:bg-[color:var(--color-bg)] transition">
                                데모 보기
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 특징 섹션 */}
            <section className="py-20 theme-bg">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold theme-text text-center mb-16">
                        왜 스크래치 캡차인가요?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[var(--color-bg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">AI 방지</h3>
                            <p className="theme-text/70">최신 AI 기술로도 해결할 수 없는 고급 스크래치 캡차</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[var(--color-bg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">빠른 속도</h3>
                            <p className="theme-text/70">평균 1.2초의 빠른 응답 시간으로 사용자 경험 향상</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[var(--color-bg)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">보안 강화</h3>
                            <p className="theme-text/70">99.8%의 정확도로 봇을 차단하고 실제 사용자만 허용</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 