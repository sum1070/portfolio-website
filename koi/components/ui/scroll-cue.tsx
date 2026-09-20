"use client";
import { cn } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const ScrollCue = ({ label = "More below" }: { label?: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      // ignore pages that only scroll by a sliver (bottom padding, rounding)
      const canScroll =
        document.documentElement.scrollHeight - window.innerHeight > 120;
      setVisible(canScroll && window.scrollY < 80);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // page height changes when tag filters shrink or grow the grid
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const scrollDown = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  }, []);

  return (
    <button
      id="scroll-cue"
      aria-label="Scroll down for more"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollDown}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 cursor-pointer",
        "flex items-center gap-2 px-4 py-1.5 rounded-full",
        "bg-nice-purple1/50 backdrop-blur-md border border-white/30",
        "shadow-lg shadow-nice-purple1/10 dark:bg-pale-purple1/60",
        "text-nice-purple2 dark:text-pale-purple2 font-titillium-web text-sm md:text-base",
        "transition-opacity duration-500 hover:bg-white/50",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {label}
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 animate-bounce motion-reduce:animate-none"
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
