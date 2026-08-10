"use client";
import React, { useState } from 'react'
import contactData from './contact-data';
import { cn, gradient } from '@/utils';
import { LiquidGlass } from '@/components/nav-button/liquid-glass';
import { glassCN } from '../projects/project-card';
import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaQuestion } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const contactIcons: Record<string, IconType> = {
    github: FaGithub,
    linkedin: FaLinkedin,
    gmail: MdEmail,
};

const contactGradients: Record<string, { background?: string; darkBackground?: string }> = {
    github: { background: gradient.ssr },
    linkedin: { background: gradient.default },
};

const gradientBGCN = cn(
    "absolute rounded-[40rem] blur-[8px]",
    "[animation:rotation_6s_linear_infinite]",
);

const gradientBGStyle: React.CSSProperties = {
    width: '550%',
    height: '550%',
    top: '-225%',
    left: '-225%',
};

const contactCardCN = cn(
    glassCN,
    "rounded-4xl",
    "group relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden",
    "py-12 sm:py-0 sm:aspect-[4/3] cursor-pointer",
    "dark:bg-sky-950/50 dark:border-sky-300/25",
    "transition-shadow duration-300 ease-in-out",
    "hover:shadow-[0_0_18px_3px_var(--color-blueWave1)] hover:shadow-blueWave1/70",
    "dark:hover:shadow-[0_0_18px_3px_var(--color-deep-blue1)] dark:hover:shadow-deep-blue1/80",
);

interface GlassContactCardProps {
    name: string;
    url: string;
    background?: string;
    darkBackground?: string;
}

const GlassContactCard = ({ name, url, background, darkBackground }: GlassContactCardProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isHovering) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    const Icon = contactIcons[name.toLowerCase()] ?? FaQuestion;

    return (
        <button
            className={contactCardCN}
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label={`Contact via ${name}`}
        >
            {background && (
                <div id='contact-card-BG' className={cn(gradientBGCN, background, "dark:hidden")} style={gradientBGStyle} />
            )}
            {darkBackground && (
                <div id='contact-card-BG-dark' className={cn(gradientBGCN, darkBackground, "hidden dark:block")} style={gradientBGStyle} />
            )}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {LiquidGlass(isHovering, mousePosition)}
            </div>
            <div className='relative z-20 flex flex-col items-center gap-3'>
                <Icon size={44} className='transition-transform duration-300 ease-in-out group-hover:scale-110' />
                <span className='text-lg md:text-xl font-semibold'>{name}</span>
            </div>
        </button>
    )
}

const ContactCard = () => {
    return (
        <div id='contact-cards' className='grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 lg:gap-14'>
            {contactData.map((contact) => (
                <GlassContactCard
                    key={contact.name}
                    name={contact.name}
                    url={contact.url}
                    {...contactGradients[contact.name.toLowerCase()]}
                />
            ))}
        </div>
    )
}

export default ContactCard;
