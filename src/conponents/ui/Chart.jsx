import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function Chart({ children, className = "", height = "h-80" }) {
    return (
        <div className={`w-full ${height} ${className}`}>
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    );
} 