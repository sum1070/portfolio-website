"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import useUiSounds from "@/lib/hooks/useUiSounds";
import { pxIbmVga } from "@/lib/fonts";
import ChatBubble from "./chat-bubble";

const BONE_SRC = "/images/doggy/doggy_bone.png";
const CHAT_ENABLED = process.env.NEXT_PUBLIC_DOG_CHAT === "true";
const NOTICE_MS = 3000;
const READ_KEY = "dog-guide-read";

const FACE_DIR = "/images/margaret";
const FACES = {
  typing: `${FACE_DIR}/margaret_typing.png`,
  smile: `${FACE_DIR}/margaret_smile.png`,
  heart: `${FACE_DIR}/margaret_heart.png`,
  star: `${FACE_DIR}/margaret_star.png`,
  starHeart: `${FACE_DIR}/margaret_star_heart.png`,
  depressed: `${FACE_DIR}/margaret_depressed.png`,
};
type Face = keyof typeof FACES;

type Message = { from: "margaret"; text: string; face: Face } | { from: "visitor"; text: string };

const SCRIPT: Message[] = [
  { from: "margaret", face: "smile", text: "Hi, I'm Margaret! And this is my best friend, Ball Ball {dog}." },
  { from: "margaret", face: "heart", text: "Try tapping him, he loves pets!" },
  { from: "margaret", face: "star", text: "Drag him around and explore this universe together... But he can be a bit naughty sometimes! @_@" },
  { from: "margaret", face: "depressed", text: "Hmm... Is he sleeping? Try making some noise to wake him up." },
  { from: "visitor", text: "How can I wake him up?" },
  { from: "margaret", face: "starHeart", text: "Try scrolling the page up and down~" },
  { from: "visitor", text: "Can I take him for a walk?" },
  { from: "margaret", face: "starHeart", text: "Sure! Tap anywhere on the page and he'll run after you!" },
];

const DOG_EMOJI_SRC = "/images/doggy/doggy_avatar.png";

const withEmoji = (text: string) =>
  text.split("{dog}").flatMap((part, i) => i === 0 ? [part] : [
    <img
      key={i}
      src={DOG_EMOJI_SRC}
      alt=""
      width={16}
      height={16}
      draggable={false}
      className="-my-2 inline-block size-8 align-middle [image-rendering:pixelated]"
    />,
    part,
  ]);

const FIRST_POP_MS = 700;
const REVEAL_MS = 400;
const DOT_MS = 500;
const TYPING_MS = DOT_MS * 3;
const UNTYPED_COUNT = 3;

