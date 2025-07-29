import React, { useState, useEffect } from 'react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Chart from '../ui/Chart';
import LoadingSpinner from '../ui/LoadingSpinner';
import Table, { TableHead, TableBody, TableRow, TableHeader, TableCell } from '../ui/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from '../../utils/chartImports';
import { useDashboardStore } from '../../store/dashboardStore';

export default function DashboardUsage() {
    const {
        apps,
        apiKeys,
        usageLogs,
        updateUsageLogs
    } = useDashboardStore();

    const [selectedAppId, setSelectedAppId] = useState('all');
    const [selectedApiKeyId, setSelectedApiKeyId] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('전체');
    const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'table'
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // 선택된 APP과 API 키
    const selectedApp = selectedAppId === 'all' ? null : apps.find(app => app.id === selectedAppId);
    const selectedApiKey = selectedApiKeyId === 'all' ? null : apiKeys.find(key => key.id === selectedApiKeyId);

    // 선택된 APP의 API 키들 (전체 선택 시 모든 API 키)
    const appApiKeys = selectedAppId === 'all' ? apiKeys : apiKeys.filter(key => key.appId === selectedAppId);

    // 기간 옵션
    const periodOptions = ['전체', '1일', '7일', '30일'];

    // 사용량 데이터 생성 (그래프용)
    const generateUsageData = (period) => {
        const data = [];
        const now = new Date();

        switch (period) {
            case '1일':
                // 24시간 데이터
                for (let i = 23; i >= 0; i--) {
                    const time = new Date(now);
                    time.setHours(now.getHours() - i);
                    data.push({
                        date: `${time.getHours()}:00`,
                        usage: Math.floor(Math.random() * 200) + 50
                    });
                }
                break;

            case '7일':
                // 7일 데이터
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(now.getDate() - i);
                    data.push({
                        date: `${date.getMonth() + 1}월 ${date.getDate()}일`,
                        usage: Math.floor(Math.random() * 1000) + 500
                    });
                }
                break;

            case '30일':
                // 30일 데이터
                for (let i = 29; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(now.getDate() - i);
                    data.push({
                        date: `${date.getMonth() + 1}월 ${date.getDate()}일`,
                        usage: Math.floor(Math.random() * 2000) + 800
                    });
                }
                break;

            default: // '전체'
                // 14일 데이터 (기본)
                for (let i = 13; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(now.getDate() - i);
                    data.push({
                        date: `${date.getMonth() + 1}월 ${date.getDate()}일`,
                        usage: Math.floor(Math.random() * 1500) + 600
                    });
                }
                break;
        }

        return data;
    };

    const [usageData, setUsageData] = useState(generateUsageData('전체'));

    // 필터 변경 시 데이터 업데이트
    useEffect(() => {
        setIsLoading(true);

        // 로그 데이터 업데이트
        updateUsageLogs(selectedAppId, selectedApiKeyId, selectedPeriod);

        // 그래프 데이터 업데이트
        setUsageData(generateUsageData(selectedPeriod));

        // 로딩 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [selectedAppId, selectedApiKeyId, selectedPeriod, updateUsageLogs]);

    // 페이징 계산
    const totalPages = Math.ceil(usageLogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLogs = usageLogs.slice(startIndex, endIndex);

    // 페이지 변경 시 첫 페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedAppId, selectedApiKeyId, selectedPeriod]);

    // 결과 상태별 색상
    const getResultColor = (result) => {
        switch (result) {
            case '성공': return 'text-green-600';
            case '실패': return 'text-red-600';
            case '타임아웃': return 'text-yellow-600';
            case '인증오류': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    // API 키 표시 (마스킹)
    const maskApiKey = (key) => {
        if (!key) return '';
        return key.substring(0, 8) + '...' + key.substring(key.length - 4);
    };

    return (
        <DashboardLayout
            title="사용량"
            subtitle="APP 및 API 키별 사용량을 확인하세요"
        >
            <div className="space-y-6">
                {/* 필터 섹션 */}
                <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                    <h3 className="text-lg font-semibold theme-text mb-4">필터 설정</h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* APP 선택 */}
                        <div>
                            <label className="block text-sm font-medium theme-text mb-2">
                                APP 선택
                            </label>
                            <select
                                value={selectedAppId}
                                onChange={(e) => setSelectedAppId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            >
                                <option value="all">전체</option>
                                {apps.map((app) => (
                                    <option key={app.id} value={app.id}>
                                        {app.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* API 키 선택 */}
                        <div>
                            <label className="block text-sm font-medium theme-text mb-2">
                                API 키 선택
                            </label>
                            <select
                                value={selectedApiKeyId}
                                onChange={(e) => setSelectedApiKeyId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            >
                                <option value="all">전체</option>
                                {appApiKeys.map((key) => (
                                    <option key={key.id} value={key.id}>
                                        {key.name} ({key.key})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 기간 선택 */}
                        <div>
                            <label className="block text-sm font-medium theme-text mb-2">
                                기간 선택
                            </label>
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            >
                                {periodOptions.map((period) => (
                                    <option key={period} value={period}>
                                        {period}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 뷰 모드 선택 */}
                        <div>
                            <label className="block text-sm font-medium theme-text mb-2">
                                표시 모드
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('graph')}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${viewMode === 'graph'
                                        ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                        : 'border border-[var(--color-border)] theme-text hover:bg-[var(--color-bg)]'
                                        }`}
                                >
                                    그래프
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${viewMode === 'table'
                                        ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                        : 'border border-[var(--color-border)] theme-text hover:bg-[var(--color-bg)]'
                                        }`}
                                >
                                    테이블
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 선택된 정보 표시 */}
                    <div className="mt-4 p-4 bg-[var(--color-bg)] rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="font-medium theme-text">선택된 APP:</span>
                                <span className="ml-2 theme-text/60">{selectedAppId === 'all' ? '전체' : selectedApp?.name}</span>
                            </div>
                            <div>
                                <span className="font-medium theme-text">선택된 API 키:</span>
                                <span className="ml-2 theme-text/60">{selectedApiKeyId === 'all' ? '전체' : selectedApiKey?.name}</span>
                            </div>
                            <div>
                                <span className="font-medium theme-text">기간:</span>
                                <span className="ml-2 theme-text/60">{selectedPeriod}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 데이터 표시 섹션 */}
                <div className="theme-card p-6 rounded-lg border border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold theme-text">사용량 데이터</h3>
                        {isLoading && (
                            <div className="flex items-center gap-2">
                                <LoadingSpinner />
                                <span className="text-sm theme-text/60">데이터를 불러오는 중...</span>
                            </div>
                        )}
                    </div>

                    {viewMode === 'graph' ? (
                        /* 그래프 뷰 */
                        <div className="h-80">
                            {isLoading ? (
                                <LoadingSpinner message="그래프를 불러오는 중..." className="h-full" />
                            ) : (
                                <Chart>
                                    <LineChart data={usageData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="var(--color-text)"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="var(--color-text)"
                                            fontSize={12}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-surface)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px',
                                                color: 'var(--color-text)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="usage"
                                            stroke="var(--color-accent)"
                                            strokeWidth={3}
                                            dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </Chart>
                            )}
                        </div>
                    ) : (
                        /* 테이블 뷰 */
                        <div>
                            <div className="overflow-x-auto">
                                {isLoading ? (
                                    <LoadingSpinner message="테이블을 불러오는 중..." className="h-64" />
                                ) : (
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">번호</TableHeader>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">APP 이름</TableHeader>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">API 키</TableHeader>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">호출 시간</TableHeader>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">호출 결과</TableHeader>
                                                <TableHeader className="text-left py-3 px-4 font-medium theme-text">응답시간</TableHeader>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {currentLogs.map((log) => (
                                                <TableRow key={log.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg)]">
                                                    <TableCell className="text-left py-3 px-4 theme-text">{log.id}</TableCell>
                                                    <TableCell className="text-left py-3 px-4 theme-text">{log.appName}</TableCell>
                                                    <TableCell className="text-left py-3 px-4 theme-text font-mono text-sm">
                                                        {maskApiKey(log.apiKey)}
                                                    </TableCell>
                                                    <TableCell className="text-left py-3 px-4 theme-text text-sm">{log.callTime}</TableCell>
                                                    <TableCell className={`text-left py-3 px-4 font-medium ${getResultColor(log.result)}`}>
                                                        {log.result}
                                                    </TableCell>
                                                    <TableCell className="text-left py-3 px-4 theme-text">{log.responseTime}ms</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>

                            {/* 페이징 네비게이션 */}
                            {viewMode === 'table' && !isLoading && totalPages > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <div className="text-sm theme-text/60">
                                        총 {usageLogs.length}개 항목 중 {startIndex + 1}-{Math.min(endIndex, usageLogs.length)}개 표시
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${currentPage === 1
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'theme-text hover:bg-[var(--color-bg)]'
                                                }`}
                                        >
                                            이전
                                        </button>

                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${currentPage === pageNum
                                                        ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                                                        : 'theme-text hover:bg-[var(--color-bg)]'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${currentPage === totalPages
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'theme-text hover:bg-[var(--color-bg)]'
                                                }`}
                                        >
                                            다음
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
} 