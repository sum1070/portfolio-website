"use client";
import { useEffect } from "react";
import { useVolume } from "../context/VolumeContext";

export function useMainVolume() {
  const { volume, isMuted } = useVolume();

  useEffect(() => {
    window._SoundManagerVolume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  return { volume, isMuted };
}

declare global {
  interface Window {
    _SoundManagerVolume: number;
  }
}