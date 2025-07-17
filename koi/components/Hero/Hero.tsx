import { CenterContainer } from "@/components/CenterContainer";
import ScrollDown from "../Animation/ScrollArrow/ScrollDown";
import ScrollUp from "../Animation/ScrollArrow/ScrollUp";
import styles from "./Hero.module.css";
import { Typewriter } from "../Animation/Typewriter/Typewriter";

export const Hero = () => {
  return (
    <CenterContainer className="min-h-screen ">
      <div className="text-center text-nice-purple0">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-balance tracking-tight italic font-mono">
          HELLO
        </h1>

        <Typewriter className="text-2xl sm:text-3xl xl:text-4xl text-nice-purple0">
          I'm Margaret.
        </Typewriter>

        <p className="mt-8 text-base  text-pretty sm:text-2xl font-mono" >
          Welcome to my <span className=" ">WORLD</span>...
        </p>
        <div className="mt-6 flex justify-center">
          {/* <ScrollUp /> */}
          <ScrollDown />
        </div>
      </div>

    </CenterContainer>

  );
}

