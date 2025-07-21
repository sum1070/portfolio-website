import BackgroundDeco from "@/components/BackgroundDeco";
import CenterContainer from "@/components/CenterContainer";
import { ScrollDown } from "@/components/TriangleArrow";
import MouseAnimated from "@/components/ui/MouseTrail";
import Typewriter from "@/components/ui/Typewriter";


export const Hero = () => {
  return (

    <div className="">
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-100">
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

  );
}

