"use client";

import { useState, useRef, useEffect, memo } from "react";
import BackgroundHero from "@/components/sections/hero/hero-background";
import { CenterContainer, Typewriter, NekoSleep, SleepZZZ, FadeIn, NavButton, TransitionLink } from "@/components";
import { cn, animationTime, pageIDs, gradient } from "@/utils";
import { motion, useInView } from "motion/react";
import { RxArrowTopRight } from "react-icons/rx";
import BlurredBlobsHero from "./hero/hero-blobs";
import HeroHeader from "./hero/hero-header";

const MemoizedBackgroundHero = memo(BackgroundHero);
const MemoizedBlurredBlobs = memo(BlurredBlobsHero);

const Text = {
  txtMain: "tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-balance tracking-tight italic  ",
  txtMid: "tracking-tight mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-7xl",
  txtMono: "w-full mt-4 text-base sm:text-2xl md:pt-2 xl:pt-4 block font-titillium-web",
  typingContainer: "mt-2 pt-2 flex justify-center w-full h-10 ",
  txtInfo: "text-base sm:text-xl xl:text-2xl font-titillium-web font-medium text-balance",
  txtStatus: cn(
    "group inline-flex flex-col sm:flex-row items-center gap-x-2 px-4 py-1.5 rounded-2xl sm:rounded-full hollow-gradient-outline bg-linear-45 from-Mauve/90 to-sky-blue/60 dark:from-Mauve/20 dark:to-sky-blue/20 text-sm sm:text-base xl:text-lg font-titillium-web",
    "transition-colors duration-300 hover:bg-white/25 motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nice-purple1",
  ),
};

const statusArrow = "absolute inset-0 size-full transition-transform duration-300 ease-out motion-reduce:transition-none";
const statusArrowOut = "group-hover:translate-x-full group-hover:-translate-y-full group-focus-visible:translate-x-full group-focus-visible:-translate-y-full";
const statusArrowIn = "-translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0";

const heroNavButtons = [
  { name: "About", href: `/${pageIDs.about}`, background: gradient.insta, titleCN: 'text-milky-white' },
  { name: "Projects", href: `/${pageIDs.projects}`, background: gradient.limeBlue, titleCN: 'text-milky-white' },
  { name: "Contact", href: `/${pageIDs.contact}`, background: gradient.default, titleCN: '' },
];

const heroBtnSize = ' w-44 h-14 xl:w-52 xl:h-16 ';

const welcomeStem = "Welcome to my";
const welcomeEnding = " universe...";
const firstTypewriterSequences = [
  {
    text: `${welcomeStem} website...`,
    deleteCount: " website...".length,
    pauses: {
      beforeDelete: 500, // 0.5 sec
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
      I'm&nbsp;<span className={"text-nice-purple3 font-medium"}>Kit Sum Chan</span>
      <NekoSleep className="w-8 md:w-12 xl:w-16 inline-block ml-2 object-contain" />
      <SleepZZZ className="-ml-1 md:-ml-2 w-8 md:w-12 xl:-ml-4 xl:w-20 inline-block border-0 " />
    </div>
  </motion.div>
));

HeroTitle.displayName = "HeroTitle";

//////////////////////////// HERO //////////////////////////
const Hero = () => {
  const pageID = pageIDs.home;
  const heroRef = useRef<HTMLDivElement>(null);
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
      {/* Sound */}
      <FadeIn><HeroHeader /></FadeIn>

      <CenterContainer className="min-h-dvh relative z-20 px-5 py-10 sm:p-10">
        <div className="text-center">
          <HeroTitle onAnimationComplete={() => setStartTyping(true)} />

          <div
            id="hero-info"
            className="mt-4 xl:mt-6 flex flex-col items-center gap-3 [animation:heroBtnReveal_0.8s_ease-out_0.6s_both]"
          >
            <div className={Text.txtInfo}>AI master's student at the University of Leeds</div>
            <TransitionLink id="hero-status" href={`/${pageIDs.contact}`} className={Text.txtStatus}>
              <span>Open to 2027 graduate roles</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1">
                <span>I'm happy to relocate!</span>
                <span aria-hidden="true" className="relative size-4 xl:size-5 overflow-hidden text-nice-purple3">
                  <RxArrowTopRight className={cn(statusArrow, statusArrowOut)} />
                  <RxArrowTopRight className={cn(statusArrow, statusArrowIn)} />
                </span>
              </span>
              <span className="sr-only">, get in touch</span>
            </TransitionLink>
          </div>

          {/* typewriter */}
          <div id="hero-typing" className={cn(`${Text.typingContainer}`, `${Text.txtMono}`)}>
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
              <>
                {welcomeStem}
                <Typewriter
                  enableDelete={false}
                  speed={70}
                  delay={animationTime.delayTypewriter}
                  text={welcomeEnding}
                />
              </>
            )}
          </div>

          {/* nav buttons container */}
          <div
            id="hero-buttons-container"
            className="mt-8 flex justify-center w-full min-h-52 lg:min-h-0"
          >
            <div
              id='hero-nav-buttons'
              className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8 [animation:heroBtnReveal_0.8s_ease-out_1.2s_both]"
            >
              {heroNavButtons.map((link) => (
                <NavButton
                  key={link.name}
                  btnSize={heroBtnSize}
                  background={link.background}
                  href={link.href}
                  title={link.name}
                  titleCN={link.titleCN}
                />
              ))}
            </div>
          </div>
        </div>
      </CenterContainer>
    </section>
  );
}

export default Hero;