"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn, navLinks } from '@/utils';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';

interface NavbarProps {
    currentPage?: string;
}

export default function Navbar({ currentPage }: Readonly<NavbarProps>) {
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

    // filter curr page if params is provided
    const filteredNavLinks = currentPage
        ? navLinks.filter(link =>
            !link.href.endsWith(currentPage) &&
            !(currentPage === "MainPage" && link.href.endsWith("#MainPage"))
        )
        : navLinks;

    return (
        <nav
            id='navbar'
            className={cn(
                "fixed w-full z-50 transition-all duration-200 ease-in-out ",
                isScrolled ? "rounded-b-xl bg-milky-white backdrop-blur-md shadow-md " : "bg-transparent",
            )}>
            <div id='nav-container' className="p-2 flex flex-row justify-between text-xl " >
                <Link
                    href="/"
                    id='nav-logo'
                    className={cn(
                        navFontClassName,
                        "ml-4",
                        "text-nice-purple3",
                        "hover:font-black transition-all duration-300 ease-in-out"
                    )} >
                    Meow
                </Link>
                {/* desktop buttons */}
                <div id='desktop-nav' className="hidden md:flex flex-row gap-4 mr-4">
                    {filteredNavLinks.map((link) => (
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
                <Hamburger
                    containerCN="md:hidden flex flex-row gap-4 mr-4"
                    buttonCN={navFontClassName}
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                />
            </div>
            {/* mobile menu */}
            <NavMenu
                isOpen={isOpen}
                onLinkClick={() => setIsOpen(false)}
                currentPage={currentPage}
            />
        </nav>
    );
}
