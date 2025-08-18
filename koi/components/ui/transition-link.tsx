"use client";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface TransitionProps extends LinkProps, AnchorProps {
  children: React.ReactNode;
}

const TransitionLink = ({ children, href, ...props }: TransitionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  // effect when pathname changes
  useEffect(() => {
    if (!isNavigating) return;
    if (targetPath) {
      // minimum animation display time
      const minDisplayTime = 500; // ms
      const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");

      setTimeout(() => {
        overlay?.classList.remove("active");
        setIsNavigating(false);
        setTargetPath(null);
      }, minDisplayTime);
    }

    // clean up to remove the overlay after a timeout (nav failed or took too long)
    const timeoutId = setTimeout(() => {
      const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
      if (overlay?.classList.contains("active")) {
        console.log("Fallback: removing transition overlay after timeout");
        overlay.classList.remove("active");
        setIsNavigating(false);
        setTargetPath(null);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [pathname, isNavigating, targetPath]);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    // if already navigating, dont trigger again
    if (isNavigating) return;

    const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
    overlay?.classList.add("active");

    setIsNavigating(true);

    let path: string;
    if (typeof href === "string") {
      path = href;
      router.push(href);
    } else if (typeof href === "object" && href !== null && "pathname" in href) {
      path =
        href.pathname +
        (href.query ? "?" + new URLSearchParams(href.query as Record<string, string>).toString() : "");
      router.push(path);
    } else {
      console.error("Invalid href:", href);
      overlay?.classList.remove("active");
      setIsNavigating(false);
      return;
    }

    setTargetPath(path);
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
