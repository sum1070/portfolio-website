import React from "react";

interface CodeTextProps {
    className?: string;
    text: string;
    size?: string;
    rotate?: string;
    color?: string[];
    fontWeight?: string;
    x?: string;
    y?: string;
    opacity?: number;
}

export function CodeText({
    className = "",
    text,
    opacity = 1,
    size = "100px",
    rotate = "0deg",
    color = ["var(--color-purple1)", "var(--color-nice-purple0)"],
    fontWeight = "400",
}: Readonly<CodeTextProps & { fontWeight?: string }>) {
    const style: React.CSSProperties = {
        fontWeight: fontWeight,
        fontSize: size,
        color: "transparent",
        backgroundImage: `linear-gradient(45deg, ${color.join(", ")})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        transform: `rotate(${rotate})`,
        display: "inline-block",
        letterSpacing: "-0.025em",
        WebkitTextFillColor: "transparent",
        opacity,
    };

    return (
        <span className={`${className} font-fira-code`} style={style}>
            {text}
        </span>
    );
}