"use client";
import React from 'react'
import { InvertedWave, TriangleArrowUp } from '@/components'
import { cn, pageIDs } from '@/utils'
import BackgroundAbout from './about/about-background'
import TechSkills from '@/components/sections/about/tech-skills';
import { TrElements, BrElements } from './about/about-elements';

// Update (18/08/2025): use xl and 2xl for desktop layout
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
      className={cn(
        "min-h-svh min-w-svw relative h-fit",
        "xl:max-h-svh xl:overflow-hidden"
      )}
      id={pageID}
    >
      <BackgroundAbout />
      <div
        id='wave-container'
        className={cn(
          "-mt-4 md:-mt-0 relative min-w-svw z-[60]",
          "pb-18",
          "xl:pb-21 2xl:pb-30"
        )}
      >
        <InvertedWave className="w-full" />
      </div>
      {/* Mobile layout: a-b-c; desktop (xl): b-(a-c) */}
      <div
        id='components-grid'
        className={cn(
          // dont use item center otherwise it push skills to middle
          "min-h-svh min-w-svw justify-center",
          "gap-x-4 px-10 md:px-24 ",
          // desktop: 2 cols
          "xl:grid xl:grid-cols-[1.4fr_1fr] xl:grid-rows-[1fr_1.2fr] ",
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
            "pt-3 sm:pt-12 pb-8 md:pb-4 xl:pt-18",
            "justify-center items-center w-full h-full",
          )}
        >
          <TrElements />
        </div>

        <div
          id='div2-2n-lf'
          className={cn(
            "order-2 relative",
            "xl:row-span-2 xl:col-start-1 ", // desktop: left col spanning both rows
            "pt-1 xl:pl-4 xl:pt-2",
          )}
        >
          <TechSkills />
          {/* desktop arrow */}
          <div
            id='desktop-arrow-container'
            className={cn(
              "absolute left-1/2 -translate-x-1/2",
              "xl:flex hidden items-center justify-center",
              "mt-18"
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
      <div id='mobile-arrow-container' className='p-8 pt-8 pb-30 order-4 items-center justify-center xl:hidden'>
        <div id='inner-mobile-arrow-container' className='flex items-center justify-center'>
          <TriangleArrowUp onClick={scrollToTop} />
        </div>
      </div>
    </section>
  )
}

export default About