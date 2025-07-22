"use client"

import BackgroundDeco from "@/components/BackgroundDeco";
import CenterContainer from "@/components/CenterContainer";
import { TriangleArrowDown } from "@/components/TriangleArrow";
import Typewriter from "@/components/ui/Typewriter";
import { Reveal } from "@/utils/Reveal";
import { useState } from "react";

const Text = {
  txtMain: "text-4xl sm:text-7xl xl:text-8xl text-balance tracking-tight italic font-semibold",
  txtMid: "mt-4 text-xl sm:text-3xl xl:text-4xl",
  txtMono: "mt-4 text-base sm:text-2xl block font-titillium-web",
};


export const Hero = () => {
  const [revealArrow, setRevealArrow] = useState(false);
  return (
    <div className="pb-20">
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-100">
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
          <div className="mt-4 pt-8 flex justify-center w-full h-8">
            {revealArrow && (
              <Reveal
                key="arrow"
                delay={0.2}
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

