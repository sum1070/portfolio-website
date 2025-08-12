"use client";
import NavButton from '@/components/navButton/NavButton';
import { cn, pageIDs } from '@/utils';
import React from 'react';

const buttonClasses = 'max-w-60 md:max-w-none';

export default function BrElements() {
    return (
        <div className={cn(
            "flex flex-row justify-center items-center gap-8",
        )}>
            <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Contact' titleCN='' />
            <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Find Me!' />
        </div>
    );
}

