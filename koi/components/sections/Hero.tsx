"use client"

import { useState, useRef } from "react";
import Image from "next/image";
import BackgroundHero from "@/components/sections/hero/BackgroundHero";
import { TriangleArrowDown, CenterContainer, Typewriter, BlurredBlobsHero } from "@/components";
import { animationTime, cn, iconImages } from "@/lib/utils";
import Reveal from "@/lib/Reveal";
import { motion } from "motion/react";
import HeroHeader from "./hero/HeroHeader";

const Text = {
  txtMain: "tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold ",
  txtMid: "tracking-tight mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "w-full mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
  typingContainer: "mt-2 pt-2 flex justify-center w-full h-10 ",
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [revealArrow, setRevealArrow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [finishTyping, setFinishTyping] = useState(false);

  const firstTypewriterSequences = [
    {
      text: "Welcome to my website...",
      deleteCount: 11,
      pauseBeforeDelete: 1000, // 1 sec
      pauseAfterDelete: 1000
    },
    {
      text: " WORLD!",
      deleteCount: 0,
      pauseBeforeDelete: 2000
    },
  ];

  const scrollNextPage = () => {
    const mainPageSection = document.getElementById('MainPage');
    if (mainPageSection) {
      mainPageSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // TODO: theme change button
  return (
    <section ref={heroRef} id="hero" className="overflow-hidden relative">
      <HeroHeader />
      <BackgroundHero />
      <BlurredBlobsHero />
      <CenterContainer className="min-h-dvh relative z-20 p-10">
        <div className="text-center text-nice-purple2 ">
          <motion.div
            initial={{opacity: 0, filter: "blur(15px)", letterSpacing: "-0.5em"}}
            animate={{opacity: 1, filter: "blur(0px)", letterSpacing: "normal"}}
            transition={{
              delay: animationTime.delayMainTxt,
              duration: animationTime.durationMainTxt,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onAnimationComplete={() => setStartTyping(true)}
          >
            <h1 className={cn(`${Text.txtMain}`, "textBlurAnimation",)}>HELLO</h1>
            <p className={cn(`${Text.txtMid}`)}>I'm <span className={cn("text-nice-purple3 font-medium")}>Margaret</span><Image className="w-[32px] md:w-12 xl:w-14 inline-block ml-2 object-contain" alt="svg" src={iconImages.nekoSleep} width={48} height={48} />
            </p>
          </motion.div>
          {/* First typing string */}
          <div className={cn(`${Text.typingContainer}`, `${Text.txtMono}` )}>
            {startTyping && !finishTyping && (
              <Typewriter
                speed={70}
                deleteSpeed={50}
                delay={animationTime.delayTypewriter}
                onComplete={() => {setFinishTyping(true);}}
                sequences={firstTypewriterSequences}
              />
            )}
            {finishTyping && (
              <Typewriter
                enableDelete={false}
                speed={70}
                deleteSpeed={50}
                delay={animationTime.delayTypewriter}
                sequences={[{ text: "Start your exploration..." }]}
                onComplete={() => {setRevealArrow(true);}}
              />
            )}
          </div>

          {/* Fixed height container as placeholder */}
          <div className="mt-12 pt-12 flex justify-center w-full h-10">
            {revealArrow && (
              <Reveal
                key="arrow"
                delay={animationTime.delayTriangleArrow}
                width="full"
                duration={animationTime.durationTriangleArrow}
                className="flex justify-center w-full"
              >
                <TriangleArrowDown onClick={scrollNextPage} />
              </Reveal>
            )}
          </div>

        </div>

      </CenterContainer>

    </section>
  );
}

export default Hero;