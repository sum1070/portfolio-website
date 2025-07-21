import { Hero } from "@/ui/Hero";
import { Test } from "./test";
import { TracingBeam } from "@/components/ui/tracing-beam";
import WaveTransition from "@/ui/Transition";
import MouseAnimated from "@/components/ui/MouseTrail";

export default function Home() {

  return (
    <>
      <MouseAnimated />
      {/* <TracingBeam className="px-1">
        <Hero />
      </TracingBeam> */}
      {/* <Test /> */}
      <Hero />
      <WaveTransition
        waveColor="var(--color-milky-white)"
        waveAmplitude={15}
        speed={0.5}
      />


    </>

  );
}
