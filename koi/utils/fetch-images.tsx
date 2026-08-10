import Image from 'next/image';
import React, { useEffect, useState, useMemo } from 'react';
import { iconMap } from './image-utils';
import { cn } from '@/utils';
import { TBaseProps } from '@/lib/types';
import { getIconComponent } from './icon-mapping';
import { FaQuestion } from "react-icons/fa";

// global cache for SVG content to prevent duplicate fetches
const svgCache: Record<string, string> = {};

interface FetchImageProps extends TBaseProps {
    src: string;
    className?: string;
    alt?: string;
    size?: number;
    useReactIcon?: boolean;
    iconColor?: string;
}

////////////// HELPER FUNCTION //////////////
const SVGComponent = ({
    src,
    className,
    style,
    size = 24
}: {
    src: string,
    className?: string,
    style?: React.CSSProperties,
    size?: number
}) => {
    const [svgContent, setSvgContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSVG = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // check if SVG content is already in cache
                if (svgCache[src]) {
                    setSvgContent(svgCache[src]);
                    setIsLoading(false);
                    return;
                }

                const res = await fetch(src);
                if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);

                const text = await res.text();
                // store in cache
                svgCache[src] = text;
                setSvgContent(text);
            } catch (err) {
                console.error(`Error loading SVG: ${src}`, err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSVG();
    }, [src]);

    if (isLoading) {
        return (
            <div className={className} style={{ ...style, width: size, height: size }}>
            </div>
        );
    }

    if (error || !svgContent) {
        return (
            <div className={className} style={{ ...style, width: size, height: size }}>
                {/* Fallback icon or empty state */}
                <FaQuestion style={{ width: '100%', height: '100%' }} />
            </div>
        );
    }

    // wrapper div with dangerouslySetInnerHTML to render the SVG
    return (
        <div
            className={className}
            style={{ ...style, width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

const FetchImage = ({
    src,
    style,
    className,
    size = 24,
    alt = `${src} icon`,
    useReactIcon = true,
    iconColor = "#0c4a6e",
}: FetchImageProps) => {
    const lowerSrc = src.toLowerCase();
    const imageSrc = useMemo(() =>
        (lowerSrc in iconMap) ? iconMap[lowerSrc as keyof typeof iconMap] : src,
        [lowerSrc, src]
    );

    // required to use react icon and not in icon map
    if (useReactIcon && !(lowerSrc in iconMap)) {
        const iconResult = getIconComponent(lowerSrc, FaQuestion);

        // check if it's a React component (function)
        if (typeof iconResult === 'function') {
            const IconComponent = iconResult;
            const iconStyle = {
                ...style,
                fontSize: size,
                color: iconColor,
            };

            return <IconComponent className={cn(className)} style={iconStyle} />;
        }
        // check if it's our SVG path info object
        else if (typeof iconResult === 'object' && iconResult !== null && 'path' in iconResult && iconResult.type === 'svg') {
            const svgStyle = {
                ...style,
                color: iconColor,
                fill: iconColor,
            };

            return (
                <SVGComponent
                    src={iconResult.path}
                    className={cn(className)}
                    style={svgStyle}
                    size={size}
                />
            );
        }
    }

    // SVG file
    if (imageSrc.endsWith('.svg')) {
        const svgStyle = {
            ...style,
            color: iconColor,
            fill: iconColor,
        };

        return (
            <SVGComponent
                src={imageSrc}
                className={cn(className)}
                style={svgStyle}
                size={size}
            />
        );
    }

    // non-SVG images
    return (
        <Image
            src={imageSrc}
            width={size}
            height={size}
            alt={alt}
            className={cn(className)}
            style={style}
        />
    );
};

export default FetchImage;