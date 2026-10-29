"use client";
import { useEffect } from "react";
import { useVolume } from "../context/volume-context";
import { Howl } from "howler";
import { sounds, soundGains } from "@/utils";

let bgMusic: Howl | null = null;

export function useMainVolume() {
  const { volume, isMuted, musicOn, sfxOn } = useVolume();
  const musicMuted = isMuted || !musicOn;
  const sfxMuted = isMuted || !sfxOn;

  useEffect(() => {
    if (!bgMusic && !musicMuted) {
      bgMusic = new Howl({
        src: [sounds.music],
        loop: true,
        // volume: volume * 0.2,
        volume: volume * soundGains.music,
        autoplay: true,
        html5: true,
      });
      bgMusic.once("playerror", () => {
        bgMusic?.once("unlock", () => bgMusic?.play());
      });
    } else if (bgMusic) {
      // bgMusic.volume(isMuted ? 0 : volume * 0.2);
      bgMusic.volume(musicMuted ? 0 : volume * soundGains.music);

      if (!musicMuted && !bgMusic.playing()) {
        bgMusic.play();
      } else if (musicMuted && bgMusic.playing()) {
        bgMusic.pause();
      }
    }

    // global volume for other SE
    window._SoundManagerVolume = sfxMuted ? 0 : volume;
  }, [volume, musicMuted, sfxMuted]);

  return { volume, isMuted, sfxMuted };
}

declare global {
  interface Window {
    _SoundManagerVolume: number;
  }
}
