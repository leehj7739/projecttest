import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className="w-full theme-card border-t border-[var(--color-card)] pt-12 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-12">
                {/* 좌측: 이메일, 소셜 */}
                <div className="flex flex-col gap-4 min-w-[180px]">
                    <span className="font-medium theme-text">hi@cursor.com</span>
                    <SocialLinks />
                    <span className="text-xs theme-accent mt-4">© 2025 Made by <span className="font-semibold">Anysphere</span></span>
                </div>
                {/* 중앙: 카테고리별 링크 */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <div className="font-semibold theme-text mb-2">Product</div>
                        <ul className="space-y-1 theme-accent">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Enterprise</a></li>
                            <li><a href="#">Downloads</a></li>
                            <li><a href="#">Students</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold theme-text mb-2">Resources</div>
                        <ul className="space-y-1 theme-accent">
                            <li><a href="#">Docs</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Forum</a></li>
                            <li><a href="#">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold theme-text mb-2">Company</div>
                        <ul className="space-y-1 theme-accent">
                            <li><a href="#">Anysphere</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Customers</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold theme-text mb-2">Support</div>
                        <ul className="space-y-1 theme-accent">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Status</a></li>
                            <li><a href="#">API</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
} 