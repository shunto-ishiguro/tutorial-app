// components/Footer.tsx
import React from 'react';
import { FaXTwitter, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-5 text-center mt-auto w-full">
            <div className="flex justify-center items-center gap-5 mb-4">
                <div className="flex items-center justify-center">
                    <a href="mailto:your_email@example.com" aria-label="お問い合わせ" className="hover:text-blue-500 transition-colors">
                        <FaEnvelope size={30} />
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    <a href="https://twitter.com/your_twitter_account" target="_blank" rel="noopener noreferrer" aria-label="X（旧Twitter）" className="hover:text-blue-500 transition-colors">
                        <FaXTwitter size={30} />
                    </a>
                </div>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Your Company. All Rights Reserved.</p>
        </footer>
    );
};
