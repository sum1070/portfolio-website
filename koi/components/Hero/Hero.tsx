import { CenterContainer } from "@/components/CenterContainer";
import ScrollDown from "../Animation/ScrollArrow/ScrollDown";
import styles from "./Hero.module.css";
import { Typewriter } from "../Animation/Typewriter/Typewriter";

export const Hero = () => {
  return (
    <CenterContainer className="min-h-screen ">
      <div className="text-center text-nice-purple0 ">
        <h1 className="text-3xl sm:text-5xl xl:text-7xl font-bold text-balance tracking-tight italic ">
          Lorem, ipsum.
        </h1>
        <p className="mt-3 text-2xl sm:text-3xl xl:text-7xl text-nice-purple0">
          Lorem, ipsum dolor.
        </p>
        <Typewriter className="mt-5 text-base  sm:text-2xl block" >
          Lorem ipsum dolor sit.
        </Typewriter>
        <div className="mt-3 flex justify-center">
          <ScrollDown />
        </div>
      </div>
    </CenterContainer>
  );
}

