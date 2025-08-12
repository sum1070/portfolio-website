"use client";
import React from 'react'
import { CenterContainer, InvertedWave, TriangleArrowUp } from '@/components'
import { cn, pageIDs } from '@/utils'
import BackgroundAbout from './about/BackgroundAbout'
import NavButton from '../navButton/NavButton'
import DevCyberCard from '../dev/DevCyberCard'
import TechSkills from '@/components/sections/about/TechSkills';

const About = () => {
    const pageID = pageIDs.about;
    const buttonClasses = 'max-w-60 md:max-w-none';
    const colGap = 'gap-2 xs:gap-8 md:gap-8 lg:gap-12';

    const scrollToTop = () => {
        document.getElementById('hero')?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    return (
        <section
            className="-mt-4 md:-mt-0 overflow-hidden relative min-h-[200svh]"
            id={pageID}
        >
            <BackgroundAbout />
            <div className="relative w-full z-[60] pb-4">
                <InvertedWave className="w-full" />
            </div>
            <CenterContainer className="px-4 lg:px-16 pt-20 lg:pt-8 relative z-40 flex-col">
                <div
                    id='main-pic-btns-grid'
                    className={cn(
                        "flex flex-col lg:grid items-center",
                        "lg:grid-cols-[1.5fr_0.8fr_1fr]",
                        colGap,
                    )}>
                    <div
                        id='main-btns-tl'
                        className={cn(
                            colGap,
                            "order-2",
                            "lg:items-end lg:order-1",
                            "lg:pl-4"
                        )}>
                        <TechSkills />
                    </div>
                    <div
                        id='main-pic-container'
                        className={cn(
                            "justify-center items-center order-first",
                            "w-1/2 mb-2 lg:mb-8",
                            "lg:order-2 lg:w-full",
                            "lg:max-w-[200px] xl:max-w-[250px] mx-auto"
                        )}>
                        <div className={cn("pt-2 w-full flex items-center justify-center")}>
                            <DevCyberCard />
                        </div>
                    </div>
                    <div
                        id='main-btns-br'
                        className={cn(
                            colGap,
                            "order-3 py-2",
                            "justify-center items-center ",
                            "lg:items-start lg:order-3 lg:mt-4",
                        )}>
                        <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Contact' titleCN='' />
                        <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Find Me!' />
                    </div>
                </div>
                <div id='main-arrow-outer-container' className='p-4'>
                    <div id='main-arrow-container' className="absolute justify-center pt-4">
                        <TriangleArrowUp onClick={scrollToTop} />
                    </div>
                </div>
            </CenterContainer>
        </section>
    )
}

export default About