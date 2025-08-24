"use client";
import { iconImages } from "@/utils";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { JSX, useEffect, useState } from "react";

function createSvgComponent(iconKey: string, iconSrc: string) {
    return ({ className }: { className?: string }) => {
        const [isDarkMode, setIsDarkMode] = useState(false);

        // Check for dark mode
        useEffect(() => {
            const updateThemeMode = () => {
                const isDark = document.documentElement.classList.contains('dark');
                setIsDarkMode(isDark);
            };

            // Initial check
            updateThemeMode();

            // Set up observer to detect theme changes
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        updateThemeMode();
                    }
                });
            });

            observer.observe(document.documentElement, { attributes: true });

            return () => observer.disconnect();
        }, []);

        // Handle Lottie animations
        if (iconKey === 'sleepZZZ') {
            return (
                <DotLottieReact
                    className={className}
                    src="https://lottie.host/0e433bf9-2680-41ec-88d5-996562f0e561/zIA3MnTsh5.lottie"
                    loop
                    autoplay
                />
            );
        }
        if (iconKey === 'zzzBlue') {
            return (
                <DotLottieReact
                    className={className}
                    src="https://lottie.host/a7b12d49-1bb6-42c7-b5b4-45fe28041072/TWB7LL1u37.lottie"
                    loop
                    autoplay
                />
            );
        }

        // For regular SVGs, determine which version to use based on dark mode
        // Automatically check for dark version without needing a specific color
        const imageSrc = isDarkMode
            ? `${iconSrc.split('.')[0]}-dark.svg`
            : iconSrc;

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
        [componentName]: createSvgComponent(key, src)
    };
}, {} as Record<string, ({ className }: { className?: string }) => JSX.Element>);

export const {
    NekoSleep,
    SleepZZZ,
    Attr4,
    Medal,
    Watching,
    Cat1,
    ArrowDown,
    Sleepy,
    ZZZBlue,
} = svgComponents;

