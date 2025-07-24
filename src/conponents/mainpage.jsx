import React from 'react';
import { useThemeStore } from '../store/themeStore';

export default function MainPage() {
    useThemeStore(state => state.theme); // zustand 구독만
    return (
        <div className="theme-bg min-h-screen font-[var(--font-main)]">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-b-3xl max-w-6xl mx-auto mt-6 shadow-lg" style={{ minHeight: '520px' }}>
                {/* 그라데이션/블러 배경 */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-card)] blur-2xl opacity-90"></div>
                </div>
                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-28 px-4">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight theme-text drop-shadow-lg mb-6 leading-tight font-[var(--font-display)]">
                        The AI<br />Code Editor
                    </h1>
                    <p className="text-2xl md:text-3xl theme-text font-medium mb-10 drop-shadow">
                        Built to make you extraordinarily productive, Cursor is the best way to code with AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg theme-card theme-text shadow-xl hover:opacity-80 transition border-2 border-[var(--color-primary)]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M4.5 19.5v-15h15v15h-15zm1.5-1.5h12v-12h-12v12zm2.25-2.25h7.5v-1.5h-7.5v1.5zm0-3h7.5v-1.5h-7.5v1.5zm0-3h7.5v-1.5h-7.5v1.5z" /></svg>
                            Download for Windows
                        </button>
                        <button className="px-8 py-4 rounded-xl font-bold text-lg theme-bg theme-accent shadow-xl border-2 border-[var(--color-accent)] hover:opacity-80 transition">
                            All Downloads
                        </button>
                    </div>
                </div>
                {/* 코드 에디터 더미 UI */}
                <div className="relative z-10 flex justify-center pb-8">
                    <div className="w-full max-w-3xl theme-card rounded-xl shadow-2xl border border-gray-200 p-0 mt-2">
                        {/* 탭바 */}
                        <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-200">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <span className="ml-4 text-xs text-gray-500">lib.rs</span>
                            <span className="ml-2 text-xs text-gray-400">test.rs</span>
                            <span className="ml-2 text-xs text-gray-400">incremental.rs</span>
                        </div>
                        <pre className="text-left text-xs md:text-base theme-text font-mono whitespace-pre-wrap leading-relaxed px-4 py-3 theme-card rounded-b-xl">
                            {`impl MerkleTree {
    pub fn write_log_file(&self) {
        Ok(())
    }
}
// Edit selected code
// Add depth field for tree traversal
// ...`}
                        </pre>
                    </div>
                </div>
            </section>
            {/* 신뢰 기업 로고 */}
            <div className="max-w-4xl mx-auto py-8 flex flex-wrap justify-center items-center gap-8 theme-text text-lg font-semibold tracking-wide">
                <span>SAMSUNG</span>
                <span>DATADOG</span>
                <span>stripe</span>
                <span>monday.com</span>
                <span>RIPPLING</span>
                <span>perplexity</span>
                <span>ramp</span>
                <span>shopify</span>
                <span>US FOODS</span>
                <span>mercado libre</span>
            </div>
            {/* Features Section */}
            <section className="max-w-5xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10 theme-text font-[var(--font-display)]">Tab, tab, tab</h2>
                <p className="text-center theme-text mb-10">Cursor lets you breeze through changes by predicting your next edit.</p>
                <div className="flex justify-center">
                    <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-card) 100%)' }}>
                        <img src="https://assets-global.website-files.com/63f5c1b7b2b0b2b2b2b0b2b2/63f5c1b7b2b0b2b2b2b0b2b2_code-sample.png" alt="code sample" className="w-[500px] h-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
}
