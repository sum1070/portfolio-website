import MouseAnimated from "@/components/ui/MouseTrail";
import Dummy from "./dummy";
import { Reveal } from "@/lib/";
import {Hero} from "@/components/sections";
import BlurredBlobs from "@/components/decorations/BlurredBlobs";

export default function dev() {

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
