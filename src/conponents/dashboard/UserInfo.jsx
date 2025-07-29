import React from 'react';

export default function UserInfo() {
    return (
        <div className="mb-8">
            <div className="font-semibold theme-text">
                heejun lee
                <span className="inline-block align-middle ml-1">
                    <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                    </svg>
                </span>
            </div>
            <div className="theme-text/60 text-sm">Pro · leehj7739@gmail.com</div>
        </div>
    );
} 