"use client";
import { cn, sounds } from '@/utils';
import React, { useState, useRef, useEffect } from 'react';
import { LiquidGlass } from './liquid-glass';
import { useMainVolume } from '@/lib/hooks/useMainVolume';
import Link from 'next/link';
import useSound from 'use-sound';
import ContactPills from './contact-pills';
import { TButton } from '@/lib/types';

interface ButtonProps {
    href: string;
    className?: string;
    button?: TButton;
    title?: string;
    titleCN?: string;
    background?: string;
    btnSize?: string;
}

const NavButton = ({
    href,
    className,
    button,
    title = "Koito",
    titleCN,
    background = "",
    btnSize
}: ButtonProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const defaultBtnSize = " w-56 h-28 lg:w-64 lg:h-36 ";

    // get window size
    useEffect(() => {
        const updateDimensions = () => {
            if (buttonRef.current) {
                setButtonDimensions({
                    width: buttonRef.current.offsetWidth,
                    height: buttonRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isHovering) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    // ratio the bg size
    const isWide = buttonDimensions.width > buttonDimensions.height;
    const bgSize = isWide
        ? Math.max(300, buttonDimensions.width / buttonDimensions.height * 300)
        : 300;

    // sound effect
    const { volume, isMuted } = useMainVolume();
    const [isClicked, setIsClicked] = useState(false);

    const [bell, { stop: stopBell }] = useSound(sounds.bell, {
        volume: isMuted ? 0 : volume,
    });

    const [bubble, { stop: stopBubble }] = useSound(sounds.bubble, {
        volume: isMuted ? 0 : volume,
    });

    const resetDelay = 300; // ms

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, resetDelay);
    };

    return (
        <Link className="relative rounded-[2rem] " href={href} passHref >
            <button
                ref={buttonRef}
                className={cn(
                    btnSize || defaultBtnSize,
                    "relative overflow-hidden rounded-[2rem] group shadow-xl shadow-cyan-500 ",
                    "transition-all duration-1000 ease-in-out hover:scale-110 ",
                    "bg-[rgb(193,228,248)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ",
                    className,
                )}
                style={{
                    boxShadow: "#64646f33 0px 7px 29px 0px",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setIsHovering(false);
                    stopBell();
                    stopBubble();
                }}
                onMouseDown={() => {
                    if (!isMuted) bell();
                }}
                onMouseEnter={() => {
                    setIsHovering(true);
                    if (!isMuted) bubble();
                }}
                tabIndex={0}
                onClick={handleClick}
            >
                <div id='nav-btn-BG-container' className="absolute inset-0 overflow-hidden rounded-[2rem] ">
                    <div
                        id='nav-btn-BG'
                        className={cn(
                            "absolute ",
                            background || " bg-gradient-to-r from-[#ff0077] via-[#ddbaff] to-[#2e4dff] ",
                            "rounded-[40rem] ",
                            "filter blur-[8px] ",
                            "[animation:rotation_6s_linear_infinite] ",
                        )}
                        style={{
                            width: `${bgSize}%`,
                            height: `${bgSize}%`,
                            top: `-${(bgSize - 100) / 2}%`,
                            left: `-${(bgSize - 100) / 2}%`,
                        }}
                    />
                </div>

                {LiquidGlass(isHovering, mousePosition)}
                <div
                    className={cn(
                        "absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-700 ease-in-out z-20",
                        titleCN,
                        "font-titillium-web text-3xl",
                        button === 'contact' && "group-hover:opacity-0"
                    )}
                >
                    {title}
                </div>

                {button === 'contact' && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
                        <ContactPills />
                    </div>
                )}
            </button>
        </Link>
    );
}

export default NavButton;
