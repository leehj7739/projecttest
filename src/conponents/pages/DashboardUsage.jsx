import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import Chart from '../dashboard/Chart';

const data = [
    { name: '1월', requests: 400, success: 380 },
    { name: '2월', requests: 300, success: 290 },
    { name: '3월', requests: 200, success: 195 },
    { name: '4월', requests: 278, success: 270 },
    { name: '5월', requests: 189, success: 185 },
    { name: '6월', requests: 239, success: 235 },
];

export default function DashboardUsage() {
    const [selectedMetric, setSelectedMetric] = useState('requests');

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Usage Analytics</h1>
                    <p className="text-gray-400">API 사용량 및 성능 지표를 확인하세요</p>
                </div>
                <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="bg-[#232326] border border-gray-700 text-white px-3 py-2 rounded"
                >
                    <option value="requests">총 요청 수</option>
                    <option value="success">성공 요청 수</option>
                </select>
            </div>

            {/* 사용량 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">오늘 요청</p>
                            <p className="text-2xl font-bold text-white">1,234</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">이번 주</p>
                            <p className="text-2xl font-bold text-white">8,567</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">이번 달</p>
                            <p className="text-2xl font-bold text-white">34,567</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">성공률</p>
                            <p className="text-2xl font-bold text-white">98.2%</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* 차트 */}
            <div className="bg-[#232326] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">월별 사용량 추이</h3>
                <Chart>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#9CA3AF"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#232326',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#F9FAFB'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="requests"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="success"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </Chart>
            </div>

            {/* 상세 정보 */}
            <div className="bg-[#232326] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">최근 활동</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-white">API 호출 성공</span>
                        </div>
                        <span className="text-gray-400 text-sm">2분 전</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-white">새로운 클라이언트 연결</span>
                        </div>
                        <span className="text-gray-400 text-sm">5분 전</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-white">사용량 한도 경고</span>
                        </div>
                        <span className="text-gray-400 text-sm">10분 전</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 