function TypingDots({ onDot }: Readonly<{ onDot: () => void }>) {
  const [dots, setDots] = useState(1);
  const onDotRef = useRef(onDot);
  onDotRef.current = onDot;

  useEffect(() => {
    onDotRef.current();
  }, [dots]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setDots(3);
    const id = window.setInterval(() => setDots((d) => Math.min(d + 1, 3)), DOT_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span aria-label="Margaret is typing" className="inline-block tracking-[0.3em]">
      {".".repeat(dots)}
      <span className="invisible">{".".repeat(3 - dots)}</span>
    </span>
  );
}

const CLOSE_SRC = "/images/ui/menu_close.png";
const CLOSE_HOVER_SRC = "/images/ui/menu_close_hover.png";
const UI_DIR = "/images/ui";
const CHAT_DIR = "/images/chat";
const THEMES = [
  ["", "dark:hidden"],
  ["_dark", "hidden dark:block"],
] as const;

const pixelIcon = "w-8 h-8 shrink-0 [image-rendering:pixelated]";
const menuFont = cn(pxIbmVga.variable, "[font-family:var(--font-px-ibm-vga)]");

function PixelFrame({ art, slice, width }: Readonly<{ art: string; slice: number; width: number }>) {
  return THEMES.map(([suffix, visibility]) => (
    <span
      key={suffix}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 [image-rendering:pixelated]", visibility)}
      style={{ borderStyle: "solid", borderWidth: width, borderImage: `url(${art}${suffix}.png) ${slice} fill / ${width}px / 0 round` }}
    />
  ));
}
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nice-purple1";

const DEFAULT_W = 448;
const MIN_W = 260;
const MIN_H = 200;
const MARGIN = 8;
const OPEN_TOP = 72;

type Rect = { x: number; y: number; w: number; h: number };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

const fitRect = (r: Rect, boxH: number): Rect => {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const maxW = vw - MARGIN * 2;
  const maxH = vh - MARGIN * 2;
  const w = clamp(r.w, Math.min(MIN_W, maxW), maxW);
  const h = r.h && clamp(r.h, Math.min(MIN_H, maxH), maxH);
  return {
    w,
    h,
    x: clamp(r.x, MARGIN, vw - w - MARGIN),
    y: clamp(r.y, MARGIN, vh - Math.min(h || boxH, maxH) - MARGIN),
  };
};

export default function DogGuide({ className }: Readonly<{ className?: string }>) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: DEFAULT_W, h: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gestureRef = useRef<{ kind: "move" | "resize"; startX: number; startY: number; start: Rect } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [seen, setSeen] = useState(0);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const next = SCRIPT[messages.length];
  const [notice, setNotice] = useState(false);
  const noticeTimerRef = useRef<number | null>(null);
  const noticeRef = useRef<HTMLSpanElement>(null);
  const { playClick, playOpen } = useUiSounds();
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    try {
      setUnread(localStorage.getItem(READ_KEY) !== "1");
    } catch {}
  }, []);

  const markRead = () => {
    setUnread(false);
    try {
      localStorage.setItem(READ_KEY, "1");
    } catch {}
  };

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  const showNotice = () => {
    setNotice(true);
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(false), NOTICE_MS);
  };

  useEffect(() => {
    if (!open || next?.from !== "margaret") return;
    if (next === SCRIPT[0]) {
      setMessages([next]);
      return;
    }
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    const reveal = () => setMessages((prev) => [...prev, next]);
    const startTyping = () => {
      if (messages.length < UNTYPED_COUNT) return reveal();
      setTyping(true);
      id = window.setTimeout(() => {
        setTyping(false);
        reveal();
      }, quick ? 150 : TYPING_MS);
    };
    let wait = 0;
    if (!quick && next === SCRIPT[1] && seen === 0) wait = FIRST_POP_MS;
    else if (!quick && messages.length > seen) wait = REVEAL_MS;
    if (wait) id = window.setTimeout(startTyping, wait);
    else startTyping();
    return () => {
      window.clearTimeout(id);
      setTyping(false);
    };
  }, [open, next, seen, messages.length]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing]);

  const skipTyping = (e: React.MouseEvent<HTMLElement>) => {
    if (next?.from !== "margaret" || (e.target as HTMLElement).closest("button")) return;
    const index = messages.length;
    setTyping(false);
    setMessages((prev) => (prev.length === index ? [...prev, SCRIPT[index]] : prev));
  };

  const lastFace = [...messages].reverse().find((m) => m.from === "margaret");
  const face: Face = typing ? "typing" : lastFace?.from === "margaret" ? lastFace.face : "smile";

  useLayoutEffect(() => {
    const el = noticeRef.current;
    if (!notice || !el) return;
    const fit = () => {
      el.style.translate = "";
      const { left, right } = el.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      let shift = 0;
      if (left < MARGIN) shift = MARGIN - left;
      else if (right > vw - MARGIN) shift = vw - MARGIN - right;
      el.style.translate = shift ? `${shift}px 0` : "";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [notice]);

  const openWindow = () => {
    const vw = document.documentElement.clientWidth;
    const w = Math.min(DEFAULT_W, vw - MARGIN * 6);
    setRect({ x: vw - w - MARGIN * 3, y: OPEN_TOP, w, h: 0 });
    setSeen(messages.length);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    windowRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => {
      const boxH = windowRef.current?.offsetHeight ?? 0;
      setRect((r) => fitRect(r, boxH));
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const startGesture = (kind: "move" | "resize") => (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    const box = windowRef.current?.getBoundingClientRect();
    if (!box) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    gestureRef.current = { kind, startX: e.clientX, startY: e.clientY, start: { x: box.left, y: box.top, w: box.width, h: box.height } };
  };

  const moveGesture = (e: React.PointerEvent<HTMLElement>) => {
    const g = gestureRef.current;
    if (!g) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    const { start } = g;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    if (g.kind === "move") {
      setRect((r) => ({
        ...r,
        x: clamp(start.x + dx, MARGIN, vw - start.w - MARGIN),
        y: clamp(start.y + dy, MARGIN, vh - start.h - MARGIN),
      }));
    } else {
      setRect((r) => ({
        ...r,
        w: clamp(start.w + dx, Math.min(MIN_W, vw - start.x - MARGIN), vw - start.x - MARGIN),
        h: clamp(start.h + dy, Math.min(MIN_H, vh - start.y - MARGIN), vh - start.y - MARGIN),
      }));
    }
  };

  const endGesture = () => {
    gestureRef.current = null;
  };

  const gestureHandlers = { onPointerMove: moveGesture, onPointerUp: endGesture, onPointerCancel: endGesture };

  return (
    <>
      <span className="relative inline-flex">
        <button
          ref={buttonRef}
          type="button"
          aria-label={unread ? "How to play with the doggy (unread)" : "How to play with the doggy"}
          aria-expanded={open}
          onClick={() => {
            markRead();
            if (CHAT_ENABLED && open) {
              playClick();
              close();
              return;
            }
            playOpen();
            if (CHAT_ENABLED) openWindow();
            else showNotice();
          }}
          className={cn(
            "cursor-pointer rounded-lg transition-transform duration-300 hover:-rotate-12 motion-reduce:transition-none",
            focusRing,
            className,
          )}
        >
          <img src={BONE_SRC} alt="" width={16} height={16} draggable={false} className={pixelIcon} />
        </button>
        {unread && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 select-none bg-[#ff4f8b] shadow-[0_0_0_2px_#613e54] dark:shadow-[0_0_0_2px_#120c18]"
          />
        )}
        <span ref={noticeRef} role="status" className="absolute right-0 top-full z-[600] mt-3 w-max max-w-[min(16rem,80vw)]">
          {notice && (
            <ChatBubble tail={false} className="max-w-none [animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none">
              Under construction... Coming soon.
            </ChatBubble>
          )}
        </span>
      </span>

      {open && createPortal(
        <div
          ref={windowRef}
          role="dialog"
          aria-label="Chat with Margaret about Ball Ball"
          tabIndex={-1}
          onClick={skipTyping}
          className={cn(
            "z-[600] flex flex-col outline-none select-none text-dark-black dark:text-milky-white",
            "drop-shadow-[4px_4px_0_rgb(66_60_108/0.35)] dark:drop-shadow-[4px_4px_0_rgb(0_0_0/0.6)]",
            "[animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none",
            menuFont,
          )}
          style={{
            position: "fixed",
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h || undefined,
            maxHeight: rect.h ? undefined : `calc(100dvh - ${rect.y + MARGIN}px)`,
          }}
        >
          <PixelFrame art={`${CHAT_DIR}/chat_bubble`} slice={8} width={16} />

          <div
            className="relative mx-4 mt-4 mb-2 flex items-center gap-3 cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={startGesture("move")}
            {...gestureHandlers}
          >
            <span className="relative grid shrink-0 p-1.5">
              <PixelFrame art={`${UI_DIR}/window_panel`} slice={4} width={8} />
              {Object.entries(FACES).map(([key, src]) => (
                <img
                  key={key}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  draggable={false}
                  className={cn("relative col-start-1 row-start-1 size-11 [image-rendering:pixelated]", key !== face && "invisible")}
                />
              ))}
            </span>
            <div className="leading-tight">
              <div className="text-lg">Margaret</div>
              <div className="mt-0.5 flex items-center gap-2 text-sm text-nice-purple1 dark:text-pale-purple2">
                <span aria-hidden="true" className="size-2 bg-green-500 shadow-[0_0_0_2px_#2f6b3a]" />
                {typing ? "typing..." : "Online"}
              </div>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                playClick();
                close();
              }}
              className={cn("group ml-auto mr-1 self-start shrink-0 grid cursor-pointer", focusRing)}
            >
              <img src={CLOSE_SRC} alt="" width={10} height={10} draggable={false} className="col-start-1 row-start-1 size-5 [image-rendering:pixelated] group-hover:invisible group-focus-visible:invisible" />
              <img src={CLOSE_HOVER_SRC} alt="" width={10} height={10} draggable={false} className="invisible col-start-1 row-start-1 size-5 [image-rendering:pixelated] group-hover:visible group-focus-visible:visible" />
            </button>
          </div>

          <div className="relative mx-4 mb-4 flex min-h-0 flex-1 flex-col">
            <PixelFrame art={`${UI_DIR}/window_panel`} slice={4} width={8} />
            <div
              ref={listRef}
              aria-live="polite"
              className="relative flex-1 min-h-0 overflow-auto p-4 flex flex-col gap-3 [&::-webkit-scrollbar]:w-5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#c8a7b8] dark:[&::-webkit-scrollbar-thumb]:bg-[#492964] supports-[not_selector(::-webkit-scrollbar)]:[scrollbar-color:#c8a7b8_transparent] dark:supports-[not_selector(::-webkit-scrollbar)]:[scrollbar-color:#492964_transparent]"
            >
              {messages.map((m, i) => (
                <ChatBubble
                  key={i}
                  side={m.from === "visitor" ? "right" : "left"}
                  className={cn(
                    "shrink-0 motion-reduce:animate-none",
                    i >= seen && (m.from === "visitor" ? "origin-top-right" : "origin-top-left"),
                    i >= seen && (i === 0 ? "[animation:chatPop_0.35s_ease-out_0.25s_both]" : "[animation:chatPop_0.35s_ease-out_both]"),
                  )}
                >
                  <span className={cn(menuFont, "block text-base sm:text-lg leading-tight")}>{withEmoji(m.text)}</span>
                </ChatBubble>
              ))}
              {typing && (
                <ChatBubble className="shrink-0 origin-top-left [animation:chatPop_0.35s_ease-out_both] motion-reduce:animate-none">
                  <TypingDots onDot={playClick} />
                </ChatBubble>
              )}
            </div>
          </div>

          {next?.from === "visitor" && (
            <div className="relative mx-4 mb-5 -mt-1 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setMessages((prev) => [...prev, next]);
                }}
                className={cn(
                  "relative cursor-pointer px-4 py-2 text-base sm:text-lg leading-tight transition-[filter] duration-200 hover:brightness-105 motion-reduce:transition-none",
                  focusRing,
                )}
              >
                <PixelFrame art={`${CHAT_DIR}/chat_bubble_blue`} slice={8} width={16} />
                <span className="relative">{next.text}</span>
              </button>
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 grid size-5 place-items-center cursor-nwse-resize touch-none"
            onPointerDown={startGesture("resize")}
            {...gestureHandlers}
          >
            {THEMES.map(([suffix, visibility]) => (
              <img
                key={suffix}
                src={`${UI_DIR}/resize_grip${suffix}.png`}
                alt=""
                width={6}
                height={6}
                draggable={false}
                className={cn("size-3 [image-rendering:pixelated]", visibility)}
              />
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
