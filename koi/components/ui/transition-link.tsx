// TransitionLink.tsx
"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface TransitionProps extends LinkProps, AnchorProps {
  children: React.ReactNode;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink = ({ children, href, ...props }: TransitionProps) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const overlay = document.querySelector<HTMLElement>("#page-transition-overlay");
    overlay?.classList.add("active");

    await sleep(500);

    if (typeof href === "string") {
      router.push(href);
    } else if (typeof href === "object" && href !== null && "pathname" in href) {
      router.push(
        href.pathname +
        (href.query
          ? "?" +
          new URLSearchParams(
            href.query as Record<string, string>
          ).toString()
          : "")
      );
    } else {
      console.error("Invalid href:", href);
    }

    await sleep(500);
    overlay?.classList.remove("active");
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
