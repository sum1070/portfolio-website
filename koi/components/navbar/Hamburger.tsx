"use client";

import { cn } from '@/utils';
import React from 'react';

interface HamburgerProps {
    containerCN?: string;
    buttonCN?: string;
    isOpen: boolean;

    toggleMenu: () => void;
}

const HamburgerCN = "block w-6 h-6";

export default function Hamburger({
    containerCN = "",
    buttonCN = "",
    isOpen,
    toggleMenu,
}: Readonly<HamburgerProps>) {
    return (
        <div className={cn(containerCN)}>
            <button
                onClick={toggleMenu}
                className={cn(
                    buttonCN,
                    "hover:text-nice-purple1 hover:bg-nice-purple0/10",
                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nice-purple3"
                )}
                aria-expanded={isOpen}
            >
                <span className="sr-only">main menu</span>
                {!isOpen ? (
                    // hamburger icon
                    <svg
                        className={`${HamburgerCN}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                ) : (
                    // X
                    <svg
                        className={`${HamburgerCN}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </button>
        </div>
    );
}
