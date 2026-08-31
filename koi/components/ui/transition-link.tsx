"use client";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface TransitionProps extends LinkProps, AnchorProps {
  children: React.ReactNode;
}

// Dismissal timers are shared by every TransitionLink and the watcher below.
// A new navigation must be able to cancel timers left over from a previous
// one, otherwise a stale timer strips the overlay in the middle of the next
// navigation.
let overlayTimers: ReturnType<typeof setTimeout>[] = [];

function clearOverlayTimers() {
  overlayTimers.forEach(clearTimeout);
  overlayTimers = [];
}

function fadeOutOverlay(overlay: HTMLElement) {
  overlay.classList.add("fade-out");

  // Wait for fade-out transition to complete before removing active class
  overlayTimers.push(
    setTimeout(() => {
      overlay.classList.remove("active");
      overlay.classList.remove("fade-out");
    }, 600) // Match this with the CSS transition time
  );
}

// Rendered once in the root layout so it survives navigation. The clicked
// TransitionLink usually unmounts together with the outgoing page, so it
// cannot be the one that dismisses the overlay; this watcher reacts to the
// pathname change, which only happens once the new page has rendered.
export const TransitionOverlayWatcher = () => {
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
    if (!overlay || !overlay.classList.contains("active")) return;

    // minimum animation display time
    const minDisplayTime = 400; // ms
    overlayTimers.push(setTimeout(() => fadeOutOverlay(overlay), minDisplayTime));
  }, [pathname]);

  return null;
};

const TransitionLink = ({ children, href, ...props }: TransitionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Preload the overlay
    const preloadOverlay = () => {
      const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
      if (overlay) {
        // Create and append elements if they don't exist
        if (!overlay.querySelector(".spinner")) {
          const spinner = document.createElement("span");
          spinner.className = "spinner";
          overlay.appendChild(spinner);
        }
        if (!overlay.querySelector(".eyes")) {
          const eyes = document.createElement("span");
          eyes.className = "eyes";
          overlay.appendChild(eyes);
        }
      }
    };

    preloadOverlay();
  }, []);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
    if (!overlay) return;

    // the overlay class is the source of truth for "navigation in progress";
    // component state cannot be, because this link may unmount mid-navigation
    if (overlay.classList.contains("active")) return;

    let path: string;
    if (typeof href === "string") {
      path = href;
    } else if (typeof href === "object" && href !== null && "pathname" in href) {
      path =
        href.pathname +
        (href.query ? "?" + new URLSearchParams(href.query as Record<string, string>).toString() : "");
    } else {
      console.error("Invalid href:", href);
      return;
    }

    // same pathname: the watcher would never fire (pathname does not change),
    // so skip the overlay and just push
    if (path.split(/[?#]/)[0] === pathname) {
      router.push(path);
      return;
    }

    clearOverlayTimers();
    overlay.classList.remove("fade-out");

    // Force immediate rendering before transition starts
    overlay.style.display = "flex";

    // Force a reflow to ensure immediate visual update
    const _ = overlay.offsetWidth;

    // Add active class to trigger animation
    overlay.classList.add("active");

    // Start animations immediately
    const spinner = overlay.querySelector(".spinner");
    const eyes = overlay.querySelector(".eyes");
    if (spinner) spinner.classList.add("animate-spin");
    if (eyes) eyes.classList.add("animate-blink");

    // fallback to remove the overlay after a timeout (nav failed or took too long)
    overlayTimers.push(
      setTimeout(() => {
        if (overlay.classList.contains("active")) {
          console.log("Fallback: removing transition overlay after timeout");
          fadeOutOverlay(overlay);
        }
      }, 5000)
    );

    // Small delay to ensure animation starts before navigation
    setTimeout(() => router.push(path), 100);
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
