import { Test } from "./dev/test";
import { TracingBeam } from "@/components/ui/dev/tracing-beam";
import MouseAnimated from "@/components/ui/MouseTrail";
import Dummy from "./dev/dummy";
import { Reveal } from "@/lib/Reveal";
import { Hero } from "@/components/sections/Hero";

export default function Home() {

  return (
    <>
      <MouseAnimated />
      <Hero />
      <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal>
      
    </>

  );
}
