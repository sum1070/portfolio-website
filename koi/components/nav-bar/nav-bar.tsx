"use client";

import React, { useEffect, useState } from 'react';
import { cn, navLinks } from '@/utils';
import Hamburger from './hamburger';
import NavMenu from './nav-menu';
import { ThemeToggle, TransitionLink, VolumeControl } from "@/components";

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

    const navFontColor = "text-nice-purple2 ";
    const navFontClassName = "px-3 py-2 rounded-md transition-colors " + navFontColor;
    const desktopOnly = "hidden md:flex ";
    const onMobileOnly = "flex md:hidden ";

    // filter curr page if params is provided
    const filteredNavLinks = currentPage
        ? navLinks.filter(link => !link.href.endsWith(currentPage))
        : navLinks;

    return (
        <nav
            id='navbar'
            className={cn(
                "fixed w-full z-50 transition-all duration-200 ease-in-out ",
                isScrolled ? "rounded-b-xl bg-milky-white dark:bg-dark-black backdrop-blur-md shadow-md " : "bg-transparent",
            )}>
            <div id='nav-container' className="p-2 flex flex-row justify-between text-xl " >
                <div id='nav-volume' className="ml-4 flex items-center">
                    <VolumeControl variant="nav" />
                </div>
                <div
                    id='desktop-nav'
                    className={cn(desktopOnly, "flex-row gap-4 xl:gap-8")}
                >
                    {filteredNavLinks.map((link) => (
                        <TransitionLink
                            key={link.name}
                            href={link.href}
                            className={cn(
                                navFontClassName,
                                "font-medium ",
                                "hover:text-purple2 hover:bg-purple-400/10"
                            )}
                        >
                            {link.name}
                        </TransitionLink>
                    ))}
                </div>
                {/* desktop buttons */}
                <div className={cn(desktopOnly, "flex-row gap-4 mr-4")}>
                    <div className='flex items-center justify-center py-3.5 px-3'>
                        <ThemeToggle />
                    </div>
                </div>
                {/* mobile hamburger */}
                <Hamburger
                    containerCN={cn(onMobileOnly, "flex-row gap-4 mr-4")}
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
