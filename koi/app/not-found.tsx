"use client";

import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components";
import { cn } from "@/utils";

const dogImage = "/images/dog.png";

const NotFound = () => {
  const dogRef = useRef<HTMLImageElement>(null);

  // walk the dog: rAF loop, flips at a random turn point before/at the edges
  useEffect(() => {
    const dog = dogRef.current;
    if (!dog) return;

    // keep the dog still if the user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dog.style.transform = `translateX(${(window.innerWidth - dog.offsetWidth) / 2}px)`;
      return;
    }

    const edgeMargin = 8;
    const speed = 70; // px per second
    const hopHeight = 14; // px
    const hopSpeed = 7; // skip frequency
    let direction = 1; // dog.png faces right; 1 = walking right, -1 = walking left
    let x = (window.innerWidth - dog.offsetWidth) / 2;
    let hopPhase = 0;
    let last = performance.now();
    let rafId = 0;

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

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big gaps (tab switch)
      last = now;
      x += direction * speed * dt;

      const maxX = window.innerWidth - dog.offsetWidth - edgeMargin;
      const reachedTurn =
        direction === 1 ? x >= turnAt || x >= maxX : x <= turnAt || x <= edgeMargin;
      if (reachedTurn) {
        x = Math.min(Math.max(x, edgeMargin), maxX);
        direction *= -1;
        turnAt = pickTurnPoint();
      }

      // skipping: small hops while moving; walking left = flipped image
      hopPhase += dt * hopSpeed;
      const hop = Math.abs(Math.sin(hopPhase)) * hopHeight;
      dog.style.transform = `translateX(${x}px) translateY(${-hop}px) scaleX(${direction === 1 ? 1 : -1})`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div id="not-found" className="relative min-h-dvh min-w-dvw overflow-hidden select-none">
      <div id="not-found-text" className="px-8 pt-16 md:px-16 md:pt-24 font-titillium-web">
        <h1 className="text-5xl md:text-6xl text-nice-purple1">Oops...</h1>
        <h1 className="mt-6 text-5xl md:text-6xl text-nice-purple0">Page not found.</h1>
        <p className="mt-8 text-sm md:text-base">
          My doggy eats anything...
          <br />
          he probably ate the page you&apos;re looking for...
        </p>
        <TransitionLink
          href="/"
          className={cn(
            "inline-block mt-6 px-5 py-1.5",
            "border rounded-md border-nice-purple1 text-nice-purple2 bg-milky-white/40",
            "hover:bg-purple-400/10 hover:scale-105 transition-all duration-200",
          )}
        >
          Back to Home
        </TransitionLink>
      </div>

      {/* the culprit */}
      <img
        ref={dogRef}
        src={dogImage}
        alt="A walking dog"
        className="absolute bottom-[6svh] left-0 w-28 md:w-36 will-change-transform pointer-events-none"
      />
    </div>
  );
};

export default NotFound;
