"use client";

import { cn } from '@/utils';
import React from 'react';

const xlGap = 'xl:gap-y-8 xl:gap-x-16 ';
const mbGap = 'gap-y-8 gap-x-12 ';
const gap = xlGap + mbGap;
const xlContainer = "xl:flex-row " + xlGap;
const mbContainer = "flex-col " + mbGap;

export default function TrElements() {
    return (
        <div className={cn(
            xlContainer, mbContainer,
            "w-full h-full flex items-center justify-center pt-2 ",
        )}>

        </div>
    );
}

