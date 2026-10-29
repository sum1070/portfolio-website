"use client";
import { useState, useEffect } from 'react';
import { cn, sounds, soundGains } from '@/utils';
import { useMainVolume } from '@/lib/hooks/useMainVolume';
import useSound from 'use-sound';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [hasToggled, setHasToggled] = useState(false);

    useEffect(() => {
        setIsDark(sessionStorage.getItem('theme') === 'dark');
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            sessionStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            sessionStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
        setHasToggled(true);
    };

    // sound effect
    const { volume, sfxMuted } = useMainVolume();
    const [isClicked, setIsClicked] = useState(false);

    const [switchSound, { stop: stopSwitch }] = useSound(sounds.switch, {
        // volume: isMuted ? 0 : volume,
        volume: sfxMuted ? 0 : volume * soundGains.se,
    });

    const toggleSound = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 300);
        if (!sfxMuted) switchSound();
    }

    const handleToggleClick = () => {
        toggleTheme();
        toggleSound();
    };

    return (
        <button
            onClick={handleToggleClick}
            className={cn(
                "theme-toggle w-16 h-8 shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300",
                hasToggled && (isDark ? "to-dark" : "to-light")
            )}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        />
    );
}