"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const WriteupToc = ({ items }: { items: TocItem[] }) => {
  const [side, setSide] = useState<"left" | "right">("right");
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tocLinks = items.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={(event) => scrollTo(event, item.id)}
      className={cn(
        "block py-0.5 transition-colors hover:text-purple2 dark:hover:text-nice-purple1",
        item.level === 3 && "pl-4 text-sm",
        activeId === item.id
          ? "text-purple2 dark:text-nice-purple2 font-semibold"
          : "opacity-80",
      )}
    >
      {item.text}
    </a>
  ));

  return (
    <>
      {/* wide screens */}
      <nav
        id="writeup-toc"
        aria-label="Table of contents"
        className={cn(
          "liquid-glass rounded-2xl bg-white/15 dark:bg-white/5",
          "hidden 2xl:block fixed top-1/2 -translate-y-1/2 z-30 w-72 p-6 font-titillium-web",
          side === "right" ? "right-6" : "left-6",
        )}
      >
        <div
          className={cn(
            "flex items-center mb-2",
            side === "right" ? "flex-row-reverse justify-between" : "justify-between",
          )}
        >
          <span className="font-semibold italic">Table of Contents</span>
          <button
            onClick={() => setSide(side === "right" ? "left" : "right")}
            aria-label="Move table of contents to the other side"
            className="px-1.5 rounded cursor-pointer hover:bg-purple-400/20 transition-colors"
          >
            {side === "right" ? "←" : "→"}
          </button>
        </div>
        {tocLinks}
      </nav>

      {/* small screens (collapsible) */}
      <details
        id="writeup-toc-mobile"
        className={cn(
          "liquid-glass rounded-2xl bg-white/15 dark:bg-white/5",
          "2xl:hidden p-4 font-titillium-web",
        )}
      >
        <summary className="cursor-pointer font-semibold select-none">Table of Contents</summary>
        <div className="mt-2">{tocLinks}</div>
      </details>
    </>
  );
};

export default WriteupToc;
