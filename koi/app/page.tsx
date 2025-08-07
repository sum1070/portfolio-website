'use client';
import { Hero, MainPage, MouseTrail } from "@/components";
import { VolumeProvider } from "@/lib/context/VolumeContext";

export default function Home() {
  return (
    <VolumeProvider>
      <MouseTrail />
      <Hero />
      <MainPage />

    </VolumeProvider>

  );
}
