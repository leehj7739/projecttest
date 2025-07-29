import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2 font-bold text-xl theme-accent">
            <span className="text-2xl">⌨️</span>
            스크래치 캡차
        </Link>
    );
} 