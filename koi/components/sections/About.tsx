"use client";
import React from 'react'
import { CenterContainer, InvertedWave, TriangleArrowUp } from '@/components'
import { cn, pageIDs } from '@/utils'
import BackgroundAbout from './about/BackgroundAbout'
import DevCyberCard from '../dev/DevCyberCard'
import TechSkills from '@/components/sections/about/TechSkills';
import BrElements from './about/BrElements';

const About = () => {
  const pageID = pageIDs.about;
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
            "flex flex-col",
            "lg:grid lg:grid-cols-[1.5fr_1fr] lg:grid-rows-[auto_auto]",
            colGap
          )}
        >
          {/* div1 / mobile 1st, desktop tr */}
          <div
            id='main-pic-container'
            className={cn(
              "order-1", // stays 1st on mobile
              "lg:row-start-1 lg:col-start-2", // desktop: right col, top row
              "w-1/2 mb-2 lg:mb-8",
              "lg:w-full",
              "lg:max-w-[200px] xl:max-w-[250px] mx-auto flex justify-center"
            )}
          >
            <DevCyberCard />
          </div>

          {/* div2 / mobile 2nd, desktop left full */}
          <div
            id='main-btns-tl'
            className={cn(
              "order-2",
              "lg:row-span-2 lg:col-start-1", // desktop: left col spanning both rows
              colGap,
              "lg:items-start",
              "lg:pl-4"
            )}
          >
            <TechSkills />
          </div>

          {/* div3 / mobile 3rd, desktop br */}
          <div
            id='main-btns-br'
            className={cn(
              "order-3",
              "lg:row-start-2 lg:col-start-2", // desktop: right col, bottom row
              colGap,
              "justify-center items-center w-full",
              "lg:mt-4"
            )}
          >
            <BrElements />
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