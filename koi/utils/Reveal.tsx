"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from "motion/react";
import { TAnimation } from "@/lib/types";

interface RevealProps extends TAnimation {
    width?: "fit-content" | "full";
}

export const Reveal = ({ children, width = "fit-content" }: RevealProps) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView]);
    return (
        <div
            ref={ref}
            style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{
                    duration: 0.5,
                    delay: 0.25
                }}
            >{children}
            </motion.div>
        </div>
    );
};