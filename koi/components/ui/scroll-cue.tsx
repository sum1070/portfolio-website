"use client";

import { cn } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const HIDE_AFTER = 80;
const MIN_SCROLLABLE = 120;

const ScrollCue = ({ label = "More below" }: { label?: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;

    const updateVisibility = () => {
      if (dismissed) return;

      if (window.scrollY > HIDE_AFTER) {
        dismissed = true;
        setVisible(false);
        return;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrollableHeight > MIN_SCROLLABLE);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const observer = new ResizeObserver(updateVisibility);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const scrollDown = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }, []);

  return (
    <button
      id="scroll-cue"
      type="button"
      aria-label={`${label}. Scroll down for more`}
      inert={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollDown}
      className={cn(
        "fixed bottom-10 left-1/2 z-40 -translate-x-1/2 cursor-pointer md:bottom-6",
        "flex items-center gap-2 rounded-full px-4 py-1.5",
        "border border-nice-purple1/50 bg-white/30 backdrop-blur-md",
        "shadow-lg shadow-nice-purple1/10 dark:bg-pale-purple1/60",
        "font-titillium-web text-sm text-nice-purple2 dark:text-pale-purple2 md:text-base",
        "transition-opacity duration-500 hover:bg-white/50 motion-reduce:transition-none",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {label}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 animate-bounce motion-reduce:animate-none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 9 L12 16 L19 9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollCue;
