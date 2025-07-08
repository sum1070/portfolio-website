import { CenterContainer } from "@/components/CenterContainer";
import ScrollDown from "../Animated/ScrollArrow/ScrollDown";
// import Typewriter from "../Animated/Strings/Typewriter";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <CenterContainer className="min-h-screen ">
      <div className="text-center ">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-balance text-nice-purple0 tracking-tight italic font-mono">
          HELLO
        </h1>
        {/* <Typewriter className="text-4xl sm:text-6xl font-semibold text-nice-purple0">
          I'm Margaret.
        </Typewriter> */}
        <div className={styles.typewriterContainer}>
          <p className={styles.typewriterText}>
            I'm Margaret.
          </p>
        </div>
        <p className="mt-8 text-base text-nice-purple1 text-pretty sm:text-2xl font-mono" >
          Welcome to my <span className="text-nice-purple0 ">WORLD</span>...
        </p>
        <div className="mt-6 flex justify-center">
          <ScrollDown />
        </div>
      </div>

    </CenterContainer>

  );
}

