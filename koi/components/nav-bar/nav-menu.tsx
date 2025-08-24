"use client";

import React from 'react';
import { cn, navLinks } from '@/utils';
import Link from 'next/link';

interface NavMenuProps {
    containerCN?: string;
    isOpen: boolean;
    onLinkClick?: () => void;
    currentPage?: string; // Add this prop
}

export default function NavMenu({
    containerCN = "",
    isOpen,
    onLinkClick = () => { },
    currentPage,
}: Readonly<NavMenuProps>) {
    // filter nav links
    const filteredNavLinks = currentPage
        ? navLinks.filter(link =>
            !link.href.endsWith(currentPage) &&
            !(currentPage === "MainPage" && link.href.endsWith("#MainPage"))
        )
        : navLinks;

    return (
        <div
            id='mobile-nav'
            className={cn(
                "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                containerCN,
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-[0.01]"
            )}
        >
            <div id='mobile-nav-Links' className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-milky-white/70 dark:bg-dark-black/70 backdrop-blur-sm">
                {filteredNavLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "block px-3 py-2 rounded-md text-base font-medium transform transition-all duration-200",
                            "text-nice-purple2 hover:text-nice-purple1 hover:bg-nice-purple0/10",
                            isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-[0.01]"
                        )}
                        style={{ transitionDelay: isOpen ? `${100 * (navLinks.indexOf(link) + 1)}ms` : "0ms" }}
                        onClick={onLinkClick}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
