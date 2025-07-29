import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Chart from '../dashboard/Chart';

const data = [
    { name: '1월', value: 400 },
    { name: '2월', value: 300 },
    { name: '3월', value: 200 },
    { name: '4월', value: 278 },
    { name: '5월', value: 189 },
    { name: '6월', value: 239 },
];

export default function DashboardOverview() {
    const [selectedPeriod, setSelectedPeriod] = useState('6개월');

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Overview</h1>
                    <p className="text-gray-400">스크래치 캡차 사용 현황을 확인하세요</p>
                </div>
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-[#232326] border border-gray-700 text-white px-3 py-2 rounded"
                >
                    <option>1개월</option>
                    <option>3개월</option>
                    <option>6개월</option>
                    <option>1년</option>
                </select>
            </div>

            {/* 통계 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">총 요청 수</p>
                            <p className="text-2xl font-bold text-white">12,847</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-green-400 text-sm mt-2">+12.5% from last month</p>
                </div>

                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">성공률</p>
                            <p className="text-2xl font-bold text-white">98.2%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-green-400 text-sm mt-2">+2.1% from last month</p>
                </div>

                <div className="bg-[#232326] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">평균 응답 시간</p>
                            <p className="text-2xl font-bold text-white">1.2s</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-red-400 text-sm mt-2">-0.3s from last month</p>
                </div>
            </div>

            {/* 차트 */}
            <div className="bg-[#232326] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">월별 요청 수</h3>
                <Chart>
                    <BarChart data={data}>
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
                        <Bar
                            dataKey="value"
                            fill="#3B82F6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </Chart>
            </div>
        </div>
    );
} 