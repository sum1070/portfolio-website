"use client"

import { useState, useRef } from "react";
import BackgroundHero from "@/components/sections/hero/BackgroundHero";
import { TriangleArrowDown, CenterContainer, Typewriter, BlurredBlobsHero } from "@/components";
import { animationTime, cn } from "@/lib/utils";
import Reveal from "@/lib/Reveal";
import { motion } from "motion/react";
import HeroHeader from "./hero/HeroHeader";

const Text = {
  txtMain: "tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold ",
  txtMid: "tracking-tight mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [revealArrow, setRevealArrow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [firstSequenceComplete, setFirstSequenceComplete] = useState(false);
  const [startSecondSequence, setStartSecondSequence] = useState(false);

  const firstTypewriterSequences = [
    {
      text: "Welcome to my website...",
      deleteCount: 10,
      pauseBeforeDelete: 3000 // 1 sec
    },
    {
      text: "WORLD!",
      deleteCount: 0,
      pauseBeforeDelete: 2000
    },
  ];

  const secondTypewriterSequences = [
    {
      text: "I am a Computer Science student",
      deleteCount: 26,
      pauseBeforeDelete: 2000
    },
    {
      text: "a full stack developer",
      deleteCount: 23,
      pauseBeforeDelete: 2000
    }
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
      <CenterContainer className="min-h-dvh relative z-20">
        <div className="text-center text-nice-purple2 ">
          <motion.div
            initial={{
              opacity: 0, filter: "blur(15px)", letterSpacing: "-0.5em"
            }}
            animate={{
              opacity: 1, filter: "blur(0px)", letterSpacing: "normal"
            }}
            transition={{
              delay: animationTime.delayMainTxt,
              duration: animationTime.durationMainTxt,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onAnimationComplete={() => setStartTyping(true)}
          >
            <h1 className={cn(`${Text.txtMain}`, "textBlurAnimation",)}>HELLO</h1>
            <p className={cn(`${Text.txtMid}`)}>I'm <span className={cn("text-nice-purple3 font-medium")}>Margaret</span> !</p>
          </motion.div>
          {/* First typing string */}
          <div className="mt-2 pt-2 flex justify-center w-full h-10">
            {startTyping && !firstSequenceComplete && (
              <Typewriter
                className={`${Text.txtMono}`}
                speed={70}
                deleteSpeed={50}
                delay={animationTime.delayTypewriter}
                onComplete={() => {
                  setFirstSequenceComplete(true);
                  setTimeout(() => setStartSecondSequence(true), 500);
                }}
                sequences={firstTypewriterSequences}
              />
            )}
            {/* Second typing string */}
            {startSecondSequence && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typewriter
                  className={`${Text.txtMono}`}
                  speed={70}
                  deleteSpeed={60}
                  loop={true}
                  onComplete={() => setRevealArrow(true)}
                  sequences={secondTypewriterSequences}
                />
              </motion.div>
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