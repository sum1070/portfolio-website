"use client";

import { useCallback } from "react";
import { sounds } from "@/utils";
import { useMainVolume } from "./useMainVolume";
import useSfx from "./useSfx";

export default function useUiSounds() {
  const { sfxMuted } = useMainVolume();
  const [tick] = useSfx(sounds.tick, { interrupt: true });
  const [release] = useSfx(sounds.release, { interrupt: true });
  const [menuOpen] = useSfx(sounds.menuOpen, { interrupt: true });

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
