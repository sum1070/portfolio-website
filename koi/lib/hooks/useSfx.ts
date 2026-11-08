"use client";

import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import { sounds, soundGains } from "@/utils";
import { useVolume } from "../context/volume-context";

const SFX = [sounds.tick, sounds.release, sounds.menuOpen, sounds.switch, sounds.bell, sounds.bubble];
const howls = new Map<string, Howl>();
let warmed = false;

function getHowl(src: string) {
  let howl = howls.get(src);
  if (!howl) {
    howl = new Howl({ src: [src], preload: false });
    howls.set(src, howl);
  }
  if (howl.state() === "unloaded") howl.load();
  return howl;
}

function warmUp() {
  if (warmed) return;
  warmed = true;
  const load = () => SFX.forEach(getHowl);
  if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 4000 });
  else setTimeout(load, 2000);
}

export default function useSfx(src: string, { interrupt = false } = {}) {
  const { volume, isMuted, sfxOn } = useVolume();
  const sfxMuted = isMuted || !sfxOn;
  const idRef = useRef<number | null>(null);

  useEffect(() => {
    if (!sfxMuted) warmUp();
  }, [sfxMuted]);

  const play = useCallback(() => {
    if (sfxMuted) return;
    const howl = getHowl(src);
    if (howl.state() !== "loaded") return;
    if (interrupt) howl.stop();
    howl.volume(volume * soundGains.se);
    idRef.current = howl.play();
  }, [src, interrupt, sfxMuted, volume]);

  const stop = useCallback(() => {
    if (idRef.current !== null) howls.get(src)?.stop(idRef.current);
  }, [src]);

  return [play, { stop }] as const;
}
