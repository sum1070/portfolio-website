"use client";
import { cn, iconImages } from "@/utils";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

const ZZZ_LETTERS = [
    { d: "M.525 412.7H60.889L0 489.258V502.514H116.931V467.749H59.208L118.25 393.521V377.934H.525Z", from: [120.131, 380.787], to: [8.977, 494.74] },
    { d: "M150.434 244.368H225.888L149.775 340.068V356.629H295.938V313.175H223.79L297.591 220.39V200.914H150.434Z", from: [294.731, 210.485], to: [158.513, 354.679] },
    { d: "M512 9.486H335.41V61.629H425.954L334.617 176.471V196.337H510.013V144.194H423.438L512 32.851Z", from: [516.93, 13.586], to: [336.04, 193.009] },
];

const ZZZ_COLOURS: Record<string, [string, string]> = {
    sleepZZZ: ["#4c2966", "#814aa8"],
    zzzBlue: ["#22506b", "#0c4a6e"],
};

const zzzGradientId = (key: string, i: number) => `zzz-${key}-${i}`;

export function ZzzGradients() {
    return (
        <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
            <defs>
                {Object.entries(ZZZ_COLOURS).flatMap(([key, [start, end]]) => ZZZ_LETTERS.map(({ from, to }, i) => (
                    <linearGradient key={zzzGradientId(key, i)} id={zzzGradientId(key, i)} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
                        <stop offset="0" stopColor={start} />
                        <stop offset="1" stopColor={end} />
                    </linearGradient>
                )))}
            </defs>
        </svg>
    );
}

function createZzzComponent(key: string) {
    return ({ className }: { className?: string, darkModeEnabled?: boolean }) => (
        <span aria-hidden="true" className={cn("inline-block leading-none", className)}>
            <svg viewBox="-250 0 1000 500" className="block w-full h-auto">
                <g transform="matrix(0.976563 0 0 1 0 -6)">
                    {ZZZ_LETTERS.map(({ d }, i) => (
                        <path key={i} d={d} fill={`url(#${zzzGradientId(key, i)})`} className={`zzz-${i + 1}`} />
                    ))}
                </g>
            </svg>
        </span>
    );
}

function createSvgComponent(iconKey: string, iconSrc: string) {
    return ({ className, darkModeEnabled = false }: { className?: string, darkModeEnabled?: boolean }) => {
        const [isDarkMode, setIsDarkMode] = useState(false);
        const [darkImageExists, setDarkImageExists] = useState(false);

        // Create path for dark version
        const darkSrc = `${iconSrc.split('.')[0]}-dark.svg`;

        // Check for dark mode and if dark version exists
        const handleMutations: MutationCallback = (mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    updateThemeMode();
                }
            });
        };

        const updateThemeMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        useEffect(() => {
            // Check if dark image exists
            if (darkModeEnabled) {
                fetch(darkSrc, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            setDarkImageExists(true);
                        }
                    })
                    .catch(() => {
                        // Image doesn't exist or couldn't be fetched
                        console.log(`Dark version of ${iconKey} not found`);
                    });
            }

            // Initial check
            updateThemeMode();

            // Set up observer to detect theme changes
            const observer = new MutationObserver(handleMutations);

            observer.observe(document.documentElement, { attributes: true });

            return () => observer.disconnect();
        }, [darkModeEnabled, darkSrc, iconKey]);

        // Determine which SVG to use based on dark mode and availability
        const imageSrc = (darkModeEnabled && isDarkMode && darkImageExists) ? darkSrc : iconSrc;

        return (
            <Image
                className={className}
                alt={`${iconKey} icon`}
                src={imageSrc}
                priority={true}
                width={48}
                height={48}
            />
        );
    };
}

const svgComponents = Object.entries(iconImages).reduce((acc, [key, src]) => {
    // convert to pascal case
    const componentName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, '$1');
    return {
        ...acc,
        [componentName]: ZZZ_COLOURS[key] ? createZzzComponent(key) : createSvgComponent(key, src)
    };
}, {} as Record<string, ({ className, darkModeEnabled }: { className?: string, darkModeEnabled?: boolean }) => JSX.Element>);

export const {
    SleepZZZ,
    Attr4,
    Medal,
    Watching,
    Cat1,
    ArrowDown,
    Sleepy,
    ZZZBlue,
} = svgComponents;

