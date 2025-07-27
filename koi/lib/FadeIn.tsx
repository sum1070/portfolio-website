import React from 'react';
import { motion } from 'framer-motion';
import { TAnimation, animationTimeClasses } from '@/lib/types';

type FadeInProps = TAnimation & {
    yTranslation?: boolean;
    stiffness?: number;
    damping?: number;
    mass?: number;
    onComplete?: () => void;
};

function FadeIn({
    className = '',
    children,
    duration = animationTimeClasses.durationBG,
    delay = animationTimeClasses.delayBG,
    yTranslation = false,
    stiffness = 90,
    damping = 20,
    mass = 0.8,
    onComplete,
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
                    duration: duration * 0.7,
                    delay,
                    ease: "easeOut"
                },
                ...(yTranslation ? {
                    y: {
                        type: "spring",
                        duration,
                        delay,
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