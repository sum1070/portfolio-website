import { Test } from "./dev/test";
import { TracingBeam } from "@/components/ui/dev/tracing-beam";
import MouseAnimated from "@/components/ui/MouseTrail";
import Dummy from "./dev/dummy";
import { Reveal } from "@/lib/Reveal";
import Pattern from "@/components/Patterns";
import { Hero } from "@/components/sections/Hero";

export default function Home() {

  return (
    <>
      <MouseAnimated />
      <Pattern
        type="dots"
        size={10}
        height="15svh"
        position="bottom"
      />
      <Hero />
      <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal>
    </>

  );
}
