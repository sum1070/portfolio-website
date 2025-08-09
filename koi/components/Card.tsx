import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

interface CardProps {
    cardContainerCN?: string;
    title: string;
    description: React.ReactNode;
    links?: Array<{
        name: string;
        url: string;
        icon?: string;
        iconAlt?: string;
    }>;
    headerBackground?: string;
    headerImage?: string;
    variant?: 'default' | 'compact' | 'feature';
}

const Card = ({ title, description, links, cardContainerCN, headerBackground, headerImage, variant = 'default' }: CardProps) => {
    // --- compact ---
    if (variant === 'compact') {
        return (
            <div className={cn(
                "bg-Mauve2 rounded-lg overflow-hidden shadow-md mb-4 p-4",
                cardContainerCN
            )}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {title}
                </h2>
                <div className="p-1">
                    <div className="mb-4">
                        {description}
                    </div>
                </div>
            </div>
        );
    }

    // --- feature ---
    if (variant === 'feature') {
        return (
            <div className={cn(
                "bg-gradient-to-br from-Mauve2 to-nice-purple1/30 rounded-lg overflow-hidden shadow-md mb-6 p-6 border-l-4 border-nice-purple1",
                cardContainerCN
            )}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                <div className="mb-4 text-lg">{description}</div>
                {links && links.length > 0 && (
                    <>
                        <hr className="border-gray-700 my-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base bg-nice-purple1/20 hover:bg-nice-purple1/40 transition-all duration-200 p-3 rounded-md text-center flex items-center justify-center gap-2 hover:scale-105 hover:shadow-md"
                                >
                                    {link.icon && (
                                        <div className="flex-shrink-0 w-5 h-5 relative">
                                            <Image
                                                src={link.icon}
                                                alt={link.iconAlt || `${link.name} icon`}
                                                width={20}
                                                height={20}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // ---- default ---
    return (
        <div className={cn(
            "bg-Mauve2 rounded-lg overflow-hidden shadow-md mb-6 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]",
            cardContainerCN
        )}>
            {headerImage ? (
                <div className="h-32 w-full relative">
                    <Image
                        src={headerImage}
                        alt={`${title} header`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white px-6">
                            {title}
                        </h2>
                    </div>
                </div>
            ) : (
                <div className={cn("py-4 px-6", headerBackground || "bg-nice-purple1/30")}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                        {title}
                    </h2>
                </div>
            )}
            <div className="p-6">
                <div className="mb-4">
                    {description}
                </div>
                {links && links.length > 0 && (
                    <>
                        <hr className="border-gray-700 my-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base bg-nice-purple1/20 hover:bg-nice-purple1/40 transition-all duration-200 p-3 rounded-md text-center flex items-center justify-center gap-2 hover:scale-105 hover:shadow-md"
                                >
                                    {link.icon && (
                                        <div className="flex-shrink-0 w-5 h-5 relative">
                                            <Image
                                                src={link.icon}
                                                alt={link.iconAlt || `${link.name} icon`}
                                                width={20}
                                                height={20}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;