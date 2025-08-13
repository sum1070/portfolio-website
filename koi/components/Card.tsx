import { cn } from '@/utils';
import React from 'react';
import Image from 'next/image';
import ClientLink from './ClientLink';

interface CardProps {
    cardContainerCN?: string;
    title: string;
    description: React.ReactNode;
    links?: Array<{
        name: string;
        url: string;
        icon?: string;
        iconAlt?: string;
        isSensitive?: boolean;  // Add this property
    }>;
    headerBackground?: string;
    headerImage?: string;
    variant?: 'default' | 'compact' | 'feature';
    backgroundColor?: string;
    bgGradient?: boolean;
    animated?: boolean;
}

const gradientBGCN = "bg-gradient-to-br from-Mauve2 from-30% to-95% to-sky-300 ";
const defaultBGCN = "bg-Mauve2";

const Card = ({
    title,
    description,
    links,
    cardContainerCN,
    headerBackground,
    headerImage,
    variant = 'default',
    backgroundColor,
    bgGradient = true,
    animated = true
}: CardProps) => {
    if (!backgroundColor) {
        backgroundColor = bgGradient ? gradientBGCN : defaultBGCN;
    }

    const animationClasses = animated
        ? "transition-all ease-in-out duration-200 hover:shadow-xl hover:translate-y-[-5px]"
        : "";

    // --- compact ---
    if (variant === 'compact') {
        return (
            <div className={cn(
                "rounded-lg overflow-hidden shadow-md mb-2 p-4 pb-2",
                backgroundColor,
                cardContainerCN,
                animated && "hover:scale-[1.02] ", animationClasses
            )}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {title}
                </h3>
                <div className="p-1">
                    <div className="mb-2">
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
                "group relative rounded-lg overflow-hidden shadow-md mb-6 p-6",
                backgroundColor,
                cardContainerCN,
                animated && "transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl"
            )}>
                {animated && (
                    <div className="absolute inset-0 rounded-lg transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                        style={{
                            boxShadow: "inset 8px -8px 0 0 rgba(116, 107, 166, 1)",
                            pointerEvents: "none"
                        }}>
                    </div>
                )}

                <div className={cn(
                    "relative z-10",
                    animated && "transition-transform duration-300 ease-in-out group-hover:translate-x-[4px] group-hover:translate-y-[-4px]"
                )}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{title}</h3>
                    <div className="mb-4 text-lg">{description}</div>
                    {links && links.length > 0 && (
                        <>
                            <hr className="border-gray-700 my-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {links.map((link) => (
                                    <ClientLink
                                        key={link.name}
                                        name={link.name}
                                        url={link.url}
                                        icon={link.icon}
                                        iconAlt={link.iconAlt}
                                        isSensitive={link.isSensitive}
                                        className="text-sm md:text-base bg-nice-purple1/20 hover:bg-nice-purple1/40 transition-all duration-200 p-3 rounded-md text-center flex items-center justify-center gap-2 hover:scale-105 hover:shadow-md"
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // ---- default ---
    return (
        <div className={cn(
            backgroundColor,
            "rounded-lg overflow-hidden shadow-md mb-6",
            cardContainerCN,
            animated && "transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
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
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white px-6">
                            {title}
                        </h3>
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
                                <ClientLink
                                    key={link.url}
                                    name={link.name}
                                    url={link.url}
                                    icon={link.icon}
                                    iconAlt={link.iconAlt}
                                    isSensitive={link.isSensitive}
                                    className="text-sm md:text-base bg-nice-purple1/20 hover:bg-nice-purple1/40 transition-all duration-200 p-3 rounded-md text-center flex items-center justify-center gap-2 hover:scale-105 hover:shadow-md"
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;