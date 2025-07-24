import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center py-8">
            {/* 로고 */}
            <div className="mb-6">
                <img src="https://assets-global.website-files.com/63f5c1b7b2b0b2b2b2b0b2b2/63f5c1b7b2b0b2b2b2b0b2b2_cursor-logo.png" alt="Cursor Logo" className="w-12 h-12 mx-auto" />
            </div>
            {/* 카드 */}
            <div className="bg-[#18181b] rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-white text-center mb-2">Sign in</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="text-sm text-white font-medium" htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Your email address" className="rounded-md px-4 py-3 bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="mt-2 bg-white text-black font-semibold rounded-md py-3 hover:bg-gray-100 transition">Continue</button>
                </form>
                <div className="flex items-center gap-2 text-gray-500 text-xs my-2">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span>OR</span>
                    <div className="flex-1 h-px bg-gray-700" />
                </div>
                <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-3 justify-center w-full border border-gray-700 rounded-md py-3 text-white font-semibold hover:bg-gray-900 transition">
                        <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24" /><path d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z" fill="#fbbc05" /><path d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.6 4 24 4c-7.7 0-14.2 4.3-17.7 10.7z" fill="#ea4335" /><path d="M24 44c5.8 0 10.7-1.9 14.6-5.1l-6.7-5.5C29.7 35.7 26.9 37 24 37c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C9.7 41.1 16.3 44 24 44z" fill="#34a853" /><path d="M44.5 20H24v8.5h11.7c-1.1 2.9-3.3 5.2-6.2 6.6l.1.1 7 5.5c-2.1 2-4.8 3.3-7.8 3.3-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.5 29.6 4 24 4c-7.7 0-14.2 4.3-17.7 10.7z" fill="#4285f4" /></g></svg>
                        Continue with Google
                    </button>
                    <button className="flex items-center gap-3 justify-center w-full border border-gray-700 rounded-md py-3 text-white font-semibold hover:bg-gray-900 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" /></svg>
                        Continue with GitHub
                    </button>
                    <button className="flex items-center gap-3 justify-center w-full border border-gray-700 rounded-md py-3 text-white font-semibold hover:bg-gray-900 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c-.36-.36-.86-.56-1.37-.56-.51 0-1.01.2-1.37.56l-1.62 1.62c-.36.36-.56.86-.56 1.37 0 .51.2 1.01.56 1.37l1.62 1.62c.36.36.86.56 1.37.56.51 0 1.01-.2 1.37-.56l1.62-1.62c.36-.36.56-.86.56-1.37 0-.51-.2-1.01-.56-1.37l-1.62-1.62zm-4.95 4.95c-.36-.36-.86-.56-1.37-.56-.51 0-1.01.2-1.37.56l-1.62 1.62c-.36.36-.56.86-.56 1.37 0 .51.2 1.01.56 1.37l1.62 1.62c.36.36.86.56 1.37.56.51 0 1.01-.2 1.37-.56l1.62-1.62c.36-.36.56-.86.56-1.37 0-.51-.2-1.01-.56-1.37l-1.62-1.62zm-4.95 4.95c-.36-.36-.86-.56-1.37-.56-.51 0-1.01.2-1.37.56l-1.62 1.62c-.36.36-.56.86-.56 1.37 0 .51.2 1.01.56 1.37l1.62 1.62c.36.36.86.56 1.37.56.51 0 1.01-.2 1.37-.56l1.62-1.62c.36-.36.56-.86.56-1.37 0-.51-.2-1.01-.56-1.37l-1.62-1.62z" /></svg>
                        Continue with Apple
                    </button>
                </div>
                <div className="text-center text-gray-400 text-sm mt-2">
                    Don&apos;t have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                </div>
            </div>
            {/* 하단 약관/정책 */}
            <div className="mt-10 text-center text-gray-400 text-sm">
                <Link to="#" className="hover:underline">Terms of Service</Link> and <Link to="#" className="hover:underline">Privacy Policy</Link>
            </div>
        </div>
    );
} 