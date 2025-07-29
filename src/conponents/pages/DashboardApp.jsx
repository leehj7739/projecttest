import React, { useState } from 'react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Modal from '../ui/Modal';
import StatusBadge from '../ui/StatusBadge';
import { useDashboardStore } from '../../store/dashboardStore';

export default function DashboardApp() {
    const {
        apps,
        apiKeys,
        addApp,
        deleteApp,
        toggleAppStatus,
        addApiKey,
        deleteApiKey,
        toggleApiKeyStatus
    } = useDashboardStore();

    const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);
    const [isDeleteAppModalOpen, setIsDeleteAppModalOpen] = useState(false);
    const [isAddApiKeyModalOpen, setIsAddApiKeyModalOpen] = useState(false);
    const [isDeleteApiKeyModalOpen, setIsDeleteApiKeyModalOpen] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [selectedApiKeyId, setSelectedApiKeyId] = useState(null);
    const [expandedApps, setExpandedApps] = useState(new Set());

    // 새 APP 폼 상태
    const [newAppForm, setNewAppForm] = useState({
        name: '',
        description: ''
    });

    // 새 API 키 폼 상태
    const [newApiKeyForm, setNewApiKeyForm] = useState({
        name: ''
    });

    // APP 확장/축소 토글
    const toggleAppExpansion = (appId) => {
        const newExpanded = new Set(expandedApps);
        if (newExpanded.has(appId)) {
            newExpanded.delete(appId);
        } else {
            newExpanded.add(appId);
        }
        setExpandedApps(newExpanded);
    };

    // 선택된 APP과 API 키들
    const selectedApp = apps.find(app => app.id === selectedAppId);
    const selectedApiKey = apiKeys.find(key => key.id === selectedApiKeyId);

    // APP 추가 처리
    const handleAddApp = (e) => {
        e.preventDefault();
        if (newAppForm.name.trim() && newAppForm.description.trim()) {
            addApp({
                name: newAppForm.name.trim(),
                description: newAppForm.description.trim()
            });
            setNewAppForm({ name: '', description: '' });
            setIsAddAppModalOpen(false);
        }
    };

    // APP 삭제 처리
    const handleDeleteApp = () => {
        if (selectedAppId) {
            deleteApp(selectedAppId);
            setSelectedAppId(null);
            setIsDeleteAppModalOpen(false);
        }
    };

    // API 키 추가 처리
    const handleAddApiKey = (e) => {
        e.preventDefault();
        if (newApiKeyForm.name.trim() && selectedAppId) {
            addApiKey({
                appId: selectedAppId,
                name: newApiKeyForm.name.trim(),
                key: `sk_live_${Math.random().toString(36).substring(2, 15)}`
            });

            setNewApiKeyForm({ name: '' });
            setIsAddApiKeyModalOpen(false);
        }
    };

    // API 키 삭제 처리
    const handleDeleteApiKey = () => {
        if (selectedApiKeyId) {
            deleteApiKey(selectedApiKeyId);
            setSelectedApiKeyId(null);
            setIsDeleteApiKeyModalOpen(false);
        }
    };

    // API 키 표시 (마스킹)
    const maskApiKey = (key) => {
        if (!key) return '';
        return key.substring(0, 8) + '...' + key.substring(key.length - 4);
    };

    return (
        <DashboardLayout
            title="APP"
            subtitle="APP 및 API 키를 관리하세요"
        >
            <div className="space-y-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold theme-text">APP 관리</h2>
                        <p className="text-sm theme-text/60 mt-1">총 {apps.length}개의 APP</p>
                    </div>
                    <button
                        onClick={() => setIsAddAppModalOpen(true)}
                        className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        APP 추가
                    </button>
                </div>

                {/* APP 리스트 */}
                <div className="space-y-4">
                    {apps.map((app) => (
                        <div key={app.id} className="theme-card border border-[var(--color-border)] rounded-lg overflow-hidden">
                            {/* APP 헤더 */}
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleAppExpansion(app.id)}
                                            className="p-1 hover:bg-[var(--color-bg)] rounded transition"
                                        >
                                            <svg
                                                className={`w-5 h-5 theme-text transition-transform ${expandedApps.has(app.id) ? 'rotate-90' : ''
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <div>
                                            <h3 className="text-lg font-semibold theme-text">{app.name}</h3>
                                            <p className="text-sm theme-text/60">{app.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={app.status} />
                                        <button
                                            onClick={() => toggleAppStatus(app.id)}
                                            className={`px-3 py-1 rounded text-sm font-medium transition ${app.status === 'active'
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                }`}
                                        >
                                            {app.status === 'active' ? '비활성화' : '활성화'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAppId(app.id);
                                                setIsDeleteAppModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm font-medium hover:bg-red-200 transition"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* API 키 섹션 (확장 시) */}
                            {expandedApps.has(app.id) && (
                                <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold theme-text">API 키</h4>
                                            <button
                                                onClick={() => {
                                                    setSelectedAppId(app.id);
                                                    setIsAddApiKeyModalOpen(true);
                                                }}
                                                className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg text-sm font-medium hover:opacity-90 transition"
                                            >
                                                API 키 추가
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {apiKeys.filter(key => key.appId === app.id).map((apiKey) => (
                                                <div key={apiKey.id} className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <p className="font-medium theme-text">{apiKey.name}</p>
                                                            <p className="text-sm theme-text/60 font-mono">
                                                                {maskApiKey(apiKey.key)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <StatusBadge status={apiKey.status} />
                                                        <button
                                                            onClick={() => toggleApiKeyStatus(apiKey.id)}
                                                            className={`px-2 py-1 rounded text-xs font-medium transition ${apiKey.status === 'active'
                                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                                }`}
                                                        >
                                                            {apiKey.status === 'active' ? '비활성화' : '활성화'}
                                                        </button>
                                                        <span className="text-xs theme-text/60">
                                                            마지막 사용: {apiKey.lastUsed}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedApiKeyId(apiKey.id);
                                                                setIsDeleteApiKeyModalOpen(true);
                                                            }}
                                                            className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-200 transition"
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            {apiKeys.filter(key => key.appId === app.id).length === 0 && (
                                                <div className="text-center py-8">
                                                    <svg className="w-12 h-12 theme-text/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                    </svg>
                                                    <p className="theme-text/60">API 키가 없습니다</p>
                                                    <p className="text-sm theme-text/40">새 API 키를 추가해보세요</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {apps.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 theme-text/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-semibold theme-text mb-2">APP이 없습니다</h3>
                            <p className="theme-text/60 mb-4">첫 번째 APP을 추가해보세요</p>
                            <button
                                onClick={() => setIsAddAppModalOpen(true)}
                                className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                APP 추가
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* APP 추가 모달 */}
            <Modal
                isOpen={isAddAppModalOpen}
                onClose={() => setIsAddAppModalOpen(false)}
                title="새 APP 추가"
            >
                <form onSubmit={handleAddApp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                            APP 이름
                        </label>
                        <input
                            type="text"
                            value={newAppForm.name}
                            onChange={(e) => setNewAppForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            placeholder="APP 이름을 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                            설명
                        </label>
                        <textarea
                            value={newAppForm.description}
                            onChange={(e) => setNewAppForm(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            placeholder="APP에 대한 설명을 입력하세요"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddAppModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-[var(--color-border)] theme-text rounded-lg hover:bg-[var(--color-bg)] transition"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            추가
                        </button>
                    </div>
                </form>
            </Modal>

            {/* APP 삭제 확인 모달 */}
            <Modal
                isOpen={isDeleteAppModalOpen}
                onClose={() => setIsDeleteAppModalOpen(false)}
                title="APP 삭제 확인"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="font-medium text-red-800">주의</span>
                        </div>
                        <p className="text-red-700 mt-2 text-sm">
                            APP을 삭제하면 모든 API 키와 관련 데이터가 영구적으로 삭제되며, 복구할 수 없습니다.
                        </p>
                    </div>

                    {selectedApp && (
                        <div className="p-4 bg-[var(--color-bg)] rounded-lg">
                            <p className="font-medium theme-text mb-1">삭제할 APP:</p>
                            <p className="theme-text">{selectedApp.name}</p>
                            <p className="text-sm theme-text/60">{selectedApp.description}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setIsDeleteAppModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-[var(--color-border)] theme-text rounded-lg hover:bg-[var(--color-bg)] transition"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleDeleteApp}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </Modal>

            {/* API 키 추가 모달 */}
            <Modal
                isOpen={isAddApiKeyModalOpen}
                onClose={() => setIsAddApiKeyModalOpen(false)}
                title="새 API 키 추가"
            >
                <form onSubmit={handleAddApiKey} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                            API 키 이름
                        </label>
                        <input
                            type="text"
                            value={newApiKeyForm.name}
                            onChange={(e) => setNewApiKeyForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg theme-bg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                            placeholder="API 키 이름을 입력하세요"
                            required
                        />
                    </div>

                    {selectedApp && (
                        <div className="p-3 bg-[var(--color-bg)] rounded-lg">
                            <p className="text-sm theme-text/60 mb-1">선택된 APP:</p>
                            <p className="font-medium theme-text">{selectedApp.name}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddApiKeyModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-[var(--color-border)] theme-text rounded-lg hover:bg-[var(--color-bg)] transition"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            추가
                        </button>
                    </div>
                </form>
            </Modal>

            {/* API 키 삭제 확인 모달 */}
            <Modal
                isOpen={isDeleteApiKeyModalOpen}
                onClose={() => setIsDeleteApiKeyModalOpen(false)}
                title="API 키 삭제 확인"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="font-medium text-red-800">주의</span>
                        </div>
                        <p className="text-red-700 mt-2 text-sm">
                            API 키를 삭제하면 해당 키로는 더 이상 API 호출을 할 수 없습니다.
                        </p>
                    </div>

                    {selectedApiKey && (
                        <div className="p-4 bg-[var(--color-bg)] rounded-lg">
                            <p className="font-medium theme-text mb-1">삭제할 API 키:</p>
                            <p className="theme-text">{selectedApiKey.name}</p>
                            <p className="text-sm theme-text/60 font-mono">
                                {maskApiKey(selectedApiKey.key)}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setIsDeleteApiKeyModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-[var(--color-border)] theme-text rounded-lg hover:bg-[var(--color-bg)] transition"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleDeleteApiKey}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
} 