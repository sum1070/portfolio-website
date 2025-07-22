import React, {useEffect, useRef} from 'react';
import { motion, useInView, useAnimation } from "motion/react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "full";
    // height?: "fit-content" | "full";
}

export const Reveal = ({ children, width = "fit-content" }: RevealProps) => {
    return (
        <div style={{position: "relative", width, overflow: "hidden"}}>
            <div>{children}</div>
        </div>
    );
};