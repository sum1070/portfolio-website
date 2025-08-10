"use client";
import { iconImages } from "@/utils";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { JSX } from "react";
import { TSvgImage } from "@/lib/types";

const SvgImage = ({
    className,
    src,
    alt = "svg"
}: TSvgImage) => {
    return (
        <Image
            className={className}
            alt={alt}
            src={src}
            width={48}
            height={48}
        />
    );
};

// Helper function to create SVG components from iconImages
function createSvgComponent(iconKey: string, iconSrc: string) {
    return ({ className }: { className?: string }) => {
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
        return (
            <Image
                className={className}
                alt={`${iconKey} icon`}
                src={iconSrc}
                width={48}
                height={48}
            />
        );
    };
}

// Generate components from iconImages
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
    Github,
    Discord,
    Email,
    Instagram
} = svgComponents;

