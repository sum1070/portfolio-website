'use client';

import { cn } from '@/lib/utils';
import { PatternProps, positionClasses } from '@/lib/types';

export default function Pattern({
    className = '',
    type,
    size = 20,
    mask = false,
    width = '100%',
    height = '100%',
    position = 'full',
    opacity = 0.3,
}: Readonly<PatternProps>) {

    const getPatternStyle = () => {
        const baseOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
        const colorWithOpacity = `#737373${baseOpacity}`;

        switch (type) {
            case 'dots':
                return {
                    backgroundImage: `radial-gradient(circle, ${colorWithOpacity} 1px, transparent 1px)`,
                    backgroundSize: `${size}px ${size}px`,
                };

            case 'grid':
                return {
                    backgroundImage: `linear-gradient(to right, ${colorWithOpacity} 1px, transparent 1px), linear-gradient(to bottom, ${colorWithOpacity} 1px, transparent 1px)`,
                    backgroundSize: `${size}px ${size}px`,
                };

            default:
                return {};
        }
    };

    const getMaskStyle = () => {
        if (!mask) return {};

        return {
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
        };
    };

    const positionClass = positionClasses[position] || positionClasses.full;

    return (
        <div
            className={cn(
                'absolute -z-10 pointer-events-none',
                positionClass,
                className
            )}
            style={{
                width,
                height,
                ...getPatternStyle(),
                ...getMaskStyle(),
            }}
        />
    );
}