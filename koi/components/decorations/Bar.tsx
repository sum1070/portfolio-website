import React from "react";
import { TShape } from "@/lib/types";

interface BarProps extends TShape {
    type?: 'solid' | 'hollow';
    borderWidth?: string;
}

function Bar({
    className = '',
    color = '',
    endColor = '',
    width = '200px',
    length = '20px',
    rotate = '0deg',
    opacity = 1,
    x = '0px',
    y = '0px',
    type = 'solid',
    borderWidth = '2px',
}: Readonly<BarProps>) {
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
        transformOrigin: 'center',
        borderRadius: '9999px',
    };
    // hollow bar bar
    if (type === 'hollow') {
        barStyle.backgroundColor = 'transparent';
        barStyle.borderWidth = borderWidth;
        barStyle.borderStyle = 'solid';
        
        // gradient border
        if (color !== endColor) {
            barStyle.borderImage = `linear-gradient(45deg, ${color}, ${endColor}) 1`;
        } else {
            barStyle.borderColor = color;
        }
    } else {
        // solid bar bar
        barStyle.background = color === endColor
            ? color
            : `linear-gradient(45deg, ${color}, ${endColor})`;
    }

    return (
        <div
            className={`bar ${className}`}
            style={barStyle}
        />
    );
}

export default Bar;