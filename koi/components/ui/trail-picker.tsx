"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import useTrailStyle, { previewTrailStyle, setTrailStyle, TRAIL_STYLES, useSavedTrailStyle, type TrailStyle } from "@/lib/hooks/useTrailStyle";
import useUiSounds from "@/lib/hooks/useUiSounds";
import { pxIbmVga } from "@/lib/fonts";

const FACE_DIR = "/images/margaret";
const FACES = {
  typing: `${FACE_DIR}/margaret_typing.png`,
  depressed: `${FACE_DIR}/margaret_depressed.png`,
  smile: `${FACE_DIR}/margaret_smile.png`,
  heart: `${FACE_DIR}/margaret_heart.png`,
  star: `${FACE_DIR}/margaret_star.png`,
  starHeart: `${FACE_DIR}/margaret_star_heart.png`,
  crying: `${FACE_DIR}/margaret_crying.png`,
};
type Face = keyof typeof FACES;

const IDLE_FACES: Face[] = ["typing", "depressed"];
const OPEN_FACES: Face[] = ["heart", "star", "starHeart"];
const IDLE_SWAP_MS = 5000;
const CRY_MS = 1500;
const MENU_GAP = 12;
const MENU_EDGE = 8;

const OPTIONS: Record<TrailStyle, { label: string; face: Face }> = {
  glow: { label: "Glow", face: "starHeart" },
  star: { label: "Stars", face: "star" },
  heart: { label: "Kokoro", face: "heart" },
  square: { label: "Squares", face: "starHeart" },
  kawaii: { label: "Kawaii", face: "heart" },
  off: { label: "Off", face: "depressed" },
};

const CLOSE_SRC = "/images/ui/menu_close.png";
const CLOSE_HOVER_SRC = "/images/ui/menu_close_hover.png";
const APPLY_ART = [
  ["/images/chat/chat_bubble_pink_deeper.png", "group-hover:invisible"],
  ["/images/chat/chat_bubble.png", "invisible group-hover:visible"],
] as const;

const notch = (n: number) =>
  `polygon(0 ${n}px, ${n}px ${n}px, ${n}px 0, calc(100% - ${n}px) 0, calc(100% - ${n}px) ${n}px, 100% ${n}px, 100% calc(100% - ${n}px), calc(100% - ${n}px) calc(100% - ${n}px), calc(100% - ${n}px) 100%, ${n}px 100%, ${n}px calc(100% - ${n}px), 0 calc(100% - ${n}px))`;
const OUTER_CORNERS = { clipPath: notch(4) };
const INNER_CORNERS = { clipPath: notch(2) };

const menuFont = cn(pxIbmVga.variable, "[font-family:var(--font-px-ibm-vga)] text-base");

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nice-purple1";

