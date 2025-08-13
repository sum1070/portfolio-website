"use client";
import React from 'react'
import { InvertedWave, TriangleArrowUp } from '@/components'
import { cn, pageIDs } from '@/utils'
import BackgroundAbout from './about/BackgroundAbout'
import DevCyberCard from '../dev/DevCyberCard'
import TechSkills from '@/components/sections/about/TechSkills';
import BrElements from './about/BrElements';

// lg: desktop
const About = () => {
  const pageID = pageIDs.about;
  const gapY = 'gap-y-2 xs:gap-y-8 md:gap-y-8 lg:gap-y-12';

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section
      className=" overflow-hidden min-h-svh min-w-svw relative h-fit"
      id={pageID}
    >
      <BackgroundAbout />
      <div id='wave-container' className="-mt-4 md:-mt-0 relative min-w-svw z-[60] ">
        <InvertedWave className="w-full" />
      </div>
      <div
        // fr: fraction of available space
        // first col fr _ second col fr
        id='components-grid'
        className={cn(
          "min-h-svh min-w-svw justify-center items-center ",
          "gap-x-4 gap-y-2 px-24 ",
          "py-[3svh] md:py-[4svh]", // bg grid pattern h / 3
          // desktop: 2 cols
          "lg:grid lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[1fr_1.6fr] ",
          // mobile: one flex col
          "flex flex-col ",
        )}
      >
        <div
          id='div1-1st-tr'
          className={cn(
            "order-1", // mobile 1st
            "lg:row-start-1 lg:col-start-2", // x = 1, y = 1
            "mb-2 lg:mb-8",
            "flex justify-center "
          )}
        >
          <DevCyberCard />
        </div>

        <div
          id='div2-2n-lf'
          className={cn(
            "order-2",
            "lg:row-span-2 lg:col-start-1 ", // desktop: left col spanning both rows
            "lg:items-start lg:pl-4  ",
          )}
        >
          <TechSkills />
          <div
            id='desktop-arrow-container'
            className={cn(
              "hidden lg-block lg:mt-28 lg:flex lg:justify-center ",
            )}
          >
            <TriangleArrowUp onClick={scrollToTop} />
          </div>
        </div>

        <div
          id='div3-3rd-br'
          className={cn(
            "order-3",
            "lg:row-start-2 lg:col-start-2 pb-[4svh] ", // desktop: right col, bottom row
            gapY,
            "justify-center items-center w-full",
          )}
        >
          <BrElements />
        </div>


      </div>
      {/* mobile arrow */}
      <div id='mobile-arrow-container' className='p-8 pt-8 pb-24 order-4 justify-center lg:hidden'>
        <TriangleArrowUp onClick={scrollToTop} />
      </div>
    </section>
  )
}

export default About