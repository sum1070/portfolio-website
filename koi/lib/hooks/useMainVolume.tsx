import React, { useEffect } from "react";
import { useVolume } from "../context/VolumeContext";

declare global {
  interface Window {
    Howler?: {
      volume: (volume: number) => void;
    };
  }
}

export function useMainVolume() {
  const { volume, isMuted } = useVolume();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.Howler) {
        window.Howler.volume(isMuted ? 0 : volume);
      }
    }
  }, [volume, isMuted]);

  return { volume, isMuted };
}