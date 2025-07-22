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
      {/* <Test /> */}
      <Hero />
      <Reveal>
        <Dummy />
        <Dummy />
        <Dummy />
      </Reveal>

      {/* <Wave mask="url(#mask)" fill="#1277b0" >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave> */}
      {/* <Wave fill='#f79902'
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
      /> */}


    </>

  );
}
