import React from "react";

interface BarProps {
    className?: string;
    startColor?: string;
    endColor?: string;
    width?: string;
    length?: string;
    rotate?: string;
    opacity?: number;
    x?: string;
    y?: string;
}

export function Bar({
    className = '',
    startColor = 'var(--color-Mauve)',
    endColor = 'var(--color-sky-blue)',
    width = '200px',
    length = '20px',
    rotate = '0deg',
    opacity = 1,
    x = '0px',
    y = '0px',
}: BarProps) {
    const barStyle: React.CSSProperties = {
        position: 'absolute',
        width,
        height: length,
        left: x,
        top: y,
        opacity,
        transform: `rotate(${rotate})`,
        background: startColor === endColor
            ? startColor
            : `linear-gradient(45deg, ${startColor}, ${endColor})`,
        borderRadius: '9999px',
        transformOrigin: 'center'
    };

    return (
        <div
            className={`bar ${className}`}
            style={barStyle}
        />
    );
}