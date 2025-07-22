import BackgroundDeco from "@/components/BackgroundDeco";
import CenterContainer from "@/components/CenterContainer";
import { TriangleArrowDown } from "@/components/TriangleArrow";
import Typewriter from "@/components/ui/Typewriter";
import { StringReveal } from "@/utils/StringReveal";
import { Reveal } from "@/utils/Reveal";


const Text = {
  txtMain: "text-4xl sm:text-7xl xl:text-8xl text-balance tracking-tight italic font-semibold",
  txtMid: "mt-4 text-xl sm:text-3xl xl:text-4xl text-nice-purple0",
  txtMono: "mt-4 text-base sm:text-2xl block font-titillium-web",
};


export const Hero = () => {
  return (

    <div className="pb-20">
      <BackgroundDeco />
      <CenterContainer className="min-h-screen relative z-100">
        <div className="text-center text-nice-purple0 ">
          {/* <h1 className={`${Text.txtMain}`}>
            Lorem ipsum dolor.
          </h1> */}
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
            speed={110}
          >
            Lorem ipsum dolor sit.
          </Typewriter>
          <Reveal delay={0.5} className="mt-4 pb-2 flex justify-center">
              <TriangleArrowDown />
          </Reveal>
        </div>
      </CenterContainer>
    </div>
  );
}

