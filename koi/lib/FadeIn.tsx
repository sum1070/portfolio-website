import React from 'react';
import { motion } from 'framer-motion';
import { TAnimation } from './types';

const FadeIn: React.FC<TAnimation> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1.2,
                delay: 0.5,
                type: "spring",
                stiffness: 60,
                damping: 20
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;