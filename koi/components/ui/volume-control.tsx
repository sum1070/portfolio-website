"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useVolume } from "@/lib/context/volume-context";
import { cn, pageIDs, soundButtonImages } from "@/utils";
import { pxIbmVga } from "@/lib/fonts";

interface VolumeControlProps {
  variant?: "hero" | "nav";
}

const LEAVE_GRACE_MS = 300; // pointer can travel icon -> slider without collapse
const AUTO_HIDE_MS = 3000; // lifetime of the transient reveal on touch
const WHEEL_STEP = 0.05;
const WHEEL_PX_PER_STEP = 50;
const EDGE_GAP = 8;
const SLIDER_OFFSET = 4;
const DROPDOWN_SLIDER_PX = 160;

const speakerGradients: Record<string, string> = {
  [`/${pageIDs.contact}`]: "speaker-gradient-lime-blue", // BlueBackground
  [`/${pageIDs.licences}`]: "speaker-gradient-1", // GreenBackground
  "/wip": "speaker-gradient-1", // GreenBackground
  [`/${pageIDs.projects}`]: "speaker-gradient-candy", // PinkBackground, includes write-ups
};
const DEFAULT_SPEAKER_GRADIENT = "speaker-gradient-twilight"; // pages on the layout bgPrimary

const getSpeakerGradient = (pathname: string) =>
  Object.entries(speakerGradients).find(
    ([route]) => pathname === route || pathname.startsWith(`${route}/`),
  )?.[1] ?? DEFAULT_SPEAKER_GRADIENT;

