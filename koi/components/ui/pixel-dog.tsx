"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useAnimate, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { cn } from "@/utils";
import { SleepZZZ } from "../svg-creator";

const DOG_DIR = "/images/doggy";

export const DOG_FRAMES = {
  drowsy: [`${DOG_DIR}/doggy_stand_eyes_closed.png`],
  sleep: [`${DOG_DIR}/doggy_breathe_eyes_closed.png`],
  awake: [`${DOG_DIR}/doggy_sit_eyes_open.png`, `${DOG_DIR}/doggy_breathe_eyes_open.png`],
  runRight: [`${DOG_DIR}/doggy_walk_eyes_open.png`, `${DOG_DIR}/doggy_sit_eyes_open.png`],
  runLeft: [`${DOG_DIR}/doggy_walk_eyes_open_flipped.png`, `${DOG_DIR}/doggy_sit_eyes_open_flipped.png`],
};

const ALL_FRAMES = [...new Set(Object.values(DOG_FRAMES).flat())];

const HEART_SRC = `${DOG_DIR}/doggy_heart.gif`;
const MAX_HEARTS = 6;

const FRAME_MS = { awake: 250, run: 180 };
const TAP_AWAKE_MS = 2500;
const SCROLL_AWAKE_MS = 1000;
const RUN_SPEED = 220;
const DROWSY_MS = 700;
const SELF_WAKE_MIN_MS = 12000;
const SELF_WAKE_MAX_MS = 25000;
const HOP_CHANCE = 1 / 3;

interface PixelDogProps {
  className?: string;
  interactive?: boolean;
  startAwake?: boolean;
  zzzClassName?: string;
}

