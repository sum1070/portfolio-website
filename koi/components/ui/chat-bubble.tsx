"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/utils";

const CHAT_DIR = "/images/chat";
const BUBBLES = {
  left: {
    light: { body: `${CHAT_DIR}/chat_bubble.png`, tail: `${CHAT_DIR}/chat_bubble_tail.png` },
    dark: { body: `${CHAT_DIR}/chat_bubble_dark.png`, tail: `${CHAT_DIR}/chat_bubble_tail_dark.png` },
  },
  right: {
    light: { body: `${CHAT_DIR}/chat_bubble_blue.png`, tail: `${CHAT_DIR}/chat_bubble_tail_blue_flipped.png` },
    dark: { body: `${CHAT_DIR}/chat_bubble_blue_dark.png`, tail: `${CHAT_DIR}/chat_bubble_tail_blue_flipped_dark.png` },
  },
};
const THEMES = [
  ["light", "dark:hidden"],
  ["dark", "hidden dark:block"],
] as const;

interface ChatBubbleProps {
  children: React.ReactNode;
  side?: "left" | "right";
  tail?: boolean;
  className?: string;
}

export default function ChatBubble({ children, side = "left", tail = true, className }: Readonly<ChatBubbleProps>) {
  const mine = side === "right";
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    const parent = box?.parentElement;
    if (!box || !text || !parent) return;

    // wrapped text leaves the box at full width, so shrink it to the widest line
    const fit = () => {
      box.style.width = "";
      const range = document.createRange();
      range.selectNodeContents(text);
      const rects = Array.from(range.getClientRects());
      if (!rects.length || !text.offsetWidth) return;
      const scale = text.getBoundingClientRect().width / text.offsetWidth;
      const lines = Math.max(...rects.map((r) => r.right)) - Math.min(...rects.map((r) => r.left));
      const { paddingLeft, paddingRight } = getComputedStyle(text);
      box.style.width = `${Math.ceil(lines / scale + parseFloat(paddingLeft) + parseFloat(paddingRight))}px`;
    };

    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={boxRef} className={cn("relative w-fit max-w-[85%] select-none", mine && "ml-auto", tail && (mine ? "mr-3.5" : "ml-3.5"), className)}>
      {THEMES.map(([theme, visibility]) => {
        const art = BUBBLES[side][theme];
        return (
          <span key={theme} aria-hidden="true" className={visibility}>
            <span
              className="absolute inset-0 [image-rendering:pixelated]"
              style={{ borderStyle: "solid", borderWidth: 16, borderImage: `url(${art.body}) 8 fill / 16px / 0 round` }}
            />
            {tail && <img
              src={art.tail}
              alt=""
              width={8}
              height={8}
              draggable={false}
              className={cn(
                "absolute top-4 size-4 [image-rendering:pixelated]",
                mine ? "-right-3.5" : "-left-3.5",
              )}
            />}
          </span>
        );
      })}
      <div ref={textRef} className="relative px-[18px] py-3 font-titillium-web text-dark-black dark:text-milky-white text-sm sm:text-base leading-snug">
        {children}
      </div>
    </div>
  );
}
