import React from 'react';

export default function DashboardSettings() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">계정 설정을 관리하세요</p>

            <div className="bg-[#232326] p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-white mb-4">계정 정보</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                        <input type="email" className="w-full bg-[#1F2937] border border-gray-600 text-white px-3 py-2 rounded" value="leehj7739@gmail.com" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                        <input type="text" className="w-full bg-[#1F2937] border border-gray-600 text-white px-3 py-2 rounded" value="heejun lee" />
                    </div>
                </div>
            </div>
        </div>
    );
} 