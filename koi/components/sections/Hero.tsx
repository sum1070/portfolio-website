"use client"

import { useState } from "react";
import BackgroundDeco from "@/components/sections/hero/BackgroundDeco";
import { TriangleArrowDown, Pattern, CenterContainer, Typewriter} from "@/components";
import Reveal from "@/lib/Reveal";

const Text = {
  txtMain: "text-4xl sm:text-7xl xl:text-8xl text-balance tracking-tight italic font-semibold text-shadow-lg/10",
  txtMid: "mt-4 text-xl sm:text-3xl xl:text-4xl",
  txtMono: "mt-4 text-base sm:text-2xl block font-titillium-web",
};

const Hero = () => {
  const [revealArrow, setRevealArrow] = useState(false);

  return (
    <div className="">
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-10">
        <div className="text-center text-nice-purple2 ">
          <Reveal>
            <h1 className={`${Text.txtMain}`}>
              Lorem ipsum dolor sit amet.
            </h1>
            <p className={`${Text.txtMid}`}>
              Lorem, ipsum dolor.
            </p>
          </Reveal>
          <Typewriter
            className={`${Text.txtMono}`}
            delay={1300}
            speed={90}
            onComplete={() => setRevealArrow(true)}
          >
            Lorem ipsum dolor sit.
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
      <Pattern
        type="dots"
        className="w-full h-[10svh] sm:h-[10svh] md:h-[15svh]"
        position="bottom"
        color="#fefaf3"
        width="100%"
        spacing={13}
        stroke={3}
      />
      <Pattern
        type="dots"
        position="bottom-right"
        color="#fefaf3"
        spacing={13}
        stroke={3}
        className="bottom-[10svh] h-2/5 sm:bottom-[10svh] md:bottom-[15svh] sm:w-[10svw] "
      />
    </div>
  );
}

export default Hero;