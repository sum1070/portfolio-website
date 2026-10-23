"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import WalkingDog, { DOG_IMAGE } from "./walking-dog";

const IDLE_DELAY = 50_000; // ms
const SHOWN_KEY = "idle-dog-shown";

function alreadyShown() {
  try {
    return sessionStorage.getItem(SHOWN_KEY) !== null;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {}
}

export default function IdleDog() {
  const pathname = usePathname();
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (alreadyShown()) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (document.getElementById("not-found")) return;

      const img = new Image();
      img.onload = () => {
        if (cancelled || alreadyShown()) return;
        markShown();
        setWalking(true);
      };
      img.src = DOG_IMAGE;
    }, IDLE_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!walking) return null;

  return (
    <WalkingDog
      passOnce
      onExit={() => setWalking(false)}
      className="fixed bottom-[4svh] z-40 w-20 md:w-28 pointer-events-auto cursor-pointer"
    />
  );
}
