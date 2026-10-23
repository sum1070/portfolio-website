"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

export const DOG_IMAGE = "/images/dog.webp";

interface WalkingDogProps {
  className?: string;
  passOnce?: boolean;
  onExit?: () => void;
}

export default function WalkingDog({ className, passOnce = false, onExit }: Readonly<WalkingDogProps>) {
  const dogRef = useRef<HTMLImageElement>(null);
  const onExitRef = useRef(onExit);

  useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  // walk the dog: rAF loop, flips at a random turn point before/at the edges
  useEffect(() => {
    const dog = dogRef.current;
    if (!dog) return;

    // keep the dog still if the user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (passOnce) {
        onExitRef.current?.();
        return;
      }
      dog.style.transform = `translateX(${(window.innerWidth - dog.offsetWidth) / 2}px)`;
      return;
    }

    const edgeMargin = 8;
    const passDuration = 12;
    const runSpeedFactor = 4;
    const hopHeight = 14; // px
    const hopSpeed = 7; // skip frequency
    const flipDuration = 0.7; // seconds per backflip
    const flipJump = 42; // extra height during a backflip, px
    let speed = passOnce
      ? Math.max(70, (window.innerWidth + dog.offsetWidth) / passDuration)
      : 70; // px per second
    let direction = passOnce && Math.random() < 0.5 ? -1 : 1; // dog.webp faces right; 1 = walking right, -1 = walking left
    let x = passOnce
      ? direction === 1 ? -dog.offsetWidth : window.innerWidth
      : (window.innerWidth - dog.offsetWidth) / 2;
    let hopPhase = 0;
    let flipProgress = -1; // -1 = not flipping, otherwise 0..1
    let nextFlipAt = passOnce
      ? performance.now() + ((window.innerWidth + dog.offsetWidth) / speed) * 1000 * (0.35 + Math.random() * 0.2)
      : performance.now() + 2000 + Math.random() * 4000;
    let running = false;
    let last = performance.now();
    let rafId = 0;

    dog.style.transform = `translateX(${x}px)`;

    // pick a random point ahead to turn around (may turn before the edge)
    const pickTurnPoint = () => {
      const maxX = window.innerWidth - dog.offsetWidth - edgeMargin;
      const ahead = direction === 1 ? maxX - x : x - edgeMargin;
      const distance = Math.max(120, Math.random() * ahead);
      return direction === 1
        ? Math.min(x + distance, maxX)
        : Math.max(x - distance, edgeMargin);
    };

    let turnAt = pickTurnPoint();

    const runOff = () => {
      if (running) return;
      running = true;
      direction = x + dog.offsetWidth / 2 < window.innerWidth / 2 ? -1 : 1;
      speed *= runSpeedFactor;
      flipProgress = -1;
      nextFlipAt = Infinity;
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big gaps (tab switch)
      last = now;
      x += direction * speed * dt;

      if (passOnce) {
        const offScreen = direction === 1 ? x >= window.innerWidth : x <= -dog.offsetWidth;
        if (offScreen) {
          onExitRef.current?.();
          return;
        }
      } else {
        const maxX = window.innerWidth - dog.offsetWidth - edgeMargin;
        const reachedTurn =
          direction === 1 ? x >= turnAt || x >= maxX : x <= turnAt || x <= edgeMargin;
        if (reachedTurn) {
          x = Math.min(Math.max(x, edgeMargin), maxX);
          direction *= -1;
          turnAt = pickTurnPoint();
        }
      }

      // skipping: small hops while moving; walking left = flipped image
      hopPhase += dt * hopSpeed * (running ? 2 : 1);
      let lift = Math.abs(Math.sin(hopPhase)) * hopHeight;

      // every few seconds: a backflip (360° backwards with a bigger jump)
      let rotation = 0;
      if (flipProgress >= 0) {
        flipProgress += dt / flipDuration;
        if (flipProgress >= 1) {
          flipProgress = -1;
          nextFlipAt = now + 2500 + Math.random() * 2300;
        } else {
          // rotate() after scaleX() spins backwards relative to facing direction
          rotation = -360 * flipProgress;
          lift = Math.sin(flipProgress * Math.PI) * flipJump;
        }
      } else if (now >= nextFlipAt) {
        flipProgress = 0;
      }

      dog.style.transform = `translateX(${x}px) translateY(${-lift}px) scaleX(${direction === 1 ? 1 : -1}) rotate(${rotation}deg)`;
      rafId = requestAnimationFrame(step);
    };

    if (passOnce) dog.addEventListener("click", runOff);
    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      dog.removeEventListener("click", runOff);
    };
  }, [passOnce]);

  return (
    <img
      ref={dogRef}
      src={DOG_IMAGE}
      alt="A walking dog"
      style={passOnce ? { transform: "translateX(-100%)" } : undefined}
      className={cn("left-0 will-change-transform pointer-events-none select-none", className)}
    />
  );
}
