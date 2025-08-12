'use client';
import { About, CenterContainer, Hero, MainPage, MouseTrail } from "@/components";
import NavButton from "@/components/navButton/NavButton";

export default function Home() {

  return (
    <>
      <MouseTrail />
      <div className="flex flex-col ">
        <Hero />
        <About />
        {/* <MainPage /> */}
      </div>
      {/* <CenterContainer>
        <NavButton />
      </CenterContainer> */}
    </>


  );
}
