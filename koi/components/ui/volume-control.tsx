"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useVolume } from "@/lib/context/volume-context";
import { cn, soundButtonImages } from "@/utils";

interface VolumeControlProps {
  variant?: "hero" | "nav";
}

const LEAVE_GRACE_MS = 300; // pointer can travel icon -> slider without collapse
const AUTO_HIDE_MS = 3000; // lifetime of the transient reveal on touch

const VolumeControl = ({ variant = "hero" }: VolumeControlProps) => {
  const { isMuted, toggleMute, volume, setNewVolume } = useVolume();

  const [revealed, setRevealed] = useState(false);
  const [isTransient, setIsTransient] = useState(false); //Auto-hides

  const containerRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLButtonElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const lastPointerTypeRef = useRef("mouse");
  const suppressFocusRevealRef = useRef(false);

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
    toggleMute();
    if (!isTouch) return;
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

  const sliderWrapClassName = cn(
    "absolute left-full top-1/2 -translate-y-1/2 ml-1 z-10",
    "flex items-center rounded-full px-2.5 backdrop-blur-sm",
    isNav ? "bg-purple-400/10 dark:bg-white/10" : "bg-black/20 dark:bg-white/10",
    "origin-left transition-all duration-200 motion-reduce:transition-none",
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
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--slider-color)]",
    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[color-mix(in_srgb,var(--slider-color)_25%,transparent)]",
    "[&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[var(--slider-color)]",
    "[&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--slider-color)]",
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
          isNav && "bg-nice-purple1/70 dark:bg-transparent rounded-full p-1",
        )}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Image
          src={!isMuted ? soundButtonImages.soundOn : soundButtonImages.soundOff}
          alt="sound button"
          width={40}
          height={40}
          priority={true}
          className={cn(
            isNav ? "w-6 h-6 md:w-7 md:h-7" : "w-8 h-8 md:w-10 md:h-10",
            "cursor-pointer transition-transform hover:scale-110",
          )}
        />
      </button>
      <div id="volume-slider" className={sliderWrapClassName}>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={sliderPercent}
          onChange={handleSliderChange}
          aria-label="Volume"
          aria-valuetext={`${sliderPercent}%`}
          className={sliderClassName}
          style={
            {
              "--vol": `${sliderPercent}%`,
              "--slider-color": isNav ? "var(--color-nice-purple2)" : "#ffffff",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

export default VolumeControl;
