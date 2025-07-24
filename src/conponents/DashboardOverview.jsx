import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore } from '../store/themeStore';

// 70일치 더미 데이터 생성
const allApiLogData = Array.from({ length: 70 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (69 - i));
    const date = d.toISOString().slice(5, 10); // MM-DD
    return { date, calls: Math.floor(80 + Math.random() * 150) };
});

const PERIODS = [
    { label: '7일', value: 7 },
    { label: '14일', value: 14 },
    { label: '30일', value: 30 },
    { label: '전체', value: 70 },
];
const ROWS_PER_PAGE = 10;

export default function DashboardOverview() {
    useThemeStore(state => state.theme); // zustand 구독만
    const [period, setPeriod] = useState(7);
    const [page, setPage] = useState(1);

    // 기간별 데이터 추출
    const periodData = allApiLogData.slice(-period);
    // 페이징 데이터
    const totalPages = Math.ceil(periodData.length / ROWS_PER_PAGE);
    const pagedData = periodData.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    // 기간 변경 시 페이지 초기화
    const handlePeriodChange = (days) => {
        setPeriod(days);
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="rounded-xl theme-card p-8 shadow">
                <div className="flex items-center gap-4 mb-4">
                    <div className="font-bold text-xl theme-text">API 호출 로그</div>
                    <div className="flex gap-2 ml-auto">
                        {PERIODS.map(p => (
                            <button
                                key={p.value}
                                onClick={() => handlePeriodChange(p.value)}
                                className={`px-3 py-1 rounded border text-sm font-semibold transition ${period === p.value ? 'theme-bg theme-accent border-[var(--color-accent)]' : 'theme-card theme-text border-[var(--color-border)] hover:opacity-80'}`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={periodData} style={{ fontFamily: 'var(--font-main)' }}>
                        <XAxis dataKey="date" stroke="var(--color-text)" />
                        <YAxis stroke="var(--color-text)" />
                        <Tooltip contentStyle={{ background: 'var(--color-card)', color: 'var(--color-text)', borderRadius: 8 }} />
                        <Bar dataKey="calls" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <table className="w-full mt-8 text-sm theme-card theme-text rounded-lg overflow-hidden">
                    <thead>
                        <tr className="theme-bg">
                            <th className="p-2">날짜</th>
                            <th className="p-2">API 호출수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.map(row => (
                            <tr key={row.date} className="even:bg-[var(--color-bg)]">
                                <td className="p-2 text-center">{row.date}</td>
                                <td className="p-2 text-center">{row.calls}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* 페이징 */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-2 py-1 rounded border border-[var(--color-border)] theme-text disabled:opacity-40"
                    >
                        이전
                    </button>
                    <span className="theme-text text-sm">{page} / {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-2 py-1 rounded border border-[var(--color-border)] theme-text disabled:opacity-40"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
} 