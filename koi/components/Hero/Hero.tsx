import { CenterContainer } from "@/components/CenterContainer";
import ScrollDown from "../Animation/ScrollArrow/ScrollDown";
import ScrollUp from "../Animation/ScrollArrow/ScrollUp";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <CenterContainer className="min-h-screen ">
      <div className="text-center text-nice-purple0">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-balance tracking-tight italic font-mono">
          HELLO
        </h1>
        <div className={styles.typewriterContainer}>
          <p className={styles.typewriterText}>
            I'm Margaret.
          </p>

        </div>

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

