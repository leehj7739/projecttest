import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function Chart({ children, className = "" }) {
    return (
        <div className={`w-full h-80 ${className}`}>
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    );
} 