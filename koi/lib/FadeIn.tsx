import React from 'react';
import { motion } from 'framer-motion';
import { TAnimation } from '@/lib/types';
import { animationTime } from "./utils";

type FadeInProps = TAnimation & {
    yTranslation?: boolean;
    disableTransparentFade?: boolean;
    stiffness?: number;
    delayOffset?: number;
    damping?: number;
    mass?: number;
    onComplete?: () => void;
};

function FadeIn({
    className = '',
    children,
    duration = animationTime.durationBG,
    delay = animationTime.delayBG,
    yTranslation = false,
    stiffness = 90,
    damping = 20,
    mass = 0.8,
    onComplete,
    disableTransparentFade = false,
    delayOffset = 0,
}: Readonly<FadeInProps>) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...(yTranslation ? { y: 50 } : {})
            }}
            animate={{
                opacity: 1,
                ...(yTranslation ? { y: 0 } : {})
            }}
            transition={{
                opacity: {
                    duration: disableTransparentFade ? duration * 0.7 : duration,
                    delay: delay + delayOffset,
                    ease: "easeOut"
                },
                ...(yTranslation ? {
                    y: {
                        type: "spring",
                        duration,
                        delay: delay + delayOffset,
                        stiffness,
                        damping,
                        mass,
                    }
                } : {})
            }}
            onAnimationComplete={onComplete}
        >
            {children}
        </motion.div>
    );
}

export default FadeIn;