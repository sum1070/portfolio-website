"use client";
import React from 'react'
import { Button, CenterContainer, InvertedWave, Navbar, TriangleArrowUp, Watching } from '@/components'
import { cn, iconImages, pageIDs } from '@/utils'
import WindowCard from '../WindowCard'
import BackgroundAbout from './about/BackgroundAbout'
import Wave from 'react-wavify'
import AboutCards from './about/AboutCards'
import NavButton from '../navButton/NavButton'
import DevCard from '../dev/DevCard'
import DevCyberCard from '../dev/DevCyberCard'
import TechSkills from '@/components/sections/about/TechSkills';

const About = () => {
    const pageID = pageIDs.about;
    const buttonClasses = 'max-w-60 md:max-w-none';
    const colGap = 'gap-2 xs:gap-4 md:gap-12 lg:gap-20';
    const buttonContainerClasses = "flex flex-col justify-center items-center w-full";

    const scrollToTop = () => {
        document.getElementById('hero')?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    const Text = {
        h1: "text-3xl sm:text-4xl md:text-5xl xl:text-7xl ",
        h2: "text-xl sm:text-2xl md:text-3xl xl:text-4xl ",
    };
    return (
        <section
            className="overflow-hidden relative min-h-[200svh]"
            id={pageID}
        >
            <InvertedWave className='z-30' />
            <BackgroundAbout />
            <CenterContainer className="min-h-dvh relative z-40 p-10 flex-col  ">
                <div
                    id='main-pic-btns-grid'
                    className={cn(
                        "-mt-8 lg:-mt-20",
                        "flex flex-col md:grid md:grid-cols-3 items-center",
                        colGap,
                    )}>
                    <div
                        id='main-pic-container'
                        className={cn(
                            "flex flex-col justify-center items-center order-first",
                            "w-1/2 mb-8",
                            "md:order-2 md:w-full "
                        )}>
                        <div className={cn("w-full flex items-center justify-center")}>
                            <DevCyberCard />
                        </div>
                    </div>
                    <div
                        id='main-btns-tl'
                        className={cn(
                            buttonContainerClasses,
                            colGap,
                            "order-2",
                            "md:items-end md:order-1",
                        )}>
                        <TechSkills />
                        {/* <Button type="contact" href="/contact" className={cn(buttonClasses, "hover:-rotate-3  ")} />
                            <Button type="projects" href="/projects" className={cn(buttonClasses, "hover:rotate-3")} /> */}
                        {/* <DevCard /> */}
                        {/* <img className={cn("object-scale-down, w-[2svw] h-[2svw]")} src={iconImages.cat1} alt='pic' decoding="async" fetchPriority="low" loading="lazy" /> */}

                    </div>
                    <div
                        id='main-btns-br'
                        className={cn(
                            buttonContainerClasses,
                            colGap,
                            "order-3 ",
                            "md:items-start md:order-3 md:mt-4",
                        )}>
                        <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Find Me!' />
                        <NavButton className={cn(buttonClasses)} href={pageIDs.contact} button='contact' title='Find Me!' />
                        {/* <Button type="licences" href="/licences" className={cn(buttonClasses, "hover:rotate-3")} />
                            <Button type="wip" href="/wip" className={cn(buttonClasses, "hover:-rotate-3")} /> */}
                    </div>
                </div>
                <div id='main-arrow-outer-container' className='p-4'>
                    <div id='main-arrow-container' className="absolute  justify-center pt-4">
                        <TriangleArrowUp onClick={scrollToTop} />
                    </div>
                </div>
            </CenterContainer>

            {/* <CenterContainer className="relative flex-col">
                <div className={cn(
                    "flex flex-row",
                    rowGap,
                )} >
                </div>
            </CenterContainer> */}
        </section>
    )
}

export default About