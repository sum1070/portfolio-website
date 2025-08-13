'use client';
import { About, Hero, MouseTrail } from "@/components";

export default function Home() {

  return (
    <>
      <MouseTrail />
      <div className="flex flex-col ">
        <Hero />
        <About />
      </div>
    </>


  );
}
