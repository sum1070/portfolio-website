"use client";
import NavButton from '@/components/nav-button/nav-button';
import CyberCard from '@/components/cyber-card/cyber-card';
import { cn, gradient, pageIDs } from '@/utils';
import React from 'react';

const xlGap = 'xl:gap-y-8 xl:gap-x-16 ';
const mbGap = 'gap-y-8 gap-x-12 ';
const gap = xlGap + mbGap;
const xlContainer = "xl:flex-row " + xlGap;
const mbContainer = "flex-col " + mbGap;

export const TrElements = () => {
    return (
        <div className={cn(
            xlContainer, mbContainer,
            "w-full h-full flex items-center justify-center ",
        )}>
            <CyberCard />
        </div>
    );
}

export const BrElements = () => {
    return (
        <div className={cn(
            xlContainer, mbContainer,
            "w-full h-full ",
        )}>
            <div className={cn(
                ' flex flex-col md:flex-row justify-center items-center pt-16 ' + gap,
            )}>
                <NavButton href={pageIDs.contact} button='contact' title='Contact' />
                <div className={cn(
                    'flex flex-col ' + gap,
                )}>
                    <NavButton btnSize=' w-56 h-16 xl:w-64 xl:h-18 ' background={gradient.paleBlue} href={pageIDs.projects} button='projects' title='Projects' titleCN='' />
                    <NavButton btnSize=' w-56 h-16 xl:w-64 xl:h-16 ' background={gradient.insta} href={pageIDs.licences} button='licences' title='Licences' titleCN='text-milky-white' />

                </div>
            </div>
        </div>
    )
}
