import {MouseTrail} from "@/components";
import {Hero, MainPage} from "@/components/sections";
import Reveal from "@/lib/Reveal";
import Dummy from "./dummy";
import { Test } from "./test";

export default function dev() {

  return (
    <div className="min-h-full flex-col">
      <Test />
      {/* <MouseTrail />
      <Hero />
      <MainPage /> */}
      {/* 
      
      <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal> */}
    </div>

  );
}
