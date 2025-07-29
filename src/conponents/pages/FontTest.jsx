import React from 'react';

export default function FontTest() {
    return (
        <div className="min-h-screen theme-bg p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold theme-text mb-8">폰트 테스트 페이지</h1>

                <div className="space-y-6">
                    <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                        <h2 className="text-2xl font-bold theme-text mb-4">현재 적용된 폰트: Noto Sans KR</h2>
                        <p className="text-lg theme-text mb-4">
                            이 텍스트는 Noto Sans KR 폰트로 표시됩니다.
                        </p>

                        <div className="space-y-2">
                            <p className="font-thin text-lg">Thin (100): 가나다라마바사아자차카타파하</p>
                            <p className="font-extralight text-lg">ExtraLight (200): 가나다라마바사아자차카타파하</p>
                            <p className="font-light text-lg">Light (300): 가나다라마바사아자차카타파하</p>
                            <p className="font-normal text-lg">Regular (400): 가나다라마바사아자차카타파하</p>
                            <p className="font-medium text-lg">Medium (500): 가나다라마바사아자차카타파하</p>
                            <p className="font-semibold text-lg">SemiBold (600): 가나다라마바사아자차카타파하</p>
                            <p className="font-bold text-lg">Bold (700): 가나다라마바사아자차카타파하</p>
                            <p className="font-extrabold text-lg">ExtraBold (800): 가나다라마바사아자차카타파하</p>
                            <p className="font-black text-lg">Black (900): 가나다라마바사아자차카타파하</p>
                        </div>
                    </div>

                    <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                        <h3 className="text-xl font-semibold theme-text mb-4">영문 테스트</h3>
                        <div className="space-y-2">
                            <p className="font-thin text-lg">Thin: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-extralight text-lg">ExtraLight: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-light text-lg">Light: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-normal text-lg">Regular: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-medium text-lg">Medium: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-semibold text-lg">SemiBold: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-bold text-lg">Bold: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-extrabold text-lg">ExtraBold: The quick brown fox jumps over the lazy dog</p>
                            <p className="font-black text-lg">Black: The quick brown fox jumps over the lazy dog</p>
                        </div>
                    </div>

                    <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                        <h3 className="text-xl font-semibold theme-text mb-4">숫자 및 특수문자</h3>
                        <p className="text-lg theme-text">
                            0123456789 !@#$%^&*()_+-=[]{ }|;':",./&lt;&gt;?`~
                        </p>
                    </div>

                    <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                        <h3 className="text-xl font-semibold theme-text mb-4">긴 텍스트 테스트</h3>
                        <p className="text-lg theme-text leading-relaxed">
                            Noto Sans KR은 Google에서 개발한 한글 폰트입니다.
                            다양한 굵기(Thin부터 Black까지)를 지원하며,
                            한글과 영문이 모두 잘 표현되는 폰트입니다.
                            웹사이트에서 한글 텍스트를 표시할 때 가독성이 좋고
                            깔끔한 디자인을 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 