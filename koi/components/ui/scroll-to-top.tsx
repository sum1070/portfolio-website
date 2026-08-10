"use client";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="scroll-to-top"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-40 cursor-pointer",
        "text-nice-purple2 dark:text-pale-purple2",
        "transition-all duration-300 hover:-translate-y-1.5",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <svg viewBox="0 0 48 60" className="w-12 h-15" fill="none" aria-hidden="true">
        <path
          d="M15 11 L24 3 L33 11"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10.5" cy="31" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="25" r="5.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="37.5" cy="31" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M24 38 C18 38 13.5 43 14.5 48.5 C15.5 53.5 20 56.5 24 56.5 C28 56.5 32.5 53.5 33.5 48.5 C34.5 43 30 38 24 38 Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
