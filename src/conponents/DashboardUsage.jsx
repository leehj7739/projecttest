import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore } from '../store/themeStore';

// 어플리케이션별 1:N 키 매핑
const appKeyMap = {
    AppA: ['key-111', 'key-112', 'key-113'],
    AppB: ['key-221', 'key-222'],
    AppC: ['key-331', 'key-332', 'key-333', 'key-334'],
};
const appList = Object.keys(appKeyMap);

// 70일치 더미 데이터 생성 (application, apikey)
const allUsageData = Array.from({ length: 70 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (69 - i));
    const date = d.toISOString().slice(5, 10); // MM-DD
    // 랜덤 어플리케이션, 해당 앱의 랜덤 키
    const application = appList[Math.floor(Math.random() * appList.length)];
    const keys = appKeyMap[application];
    const apikey = keys[Math.floor(Math.random() * keys.length)];
    return { date, usage: Math.floor(80 + Math.random() * 150), application, apikey };
});

const PERIODS = [
    { label: '7일', value: 7 },
    { label: '14일', value: 14 },
    { label: '30일', value: 30 },
    { label: '전체', value: 70 },
];
const ROWS_PER_PAGE = 10;

export default function DashboardUsage() {
    useThemeStore(state => state.theme); // zustand 구독만
    const [period, setPeriod] = useState(7);
    const [page, setPage] = useState(1);
    // 어플리케이션, apikey 선택 상태
    const [selectedApp, setSelectedApp] = useState('all');
    const [selectedKey, setSelectedKey] = useState('all');

    // 기간별 데이터 추출
    let periodData = allUsageData.slice(-period);
    // 어플리케이션/키 필터링
    if (selectedApp !== 'all') periodData = periodData.filter(row => row.application === selectedApp);
    // 키 드롭다운 옵션: 전체 or 해당 앱의 키
    const keyOptions = selectedApp === 'all'
        ? ['all']
        : ['all', ...appKeyMap[selectedApp]];
    if (selectedKey !== 'all') periodData = periodData.filter(row => row.apikey === selectedKey);
    // 페이징 데이터
    const totalPages = Math.ceil(periodData.length / ROWS_PER_PAGE);
    const pagedData = periodData.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    // 기간 변경 시 페이지 초기화
    const handlePeriodChange = (days) => {
        setPeriod(days);
        setPage(1);
    };

    // 어플리케이션 드롭다운 옵션
    const appOptions = ['all', ...appList];

    // 어플리케이션 변경 시 키도 전체로 초기화
    const handleAppChange = (val) => {
        setSelectedApp(val);
        setSelectedKey('all');
        setPage(1);
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div className="rounded-xl theme-card p-8 shadow">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="font-bold text-xl theme-text">기간별 사용량</div>
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
                {/* 어플리케이션, apikey 선택 */}
                <div className="flex gap-4 mb-4">
                    <select
                        value={selectedApp}
                        onChange={e => handleAppChange(e.target.value)}
                        className="px-3 py-2 rounded border border-[var(--color-border)] bg-[color:var(--color-card)] theme-text focus:outline-none appearance-none"
                    >
                        {appOptions.map(app => (
                            <option key={app} value={app}>{app === 'all' ? '전체 어플리케이션' : app}</option>
                        ))}
                    </select>
                    <select
                        value={selectedKey}
                        onChange={e => { setSelectedKey(e.target.value); setPage(1); }}
                        className="px-3 py-2 rounded border border-[var(--color-border)] bg-[color:var(--color-card)] theme-text focus:outline-none appearance-none"
                        disabled={selectedApp === 'all'}
                    >
                        {keyOptions.map(key => (
                            <option key={key} value={key}>{key === 'all' ? '전체 API Key' : key}</option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={periodData} style={{ fontFamily: 'var(--font-main)' }}>
                        <XAxis dataKey="date" stroke="var(--color-text)" />
                        <YAxis stroke="var(--color-text)" />
                        <Tooltip contentStyle={{ background: 'var(--color-card)', color: 'var(--color-text)', borderRadius: 8 }} />
                        <Line type="monotone" dataKey="usage" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 5, fill: 'var(--color-accent)' }} />
                    </LineChart>
                </ResponsiveContainer>
                <table className="w-full mt-8 text-sm theme-card theme-text rounded-lg overflow-hidden">
                    <thead>
                        <tr className="theme-bg">
                            <th className="p-2">날짜</th>
                            <th className="p-2">어플리케이션</th>
                            <th className="p-2">API Key</th>
                            <th className="p-2">사용량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.map(row => (
                            <tr key={row.date + row.application + row.apikey} className="even:bg-[var(--color-bg)]">
                                <td className="p-2 text-center">{row.date}</td>
                                <td className="p-2 text-center">{row.application}</td>
                                <td className="p-2 text-center">{row.apikey}</td>
                                <td className="p-2 text-center">{row.usage}</td>
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