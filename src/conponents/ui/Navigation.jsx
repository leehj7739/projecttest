import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="hidden md:flex gap-6 theme-text font-medium">
            <Link to="/overview" className="hover:theme-accent">개요</Link>
            <Link to="/pricing" className="hover:theme-accent">요금제</Link>
            <Link to="/demo" className="hover:theme-accent">데모</Link>
        </nav>
    );
} 