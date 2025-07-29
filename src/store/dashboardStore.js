import { create } from 'zustand';

// 더미 데이터 생성 함수
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

// 통계 데이터 생성 함수
const generateStats = (period) => {
    const baseUsage = {
        '1일': { today: 2450, week: 15200, month: 24500 },
        '7일': { today: 1800, week: 15200, month: 24500 },
        '30일': { today: 2100, week: 16800, month: 24500 },
        '전체': { today: 2450, week: 15200, month: 24500 }
    };

    const usage = baseUsage[period];
    return {
        today: {
            value: usage.today,
            change: Math.floor(Math.random() * 20) + 5
        },
        week: {
            value: usage.week,
            change: Math.floor(Math.random() * 15) + 3
        },
        month: {
            value: usage.month,
            change: Math.floor(Math.random() * 25) + 10
        }
    };
};

// 더미 APP 데이터
const generateApps = () => [
    {
        id: 1,
        name: 'My Website',
        description: '메인 웹사이트 캡차 서비스',
        status: 'active',
        createdAt: '2024-01-15',
        settings: {
            model: 'gpt-4',
            noiseLevel: '중',
            heuristicLevel: '중'
        },
        usage: {
            today: 450,
            week: 3200,
            month: 12500
        }
    },
    {
        id: 2,
        name: 'Mobile App',
        description: '모바일 애플리케이션 캡차',
        status: 'active',
        createdAt: '2024-01-20',
        settings: {
            model: 'gpt-3.5-turbo',
            noiseLevel: '하',
            heuristicLevel: '상'
        },
        usage: {
            today: 320,
            week: 2100,
            month: 8500
        }
    },
    {
        id: 3,
        name: 'Admin Panel',
        description: '관리자 패널 보안 캡차',
        status: 'inactive',
        createdAt: '2024-01-10',
        settings: {
            model: 'claude-3',
            noiseLevel: '상',
            heuristicLevel: '없음'
        },
        usage: {
            today: 0,
            week: 150,
            month: 3500
        }
    },
    {
        id: 4,
        name: 'API Gateway',
        description: 'API 게이트웨이 캡차 서비스',
        status: 'active',
        createdAt: '2024-01-25',
        settings: {
            model: 'gpt-4',
            noiseLevel: '중',
            heuristicLevel: '중'
        },
        usage: {
            today: 680,
            week: 4800,
            month: 18500
        }
    }
];

// 더미 API 키 데이터
const generateApiKeys = () => [
    {
        id: 1,
        appId: 1,
        name: '프로덕션 키',
        key: 'sk_live_1234567890abcdef',
        status: 'active',
        createdAt: '2024-01-15',
        lastUsed: '2024-01-20 14:30:25'
    },
    {
        id: 2,
        appId: 1,
        name: '테스트 키',
        key: 'sk_test_abcdef1234567890',
        status: 'active',
        createdAt: '2024-01-15',
        lastUsed: '2024-01-19 09:15:42'
    },
    {
        id: 3,
        appId: 2,
        name: '모바일 앱 키',
        key: 'sk_live_mobile_9876543210',
        status: 'active',
        createdAt: '2024-01-20',
        lastUsed: '2024-01-20 16:45:18'
    },
    {
        id: 4,
        appId: 3,
        name: '관리자 키',
        key: 'sk_live_admin_555666777',
        status: 'inactive',
        createdAt: '2024-01-10',
        lastUsed: '2024-01-15 11:20:33'
    },
    {
        id: 5,
        appId: 4,
        name: '게이트웨이 키',
        key: 'sk_live_gateway_111222333',
        status: 'active',
        createdAt: '2024-01-25',
        lastUsed: '2024-01-20 18:30:55'
    }
];

