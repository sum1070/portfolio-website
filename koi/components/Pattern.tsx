'use client';

import { cn } from '@/lib/utils';
import { TPattern, positionClasses } from '@/lib/types';

/**
 * Inspired by https://dev.to/rifkyalfarez/how-to-create-grid-and-dots-background-using-tailwind-css-1jkb
 */
export default function Pattern({
    className = '',
    type,
    spacing = 20,
    mask = false,
    position = 'full',
    opacity = 0.9,
    color = '#737373',
    stroke = 1,
}: Readonly<TPattern>) {

    const getPatternStyle = () => {
        const baseOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
        const colorWithOpacity = `${color}${baseOpacity}`;

        switch (type) {
            case 'dots':
                return {
                    backgroundImage: `radial-gradient(circle, ${colorWithOpacity} ${stroke}px, transparent ${stroke}px)`,
                    backgroundSize: `${spacing}px ${spacing}px`,
                };

            case 'grid':
                return {
                    backgroundImage: `linear-gradient(to right, ${colorWithOpacity} ${stroke}px, transparent ${stroke}px), linear-gradient(to bottom, ${colorWithOpacity} ${stroke}px, transparent ${stroke}px)`,
                    backgroundSize: `${spacing}px ${spacing}px`,
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
                ...getPatternStyle(),
                ...getMaskStyle(),
            }}
        />
    );
}