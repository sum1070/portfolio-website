import { useEffect } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";

export function useWheelImpulse(max = 250, settleMs = 120) {
  const impulse = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let lastTouchY: number | null = null;

    const push = (delta: number) => {
      const next = Math.max(-max, Math.min(max, impulse.get() + delta));
      impulse.set(next);
      clearTimeout(timer);
      timer = setTimeout(() => impulse.set(0), settleMs);
    };

    const onWheel = (e: WheelEvent) => push(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY);
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY === null) return;
      const y = e.touches[0].clientY;
      push((lastTouchY - y) * 1.5);
      lastTouchY = y;
    };
    const onTouchEnd = () => { lastTouchY = null; };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [impulse, max, settleMs, reduceMotion]);

  return impulse;
}
