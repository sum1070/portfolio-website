'use client';
import { About, CenterContainer, Hero, MainPage, MouseTrail } from "@/components";
import NavButton from "@/components/NavButton";

export default function Home() {

  return (
    <>
      <MouseTrail />
      <Hero />
      <About />
      <MainPage />
      {/* <CenterContainer>
        <NavButton />
      </CenterContainer> */}
    </>


  );
}
