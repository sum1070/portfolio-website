'use client';
import { Test } from "./dev/test";
import Dummy from "./dev/dummy";
import Dev from "./dev/dev";
import Deploy from "./dev/deploy";
import { Hero, MainPage, MouseTrail } from "@/components";
import Reveal from "@/lib/Reveal";

export default function Home() {

  return (
    <>
      <MouseTrail />
      <Hero />
      <MainPage />
      <Dummy />
        <Dummy />
        <Dummy />
    </>

  );
}
