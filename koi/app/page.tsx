import { Test } from "./dev/test";
import MouseAnimated from "@/components/ui/MouseTrail";
import Dummy from "./dev/dummy";
import { Reveal } from "@/lib/Reveal";
import { Hero } from "@/components/sections/Hero";
import BlurredBlobs from "@/components/decorations/BlurredBlobs";

export default function Home() {

  return (
    <>
      <MouseAnimated />
      <BlurredBlobs />
      <Hero />
      <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal>
    </>

  );
}
