"use client";
import { buttonImages, cn, sounds } from '@/lib/utils';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TButton } from '@/lib/types';
import useSound from 'use-sound';
import { useMainVolume } from '@/lib/hooks/useMainVolume';

interface ButtonProps {
    type: TButton;
    href: string;
    className?: string;
}

const Button = ({ type, href, className }: ButtonProps) => {
    const { volume, isMuted } = useMainVolume();
    const [isClicked, setIsClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

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

    const buttonClasses = "w-3xs h-auto xs:w-auto xs:h-auto";
    return (
        <Link href={href} passHref>
            <button
                className={cn(
                    "relative focus:outline-none transition-transform",
                    "active:scale-95",
                    "transition-all duration-300",
                    className,
                )}
                onClick={handleClick}
                onMouseDown={() => {
                    if (!isMuted) bell();
                }}
                onMouseEnter={() => {
                    setIsHovering(true);
                    if (!isMuted) bubble();
                }}
                onMouseLeave={() => {
                    setIsHovering(false);
                    stopBell();
                    stopBubble();
                }}
            >
                <Image
                    src={isClicked ? buttonImages[type].clicked : buttonImages[type].normal}
                    alt={`${type} button`}
                    width={150}
                    height={50}
                    className={cn(
                        buttonClasses,
                        "transition-all duration-200 ease-in-out",
                        "hover:scale-105 focus:drop-shadow-xl",
                        "focus-visible:scale-105",
                        "group-focus-visible:[&+img]:hidden",
                    )}
                />
            </button>
        </Link>
    );
};

export default Button;