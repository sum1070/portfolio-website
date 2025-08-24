"use client";

import React from 'react';
import { cn, navLinks } from '@/utils';
import Link from 'next/link';
import ThemeToggle from '../ui/theme-toggle';

interface NavMenuProps {
    containerCN?: string;
    isOpen: boolean;
    onLinkClick?: () => void;
    currentPage?: string;
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
                "bg-milky-white/60 dark:bg-dark-black/70 backdrop-blur-sm",
                "rounded-xl p-4",
                containerCN,
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-[0.01]"
            )}
        >
            <div id='mobile-nav-Links' className="flex flex-col pt-2 pb-8">
                {filteredNavLinks.map((link, index) => (
                    <React.Fragment key={link.name}>
                        <Link
                            href={link.href}
                            className={cn(
                                "block px-3 py-2 rounded-md text-lg font-medium transform transition-all duration-200",
                                "text-nice-purple2 hover:text-phlox hover:bg-pale-purple2/70",
                                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-[0.01] "
                            )}
                            style={{ transitionDelay: isOpen ? `${100 * (navLinks.indexOf(link) + 1)}ms` : "0ms" }}
                            onClick={onLinkClick}
                        >
                            {link.name}
                        </Link>
                        {index < filteredNavLinks.length - 1 && (
                            <hr
                                className={cn(
                                    "border-nice-purple1/30 dark:border-nice-purple3/30 mx-2 my-1",
                                    "transform transition-all duration-200",
                                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                                )}
                                style={{
                                    transitionDelay: isOpen ? `${100 * (navLinks.indexOf(link) + 1) + 50}ms` : "0ms"
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex items-center justify-center py-3.5 px-3">
                <ThemeToggle />

            </div>
        </div>
    )
}
