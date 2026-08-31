"use client";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface TransitionProps extends LinkProps, AnchorProps {
  children: React.ReactNode;
}

const SPLASH_KEY = "loading-splash-shown";
// first navigation of the session gets a full showing of the loading animation
const SPLASH_MIN_DISPLAY = 1600; // ms
const NAV_MIN_DISPLAY = 400; // ms
// later navigations only show the overlay once they take longer than this
const SHOW_DELAY = 200; // ms

// Dismissal timers are shared by every TransitionLink and the watcher below.
// A new navigation must be able to cancel timers left over from a previous
// one, otherwise a stale timer strips the overlay in the middle of the next
// navigation.
let overlayTimers: ReturnType<typeof setTimeout>[] = [];
let overlayShownAt = 0;
let overlayMinDisplay = NAV_MIN_DISPLAY;

function clearOverlayTimers() {
  overlayTimers.forEach(clearTimeout);
  overlayTimers = [];
}

// sessionStorage can be blocked (privacy modes, embedded contexts); fall back
// to "already shown" so a blocked store never replays the splash on every click
function splashAlreadyShown() {
  try {
    if (sessionStorage.getItem(SPLASH_KEY)) return true;
    sessionStorage.setItem(SPLASH_KEY, "1");
    return false;
  } catch {
    return true;
  }
}

function showOverlay(overlay: HTMLElement) {
  overlay.style.display = "flex";

  // Force a reflow to ensure immediate visual update
  void overlay.offsetWidth;

  overlay.classList.add("active");
  overlayShownAt = Date.now();
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
    if (!overlay) return;

    // cancels a still-pending delayed show when the page rendered fast enough
    clearOverlayTimers();

    if (!overlay.classList.contains("active")) return;

    const remaining = overlayMinDisplay - (Date.now() - overlayShownAt);
    overlayTimers.push(setTimeout(() => fadeOutOverlay(overlay), Math.max(remaining, 0)));
  }, [pathname]);

  return null;
};

const TransitionLink = ({ children, href, ...props }: TransitionProps) => {
  const router = useRouter();
  const pathname = usePathname();

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

    const firstNavigation = !splashAlreadyShown();

    // fallback to remove the overlay after a timeout (nav failed or took too long)
    overlayTimers.push(
      setTimeout(() => {
        if (overlay.classList.contains("active")) {
          console.log("Fallback: removing transition overlay after timeout");
          fadeOutOverlay(overlay);
        }
      }, 5000)
    );

    if (firstNavigation) {
      overlayMinDisplay = SPLASH_MIN_DISPLAY;
      showOverlay(overlay);

      // Small delay to ensure animation starts before navigation
      setTimeout(() => router.push(path), 100);
    } else {
      overlayMinDisplay = NAV_MIN_DISPLAY;
      overlayTimers.push(setTimeout(() => showOverlay(overlay), SHOW_DELAY));
      router.push(path);
    }
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
