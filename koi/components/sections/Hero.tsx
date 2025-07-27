"use client"

import { useState } from "react";
import BackgroundDeco from "@/components/sections/hero/BackgroundDeco";
import { TriangleArrowDown, CenterContainer, Typewriter, BlurredBlobs } from "@/components";
import { animationTimeClasses } from "@/lib/types";
import Reveal from "@/lib/Reveal";
import { a } from "motion/react-client";
import FadeIn from "@/lib/FadeIn";

const Text = {
  txtMain: "text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold ",
  txtMid: "mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
};

const Hero = () => {
  const [revealArrow, setRevealArrow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // TODO: theme change button, sound button
  return (
    <div id="Hero">
      <BlurredBlobs />
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-20">
        <div className="text-center text-nice-purple2 ">
          {/* <Reveal delay={animationTimeClasses.delayMainTxt} duration={animationTimeClasses.durationMainTxt} width="full" className="flex flex-col items-center">
            <h1 className={`${Text.txtMain}`}>
              HELLO
            </h1>
            <p className={`${Text.txtMid}`}>
              I'm Margaret!
            </p>
          </Reveal> */}
          <FadeIn onComplete={() => setStartTyping(true)}>
            <h1 className={`${Text.txtMain}`}>
              HELLO
            </h1>
            <p className={`${Text.txtMid}`}>
              I'm Margaret!
            </p>
          </FadeIn>
          {/* <Typewriter
            className={`${Text.txtMono}`}
            speed={50}
            onComplete={() => setRevealArrow(true)}
          >
            Welcome to my website...
          </Typewriter> */}
          <div className="mt-2 pt-2 flex justify-center w-full h-10">
            {startTyping && (
              <Typewriter
                className={`${Text.txtMono}`}
                speed={50}
                delay={animationTimeClasses.delayTypewriter}
                onComplete={() => setRevealArrow(true)}
              >
                Welcome to my website...
              </Typewriter>
            )}
          </div>

          {/* Fixed height container as placeholder */}
          <div className="mt-12 pt-12 flex justify-center w-full h-10">
            {revealArrow && (
              <Reveal
                key="arrow"
                delay={animationTimeClasses.delayTriangleArrow}
                width="full"
                duration={animationTimeClasses.durationTriangleArrow}
                className="flex justify-center w-full"
              >
                <TriangleArrowDown />
              </Reveal>
            )}
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}

export default Hero;