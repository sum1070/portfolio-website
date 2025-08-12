"use client";
import { cn, sounds } from '@/utils';
import FetchImage from '@/utils/fetchImage';
import React, { useState, useEffect } from 'react';
import { LiquidGlass } from './LiquidGlass';
import { useMainVolume } from '@/lib/hooks/useMainVolume';
import Link from 'next/link';
import useSound from 'use-sound';
import ContactPills from './ContactPills';
import { TButton } from '@/lib/types';

interface ButtonProps {
    href: string;
    className?: string;
    button?: TButton;
    title?: string;
    titleCN?: string;
}

const NavButton = ({ href, className, button, title="title", titleCN }: ButtonProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);


    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isHovering) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

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
                className={cn(
                    "relative overflow-hidden rounded-[2rem] group w-56 h-28 lg:w-64 lg:h-36  shadow-xl shadow-cyan-500  ",
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
                <div id='nav-btn-BG-container' className="absolute inset-0 overflow-hidden">
                    <div
                        id='nav-btn-BG'
                        className={cn(
                            "absolute -top-[75%] -left-[75%] w-[250%] h-[250%] ",
                            "bg-gradient-to-r from-[#ff0077] via-[#ddbaff] to-[#2e4dff] ",
                            "rounded-[40rem] ",
                            "filter blur-[8px] ",
                            "[animation:rotation_6s_linear_infinite] ",

                        )}
                    />
                </div>

                {LiquidGlass(isHovering, mousePosition)}

                {/* title */}
                <div
                    className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-700 ease-in-out group-hover:opacity-0 z-20"
                >
                    <div className={cn(titleCN, "font-titillium-web text-3xl ")}>
                        {title}
                    </div>
                </div>

                {/* only show < ContactPills/> if button is "contact" */}
                {button === 'contact' && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <ContactPills />
                    </div>
                )}
            </button>
        </Link>
    );
}

export default NavButton;
