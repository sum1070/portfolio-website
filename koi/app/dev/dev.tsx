import {MouseTrail} from "@/components";
import {Hero, MainPage} from "@/components/sections";
import Reveal from "@/lib/Reveal";
import Dummy from "./dummy";

export default function dev() {

  return (
    <div className="min-h-full flex-col">
      <MouseTrail />
      <Hero />
      <MainPage />
      {/* <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal> */}
    </div>

  );
}
