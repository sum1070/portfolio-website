import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { iconMap } from './image-utils';
import { cn } from '@/utils';
import { TBaseProps } from '@/lib/types';
import { getIconComponent } from './icon-mapping';
import { FaQuestion } from "react-icons/fa";

interface FetchImageProps extends TBaseProps {
    src: string;
    className?: string;
    alt?: string;
    size?: number;
    useReactIcon?: boolean;
    iconColor?: string;
}

// Helper function to dynamically import and render SVG as a React component
const SVGComponent = ({ src, className, style, size = 24 }: { src: string, className?: string, style?: React.CSSProperties, size?: number }) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(text => {
                setSvgContent(text);
            })
            .catch(err => {
                console.error(`Error loading SVG: ${src}`, err);
            });
    }, [src]);

    if (!svgContent) return null;

    // Create a wrapper div with dangerouslySetInnerHTML to render the SVG
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

    if (useReactIcon && !(lowerSrc in iconMap)) {
        const IconComponent = getIconComponent(lowerSrc, FaQuestion);

        if (typeof IconComponent === 'function') {
            // if it is function (react icon)
            const iconStyle = {
                ...style,
                fontSize: size,
                color: iconColor,
            };

            return <IconComponent className={cn(className)} style={iconStyle} />;
        } else if (typeof IconComponent === 'object' && IconComponent !== null) {
            // cast local image
            const SvgComponent = IconComponent as React.ComponentType<{
                className?: string;
                style?: React.CSSProperties;
                size?: number;
            }>;
            return <SvgComponent className={cn(className)} style={style} size={size} />;
        }
    }

    const imageSrc = (lowerSrc in iconMap) ? iconMap[lowerSrc as keyof typeof iconMap] : src;

    // Check if it's an SVG file
    if (imageSrc.endsWith('.svg')) {
        return (
            <SVGComponent
                src={imageSrc}
                className={cn(className)}
                style={style}
                size={size}
            />
        );
    }

    // For non-SVG images, use the Image component
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