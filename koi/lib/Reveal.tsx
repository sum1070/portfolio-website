"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from "motion/react";
import { TAnimation } from "@/lib/types";

interface RevealProps extends TAnimation {
    width?: "fit-content" | "full";
}

const Reveal = ({
    children,
    delay = 0.1,
    duration = 0.6,
    className = "",
    width = "full"
}: RevealProps) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    return (
        <div
            ref={ref}
            style={{ width: width === "full" ? "100%" : "fit-content" }}
            className={className}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 70 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{
                    duration,
                    delay
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;