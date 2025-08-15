"use client";
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

    if (type === 'hollow') {
        barStyle.backgroundColor = 'transparent';

        if (color !== endColor) {
            barStyle.position = 'relative';
            barStyle.border = '0';

            return (
                <div
                    className={`bar hollow-gradient-bar ${className}`}
                    style={barStyle}
                    data-border-width={borderWidth}
                    data-color-start={color}
                    data-color-end={endColor}
                >
                    <style jsx>{`
                        .hollow-gradient-bar {
                            position: relative;
                        }
                        .hollow-gradient-bar::before {
                            content: "";
                            position: absolute;
                            inset: 0;
                            padding: ${borderWidth};
                            border-radius: 9999px;
                            background: linear-gradient(45deg, ${color}, ${endColor});
                            -webkit-mask: 
                                linear-gradient(#fff 0 0) content-box, 
                                linear-gradient(#fff 0 0);
                            -webkit-mask-composite: xor;
                            mask-composite: exclude;
                            pointer-events: none;
                        }
                    `}</style>
                </div>
            );
        } else {
            barStyle.border = `${borderWidth} solid ${color}`;
        }
    } else {
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