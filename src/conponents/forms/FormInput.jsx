import React, { useState } from 'react';

export default function FormInput({
    id,
    type = "text",
    placeholder,
    label,
    error,
    value,
    // password, // 비밀번호 확인을 위한 원본 비밀번호 값 (사용하지 않음)
    isValid, // 검증 성공 여부
    disabled = false,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    // 아웃라인 색상 결정
    const getOutlineColor = () => {
        if (error) {
            return 'border-red-500 focus:ring-red-500'; // 에러 시 빨간색
        } else if (isValid && value && value.trim() !== '') {
            return 'border-green-500 focus:ring-green-500'; // 검증 성공 시 초록색
        } else {
            return 'border-[var(--color-border)] focus:ring-[var(--color-accent)]'; // 기본
        }
    };

    // 비밀번호 필드 복사 방지
    const handleCopy = (e) => {
        if (type === 'password') {
            e.preventDefault();
            return false;
        }
    };

    // 비밀번호 표시/숨김 토글
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 비밀번호 필드인지 확인
    const isPasswordField = type === 'password';

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm theme-text font-medium" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={isPasswordField && showPassword ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onCopy={handleCopy}
                    onCut={handleCopy}
                    className={`rounded-md px-4 py-3 bg-[color:var(--color-bg)] border-2 ${getOutlineColor()} theme-text placeholder-[color:var(--color-text)]/60 focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors w-full ${isPasswordField ? 'pr-12' : ''} ${className}`}
                    {...props}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]/60 hover:text-[var(--color-text)] transition-colors"
                        disabled={disabled}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.687 1.654-1.217 2.364" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
} 