import { buttonImages, cn } from '@/lib/utils';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TButton } from '@/lib/types';
interface ButtonProps {
    type: TButton;
    href: string;
    className?: string;
}

const Button = ({ type, href, className }: ButtonProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const resetDelay = 300; // ms

    const handleClick = () => {
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
        }, resetDelay);
    };

    const buttonClasses = "w-3xs h-auto xs:w-auto xs:h-auto";
    return (
        <Link href={href} passHref>
            <button
                className={cn(
                    "relative focus:outline-none transition-transform",
                    "active:scale-95",
                    "transition-all duration-300",
                    className
                )}
                onClick={handleClick}
            >
                <Image
                    src={isClicked ? buttonImages[type].clicked : buttonImages[type].normal}
                    alt={`${type} button`}
                    width={150}
                    height={50}
                    className={cn(
                        buttonClasses,
                        "transition-all duration-200 ease-in-out",
                        "hover:scale-105",
                        "focus-visible:scale-105",
                        "group-focus-visible:[&+img]:hidden",
                    )}
                />
            </button>
        </Link>
    );
};

export default Button;