import {MouseTrail, BlurredBlobs} from "@/components";
import {Hero} from "@/components/sections";
import Reveal from "@/lib/Reveal";
import Dummy from "./dummy";

export default function dev() {

  return (
    <>
      <MouseTrail />
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
