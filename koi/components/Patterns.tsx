"use client";
import React from "react";
import clsx from "clsx";
import { PatternProps, positionClasses } from "@/lib/types";

const Pattern: React.FC<PatternProps> = ({
    type,
    size = 20,
    mask = false,
    width = "100%",
    height = "100px",
    position = "full",
    className = "",
    zIndex = "-z-20",

}) => {
    const patternStyle =
        type === "grid"
            ? `bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]`
            : `bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]`;

    const patternSize = `bg-[size:${size}px_${size}px]`;

    const maskStyle = mask
        ? "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"
        : "";

    const pos = positionClasses[position];

    return (
        <div
            className={clsx(
                "absolute",
                zIndex,
                pos,
                patternStyle,
                patternSize,
                maskStyle,
                className
            )}
            style={{ width, height }}
        />
    );
};

export default Pattern;
