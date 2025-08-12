"use client";
import NavButton from '@/components/navButton/NavButton';
import { cn, gradient, pageIDs } from '@/utils';
import React from 'react';

const lgGap = 'lg:gap-8 ';
const mbGap = 'gap-4 ';
const gap = lgGap + mbGap;
const lgContainer = "lg:flex-row " + lgGap;
const mbContainer = "flex-col " + mbGap;

export default function BrElements() {
    return (
        <div className={cn(
            lgContainer, mbContainer,
            "flex justify-center items-center ",
        )}>
            <NavButton href={pageIDs.contact} button='contact' title='Contact' />
            <div className={cn(
                'flex flex-col '+ gap,
            )}>
                <NavButton btnSize=' w-56 h-16 lg:w-64 lg:h-18 ' background={gradient.purple} href={pageIDs.projects} button='projects' title='Projects' titleCN='' />
                <NavButton btnSize=' w-56 h-16 lg:w-64 lg:h-18 ' background={gradient.purple} href={pageIDs.licences} button='licences' title='Licences' titleCN='' />
            </div>
        </div>
    );
}

