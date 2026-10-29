"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useAnimate, useMotionValue, useReducedMotion, type AnimationPlaybackControls, type PanInfo } from "motion/react";
import { cn } from "@/utils";
import { SleepZZZ } from "../svg-creator";

const DOG_DIR = "/images/doggy";

export const DOG_FRAMES = {
  drowsy: [`${DOG_DIR}/doggy_sleep_stand.png`],
  sleep: [`${DOG_DIR}/doggy_sleep_lay.png`],
  awake: [`${DOG_DIR}/doggy_sit.png`, `${DOG_DIR}/doggy_lay.png`],
  settle: [`${DOG_DIR}/doggy_stand.png`, `${DOG_DIR}/doggy_sit.png`],
  runRight: [`${DOG_DIR}/doggy_walk_1.png`, `${DOG_DIR}/doggy_walk_2.png`],
  runLeft: [`${DOG_DIR}/doggy_walk_1_flipped.png`, `${DOG_DIR}/doggy_walk_2_flipped.png`],
};

const ALL_FRAMES = [...new Set(Object.values(DOG_FRAMES).flat())];

const HEART_SRC = `${DOG_DIR}/doggy_heart.gif`;
const MAX_HEARTS = 6;

const FRAME_MS = { awake: 250, run: 180 };
const TAP_AWAKE_MS = 2500;
const SCROLL_AWAKE_MS = 1000;
const RUN_SPEED = 220;
const DROWSY_MS = 700;
const SETTLE_STEP_MS = 500;
const SELF_WAKE_MIN_MS = 12000;
const SELF_WAKE_MAX_MS = 25000;
const HOP_CHANCE = 1 / 3;
const WALK_SPEED = 90;
const WANDER_FIRST_MS = 800;
const WANDER_MIN_MS = 15000;
const WANDER_MAX_MS = 30000;
const WANDER_RETRY_MS = 3000;
const WANDER_MARGIN = 16;
const REST_MIN_MS = 1000;
const REST_MAX_MS = 2500;
const NAP_CHANCE = 0.3;
const NAP_MIN_MS = 4000;
const NAP_MAX_MS = 8000;
const DROP_STAY_MS = 15000;
const CHASE_IGNORE = "a, button, input, textarea, select, label, summary, [contenteditable='true'], [role='dialog'], [role='menu'], [role='status']";

interface PixelDogProps {
  className?: string;
  interactive?: boolean;
  startAwake?: boolean;
  zzzClassName?: string;
  wander?: boolean;
  onRehome?: (dx: number, dy: number) => void;
}

