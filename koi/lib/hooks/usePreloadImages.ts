"use client";

import { useEffect } from "react";

const warm = new Map<string, HTMLImageElement>();

export default function usePreloadImages(srcs: readonly string[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const load = () => srcs.forEach((src) => {
      if (warm.has(src)) return;
      const img = new Image();
      img.src = src;
      warm.set(src, img);
    });
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 1500);
    return () => clearTimeout(id);
  }, [srcs, enabled]);
}
