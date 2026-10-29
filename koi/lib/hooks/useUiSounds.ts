"use client";

import { useCallback } from "react";
import useSound from "use-sound";
import { sounds, soundGains } from "@/utils";
import { useMainVolume } from "./useMainVolume";

export default function useUiSounds() {
  const { volume, sfxMuted } = useMainVolume();
  const gain = sfxMuted ? 0 : volume * soundGains.se;
  const [tick] = useSound(sounds.tick, { volume: gain, interrupt: true });
  const [release] = useSound(sounds.release, { volume: gain, interrupt: true });
  const [menuOpen] = useSound(sounds.menuOpen, { volume: gain, interrupt: true });

  const playClick = useCallback(() => {
    if (!sfxMuted) tick();
  }, [sfxMuted, tick]);

  const playOpen = useCallback(() => {
    if (!sfxMuted) menuOpen();
  }, [sfxMuted, menuOpen]);

  const playSwitch = useCallback(() => {
    if (!sfxMuted) release();
  }, [sfxMuted, release]);

  return { playClick, playOpen, playSwitch };
}
