import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuLink({ item, isActive }) {

    return (
        <Link
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                : 'theme-text/60 hover:bg-[var(--color-bg)] hover:theme-text'
                }`}
        >
            {item.icon}
            {item.name}
        </Link>
    );
} 