import React from 'react'
import { CenterContainer, InvertedWave, Navbar, TriangleArrowUp, Watching } from '@/components'
import { cn, pageIDs } from '@/utils'
import WindowCard from '../WindowCard'
import BackgroundAbout from './about/BackgroundAbout'
import Wave from 'react-wavify'
import ContactCard from './about/ContactCard'
import NavButton from '../NavButton'

const About = () => {
    const pageID = pageIDs.about;
    const buttonClasses = 'max-w-60 md:max-w-none';
    const rowGap = 'gap-2 xs:gap-4 md:gap-12 lg:gap-20';
    const buttonContainerClasses = "md:p-8 lg:p-16 flex flex-col justify-center items-center w-full";

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
            className="flex flex-col gap-2 overflow-hidden min-w-dvw min-h-dvh relative "
            id={pageID}
        >
            <InvertedWave />
            <BackgroundAbout />
            <div className="w-full pt-12 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
                <div id='contact-text' className="md:mb-12 sm:mb-8 mb-4">
                    <h1 className={cn(
                        Text.h1,
                        "font-black text-center",
                    )}>
                        <Watching className=" w-[16svw] md:w-[10svw] inline-block ml-2 object-contain " />
                    </h1>
                    <h2 className={cn(
                        Text.h2,
                        "font-semibold mb-1 text-center",
                    )}>
                        Hello
                    </h2>
                    <p className="mb-2 text-center">
                        I think putting something here would look nice, but idk what to write.
                    </p>
                </div>
                {/* <ContactCard /> */}
                <div className='pt-4 flex flex-row gap-8' >
                    {/* <_NavButton /> */}
                    <NavButton />
                </div>
            </div>

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