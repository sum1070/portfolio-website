"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { cn } from "@/utils";
import { pxIbmVga } from "@/lib/fonts";
import useUiSounds from "@/lib/hooks/useUiSounds";
import ChatBubble from "./chat-bubble";
import PixelDog, { DOG_FRAMES } from "./pixel-dog";

const pixelFont = cn(pxIbmVga.variable, "[font-family:var(--font-px-ibm-vga)] text-base");

const BONE_SRC = "/images/doggy/doggy_bone.png";
const SUMMONED_KEY = "dog-summoned";
const WALK_SPEED = 150;
const WALK_MIN_S = 1;
const WALK_MAX_S = 6;
const FRAME_MS = 180;
const EDGE_MARGIN = 24;
const RETURN_DELAY_MS = 600;
const BYE_MS = 1200;
const DOG_SIZE = "w-12 md:w-16";
const WALK_FRAMES = [...DOG_FRAMES.runRight, ...DOG_FRAMES.runLeft];

type Phase = "away" | "entering" | "here" | "leaving";

const rand = (min: number, max: number) => min + Math.random() * Math.max(0, max - min);
const dogPx = () => (window.innerWidth >= 768 ? 64 : 48);

function readSummoned() {
  try {
    return sessionStorage.getItem(SUMMONED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSummoned(on: boolean) {
  try {
    if (on) sessionStorage.setItem(SUMMONED_KEY, "1");
    else sessionStorage.removeItem(SUMMONED_KEY);
  } catch {}
}

export default function DogCaller({ className }: Readonly<{ className?: string }>) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("away");
  const [facingLeft, setFacingLeft] = useState(false);
  const [frame, setFrame] = useState(0);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const animsRef = useRef<AnimationPlaybackControls[]>([]);
  const hereRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("away");
  const byeTimerRef = useRef<number | null>(null);
  const { playClick } = useUiSounds();

  const go = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const walk = useCallback((to: [number, number], onDone: () => void) => {
    animsRef.current.forEach((a) => a.stop());
    const dx = to[0] - x.get();
    const duration = Math.min(WALK_MAX_S, Math.max(WALK_MIN_S, Math.hypot(dx, to[1] - y.get()) / WALK_SPEED));
    setFacingLeft(dx < 0);
    animsRef.current = [
      animate(x, to[0], { duration, ease: "linear" }),
      animate(y, to[1], { duration, ease: "linear", onComplete: onDone }),
    ];
  }, [x, y]);

  const enter = useCallback(() => {
    const size = dogPx();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const target: [number, number] = [rand(EDGE_MARGIN, vw - size - EDGE_MARGIN), rand(vh * 0.45, vh - size - EDGE_MARGIN)];
    writeSummoned(true);
    if (byeTimerRef.current !== null) window.clearTimeout(byeTimerRef.current);

    if (reduceMotion) {
      x.set(target[0]);
      y.set(target[1]);
      go("here");
      return;
    }

    const side = Math.floor(Math.random() * 3);
    if (phaseRef.current === "away") {
      if (side === 0) { x.set(-size); y.set(rand(vh * 0.3, vh - size)); }
      else if (side === 1) { x.set(vw); y.set(rand(vh * 0.3, vh - size)); }
      else { x.set(rand(0, vw - size)); y.set(vh); }
    }
    go("entering");
    walk(target, () => go("here"));
  }, [go, walk, reduceMotion, x, y]);

  const leave = useCallback(() => {
    writeSummoned(false);
    if (reduceMotion) {
      go("leaving");
      byeTimerRef.current = window.setTimeout(() => go("away"), BYE_MS);
      return;
    }
    const size = dogPx();
    const dogEl = hereRef.current?.firstElementChild;
    if (phaseRef.current === "here" && dogEl) {
      const r = dogEl.getBoundingClientRect();
      x.set(r.left);
      y.set(r.top);
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = x.get();
    const top = y.get();
    const exits: [number, [number, number]][] = [
      [left, [-size - 8, top]],
      [vw - left - size, [vw + 8, top]],
      [vh - top - size, [left, vh + 8]],
    ];
    const [, target] = exits.reduce((best, e) => (e[0] < best[0] ? e : best));
    go("leaving");
    walk(target, () => go("away"));
  }, [go, walk, reduceMotion, x, y]);

  const rehome = useCallback((dx: number, dy: number) => {
    const size = dogPx();
    x.set(Math.min(Math.max(x.get() + dx, 0), window.innerWidth - size));
    y.set(Math.min(Math.max(y.get() + dy, 0), window.innerHeight - size));
  }, [x, y]);

  useEffect(() => {
    setMounted(true);
    if (!readSummoned()) return;
    const timer = window.setTimeout(enter, RETURN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [enter]);

  useEffect(() => () => {
    animsRef.current.forEach((a) => a.stop());
    if (byeTimerRef.current !== null) window.clearTimeout(byeTimerRef.current);
  }, []);

  const walking = phase === "entering" || phase === "leaving";
  useEffect(() => {
    if (!walking || reduceMotion) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 2), FRAME_MS);
    return () => window.clearInterval(id);
  }, [walking, reduceMotion]);

  const out = phase === "entering" || phase === "here";
  const walkSrc = (facingLeft ? DOG_FRAMES.runLeft : DOG_FRAMES.runRight)[frame];

  return (
    <>
      <button
        type="button"
        aria-label={out ? "Send the doggy home" : "Call the doggy"}
        aria-pressed={out}
        title={out ? "Send the doggy home" : "Call the doggy"}
        onClick={() => {
          playClick();
          if (out) leave();
          else enter();
        }}
        className={cn(
          "cursor-pointer rounded-lg transition-transform duration-300 hover:-rotate-12 motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nice-purple1",
          className,
        )}
      >
        <img src={BONE_SRC} alt="" width={16} height={16} draggable={false} className="w-8 h-8 shrink-0 [image-rendering:pixelated]" />
      </button>
      {mounted && phase !== "away" && createPortal(
        <motion.div className="fixed left-0 top-0 z-40 flex items-end select-none" style={{ x, y }}>
          {phase === "here" ? (
            <div ref={hereRef} className="flex items-end">
              <PixelDog interactive wander onRehome={rehome} className={DOG_SIZE} zzzClassName="-ml-2 w-12 md:w-16 inline-block border-0" />
            </div>
          ) : (
            <span className={cn("relative grid pointer-events-none", DOG_SIZE)}>
              {phase === "leaving" && (
                <span role="status" className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2">
                  <ChatBubble tail={false} className="max-w-none w-max [animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none">
                    <span className={cn(pixelFont, "text-nice-purple2")}>Bye bye!</span>
                  </ChatBubble>
                </span>
              )}
              {WALK_FRAMES.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  draggable={false}
                  className={cn("col-start-1 row-start-1 w-full h-auto [image-rendering:pixelated]", src !== walkSrc && "invisible")}
                />
              ))}
            </span>
          )}
        </motion.div>,
        document.body,
      )}
    </>
  );
}
