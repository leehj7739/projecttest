import React from 'react';

export default function DashboardIntegrations() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Integrations</h1>
            <p className="text-gray-400">외부 서비스와의 연동을 관리하세요</p>

            <div className="bg-[#232326] p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-white mb-4">연동된 서비스</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#1F2937] rounded">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">GitHub</h3>
                                <p className="text-gray-400 text-sm">연동됨</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">연동 해제</button>
                    </div>
                </div>
            </div>
        </div>
    );
} 