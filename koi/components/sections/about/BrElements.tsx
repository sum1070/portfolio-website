"use client";
import NavButton from '@/components/navButton/NavButton';
import { cn, gradient, pageIDs } from '@/utils';
import React from 'react';

export default function BrElements() {
    return (
        <div className={cn(
            "flex flex-row justify-center items-center gap-8",
        )}>
            <NavButton href={pageIDs.contact} button='contact' title='Contact' />
            <div className='flex flex-col gap-8 p-4 '>
                <NavButton btnSize=' w-56 h-14 lg:w-64 lg:h-18 ' background={gradient.purple} href={pageIDs.projects} button='projects' title='Projects' titleCN='' />
                <NavButton btnSize=' w-56 h-14 lg:w-64 lg:h-18 ' background={gradient.purple} href={pageIDs.licences} button='licences' title='Licences' titleCN='' />
            </div>
        </div>
    );
}

