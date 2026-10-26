"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/utils";
import ChatBubble from "./chat-bubble";

const BONE_SRC = "/images/doggy/doggy_bone.png";
const CHAT_ENABLED = process.env.NEXT_PUBLIC_DOG_CHAT === "true";
const NOTICE_MS = 3000;

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
  { from: "margaret", face: "smile", text: "Hi, I'm Margaret! And this is my best friend, Ball Ball." },
  { from: "margaret", face: "heart", text: "Try tapping on him, he loves pets!" },
  { from: "margaret", face: "star", text: "Drag him around to explore this universe with him." },
  { from: "margaret", face: "depressed", text: "Hmm... is he sleeping? Try making some noise to wake him up." },
  { from: "visitor", text: "Tell me more about it" },
  { from: "margaret", face: "starHeart", text: "Try scrolling up and down the universe..." },
];

const typingDelay = (text: string) => Math.min(1800, 600 + text.length * 25);

const pixelIcon = "w-8 h-8 shrink-0 [image-rendering:pixelated]";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nice-purple1";

const DEFAULT_W = 448;
const MIN_W = 260;
const MIN_H = 200;
const MARGIN = 8;
const GRAB_KEEP = 80;
const OPEN_TOP = 72;

type Rect = { x: number; y: number; w: number; h: number };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

export default function DogGuide({ className }: Readonly<{ className?: string }>) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: DEFAULT_W, h: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gestureRef = useRef<{ kind: "move" | "resize"; startX: number; startY: number; start: Rect } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const next = SCRIPT[messages.length];
  const [notice, setNotice] = useState(false);
  const noticeTimerRef = useRef<number | null>(null);

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
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTyping(true);
    const id = window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, next]);
    }, quick ? 150 : typingDelay(next.text));
    return () => {
      window.clearTimeout(id);
      setTyping(false);
    };
  }, [open, next]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing]);

  const lastFace = [...messages].reverse().find((m) => m.from === "margaret");
  const face: Face = typing ? "typing" : lastFace?.from === "margaret" ? lastFace.face : "smile";

  const openWindow = () => {
    const w = Math.min(DEFAULT_W, window.innerWidth - MARGIN * 6);
    setRect({ x: window.innerWidth - w - MARGIN * 3, y: OPEN_TOP, w, h: 0 });
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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    if (g.kind === "move") {
      setRect((r) => ({
        ...r,
        x: clamp(start.x + dx, GRAB_KEEP - start.w, window.innerWidth - GRAB_KEEP),
        y: clamp(start.y + dy, 0, window.innerHeight - GRAB_KEEP / 2),
      }));
    } else {
      setRect((r) => ({
        ...r,
        w: clamp(start.w + dx, MIN_W, window.innerWidth - start.x - MARGIN),
        h: clamp(start.h + dy, MIN_H, window.innerHeight - start.y - MARGIN),
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
          aria-label="How to play with the doggy"
          aria-expanded={open}
          onClick={() => {
            if (!CHAT_ENABLED) showNotice();
            else if (open) close();
            else openWindow();
          }}
          className={cn(
            "cursor-pointer rounded-lg transition-transform duration-300 hover:-rotate-12 motion-reduce:transition-none",
            focusRing,
            className,
          )}
        >
          <img src={BONE_SRC} alt="" width={16} height={16} draggable={false} className={pixelIcon} />
        </button>
        <span role="status" className="absolute right-0 top-full z-[600] mt-3 w-max max-w-[min(16rem,80vw)]">
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
          className={cn(
            "z-[600] flex flex-col rounded-3xl hollow-gradient-outline outline-none",
            "bg-milky-white dark:bg-dark-black text-dark-black dark:text-milky-white font-titillium-web shadow-xl",
            "[animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none",
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
          <div
            className="mx-6 sm:mx-8 mt-5 mb-3 flex items-center gap-3 rounded-2xl bg-pale-purple1/50 dark:bg-white/5 p-2 cursor-grab active:cursor-grabbing touch-none select-none"
            onPointerDown={startGesture("move")}
            {...gestureHandlers}
          >
            <span className="grid shrink-0 size-16 overflow-hidden rounded-xl bg-white">
              {Object.entries(FACES).map(([key, src]) => (
                <img
                  key={key}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  draggable={false}
                  className={cn("col-start-1 row-start-1 size-16 [image-rendering:pixelated]", key !== face && "invisible")}
                />
              ))}
            </span>
            <div>
              <div className="font-semibold">Margaret</div>
              <div className="flex items-center gap-1.5 text-sm opacity-80">
                <span aria-hidden="true" className="size-2 rounded-full bg-green-400" />
                {typing ? "typing..." : "Online"}
              </div>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className={cn("ml-auto mr-1 self-start cursor-pointer rounded-full p-1.5 transition-colors duration-300 hover:bg-nice-purple1/20 motion-reduce:transition-none", focusRing)}
            >
              <RxCross2 className="size-5" />
            </button>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 min-h-0 overflow-auto px-6 sm:px-8 pb-6 flex flex-col gap-3"
          >
            {messages.map((m, i) => (
              <ChatBubble
                key={i}
                side={m.from === "visitor" ? "right" : "left"}
                className="shrink-0 [animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none"
              >
                {m.text}
              </ChatBubble>
            ))}
            {typing && (
              <ChatBubble className="shrink-0">
                <span aria-label="Margaret is typing" className="inline-block tracking-[0.3em] animate-pulse motion-reduce:animate-none">...</span>
              </ChatBubble>
            )}
          </div>

          {next?.from === "visitor" && (
            <div className="px-6 sm:px-8 pb-6 flex justify-end">
              <button
                type="button"
                onClick={() => setMessages((prev) => [...prev, next])}
                className={cn(
                  "cursor-pointer px-5 py-2 rounded-full bg-linear-45 from-Mauve/90 to-sky-blue/60 dark:from-Mauve/30 dark:to-sky-blue/30",
                  "font-semibold transition-colors duration-300 hover:bg-white/25 motion-reduce:transition-none",
                  focusRing,
                )}
              >
                {next.text}
              </button>
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute bottom-2 right-2 size-6 cursor-nwse-resize touch-none text-nice-purple3/60"
            onPointerDown={startGesture("resize")}
            {...gestureHandlers}
          >
            <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 10 L10 20 M20 15 L15 20" />
            </svg>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
