"use client";
import { useEffect } from "react";
import { useVolume } from "../context/volume-context";
import { Howl } from "howler";
import { sounds, soundGains } from "@/utils";

let bgMusic: Howl | null = null;

export function useMainVolume() {
  const { volume, isMuted } = useVolume();

  useEffect(() => {
    if (!bgMusic && !isMuted) {
      bgMusic = new Howl({
        src: [sounds.music],
        loop: true,
        // volume: volume * 0.2,
        volume: volume * soundGains.music,
        autoplay: true,
        html5: true,
      });
    } else if (bgMusic) {
      // bgMusic.volume(isMuted ? 0 : volume * 0.2);
      bgMusic.volume(isMuted ? 0 : volume * soundGains.music);

      if (!isMuted && !bgMusic.playing()) {
        bgMusic.play();
      } else if (isMuted && bgMusic.playing()) {
        bgMusic.pause();
      }
    }

    // global volume for other SE
    window._SoundManagerVolume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  return { volume, isMuted };
}

declare global {
  interface Window {
    _SoundManagerVolume: number;
  }
}
