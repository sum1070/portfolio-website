import {MouseTrail} from "@/components";
import {Hero, MainPage} from "@/components/sections";
import Reveal from "@/lib/Reveal";
import Dummy from "./dummy";

export default function dev() {

  return (
    <>
      <MouseTrail />
      <Hero />
      <MainPage />
      {/* <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal> */}
    </>

  );
}
