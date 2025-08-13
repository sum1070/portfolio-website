import React from 'react';
import { cn } from '@/utils';

interface CornerProps {
    isHovered?: boolean;
}

const Avatar = ({ isHovered = false }: CornerProps) => {

    return (
        <div
            id="avatar"
            className={cn(
                "absolute left-[20%] -translate-x-1/2 top-7 z-10 w-[5.5rem] h-[5.5rem] bg-black2 rounded-full p-0.5 border transition-colors ease-in-out duration-500 overflow-hidden",
                isHovered
                    /* h-offset v-offset blur spread color |inset|initial|inherit; */
                    ? "border-[rgba(0,242,234,0.8)] shadow-[0_0_4px_1px_rgba(0,242,234,0.6)]"
                    : "border-bright-pink shadow-none"
            )}
        >
            <img
                src="/images/avatar.png"
                alt="icon"
                className={cn(
                    "w-full h-full object-cover rounded-full",
                    isHovered ? "brightness-95" : "brightness-80"
                )}
            />
        </div>
    );
};

export default Avatar;