const VolumeControl = ({ variant = "hero" }: VolumeControlProps) => {
  const { isMuted, toggleMute, volume, setNewVolume, musicOn, sfxOn, toggleMusic, toggleSfx } = useVolume();
  const pathname = usePathname();

  const [revealed, setRevealed] = useState(false);
  const [isTransient, setIsTransient] = useState(false); //Auto-hides
  const [layout, setLayout] = useState<"inline" | "stacked" | "below">("inline");

  const containerRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const togglesRef = useRef<HTMLSpanElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const lastPointerTypeRef = useRef("mouse");
  const wasRevealedRef = useRef(false);
  const suppressFocusRevealRef = useRef(false);
  const wheelRef = useRef({ volume: 0, carry: 0, apply: (_vol: number) => {} });

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const hideSlider = () => {
    clearHideTimer();
    setRevealed(false);
    setIsTransient(false);
  };

  const scheduleHide = (delayMs: number) => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setRevealed(false);
      setIsTransient(false);
    }, delayMs);
  };

  const revealTransiently = () => {
    setRevealed(true);
    setIsTransient(true);
    scheduleHide(AUTO_HIDE_MS);
  };

  useEffect(() => clearHideTimer, []);

  const fitToggles = useCallback(() => {
    const container = containerRef.current;
    const wrap = wrapRef.current;
    const slider = sliderRef.current;
    const toggles = togglesRef.current;
    if (!container || !wrap || !slider || !toggles) return;
    const { paddingLeft, paddingRight } = getComputedStyle(wrap);
    const left = container.getBoundingClientRect().right + SLIDER_OFFSET;
    let limit = document.documentElement.clientWidth - EDGE_GAP;
    for (let el = container.parentElement?.nextElementSibling; el; el = el.nextElementSibling) {
      const box = el.getBoundingClientRect();
      if (!box.width) continue;
      limit = Math.min(limit, box.left - EDGE_GAP);
      break;
    }
    const room = limit - left - parseFloat(paddingLeft) - parseFloat(paddingRight);
    slider.style.width = "";
    const sliderW = slider.offsetWidth;
    let next: typeof layout = "inline";
    if (sliderW > room || window.matchMedia("(pointer: coarse)").matches) next = "below";
    else if (sliderW + EDGE_GAP + toggles.offsetWidth > room) next = "stacked";
    slider.style.width = next === "below" ? `${DROPDOWN_SLIDER_PX}px` : "";
    setLayout(next);
  }, []);

  useLayoutEffect(() => {
    if (!revealed) return;
    fitToggles();
    window.addEventListener("resize", fitToggles);
    return () => window.removeEventListener("resize", fitToggles);
  }, [revealed, fitToggles]);

  wheelRef.current.volume = volume;
  wheelRef.current.apply = (vol: number) => {
    if (vol <= 0) {
      if (!isMuted) toggleMute();
    } else {
      setNewVolume(vol);
    }
  };

  // native listener: React's onWheel is passive, so it can't stop the page scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      const w = wheelRef.current;
      let steps: number;
      if (e.deltaMode !== WheelEvent.DOM_DELTA_PIXEL || Math.abs(e.deltaY) >= WHEEL_PX_PER_STEP) {
        steps = -Math.sign(e.deltaY);
        w.carry = 0;
      } else {
        w.carry += e.deltaY;
        steps = -Math.trunc(w.carry / WHEEL_PX_PER_STEP);
        w.carry %= WHEEL_PX_PER_STEP;
      }
      if (!steps) return;
      const next = Math.round(Math.min(1, Math.max(0, w.volume + steps * WHEEL_STEP)) * 100) / 100;
      if (next === w.volume) return;
      w.volume = next;
      w.apply(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (!(revealed && isTransient)) return;
    const onOutsidePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) hideSlider();
    };
    document.addEventListener("pointerdown", onOutsidePointerDown);
    return () =>
      document.removeEventListener("pointerdown", onOutsidePointerDown);
  }, [revealed, isTransient]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = e.pointerType;
    wasRevealedRef.current = revealed;
    if (isTransient) scheduleHide(AUTO_HIDE_MS);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    clearHideTimer();
    setRevealed(true);
    setIsTransient(false);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || isTransient) return;
    scheduleHide(LEAVE_GRACE_MS);
  };

  // Click to mute/unmute
  const handleSpeakerClick = () => {
    const isTouch =
      lastPointerTypeRef.current === "touch" ||
      lastPointerTypeRef.current === "pen";
    if (!isTouch) {
      toggleMute();
      return;
    }
    if (!wasRevealedRef.current) {
      if (isMuted) toggleMute();
      revealTransiently();
      return;
    }
    toggleMute();
    if (isMuted) {
      revealTransiently(); // unmuting on touch reveals the slider
    } else {
      hideSlider(); // muting: hide slider
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    if (newVolume === 0) {
      if (!isMuted) toggleMute(); // dragging to zero mutes
    } else {
      setNewVolume(newVolume); // context un-mutes on its own when > 0
    }
    if (isTransient) scheduleHide(AUTO_HIDE_MS);
  };

  const handleFocus = () => {
    if (suppressFocusRevealRef.current) {
      suppressFocusRevealRef.current = false;
      return;
    }
    if (!isTransient) clearHideTimer();
    setRevealed(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) hideSlider();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Escape" || !revealed) return;
    hideSlider();
    if (document.activeElement !== speakerRef.current) {
      suppressFocusRevealRef.current = true;
      speakerRef.current?.focus();
    }
  };

  const isNav = variant === "nav";
  const sliderPercent = Math.round(volume * 100);
  const speakerGradient = isNav ? getSpeakerGradient(pathname) : undefined;

  const sliderWrapClassName = cn(
    "absolute z-10 flex rounded-full px-2.5",
    layout === "below"
      ? "left-0 top-full mt-1 flex-col items-start origin-top-left"
      : "left-full top-1/2 -translate-y-1/2 ml-1 items-center origin-left",
    "transition-all duration-200 motion-reduce:transition-none",
    revealed
      ? "opacity-100 scale-x-100"
      : "opacity-0 scale-x-95 pointer-events-none",
  );

  // thin track, but the input is 40px tall for a comfortable touch target
  const sliderClassName = cn(
    isNav ? "w-20 md:w-24" : "w-24 md:w-28",
    "h-10 appearance-none bg-transparent cursor-pointer",
    "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full",
    "[&::-webkit-slider-runnable-track]:[background:linear-gradient(to_right,var(--slider-color)_var(--vol),color-mix(in_srgb,var(--slider-color)_25%,transparent)_var(--vol))]",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-[url(/images/ui/slider-thumb.png)] [&::-webkit-slider-thumb]:bg-size-[100%_100%] [&::-webkit-slider-thumb]:[image-rendering:pixelated]",
    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[color-mix(in_srgb,var(--slider-color)_25%,transparent)]",
    "[&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[var(--slider-color)]",
    "[&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:bg-[url(/images/ui/slider-thumb.png)] [&::-moz-range-thumb]:bg-size-[100%_100%] [&::-moz-range-thumb]:[image-rendering:pixelated]",
  );

  const toggleClassName = (on: boolean) => cn(
    pxIbmVga.variable,
    "[font-family:var(--font-px-ibm-vga)] shrink-0 whitespace-nowrap cursor-pointer px-1.5 py-0.5 text-sm",
    "border-2 transition-[background-color,opacity] duration-200 motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--slider-color)]",
    !isNav && [
      "border-[var(--slider-color)] text-[var(--slider-color)] hover:bg-[color-mix(in_srgb,var(--slider-color)_30%,transparent)]",
      on ? "bg-[color-mix(in_srgb,var(--slider-color)_20%,transparent)]" : "opacity-60",
    ],
    isNav && [
      "dark:border-[var(--slider-color)] dark:text-[var(--slider-color)] dark:hover:bg-[color-mix(in_srgb,var(--slider-color)_30%,transparent)]",
      on
        ? "border-[#68465c] bg-[#f9d9e6] text-[#68465c] hover:bg-[#fdeef4] dark:bg-[color-mix(in_srgb,var(--slider-color)_20%,transparent)]"
        : "border-[var(--slider-color)] text-[var(--slider-color)] hover:bg-[color-mix(in_srgb,var(--slider-color)_20%,transparent)] dark:opacity-60",
    ],
  );

  return (
    <div
      id="volume-control"
      ref={containerRef}
      className="relative flex items-center"
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={speakerRef}
        onClick={handleSpeakerClick}
        className={cn(
          "bg-transparent p-0 border-0 flex items-center justify-center",
          // isNav && !speakerGradient && "bg-nice-purple1/70 dark:bg-transparent rounded-full p-1", // old purple circle, every nav page has a gradient now
          speakerGradient && ["speaker-aurora rounded-full p-1.5", speakerGradient, isMuted && "is-muted"],
        )}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Image
          src={!isMuted ? soundButtonImages.soundOn : soundButtonImages.soundOff}
          alt="sound button"
          width={16}
          height={16}
          priority={true}
          unoptimized
          className={cn(
            "w-8 h-8",
            "cursor-pointer transition-transform hover:scale-110 [image-rendering:pixelated]",
            speakerGradient && "drop-shadow-[0_1px_1.2px_rgba(40,30,80,0.55)]", // keeps the white icon readable on pale stops
          )}
        />
      </button>
      <div
        id="volume-slider"
        ref={wrapRef}
        className={sliderWrapClassName}
        style={{ "--slider-color": isNav ? "var(--color-nice-purple2)" : "#ffffff" } as React.CSSProperties}
      >
        <input
          ref={sliderRef}
          type="range"
          min={0}
          max={100}
          step={5}
          value={sliderPercent}
          onChange={handleSliderChange}
          aria-label="Volume"
          aria-valuetext={`${sliderPercent}%`}
          className={sliderClassName}
          style={{ "--vol": `${sliderPercent}%` } as React.CSSProperties}
        />
        <span ref={togglesRef} className={cn("flex gap-2", { inline: "ml-2", stacked: "absolute left-2.5 top-full -mt-1", below: "-mt-1" }[layout])}>
          <button type="button" aria-pressed={musicOn} aria-label="Background music" onClick={toggleMusic} className={toggleClassName(musicOn)}>
            ♪ Music {musicOn ? "ON" : "OFF"}
          </button>
          <button type="button" aria-pressed={sfxOn} aria-label="Sound effects" onClick={toggleSfx} className={toggleClassName(sfxOn)}>
            SFX {sfxOn ? "ON" : "OFF"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default VolumeControl;
