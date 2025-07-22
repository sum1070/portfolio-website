import React from "react";
import { TShape } from "@/lib/types";

export function Bar({
    className = '',
    color = '',
    endColor = '',
    width = '200px',
    length = '20px',
    rotate = '0deg',
    opacity = 1,
    x = '0px',
    y = '0px',
}: Readonly<TShape>) {
    if (!color && !endColor) {
        color = 'var(--color-Mauve)';
        endColor = 'var(--color-sky-blue)';
    }
    const barStyle: React.CSSProperties = {
        position: 'absolute',
        width,
        height: length,
        left: x,
        top: y,
        opacity,
        transform: `rotate(${rotate})`,
        background: color === endColor
            ? color
            : `linear-gradient(45deg, ${color}, ${endColor})`,
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