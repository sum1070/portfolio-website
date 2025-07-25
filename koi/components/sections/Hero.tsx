"use client"

import { useState } from "react";
import BackgroundDeco from "@/components/sections/hero/BackgroundDeco";
import { TriangleArrowDown, CenterContainer, Typewriter, BlurredBlobs } from "@/components";
import Reveal from "@/lib/Reveal";

const Text = {
  txtMain: "text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold text-shadow-lg/10",
  txtMid: "mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
};

const Hero = () => {
  const [revealArrow, setRevealArrow] = useState(false);
// TODO: theme change button, sound button
  return (
    <div className="">
      <BlurredBlobs />
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-20">
        <div className="text-center text-nice-purple2 ">
          <Reveal delay={1.2} duration={0.8} width="full" className="flex flex-col items-center">
            <h1 className={`${Text.txtMain}`}>
              HELLO
            </h1>
            <p className={`${Text.txtMid}`}>
              I'm Margaret!
            </p>
          </Reveal>
          <Typewriter
            className={`${Text.txtMono}`}
            delay={2300}
            speed={50}
            onComplete={() => setRevealArrow(true)}
          >
            Welcome to my website...
          </Typewriter>
          {/* Fixed height container as placeholder */}
          <div className="mt-12 pt-12 flex justify-center w-full h-10">
            {revealArrow && (
              <Reveal
                key="arrow"
                delay={0.6}
                width="full"
                duration={0.6}
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