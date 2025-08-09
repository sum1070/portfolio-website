"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn, navLinks } from '@/lib/utils';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };
        window.addEventListener('scroll', handleScroll);
        // cleanup to allow run for multiple times
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navFontColor = "text-nice-purple2";
    const navFontClassName = "px-3 py-2 rounded-md font-medium transition-colors " + navFontColor;

    return (
        <nav
            id='navbar'
            className={cn(
                "fixed w-full z-50 transition-all duration-200 ease-in-out ",
                isScrolled ? "bg-milky-white/80 backdrop-blur-sm shadow-md " : "bg-milky-white bg-opacity-25"
            )}>
            <div id='nav-container' className="p-2 flex flex-row justify-between text-xl " >
                <Link
                    href="/"
                    id='nav-logo'
                    className={cn(
                        navFontClassName,
                        "ml-4",
                        "hover:font-black transition-all duration-300 ease-in-out"
                    )} >
                    Meow
                </Link>
                {/* <div className="flex flex-row gap-4">
                    <div>pages</div>
                    <div>pages</div>
                    <div>pages</div>
                </div> */}
                {/* desktop buttons */}
                <div id='desktop-nav' className="hidden md:flex flex-row gap-4 mr-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                navFontClassName,
                                "hover:text-purple2 hover:bg-purple0/10"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                </div>
                {/* mobile hamburger */}
                <div className="md:hidden flex flex-row gap-4 mr-4">
                    <button
                        onClick={toggleMenu}
                        className={cn(
                            navFontClassName,
                            " hover:text-nice-purple1 hover:bg-nice-purple0/10",
                            "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nice-purple3"
                        )}
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>

            </div>

            {/* mobile menu */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-milky-white/90 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "block px-3 py-2 rounded-md text-base font-medium",
                                "text-nice-purple2 hover:text-nice-purple1 hover:bg-nice-purple0/10"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