export default function PixelDog({ className, interactive = false, startAwake = false, zzzClassName }: Readonly<PixelDogProps>) {
  const [awake, setAwake] = useState(startAwake);
  const [frame, setFrame] = useState(0);
  const [still, setStill] = useState(false);
  const [drowsy, setDrowsy] = useState(false);
  const [mode, setMode] = useState<"idle" | "held" | "running">("idle");
  const [facingLeft, setFacingLeft] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; bottom: number; drift: number; tilt: number }[]>([]);
  const heartIdRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const tapTimerRef = useRef<number | null>(null);
  const drowsyTimerRef = useRef<number | null>(null);
  const selfHeartTimerRef = useRef<number | null>(null);
  const awakeRef = useRef(startAwake);
  const hoveringRef = useRef(false);
  const busyRef = useRef(false);
  const draggedRef = useRef(false);
  const runAnimsRef = useRef<AnimationPlaybackControls[]>([]);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const [hopScope, animateHop] = useAnimate<HTMLSpanElement>();

  const frozen = mode === "idle" && awake && still;
  const cycle = mode === "running" ? "run" : mode === "held" || awake ? "awake" : "sleep";

  useEffect(() => {
    if (cycle === "sleep" || frozen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 2), FRAME_MS[cycle]);
    return () => window.clearInterval(id);
  }, [cycle, frozen]);

  useEffect(() => () => {
    if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    if (drowsyTimerRef.current !== null) window.clearTimeout(drowsyTimerRef.current);
    if (selfHeartTimerRef.current !== null) window.clearTimeout(selfHeartTimerRef.current);
    runAnimsRef.current.forEach((a) => a.stop());
  }, []);

  const setDogState = useCallback((next: boolean) => {
    if (awakeRef.current === next) return;
    awakeRef.current = next;
    setAwake(next);
    setFrame(0);
    if (drowsyTimerRef.current !== null) window.clearTimeout(drowsyTimerRef.current);
    setDrowsy(!next);
    if (!next) drowsyTimerRef.current = window.setTimeout(() => setDrowsy(false), DROWSY_MS);
  }, []);

  const wakeBriefly = useCallback((awakeMs: number = TAP_AWAKE_MS) => {
    setDogState(true);
    if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = window.setTimeout(() => {
      if (!hoveringRef.current && !busyRef.current) setDogState(startAwake);
    }, awakeMs);
  }, [setDogState, startAwake]);

  useEffect(() => {
    if (!interactive) return;
    const wakeStill = () => {
      if (!awakeRef.current) setStill(true);
      wakeBriefly(SCROLL_AWAKE_MS);
    };
    const events = ["wheel", "touchmove", "scroll"] as const;
    events.forEach((name) => window.addEventListener(name, wakeStill, { passive: true }));
    return () => events.forEach((name) => window.removeEventListener(name, wakeStill));
  }, [interactive, wakeBriefly]);

  const spawnHeart = useCallback(() => {
    const left = Math.round(Math.random() * 200 - 50);
    const heart = {
      id: heartIdRef.current++,
      left,
      bottom: Math.round(60 + Math.random() * 40),
      drift: Math.round((left - 50) * 1.2),
      tilt: Math.round(Math.random() * 40 - 20),
    };
    setHearts((prev) => [...prev.slice(-(MAX_HEARTS - 1)), heart]);
  }, []);

  useEffect(() => {
    if (!interactive || awake || mode !== "idle") return;
    const wakeTimer = window.setTimeout(() => {
      setStill(false);
      wakeBriefly();
      selfHeartTimerRef.current = window.setTimeout(spawnHeart, 300 + Math.random() * 1200);
    }, SELF_WAKE_MIN_MS + Math.random() * (SELF_WAKE_MAX_MS - SELF_WAKE_MIN_MS));
    return () => window.clearTimeout(wakeTimer);
  }, [interactive, awake, mode, wakeBriefly, spawnHeart]);

  const pet = (pointerType: string) => {
    setStill(false);
    if (pointerType !== "mouse") wakeBriefly();
    spawnHeart();
    if (!reduceMotion && Math.random() < HOP_CHANCE) {
      animateHop(hopScope.current, { y: ["0%", "-30%", "0%"] }, { duration: 0.35, ease: "easeOut" });
    }
  };

  const removeHeart = (id: number) => setHearts((prev) => prev.filter((h) => h.id !== id));

  const finishRun = () => {
    busyRef.current = false;
    setMode("idle");
    setFrame(0);
    wakeBriefly();
  };

  const startDrag = () => {
    draggedRef.current = true;
    busyRef.current = true;
    runAnimsRef.current.forEach((a) => a.stop());
    setStill(false);
    setDogState(true);
    setMode("held");
    setFrame(0);
  };

  const endDrag = () => {
    const x = dragX.get();
    const y = dragY.get();
    const distance = Math.hypot(x, y);
    if (reduceMotion || distance < 4) {
      dragX.set(0);
      dragY.set(0);
      finishRun();
      return;
    }
    if (Math.abs(x) > 2) setFacingLeft(x > 0);
    setMode("running");
    setFrame(0);
    const transition = { duration: Math.max(0.6, distance / RUN_SPEED), ease: "linear" } as const;
    runAnimsRef.current = [
      animate(dragX, 0, transition),
      animate(dragY, 0, { ...transition, onComplete: finishRun }),
    ];
  };

  let currentSrc: string;
  if (mode === "running") currentSrc = (facingLeft ? DOG_FRAMES.runLeft : DOG_FRAMES.runRight)[frame];
  else if (frozen) currentSrc = DOG_FRAMES.awake[0];
  else if (cycle === "awake") currentSrc = DOG_FRAMES.awake[frame];
  else currentSrc = (drowsy ? DOG_FRAMES.drowsy : DOG_FRAMES.sleep)[0];

  return (
    <>
      <motion.span
        aria-hidden="true"
        className={cn(
          "relative inline-grid",
          interactive && "cursor-grab active:cursor-grabbing touch-manipulation",
          mode !== "idle" && "z-50",
          className,
        )}
        style={{ x: dragX, y: dragY }}
        drag={interactive}
        dragMomentum={false}
        onDragStart={startDrag}
        onDragEnd={endDrag}
        onPointerDown={interactive ? () => { draggedRef.current = false; } : undefined}
        onPointerEnter={interactive ? (e) => {
          if (e.pointerType !== "mouse") return;
          hoveringRef.current = true;
          setStill(false);
          setDogState(true);
        } : undefined}
        onPointerLeave={interactive ? (e) => {
          if (e.pointerType !== "mouse") return;
          hoveringRef.current = false;
          if (!busyRef.current) setDogState(startAwake);
        } : undefined}
        onPointerUp={interactive ? (e) => !draggedRef.current && pet(e.pointerType) : undefined}
        onContextMenu={interactive ? (e) => e.preventDefault() : undefined}
      >
        <span ref={hopScope} className="col-start-1 row-start-1 grid">
          {ALL_FRAMES.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              width={16}
              height={16}
              draggable={false}
              data-trail-mask={src === currentSrc ? "" : undefined}
              className={cn(
                "col-start-1 row-start-1 w-full h-auto [image-rendering:pixelated]",
                src !== currentSrc && "invisible",
              )}
            />
          ))}
        </span>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pointer-events-none absolute -translate-x-1/2 w-full"
            style={{ left: `${heart.left}%`, bottom: `${heart.bottom}%` }}
          >
            <motion.img
              src={HEART_SRC}
              alt=""
              width={16}
              height={16}
              draggable={false}
              className="w-full h-auto max-w-none [image-rendering:pixelated]"
              initial={{ opacity: 0, x: "0%", y: "0%", scale: 0.5, rotate: heart.tilt }}
              animate={reduceMotion
                ? { opacity: [0, 1, 1, 0], scale: 1 }
                : { opacity: [0, 1, 1, 0], x: `${heart.drift}%`, y: "-140%", scale: 1, rotate: heart.tilt * 1.5 }}
              transition={{ duration: 1.1, ease: "easeOut", times: [0, 0.15, 0.7, 1] }}
              onAnimationComplete={() => removeHeart(heart.id)}
            />
          </span>
        ))}
      </motion.span>
      {zzzClassName && <SleepZZZ className={cn(zzzClassName, (awake || drowsy) && "invisible")} />}
    </>
  );
}