// 더미 사용량 로그 데이터 생성
const generateUsageLogs = (appId, apiKeyId, period, startId = 1) => {
    const logs = [];
    const now = new Date();
    const results = ['성공', '실패', '타임아웃', '인증오류'];
    const appNames = {
        1: 'My Website',
        2: 'Mobile App',
        3: 'Admin Panel',
        4: 'API Gateway'
    };
    const apiKeys = {
        1: 'sk_live_1234567890abcdef',
        2: 'sk_test_abcdef1234567890',
        3: 'sk_live_mobile_9876543210',
        4: 'sk_live_admin_555666777',
        5: 'sk_live_gateway_111222333'
    };

    let count = 0;
    switch (period) {
        case '1일':
            count = 24;
            break;
        case '7일':
            count = 168; // 7일 * 24시간
            break;
        case '30일':
            count = 720; // 30일 * 24시간
            break;
        default:
            count = 100;
    }

    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now);
        if (period === '1일') {
            time.setHours(now.getHours() - i);
        } else {
            time.setHours(now.getHours() - (i % 24));
            time.setDate(now.getDate() - Math.floor(i / 24));
        }

        logs.push({
            id: startId + (count - i - 1),
            appName: appNames[appId] || 'Unknown',
            apiKey: apiKeys[apiKeyId] || 'Unknown',
            callTime: time.toISOString().replace('T', ' ').substring(0, 19),
            result: results[Math.floor(Math.random() * results.length)],
            responseTime: Math.floor(Math.random() * 2000) + 100,
            appId,
            apiKeyId
        });
    }

    return logs;
};

