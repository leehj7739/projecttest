import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

export default function Signup() {
    const theme = useThemeStore(state => state.theme);

    // zustand theme 변경 시 body 클래스 동기화
    useEffect(() => {
        document.body.classList.remove('light', 'dark', 'ocean', 'outline');
        document.body.classList.add(theme);
    }, [theme]);

    // 간단한 에러 상태 예시
    const [errors] = useState({
        id: true,
        password: true,
        name: true,
        birth: true,
    });

    return (
        <div className="min-h-screen theme-bg flex flex-col items-center py-8">
            {/* NAVER 로고 */}
            <div className="text-4xl font-extrabold theme-accent mb-2 tracking-tight">NAVER</div>
            <div className="text-[var(--color-text)]/60 text-sm mb-6">실명 인증된 아이디로 가입 <span className="align-middle theme-accent">✔</span></div>
            {/* 카드 */}
            <div className="theme-card rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-6 border border-[var(--color-border)]">
                {/* 아이디/비번/이메일 */}
                <div className={`border ${errors.id ? 'border-red-400' : 'border-[var(--color-border)]'} rounded-lg p-4 mb-2`}>
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <span className="text-red-500 font-semibold">아이디</span>
                        <span className="ml-auto text-[var(--color-text)]/60 text-sm">@naver.com</span>
                    </div>
                    <input type="text" className="w-full bg-transparent border-none outline-none theme-text placeholder-[var(--color-text)]/60 mb-2" placeholder="아이디" />
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-2a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" /></svg>
                        <span className="text-red-500 font-semibold">비밀번호</span>
                        <svg className="w-5 h-5 ml-auto text-[var(--color-text)]/60 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 0 1-6 0" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.687 1.654-1.217 2.364" /><path d="M15.54 15.54A9.956 9.956 0 0 1 12 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 0 1 1.272-2.495" /></svg>
                    </div>
                    <input type="password" className="w-full bg-transparent border-none outline-none theme-text placeholder-[var(--color-text)]/60 mb-2" placeholder="비밀번호" />
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-[var(--color-text)]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12H8" /><path d="M12 16v-8" /></svg>
                        <span className="text-[var(--color-text)]/60 font-semibold">[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)</span>
                    </div>
                    <input type="email" className="w-full bg-[color:var(--color-bg)] border border-[var(--color-border)] rounded px-2 py-1 theme-text placeholder-[var(--color-text)]/60" placeholder="이메일주소" disabled />
                    <div className="text-xs text-red-500 mt-2">* 아이디: 필수 정보입니다.<br />* 비밀번호: 필수 정보입니다.</div>
                </div>
                {/* 이름/생년월일 */}
                <div className={`border ${errors.name || errors.birth ? 'border-red-400' : 'border-[var(--color-border)]'} rounded-lg p-4 mb-2`}>
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <span className="text-red-500 font-semibold">이름</span>
                    </div>
                    <input type="text" className="w-full bg-transparent border-none outline-none theme-text placeholder-[var(--color-text)]/60 mb-2" placeholder="이름" />
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                        <span className="text-red-500 font-semibold">생년월일 8자리</span>
                    </div>
                    <input type="text" className="w-full bg-transparent border-none outline-none theme-text placeholder-[var(--color-text)]/60 mb-2" placeholder="생년월일 8자리" />
                    {/* 성별 선택 */}
                    <div className="flex gap-2 mt-2">
                        <button className="flex-1 border border-[var(--color-border)] rounded py-2 theme-text hover:bg-[color:var(--color-bg)] transition">남자</button>
                        <button className="flex-1 border border-[var(--color-border)] rounded py-2 theme-text hover:bg-[color:var(--color-bg)] transition">여자</button>
                        <button className="flex-1 border border-[var(--color-border)] rounded py-2 theme-text hover:bg-[color:var(--color-bg)] transition">선택안함</button>
                    </div>
                    <div className="text-xs theme-accent mt-2">신분증 상의 이름, 생년월일, 성별과 일치하지 않으면 실명인증이 불가합니다.</div>
                    <div className="text-xs text-red-500 mt-1">* 이름: 필수 정보입니다.<br />* 생년월일: 필수 정보입니다.</div>
                </div>
                {/* 국가/휴대폰 */}
                <div className="border border-[var(--color-border)] rounded-lg p-4 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-[var(--color-text)]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /></svg>
                        <span className="text-[var(--color-text)] font-semibold">대한민국 +82</span>
                    </div>
                    <input type="text" className="w-full bg-transparent border-none outline-none theme-text placeholder-[var(--color-text)]/60 mb-2" placeholder="휴대전화번호" />
                </div>
                {/* 인증요청 버튼 */}
                <button className="w-full bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg)] font-bold py-3 rounded-lg text-lg mt-2 transition">인증요청</button>
            </div>
        </div>
    );
} 