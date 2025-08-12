"use client";
import NavButton from '@/components/navButton/NavButton';
import { cn, gradient, pageIDs } from '@/utils';
import React from 'react';

const buttonClasses = 'max-w-60 md:max-w-none';

export default function BrElements() {
    return (
        <div className={cn(
            "flex flex-row justify-center items-center gap-8",
        )}>
            <NavButton background={gradient.purple} href={pageIDs.contact} button='contact' title='Contact' titleCN='' />
            <NavButton href={pageIDs.contact} button='contact' title='Original' />
        </div>
    );
}

