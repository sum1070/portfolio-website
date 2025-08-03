"use client"

import { useState, useRef } from "react";
import BackgroundHero from "@/components/sections/hero/BackgroundHero";
import { TriangleArrowDown, CenterContainer, Typewriter, BlurredBlobs } from "@/components";
import { animationTime } from "@/lib/utils";
import Reveal from "@/lib/Reveal";
import FadeIn from "@/lib/FadeIn";

const Text = {
  txtMain: "tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold ",
  txtMid: "tracking-tight mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [revealArrow, setRevealArrow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  const scrollNextPage = () => {
    const mainPageSection = document.getElementById('MainPage');
    if (mainPageSection) {
      mainPageSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // TODO: theme change button, sound button
  return (
    <section ref={heroRef} id="hero" className="overflow-hidden relative">
      <BlurredBlobs />
      <BackgroundHero />
      <CenterContainer className="min-h-dvh relative z-20">
        <div className="text-center text-nice-purple2 ">

          <FadeIn onComplete={() => setStartTyping(true)} disableTransparentFade={true} delay={animationTime.delayMainTxt} duration={animationTime.durationMainTxt}>
            <h1 className={`${Text.txtMain}`}>
              HELLO
            </h1>
            <p className={`${Text.txtMid}`}>
              I'm Margaret!
            </p>
          </FadeIn>
          <div className="mt-2 pt-2 flex justify-center w-full h-10">
            {startTyping && (
              <Typewriter
                className={`${Text.txtMono}`}
                speed={50}
                delay={animationTime.delayTypewriter}
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