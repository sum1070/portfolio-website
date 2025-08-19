"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import BackgroundHero from "@/components/sections/hero/hero-background";
import { TriangleArrowDown, CenterContainer, Typewriter, Reveal, NekoSleep, SleepZZZ } from "@/components";
import { cn, animationTime, pageIDs } from "@/utils";
import { motion, useInView } from "motion/react";
import BlurredBlobsHero from "./hero/hero-blobs";

const MemoizedBackgroundHero = memo(BackgroundHero);
const MemoizedBlurredBlobs = memo(BlurredBlobsHero);

const Text = {
  txtMain: "tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic font-semibold ",
  txtMid: "tracking-tight mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "w-full mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
  typingContainer: "mt-2 pt-2 flex justify-center w-full h-10 ",
};

const firstTypewriterSequences = [
  {
    text: "Welcome to my website...",
    deleteCount: 11,
    pauses: {
      beforeDelete: 1000, // 1 sec
    }
  },
  {
    text: " WORLD!",
    deleteCount: 0,
    pauses: {
      beforeDelete: 1000
    }
  },
];

// memoize hero title to prevent re-renders
type HeroTitleProps = {
  onAnimationComplete?: () => void;
};

const HeroTitle = memo(({ onAnimationComplete }: HeroTitleProps) => (
  <motion.div
    initial={{ opacity: 0.1, filter: "blur(12px)", letterSpacing: "0.5em" }}
    animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "normal" }}
    transition={{
      delay: animationTime.delayMainTxt,
      duration: animationTime.durationMainTxt,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    onAnimationComplete={onAnimationComplete}
  >
    <h1 className={cn(`${Text.txtMain}`, "textBlurAnimation")}>HELLO</h1>
    <div className={cn(`${Text.txtMid}`)}>
      I'm&nbsp;<span className={"text-nice-purple3 font-medium"}>Margaret</span>
      <NekoSleep className="w-[32px] md:w-12 xl:w-16 inline-block ml-2 object-contain " />
      <SleepZZZ className="-ml-1 md:-ml-2 w-[32px] md:w-12 xl:-ml-4 xl:w-20 inline-block border-0 " />
    </div>
  </motion.div>
));

HeroTitle.displayName = "HeroTitle";

//////////////////////////// HERO //////////////////////////
const Hero = () => {
  const pageID = pageIDs.home;
  const heroRef = useRef<HTMLDivElement>(null);
  const [revealArrow, setRevealArrow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [finishTyping, setFinishTyping] = useState(false);
  const [loadedElements, setLoadedElements] = useState({
    background: false,
    blobs: false
  });

  const isInView = useInView(heroRef, { once: false, margin: "-10%" });

  // heavy elements loaded progressively: bg, then blobs
  useEffect(() => {
    // load bg with delay
    const bgTimer = setTimeout(() => {
      setLoadedElements(prev => ({ ...prev, background: true }));
    }, 100);
    // then load blobs
    const blobTimer = setTimeout(() => {
      setLoadedElements(prev => ({ ...prev, blobs: true }));
    }, 300);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(blobTimer);
    };
  }, []);

  // If not in view, slow down animations - with debounce
  useEffect(() => {
    const updateAnimationSpeed = () => {
      document.documentElement.style.setProperty(
        '--animation-speed-multiplier', 
        isInView ? '1' : '0.3'
      );
    };
    
    updateAnimationSpeed();
  }, [isInView]);

  // memoized scroll handler
  const scrollNextPage = useCallback(() => {
    const NextSection = document.getElementById(pageIDs.about);
    if (NextSection) {
      NextSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id={pageID}
      className="overflow-hidden relative select-none"
      style={{
        containIntrinsicSize: '100vh',
        contentVisibility: 'auto',
        contain: 'paint layout'
      }}
    >
      <div className="absolute inset-0 -z-10">
        {loadedElements.background && <MemoizedBackgroundHero />}
        {loadedElements.blobs && <MemoizedBlurredBlobs />}
      </div>

      <CenterContainer className="min-h-dvh relative z-20 p-10">
        <div className="text-center">
          <HeroTitle onAnimationComplete={() => setStartTyping(true)} />

          {/* typewriter */}
          <div className={cn(`${Text.typingContainer}`, `${Text.txtMono}`)}>
            {startTyping && !finishTyping && (
              <Typewriter
                speed={70}
                deleteSpeed={50}
                delay={animationTime.delayTypewriter}
                onComplete={() => { setFinishTyping(true); }}
                sequences={firstTypewriterSequences}
              />
            )}
            {finishTyping && (
              <Typewriter
                enableDelete={false}
                speed={40}
                deleteSpeed={40}
                delay={animationTime.delayTypewriter}
                sequences={[{ text: "Let's explore together..." }]}
                onTypeComplete={() => { setRevealArrow(true); }}
              />
            )}
          </div>

          {/* arrow container */}
          <div
            id="arrow-container"
            className="mt-12 pt-12 flex justify-center w-full h-10"
            aria-hidden={!revealArrow}
          >
            {revealArrow && (
              <Reveal
                key="arrow"
                delay={animationTime.delayTriangleArrow}
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