"use client";
import { cn } from '@/utils';
import React from 'react';

export function LiquidGlass(isHovering: boolean, mousePosition: { x: number; y: number; }) {
    return <div
        id='liquid-glass-effect'
        className={cn(
            "absolute inset-0 transition-all duration-500 z-10",
            "rounded-[2rem]",
            "opacity-80 group-hover:opacity-100"
        )}
        style={{
            background: isHovering ?
                `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)` :
                'none',
            backdropFilter: 'blur(1.5px)',
            WebkitBackdropFilter: 'blur(1.5px)',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
        }}
    >
        <div
            id='dynamic-reflection'
            className="absolute inset-0 opacity-70"
            style={{
                background: isHovering ?
                    `linear-gradient(
                                    145deg,
                                    transparent 0%,
                                    rgba(255, 255, 255, 0.4) ${mousePosition.x - 20}%, 
                                    rgba(255, 255, 255, 0.1) ${mousePosition.x + 20}%, 
                                    transparent 100%
                                )` : 'none',
                transition: 'background 0.3s ease'
            }}
        ></div>
        <div
            id='glass-border'
            className={cn(
                "absolute inset-0 rounded-[2rem] pointer-events-none p-1"
            )}
            style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                borderRadius: '2rem',
            }}
        ></div>

        <div
            // colorful bg mask
            className="absolute inset-0 opacity-11 mix-blend-overlay "
            style={{
                background: 'linear-gradient(to right, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)',
            }} />

        <div className="absolute inset-0 pointer-events-none">
            <div id='tr-white-dot' className='opacity-30 group-hover:opacity-70'>
                <div
                    className="absolute top-2 right-5 w-3 h-3  rounded-full blur-xs bg drop-shadow-milky-white drop-shadow-lg " />
                <div
                    className="absolute top-2 right-5 w-3 h-3 rounded-full blur-[2px] bg-linear-90 from-milky-white to-milky-white/40 " />
            </div>
            <div
                className="absolute rotate-10 -top-4 -right-10 blur-md "
                style={{
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.7) 0%, transparent 70%)',
                }}
            ></div>

            <div
                id='bl-white-reflection'
                className="absolute w-[40%] h-[20%] top-0 left-1/12 blur-[1px] z-10 -rotate-25 "
                style={{
                    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, transparent 100%)',
                    borderRadius: '50%',
                    transform: 'skew(135deg, 0)',
                    opacity: isHovering ? 0.5 : 0.2,
                    transition: 'opacity 0.5s ease'
                }} />
            <div
                id='bl-white-reflection'
                className="absolute w-[90%] h-[20%] bottom-1/12 right-2/12 blur-[4px] z-10 -rotate-215 bg-white/25"
                style={{
                    borderRadius: '50%',
                    transform: 'skew(25deg, 0)',
                    opacity: isHovering ? 0.5 : 0.2,
                    transition: 'opacity 0.5s ease'
                }} />

            <div
                id='top-white-highlight'
                className="absolute w-[70%] h-[2px] top-[3px] left-1/6 "
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                    opacity: isHovering ? 1 : 0.4,
                    transition: 'opacity 0.5s ease'
                }} />

            {/* Right edge highlight that follows mouse */}
            <div
                className="absolute"
                style={{
                    width: '2px',
                    height: '40%',
                    right: '3px',
                    top: `${mousePosition.y - 20}%`,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                    opacity: isHovering ? 0.9 : 0,
                    transition: 'top 0.3s ease-out, opacity 0.3s ease'
                }}
            ></div>
        </div>
    </div>;
}