export default function PixelDog({ className, interactive = false, startAwake = false, zzzClassName, wander = false, onRehome }: Readonly<PixelDogProps>) {
  const [awake, setAwake] = useState(startAwake);
  const [frame, setFrame] = useState(0);
  const [still, setStill] = useState(false);
  const [drowsy, setDrowsy] = useState(false);
  const [mode, setMode] = useState<"idle" | "held" | "running" | "resting">("idle");
  const [settleStep, setSettleStep] = useState<number | null>(null);
  const [facingLeft, setFacingLeft] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; bottom: number; drift: number; tilt: number }[]>([]);
  const heartIdRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const tapTimerRef = useRef<number | null>(null);
  const drowsyTimerRef = useRef<number | null>(null);
  const selfHeartTimerRef = useRef<number | null>(null);
  const settleTimersRef = useRef<number[]>([]);
  const awakeRef = useRef(startAwake);
  const hoveringRef = useRef(false);
  const busyRef = useRef(false);
  const draggedRef = useRef(false);
  const runAnimsRef = useRef<AnimationPlaybackControls[]>([]);
  const tripIdRef = useRef(0);
  const tripTimerRef = useRef<number | null>(null);
  const hasWanderedRef = useRef(false);
  const dogRef = useRef<HTMLSpanElement>(null);
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
    if (tripTimerRef.current !== null) window.clearTimeout(tripTimerRef.current);
    tripIdRef.current++;
    settleTimersRef.current.forEach((id) => window.clearTimeout(id));
    runAnimsRef.current.forEach((a) => a.stop());
  }, []);

  const cancelSettle = useCallback(() => {
    settleTimersRef.current.forEach((id) => window.clearTimeout(id));
    settleTimersRef.current = [];
    setSettleStep(null);
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

  const settleThenSleep = useCallback(() => {
    cancelSettle();
    if (startAwake || !awakeRef.current) return;
    if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    setSettleStep(0);
    settleTimersRef.current = [
      window.setTimeout(() => setSettleStep(1), SETTLE_STEP_MS),
      window.setTimeout(() => {
        setSettleStep(null);
        setDogState(false);
      }, SETTLE_STEP_MS * 2),
    ];
  }, [cancelSettle, setDogState, startAwake]);

  const wakeBriefly = useCallback((awakeMs: number = TAP_AWAKE_MS) => {
    cancelSettle();
    setDogState(true);
    if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = window.setTimeout(() => {
      if (!hoveringRef.current && !busyRef.current) setDogState(startAwake);
    }, awakeMs);
  }, [cancelSettle, setDogState, startAwake]);

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
    if (!awakeRef.current) return;
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

  const finishRun = useCallback(() => {
    busyRef.current = false;
    setMode("idle");
    setFrame(0);
    wakeBriefly();
  }, [wakeBriefly]);

  const startTrip = useCallback(() => {
    const el = dogRef.current;
    if (!el || document.hidden || busyRef.current || hoveringRef.current) return false;
    const rect = el.getBoundingClientRect();
    const area = el.closest("section")?.getBoundingClientRect() ?? new DOMRect(0, 0, window.innerWidth, window.innerHeight);
    const left = Math.max(area.left, 0) + WANDER_MARGIN;
    const top = Math.max(area.top, 0) + WANDER_MARGIN;
    const right = Math.min(area.right, window.innerWidth) - WANDER_MARGIN - rect.width;
    const bottom = Math.min(area.bottom, window.innerHeight) - WANDER_MARGIN - rect.height;
    if (right - left < rect.width * 2 || bottom - top < rect.height * 2) return false;
    const homeLeft = rect.left - dragX.get();
    const homeTop = rect.top - dragY.get();

    const id = ++tripIdRef.current;
    const alive = () => id === tripIdRef.current;
    const walkTo = (x: number, y: number) => new Promise<void>((resolve) => {
      const dx = x - dragX.get();
      if (Math.abs(dx) > 2) setFacingLeft(dx < 0);
      setMode("running");
      setFrame(0);
      const transition = { duration: Math.max(0.6, Math.hypot(dx, y - dragY.get()) / WALK_SPEED), ease: "linear" } as const;
      runAnimsRef.current = [
        animate(dragX, x, transition),
        animate(dragY, y, { ...transition, onComplete: resolve }),
      ];
    });
    const rest = () => new Promise<void>((resolve) => {
      setMode("resting");
      setFrame(0);
      tripTimerRef.current = window.setTimeout(resolve, REST_MIN_MS + Math.random() * (REST_MAX_MS - REST_MIN_MS));
    });
    const nap = () => new Promise<void>((resolve) => {
      setMode("resting");
      setDogState(false);
      tripTimerRef.current = window.setTimeout(() => {
        setDogState(true);
        resolve();
      }, NAP_MIN_MS + Math.random() * (NAP_MAX_MS - NAP_MIN_MS));
    });

    busyRef.current = true;
    hasWanderedRef.current = true;
    cancelSettle();
    setStill(false);
    setDogState(true);

    (async () => {
      const stops = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < stops; i++) {
        await walkTo(left + Math.random() * (right - left) - homeLeft, top + Math.random() * (bottom - top) - homeTop);
        if (!alive()) return;
        if (Math.random() < NAP_CHANCE) {
          await nap();
          if (!alive()) return;
        } else if (Math.random() < 0.5) spawnHeart();
        await rest();
        if (!alive()) return;
      }
      await walkTo(0, 0);
      if (alive()) finishRun();
    })();
    return true;
  }, [cancelSettle, setDogState, spawnHeart, finishRun, dragX, dragY]);

  useEffect(() => {
    if (!interactive || !wander || reduceMotion) return;
    setStill(false);
    wakeBriefly();
  }, [interactive, wander, reduceMotion, wakeBriefly]);

  useEffect(() => {
    if (!interactive || !wander || reduceMotion || mode !== "idle") return;
    const delay = hasWanderedRef.current ? WANDER_MIN_MS + Math.random() * (WANDER_MAX_MS - WANDER_MIN_MS) : WANDER_FIRST_MS;
    let timer = 0;
    const attempt = () => {
      if (!startTrip()) timer = window.setTimeout(attempt, WANDER_RETRY_MS);
    };
    timer = window.setTimeout(attempt, delay);
    return () => window.clearTimeout(timer);
  }, [interactive, wander, reduceMotion, mode, startTrip]);

  const runTo = useCallback((x: number, y: number, onDone: () => void) => {
    const dx = x - dragX.get();
    if (Math.abs(dx) > 2) setFacingLeft(dx < 0);
    setMode("running");
    setFrame(0);
    const transition = { duration: Math.max(0.4, Math.hypot(dx, y - dragY.get()) / RUN_SPEED), ease: "linear" } as const;
    runAnimsRef.current = [
      animate(dragX, x, transition),
      animate(dragY, y, { ...transition, onComplete: onDone }),
    ];
  }, [dragX, dragY]);

  useEffect(() => {
    if (!interactive || reduceMotion) return;
    const chase = (e: MouseEvent) => {
      const el = dogRef.current;
      const target = e.target instanceof Element ? e.target : null;
      if (!el || e.defaultPrevented || target?.closest(CHASE_IGNORE) || el.contains(target)) return;
      if (window.getSelection()?.isCollapsed === false) return;
      const rect = el.getBoundingClientRect();
      const area = el.closest("section")?.getBoundingClientRect() ?? new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      if (e.clientX < area.left || e.clientX > area.right || e.clientY < area.top || e.clientY > area.bottom) return;
      const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
      const left = clamp(e.clientX - rect.width / 2, Math.max(area.left, 0), Math.min(area.right, window.innerWidth) - rect.width);
      const top = clamp(e.clientY - rect.height, Math.max(area.top, 0), Math.min(area.bottom, window.innerHeight) - rect.height);

      const id = ++tripIdRef.current;
      const alive = () => id === tripIdRef.current;
      if (tripTimerRef.current !== null) window.clearTimeout(tripTimerRef.current);
      runAnimsRef.current.forEach((a) => a.stop());
      busyRef.current = true;
      hasWanderedRef.current = true;
      cancelSettle();
      setStill(false);
      setDogState(true);
      runTo(left - (rect.left - dragX.get()), top - (rect.top - dragY.get()), () => {
        if (!alive()) return;
        spawnHeart();
        if (onRehome) {
          onRehome(dragX.get(), dragY.get());
          dragX.set(0);
          dragY.set(0);
        }
        busyRef.current = false;
        setMode("resting");
        setFrame(0);
        wakeBriefly();
        tripTimerRef.current = window.setTimeout(() => {
          if (!alive()) return;
          if (onRehome) return finishRun();
          busyRef.current = true;
          setDogState(true);
          runTo(0, 0, () => alive() && finishRun());
        }, DROP_STAY_MS);
      });
    };
    window.addEventListener("click", chase);
    return () => window.removeEventListener("click", chase);
  }, [interactive, reduceMotion, onRehome, runTo, cancelSettle, setDogState, spawnHeart, wakeBriefly, finishRun, dragX, dragY]);

  const startDrag = () => {
    draggedRef.current = true;
    busyRef.current = true;
    tripIdRef.current++;
    if (tripTimerRef.current !== null) window.clearTimeout(tripTimerRef.current);
    runAnimsRef.current.forEach((a) => a.stop());
    cancelSettle();
    setStill(false);
    setDogState(true);
    setMode("held");
    setFrame(0);
    setFacingLeft(false);
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    if (info.delta.x < -1) setFacingLeft(true);
    else if (info.delta.x > 1) setFacingLeft(false);
  };

  const runHome = () => {
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

  const endDrag = () => {
    const x = dragX.get();
    const y = dragY.get();
    if (!onRehome || Math.hypot(x, y) < 4) return runHome();
    onRehome(x, y);
    dragX.set(0);
    dragY.set(0);
    busyRef.current = false;
    setMode("resting");
    setFrame(0);
    wakeBriefly();
    tripTimerRef.current = window.setTimeout(finishRun, DROP_STAY_MS);
  };

  let currentSrc: string;
  if (mode === "running") currentSrc = (facingLeft ? DOG_FRAMES.runLeft : DOG_FRAMES.runRight)[frame];
  else if (settleStep !== null) currentSrc = DOG_FRAMES.settle[settleStep];
  else if (frozen) currentSrc = DOG_FRAMES.awake[0];
  else if (cycle === "awake") currentSrc = DOG_FRAMES.awake[frame];
  else currentSrc = (drowsy ? DOG_FRAMES.drowsy : DOG_FRAMES.sleep)[0];

  return (
    <>
      <motion.span
        ref={dogRef}
        aria-hidden="true"
        className={cn(
          "relative inline-grid select-none",
          interactive && "cursor-grab active:cursor-grabbing touch-manipulation",
          mode !== "idle" && "z-50",
          className,
        )}
        style={{ x: dragX, y: dragY }}
        drag={interactive}
        dragMomentum={false}
        onDragStart={startDrag}
        onDrag={onDrag}
        onDragEnd={endDrag}
        onPointerDown={interactive ? () => { draggedRef.current = false; } : undefined}
        onPointerEnter={interactive ? (e) => {
          if (e.pointerType !== "mouse") return;
          hoveringRef.current = true;
          cancelSettle();
          setStill(false);
          setDogState(true);
        } : undefined}
        onPointerLeave={interactive ? (e) => {
          if (e.pointerType !== "mouse") return;
          hoveringRef.current = false;
          if (!busyRef.current) settleThenSleep();
        } : undefined}
        onPointerUp={interactive ? (e) => !draggedRef.current && pet(e.pointerType) : undefined}
        onContextMenu={interactive ? (e) => e.preventDefault() : undefined}
      >
        <span ref={hopScope} className={cn("col-start-1 row-start-1 grid", (mode === "held" || mode === "resting") && facingLeft && "-scale-x-100")}>
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
      {zzzClassName && (
        <motion.span className="pointer-events-none inline-block" style={{ x: dragX, y: dragY }}>
          <SleepZZZ className={cn(zzzClassName, (awake || drowsy) && "invisible")} />
        </motion.span>
      )}
    </>
  );
}
