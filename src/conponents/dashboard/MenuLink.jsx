import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuLink({ item, isActive }) {

    return (
        <Link
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${isActive
                ? 'bg-[#232326] text-white'
                : 'text-gray-400 hover:bg-[#232326] hover:text-white'
                }`}
        >
            {item.icon}
            {item.name}
        </Link>
    );
} 