import { CenterContainer } from "@/components/CenterContainer";
import ScrollDown from "../Animated/ScrollArrow/ScrollDown";
import { Typewriter } from "../Animated/Typewriter/Typewriter";
import { BackgroundDeco } from "./BackgroundDeco";
import MouseAnimated from "../Animated/mouse/mouse";

export const Hero = () => {
  return (
    <>
      <MouseAnimated />
      <div className="">
        <BackgroundDeco />
        <CenterContainer className="min-h-screen relative z-10">
          <div className="text-center text-nice-purple0 ">
            <h1 className="text-4xl sm:text-7xl xl:text-8xl text-balance tracking-tight italic font-semibold">
              Lorem ipsum dolor.
            </h1>
            <p className="mt-4 text-xl sm:text-3xl xl:text-4xl text-nice-purple0">
              Lorem, ipsum dolor.
            </p>
            <Typewriter className="mt-4 text-base sm:text-2xl block font-titillium-web">
              Lorem ipsum dolor sit.
            </Typewriter>
            <div className="mt-4 flex justify-center">
              <ScrollDown />
            </div>
          </div>
        </CenterContainer>
      </div>
    </>
  );
}