export default function TrailPicker({ className }: Readonly<{ className?: string }>) {
  const savedStyle = useSavedTrailStyle();
  const pending = useTrailStyle();
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [highlighted, setHighlighted] = useState<TrailStyle | null>(null);
  const [openFace, setOpenFace] = useState<Face>("starHeart");
  const [idleIndex, setIdleIndex] = useState(0);
  const [crying, setCrying] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cryTimerRef = useRef<number | null>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusOnOpenRef = useRef(false);
  const applyRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { playClick, playOpen, playSwitch } = useUiSounds();

  useEffect(() => {
    const id = window.setInterval(() => setIdleIndex((i) => (i + 1) % IDLE_FACES.length), IDLE_SWAP_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => () => {
    if (cryTimerRef.current !== null) window.clearTimeout(cryTimerRef.current);
    previewTrailStyle(null);
  }, []);

  const openMenu = (focusOption = false) => {
    focusOnOpenRef.current = focusOption;
    if (cryTimerRef.current !== null) window.clearTimeout(cryTimerRef.current);
    setCrying(false);
    setOpenFace(OPEN_FACES[Math.floor(Math.random() * OPEN_FACES.length)]);
    setOpen(true);
  };

  const closeMenu = useCallback((refocus = false) => {
    previewTrailStyle(null);
    setOpen(false);
    setHighlighted(null);
    setCrying(true);
    if (cryTimerRef.current !== null) window.clearTimeout(cryTimerRef.current);
    cryTimerRef.current = window.setTimeout(() => setCrying(false), CRY_MS);
    if (refocus) buttonRef.current?.focus();
  }, []);

  const placeMenu = useCallback(() => {
    const button = buttonRef.current?.getBoundingClientRect();
    const menu = menuRef.current;
    if (!button || !menu) return;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const { offsetWidth: w, offsetHeight: h } = menu;
    const right = Math.max(Math.min(vw - button.right, vw - w - MENU_EDGE), MENU_EDGE);
    const below = button.bottom + MENU_GAP;
    const above = button.top - MENU_GAP - h;
    const top = below + h > vh - MENU_EDGE && above >= MENU_EDGE ? above : below;
    setMenuPos({ top: top + window.scrollY, right: right - window.scrollX });
  }, []);

  useLayoutEffect(() => {
    if (open) placeMenu();
  }, [open, placeMenu]);

  useEffect(() => {
    if (!open || !focusOnOpenRef.current) return;
    focusOnOpenRef.current = false;
    optionRefs.current[TRAIL_STYLES.indexOf(savedStyle)]?.focus();
  }, [open, savedStyle]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeMenu(true);
      const current = optionRefs.current.findIndex((el) => el === document.activeElement);
      const onApply = document.activeElement === applyRef.current;
      const onClose = document.activeElement === closeRef.current;
      if (e.key === "Tab" && ((onClose && e.shiftKey) || (onApply && !e.shiftKey))) {
        e.preventDefault();
        return closeMenu(true);
      }
      if (current === -1 && !onApply && !onClose && document.activeElement !== buttonRef.current) return;
      const from = current === -1 ? TRAIL_STYLES.indexOf(pending) : current;
      const last = TRAIL_STYLES.length - 1;
      let next: number;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = from === last ? 0 : from + 1;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = from === 0 ? last : from - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      else return;
      e.preventDefault();
      optionRefs.current[next]?.focus();
      if (TRAIL_STYLES[next] === pending) return;
      previewTrailStyle(TRAIL_STYLES[next]);
      playSwitch();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!buttonRef.current?.contains(target) && !menuRef.current?.contains(target)) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", placeMenu);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", placeMenu);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, pending, closeMenu, playSwitch, placeMenu]);

  let face: Face;
  if (open) face = highlighted ? OPTIONS[highlighted].face : openFace;
  else if (crying) face = "crying";
  else if (hovering) face = "smile";
  else face = IDLE_FACES[idleIndex];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Change cursor trail style"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          if (open) {
            playClick();
            closeMenu();
          } else {
            playOpen();
            openMenu(e.detail === 0);
          }
        }}
        onKeyDown={(e) => {
          if (open || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
          e.preventDefault();
          playOpen();
          openMenu(true);
        }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className={cn("grid cursor-pointer rounded-lg", focusRing, className)}
      >
        {(Object.keys(FACES) as Face[]).map((key) => (
          <img
            key={key}
            src={FACES[key]}
            alt=""
            width={32}
            height={32}
            draggable={false}
            className={cn(
              "col-start-1 row-start-1 w-8 h-8 [image-rendering:pixelated]",
              key !== face && "invisible",
            )}
          />
        ))}
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="absolute z-[600] w-max max-w-[calc(100vw-16px)] select-none"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          <div className="drop-shadow-[3px_3px_0_rgb(97_62_84/0.35)] dark:drop-shadow-[3px_3px_0_rgb(0_0_0/0.5)] [animation:heroBtnReveal_0.3s_ease-out] motion-reduce:animate-none">
            <div className={cn(menuFont, "min-w-60 bg-[#613e54] p-0.5 dark:bg-[#120c18]")} style={OUTER_CORNERS}>
              <div className="bg-[#fde4f1] text-[#613e54] dark:bg-[#2e2440] dark:text-milky-white" style={INNER_CORNERS}>
                <div className="flex items-center gap-1.5 px-1.5 pt-1.5">
                  <div
                    id={headingId}
                    className="flex-1 px-2 py-0.5 shadow-[inset_2px_2px_0_rgb(97_62_84/0.25)] dark:shadow-[inset_2px_2px_0_rgb(0_0_0/0.4)]"
                    style={INNER_CORNERS}
                  >
                    &#9825; Change your cursor trail!
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    aria-label="Close menu"
                    onClick={() => {
                      playClick();
                      closeMenu(true);
                    }}
                    className={cn("group grid shrink-0 cursor-pointer", focusRing)}
                  >
                    <img src={CLOSE_SRC} alt="" width={10} height={10} draggable={false} className="col-start-1 row-start-1 size-5 [image-rendering:pixelated] group-hover:invisible group-focus-visible:invisible" />
                    <img src={CLOSE_HOVER_SRC} alt="" width={10} height={10} draggable={false} className="invisible col-start-1 row-start-1 size-5 [image-rendering:pixelated] group-hover:visible group-focus-visible:visible" />
                  </button>
                </div>
                <div
                  role="menu"
                  aria-labelledby={headingId}
                  className="mx-1.5 mt-1.5 flex flex-col"
                >
                  {TRAIL_STYLES.map((style, i) => {
                    const selected = style === pending;
                    return (
                      <button
                        key={style}
                        ref={(el) => {
                          optionRefs.current[i] = el;
                        }}
                        type="button"
                        role="menuitemradio"
                        aria-checked={selected}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => {
                          playClick();
                          previewTrailStyle(style);
                        }}
                        onPointerEnter={() => {
                          if (highlighted !== style) playSwitch();
                          setHighlighted(style);
                        }}
                        onPointerLeave={() => setHighlighted(null)}
                        onFocus={() => setHighlighted(style)}
                        onBlur={() => setHighlighted(null)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 px-2 py-1 text-left outline-none transition-colors duration-200 motion-reduce:transition-none",
                          !selected && "hover:text-[#a0307a] dark:hover:text-pink3",
                        )}
                      >
                        <span aria-hidden="true" className={cn("w-4", !selected && "invisible")}>&#9658;</span>
                        {OPTIONS[style].label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end p-1.5">
                  <button
                    ref={applyRef}
                    type="button"
                    onClick={() => {
                      playClick();
                      setTrailStyle(pending);
                      closeMenu(true);
                    }}
                    className={cn("group relative cursor-pointer px-4 py-2 text-[#613e54]", focusRing)}
                  >
                    {APPLY_ART.map(([src, visibility]) => (
                      <span
                        key={src}
                        aria-hidden="true"
                        className={cn("absolute inset-0 [image-rendering:pixelated]", visibility)}
                        style={{ borderStyle: "solid", borderWidth: 16, borderImage: `url(${src}) 8 fill / 16px / 0 round` }}
                      />
                    ))}
                    <span className="relative">Apply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
