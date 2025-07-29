import React from 'react';

export default function Overview() {
    const features = [
        {
            icon: "🛡️",
            title: "강력한 보안",
            description: "AI 기반 스크래치 캡차로 봇 공격을 효과적으로 차단합니다."
        },
        {
            icon: "⚡",
            title: "빠른 속도",
            description: "0.1초 이내의 빠른 검증으로 사용자 경험을 해치지 않습니다."
        },
        {
            icon: "🎨",
            title: "직관적인 UI",
            description: "스크래치 동작만으로 간단하고 재미있는 캡차 경험을 제공합니다."
        },
        {
            icon: "📱",
            title: "반응형 디자인",
            description: "모바일, 태블릿, 데스크톱 모든 기기에서 완벽하게 작동합니다."
        },
        {
            icon: "🔧",
            title: "쉬운 통합",
            description: "간단한 API로 기존 웹사이트에 쉽게 통합할 수 있습니다."
        },
        {
            icon: "📊",
            title: "실시간 분석",
            description: "상세한 통계와 분석으로 보안 상황을 실시간으로 모니터링합니다."
        }
    ];

    const stats = [
        { number: "99.9%", label: "봇 차단률" },
        { number: "0.1초", label: "평균 검증 시간" },
        { number: "10M+", label: "일일 처리량" },
        { number: "24/7", label: "모니터링" }
    ];

    return (
        <div className="min-h-screen theme-bg">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold theme-text mb-6">
                        Scratcha
                    </h1>
                    <p className="text-xl md:text-2xl theme-text/80 mb-8 max-w-3xl mx-auto">
                        AI 기반 스크래치 캡차로 웹사이트를 안전하게 보호하세요
                    </p>
                    <div className="flex justify-center gap-8 mb-12">
                        <button className="bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg)] font-bold py-3 px-8 rounded-lg text-lg transition">
                            무료 체험하기
                        </button>
                        <button className="border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] font-bold py-3 px-8 rounded-lg text-lg transition">
                            데모 보기
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold theme-accent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm theme-text/60">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold theme-text text-center mb-12">
                        주요 특징
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="theme-card p-6 rounded-xl border border-[var(--color-border)] hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold theme-text mb-3">
                                    {feature.title}
                                </h3>
                                <p className="theme-text/70">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How it works */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold theme-text mb-12">
                        작동 방식
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-[var(--color-bg)]">1</span>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">스크래치 영역 생성</h3>
                            <p className="theme-text/70">AI가 랜덤한 위치에 스크래치 영역을 생성합니다.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-[var(--color-bg)]">2</span>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">사용자 스크래치</h3>
                            <p className="theme-text/70">사용자가 마우스나 터치로 영역을 스크래치합니다.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-[var(--color-bg)]">3</span>
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-2">AI 검증</h3>
                            <p className="theme-text/70">AI가 스크래치 패턴을 분석하여 인간 여부를 판단합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 