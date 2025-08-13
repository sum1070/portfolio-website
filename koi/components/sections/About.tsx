"use client";
import React from 'react'
import { InvertedWave, TriangleArrowUp } from '@/components'
import { cn, pageIDs } from '@/utils'
import BackgroundAbout from './about/BackgroundAbout'
import TechSkills from '@/components/sections/about/TechSkills';
import BrElements from './about/BrElements';
import TrElements from './about/TrElements';

// xl: desktop
const About = () => {
  const pageID = pageIDs.about;
  const gapY = 'gap-y-2 xs:gap-y-8 md:gap-y-8 xl:gap-y-12';

  const scrollToTop = () => {
    document.getElementById(pageIDs.home)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section
      className=" overflow-hidden min-h-svh xl:max-h-svh min-w-svw relative h-fit"
      id={pageID}
    >
      <BackgroundAbout />
      <div id='wave-container' className="-mt-4 md:-mt-0 relative min-w-svw z-[60] pb-4">
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
          "xl:grid xl:grid-cols-[1.4fr_1fr] xl:grid-rows-[1fr_1.5fr] ",
          // mobile: one flex col
          "flex flex-col ",
        )}
      >
        <div
          id='div1-1st-tr'
          className={cn(
            "order-1", // mobile 1st
            "xl:row-start-1 xl:col-start-2", // x = 1, y = 1
            "flex ",
            "justify-center items-center w-full h-full",
            "bg-red-400",
          )}
        >
          <TrElements />
        </div>

        <div
          id='div2-2n-lf'
          className={cn(
            "order-2",
            "xl:row-span-2 xl:col-start-1 ", // desktop: left col spanning both rows
            "xl:items-start xl:pl-4  ",
          )}
        >
          <TechSkills />
          {/* desktop arrow */}
          <div
            id='desktop-arrow-container'
            className={cn(
              " h-full w-full mb-8 hidden xl-block xl:mt-28 xl:flex items-center justify-center ",
            )}
          >
              <TriangleArrowUp onClick={scrollToTop} />
          </div>
        </div>

        <div
          id='div3-3rd-br'
          className={cn(
            "order-3",
            "xl:row-start-2 xl:col-start-2 pb-[4svh] ", // desktop: right col, bottom row
            gapY,
            "justify-center items-center w-full h-full",
          )}
        >
          <BrElements />
        </div>


      </div>
      {/* mobile arrow */}
      <div id='mobile-arrow-container' className='p-8 pt-8 pb-24 order-4 items-center justify-center xl:hidden'>
        <div id='inner-mobile-arrow-container' className='flex items-center justify-center'>
          <TriangleArrowUp onClick={scrollToTop} />
        </div>
      </div>
    </section>
  )
}

export default About