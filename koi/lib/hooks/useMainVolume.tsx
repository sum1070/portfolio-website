"use client";
import { useEffect, useRef } from "react";
import { useVolume } from "../context/VolumeContext";
import { Howl } from "howler";
import { sounds } from "@/utils";

export function useMainVolume() {
  const { volume, isMuted } = useVolume();
  const bgMusicRef = useRef<Howl | null>(null);

  useEffect(() => {
    // initialize background music
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Howl({
        src: [sounds.music],
        loop: true,
        volume: isMuted ? 0 : volume*0.2,
        autoplay: !isMuted,
        html5: true,
      });
    } else {
      // update volume if exist instance
      bgMusicRef.current.volume(isMuted ? 0 : volume*0.1);

      if (!isMuted && !bgMusicRef.current.playing()) {
        bgMusicRef.current.play();
      } else if (isMuted && bgMusicRef.current.playing()) {
        bgMusicRef.current.pause();
      }
    }

    // global volume for other SE
    window._SoundManagerVolume = isMuted ? 0 : volume;

    // cleanup
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.unload();
      }
    };
  }, [volume, isMuted]);

  return { volume, isMuted };
}

declare global {
  interface Window {
    _SoundManagerVolume: number;
  }
}