export const useDashboardStore = create((set) => ({
    // 상태
    selectedPeriod: '전체',
    usageData: generateUsageData('전체'),
    stats: generateStats('전체'),
    isLoading: false,
    apps: generateApps(),
    selectedAppId: null,
    apiKeys: generateApiKeys(),
    usageLogs: generateUsageLogs(1, 1, '전체'),

    // 액션
    setPeriod: (period) => {
        set({
            selectedPeriod: period,
            usageData: generateUsageData(period),
            stats: generateStats(period),
            isLoading: true
        });

        // 로딩 시뮬레이션
        setTimeout(() => {
            set({ isLoading: false });
        }, 500);
    },

    // APP 선택
    selectApp: (appId) => {
        set({ selectedAppId: appId });
    },

    // APP 설정 업데이트
    updateAppSettings: (appId, settings) => {
        set(state => ({
            apps: state.apps.map(app =>
                app.id === appId
                    ? { ...app, settings: { ...app.settings, ...settings } }
                    : app
            )
        }));
    },

    // APP 상태 토글 (removed from settings, but logic might be here for APP menu)
    toggleAppStatus: (appId) => {
        set(state => {
            const newAppStatus = state.apps.find(app => app.id === appId)?.status === 'active' ? 'inactive' : 'active';

            return {
                apps: state.apps.map(app =>
                    app.id === appId
                        ? { ...app, status: newAppStatus }
                        : app
                ),
                // APP이 비활성화되면 해당 APP의 모든 API 키도 비활성화
                apiKeys: state.apiKeys.map(key =>
                    key.appId === appId
                        ? { ...key, status: newAppStatus }
                        : key
                )
            };
        });
    },

    // 새 APP 추가
    addApp: (appData) => {
        const newApp = {
            id: Date.now(),
            ...appData,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
            settings: {
                model: 'gpt-4',
                noiseLevel: '중',
                heuristicLevel: '중'
            },
            usage: {
                today: 0,
                week: 0,
                month: 0
            }
        };

        set(state => ({
            apps: [...state.apps, newApp]
        }));
    },

    // APP 삭제
    deleteApp: (appId) => {
        set(state => ({
            apps: state.apps.filter(app => app.id !== appId),
            selectedAppId: state.selectedAppId === appId ? null : state.selectedAppId
        }));
    },

    // 사용량 로그 업데이트
    updateUsageLogs: (appId, apiKeyId, period) => {
        // 전체 선택 시 모든 로그 생성
        if (appId === 'all' || apiKeyId === 'all') {
            const allLogs = [];
            const apps = generateApps();
            const apiKeys = generateApiKeys();
            let currentId = 1;

            // 모든 APP과 API 키 조합으로 로그 생성
            apps.forEach(app => {
                const appKeys = apiKeys.filter(key => key.appId === app.id);
                appKeys.forEach(key => {
                    const logs = generateUsageLogs(app.id, key.id, period, currentId);
                    allLogs.push(...logs);
                    currentId += logs.length;
                });
            });

            // ID 순으로 정렬하고 최대 100개만 표시
            const sortedLogs = allLogs
                .sort((a, b) => a.id - b.id)
                .slice(0, 100);

            set({ usageLogs: sortedLogs });
        } else {
            set({
                usageLogs: generateUsageLogs(appId, apiKeyId, period)
            });
        }
    },

    // 현재 요금제 정보
    currentPlan: {
        name: 'Professional',
        limit: 100000,
        used: 24500,
        price: '₩29,900/월',
        description: '월 100,000회 캡차 검증',
        overageRate: 0.3 // 초과분 요금 (1회당 0.3원)
    },

    // 요금제 변경
    changePlan: (newPlan) => {
        const planConfigs = {
            'Basic': {
                name: 'Basic',
                limit: 10000,
                price: '₩9,900/월',
                description: '월 10,000회 캡차 검증',
                overageRate: 0.5 // 초과분 요금 (1회당 0.5원)
            },
            'Professional': {
                name: 'Professional',
                limit: 100000,
                price: '₩29,900/월',
                description: '월 100,000회 캡차 검증',
                overageRate: 0.3 // 초과분 요금 (1회당 0.3원)
            },
            'Enterprise': {
                name: 'Enterprise',
                limit: 500000,
                price: '₩99,900/월',
                description: '월 500,000회 캡차 검증',
                overageRate: 0.2 // 초과분 요금 (1회당 0.2원)
            }
        };

        const newPlanConfig = planConfigs[newPlan];
        if (newPlanConfig) {
            set(state => ({
                currentPlan: {
                    ...state.currentPlan,
                    ...newPlanConfig
                }
            }));
        }
    },

    // 초과분 요금 계산
    calculateOverageCost: (used, limit, overageRate) => {
        if (used <= limit) return 0;
        return Math.round((used - limit) * overageRate);
    },

    // 총 요금 계산 (기본 요금 + 초과분 요금)
    calculateTotalCost: (used, limit, basePrice, overageRate) => {
        const basePriceNumber = parseInt(basePrice.replace(/[^\d]/g, ''));
        const overageCost = (used > limit) ? Math.round((used - limit) * overageRate) : 0;
        return basePriceNumber + overageCost;
    },

    // 최근 활동
    recentActivities: [
        {
            id: 1,
            type: 'success',
            title: '캡차 검증 성공',
            time: '2분 전',
            count: '+1',
            icon: 'check'
        },
        {
            id: 2,
            type: 'info',
            title: 'API 키 생성',
            time: '1시간 전',
            count: '새 키',
            icon: 'settings'
        },
        {
            id: 3,
            type: 'warning',
            title: '웹훅 전송',
            time: '3시간 전',
            count: '성공',
            icon: 'zap'
        },
        {
            id: 4,
            type: 'error',
            title: '캡차 검증 실패',
            time: '5시간 전',
            count: '-1',
            icon: 'x'
        }
    ],

    // 활동 추가
    addActivity: (activity) => {
        const newActivity = {
            id: Date.now(),
            ...activity
        };

        set(state => ({
            recentActivities: [newActivity, ...state.recentActivities.slice(0, 9)]
        }));
    },

    // API 키 추가
    addApiKey: (apiKeyData) => {
        const newApiKey = {
            id: Date.now(),
            ...apiKeyData,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0],
            lastUsed: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        set(state => ({
            apiKeys: [...state.apiKeys, newApiKey]
        }));
    },

    // API 키 삭제
    deleteApiKey: (apiKeyId) => {
        set(state => ({
            apiKeys: state.apiKeys.filter(key => key.id !== apiKeyId)
        }));
    },

    // API 키 상태 토글
    toggleApiKeyStatus: (apiKeyId) => {
        set(state => ({
            apiKeys: state.apiKeys.map(key =>
                key.id === apiKeyId
                    ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
                    : key
            )
        }));
    },

    // 사용량 업데이트
    updateUsage: (newUsage) => {
        set(state => ({
            currentPlan: {
                ...state.currentPlan,
                used: newUsage
            }
        }));
    }
})); 