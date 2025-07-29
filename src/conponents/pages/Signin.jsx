import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../forms/FormInput';
import FormButton from '../forms/FormButton';
import SuccessModal from '../ui/SuccessModal';
import ErrorModal from '../ui/ErrorModal';
import { useAuth } from '../../hooks/useAuth';
import { useDevModeStore } from '../../store/devModeStore';
import { useAuthStore } from '../../store/authStore';

export default function Signin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    const { login, updateUser } = useAuth();
    const isDevMode = useDevModeStore(state => state.isDevMode);

    // 리다이렉트된 페이지 정보 가져오기
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (isDevMode) {
            // 개발 모드: 더미 데이터로 로그인
            setTimeout(() => {
                setIsLoading(false);

                // admin 계정 검증
                if (formData.id === 'admin' && formData.password === '12345678') {
                    // admin 계정으로 로그인 성공
                    const adminUser = {
                        id: 1,
                        name: 'dummyname',
                        email: 'admin@dev.com',
                        roles: ['admin', 'user'],
                        permissions: ['manage_apps', 'view_billing', 'manage_users', 'admin_access'],
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    };

                    const dummyToken = 'dev_token_admin_' + Date.now();

                    // 전역 상태에 admin 사용자 정보 저장
                    updateUser(adminUser);

                    // localStorage에 토큰 저장 (개발 모드용)
                    localStorage.setItem('authToken', dummyToken);

                    // authStore 상태 직접 업데이트
                    useAuthStore.setState({
                        user: adminUser,
                        token: dummyToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                        lastActivity: new Date().toISOString(),
                    });

                    setIsSuccessModalOpen(true);
                } else {
                    // 일반 사용자 계정 (기존 로직)
                    const random = Math.random();
                    if (random < 0.8) { // 80% 성공 확률
                        // 개발 모드에서 더미 사용자 정보 생성
                        const dummyUser = {
                            id: 2,
                            name: formData.id || '개발자',
                            email: `${formData.id}@dev.com`,
                            roles: ['user'],
                            permissions: ['manage_apps', 'view_billing'],
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString()
                        };

                        const dummyToken = 'dev_token_' + Date.now();

                        // 전역 상태에 더미 사용자 정보 저장
                        updateUser(dummyUser);

                        // localStorage에 토큰 저장 (개발 모드용)
                        localStorage.setItem('authToken', dummyToken);

                        // authStore 상태 직접 업데이트
                        useAuthStore.setState({
                            user: dummyUser,
                            token: dummyToken,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                            lastActivity: new Date().toISOString(),
                        });

                        setIsSuccessModalOpen(true);
                    } else {
                        setIsErrorModalOpen(true);
                    }
                }
            }, 1000);
        } else {
            // 일반 모드: 실제 API 호출
            try {
                const result = await login(formData);
                if (result.success) {
                    setIsSuccessModalOpen(true);
                } else {
                    setIsErrorModalOpen(true);
                }
            } catch {
                setIsErrorModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSuccess = () => {
        setIsSuccessModalOpen(false);
        navigate(from, { replace: true });
    };

    const handleRetry = () => {
        setIsErrorModalOpen(false);
        // 재시도 로직
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen theme-bg flex flex-col justify-center items-center py-8">
            {/* Scratcha 로고 */}
            <Link
                to="/"
                className="mb-6 px-4 py-2 rounded-lg hover:bg-[var(--color-bg)] transition-colors duration-200 inline-block"
            >
                <img
                    src="/scratchalogo.png"
                    alt="Scratcha"
                    className="h-16 w-auto mx-auto"
                />
            </Link>

            {/* 개발 모드 표시 */}
            {isDevMode && (
                <div className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                    🔧 개발 모드: 더미 데이터로 로그인합니다
                </div>
            )}

            {/* 개발 모드 계정 정보 */}
            {isDevMode && (
                <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">개발용 계정 정보:</h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <div><strong>Admin 계정:</strong> ID: admin, PW: 12345678, Name: dummyname</div>
                        <div><strong>권한:</strong> admin, user 역할 + 모든 권한</div>
                        <div><strong>일반 계정:</strong> 아무 ID/PW 입력 (80% 성공 확률)</div>
                    </div>
                </div>
            )}

            {/* 보안 경고 메시지 */}
            {location.state?.from && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-red-800 mb-1">🔒 보안 알림</h3>
                    <p className="text-xs text-red-700">
                        대시보드에 접근하려면 로그인이 필요합니다.
                    </p>
                </div>
            )}

            {/* 카드 */}
            <div className="theme-card rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col gap-6 border border-[var(--color-border)]">
                <h2 className="text-2xl font-bold theme-text text-center mb-2">Sign in</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <FormInput
                        id="id"
                        type="text"
                        label="아이디"
                        placeholder="아이디를 입력하세요"
                        value={formData.id}
                        onChange={(e) => handleInputChange('id', e.target.value)}
                        required
                    />
                    <FormInput
                        id="password"
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                    />
                    <FormButton type="submit" className="mt-2" disabled={isLoading}>
                        {isLoading ? '로그인 중...' : '로그인'}
                    </FormButton>
                </form>
                <div className="text-center text-[var(--color-text)]/60 text-sm mt-2">
                    Don&apos;t have an account? <Link to="/signup" className="theme-accent hover:underline">Sign up</Link>
                </div>
            </div>
            {/* 하단 약관/정책 */}
            <div className="mt-10 text-center text-[var(--color-text)]/60 text-sm">
                <Link to="#" className="hover:underline">Terms of Service</Link> and <Link to="#" className="hover:underline">Privacy Policy</Link>
            </div>

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccess}
                title="로그인 성공!"
                message={isDevMode
                    ? "개발 모드로 로그인되었습니다. 더미 데이터를 사용합니다."
                    : "로그인이 완료되었습니다. 대시보드로 이동합니다."
                }
            />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="로그인 실패"
                message="아이디 또는 비밀번호가 올바르지 않습니다. 다시 시도해주세요."
                onRetry={handleRetry}
            />
        </div>
    );
} 