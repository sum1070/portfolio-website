"use client";
import { useState, useEffect } from 'react';
import { cn, sounds, soundGains } from '@/utils';
import { useMainVolume } from '@/lib/hooks/useMainVolume';
import useSound from 'use-sound';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    // Initialize theme on component mount
    useEffect(() => {
        // Check if user has previously set a preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    };

    // sound effect
    const { volume, isMuted } = useMainVolume();
    const [isClicked, setIsClicked] = useState(false);

    const [switchSound, { stop: stopSwitch }] = useSound(sounds.switch, {
        // volume: isMuted ? 0 : volume,
        volume: isMuted ? 0 : volume * soundGains.se,
    });

    const toggleSound = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 300);
        if (!isMuted) switchSound();
    }

    const handleToggleClick = () => {
        toggleTheme();
        toggleSound();
    };

    return (
        <button
            onClick={handleToggleClick}
            className={cn(
                "relative rounded-full w-12 h-6 flex items-center transition-colors duration-300 focus:outline-none",
                isDark ? "bg-gray-600" : "bg-violet-300"
            )}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span
                className={cn(
                    "inline-block w-5 h-5 transform rounded-full transition-transform duration-300",
                    isDark
                        ? "translate-x-7 bg-gray-200 text-gray-900"
                        : "translate-x-1 bg-white text-yellow-500"
                )}
            >
                {/* Moon or Sun icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 m-0.5"
                >
                    {isDark ? (
                        // Moon icon
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    ) : (
                        // Sun icon
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    )}
                </svg>
            </span>
        </button>
    );
}