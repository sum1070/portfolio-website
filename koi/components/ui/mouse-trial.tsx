// Inspired by "Constellations Mouse Trail" by Frank on CodePen:
// https://codepen.io/franksLaboratory/pen/oNYYRYR
// MIT License

"use client";
import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  growFactor: number;
  maxSize: number;
  life: number;
  decay: number;
};

const MAX_PARTICLES = 200;
const LOW_POWER_PARTICLES = 80;
const SLOW_FRAME_MS = 40; // ~25fps
const SLOW_FRAME_LIMIT = 30; // this many slow frames (net) and the glow goes
const CONNECT_DIST = 100;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const MAX_CONNECTIONS = 4;
const SPAWN_INTERVAL_MS = 30; // same cadence the old every-other-frame gate gave at 60Hz
const SPAWN_SPACING = 14; // px between spawn points when filling in a fast swipe
const TELEPORT_DIST = 400; // a jump this big means the cursor left and came back

// with hardware acceleration off, browsers rasterise canvas shadows on the
// CPU and the glow alone drags the whole page below 20fps. Software GL is the
// tell: no WebGL at all, or a software renderer string.
function isSoftwareRendering() {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return true;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    // SwiftShader = Chrome's software GL, Basic Render Driver = Windows WARP,
    // llvmpipe/softpipe = Mesa's software paths on Linux
    return /swiftshader|software|llvmpipe|softpipe|basic render/i.test(renderer);
  } catch {
    return true;
  }
}

export default function MouseAnimated() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const particles: Particle[] = [];
    let hue = 0;

    // glow costs nothing on a GPU but is brutal in software rendering: start
    // degraded when that is detectable up front, and let the slow-frame
    // counter in animate() catch weak machines the WebGL probe misses
    let glowDisabled = isSoftwareRendering();
    let slowFrames = 0;
    let lastFrameTime = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    // no particles for reduced-motion users; keep the flag live so toggling
    // the OS setting works without a reload
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
    motionQuery.addEventListener("change", onMotionChange);

    // --------- Mouse Events listener functions ---------
    function click(e: MouseEvent) {
      if (reducedMotion) return;
      hue = (hue + 8) % 360;
      for (let i = 0; i < 40; i++) {
        spawnParticle(e.clientX, e.clientY);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      ensureAnimating();
    }

    let lastTime = 0;
    let lastX = -1;
    let lastY = -1; // where the trail last reached; -1 until the first event

    function move(e: MouseEvent) {
      if (reducedMotion) return;
      const currentTime = performance.now();
      if (currentTime - lastTime < SPAWN_INTERVAL_MS) return;
      lastTime = currentTime;
      hue = (hue + 2) % 360;

      // a fast swipe covers a lot of ground between events, so spread the
      // burst along the path back to the previous point instead of dumping
      // it all at the cursor
      let dx = 0, dy = 0, dist = 0;
      if (lastX >= 0) {
        dx = e.clientX - lastX;
        dy = e.clientY - lastY;
        dist = Math.hypot(dx, dy);
      }
      if (dist > TELEPORT_DIST) dist = 0;
      const points = Math.min(Math.max(1, Math.round(dist / SPAWN_SPACING)), 30);
      const perPoint = Math.max(1, Math.round(7 / points));
      // walk cursor-first so if anything gets shortchanged it is the tail of
      // the trail, never the point the user is actually looking at
      for (let s = 0; s < points; s++) {
        const t = s / points;
        for (let k = 0; k < perPoint; k++) {
          spawnParticle(e.clientX - dx * t, e.clientY - dy * t);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
      ensureAnimating();
    }

    // taps teleport the pointer, and the browser fires a synthetic mousemove
    // at the tap point right before click; without dropping the anchor here
    // that mousemove draws a straight particle line between two taps
    function touchStart() {
      lastX = -1;
      lastY = -1;
    }

    // --- Particles Setting ---
    let recycleIdx = 0;

    function spawnParticle(x: number, y: number) {
      const cap = glowDisabled ? LOW_POWER_PARTICLES : MAX_PARTICLES;
      if (particles.length < cap) {
        particles.push(createParticle(x, y));
      } else {
        // at the cap, overwrite the oldest slots instead of refusing to
        // spawn; the fresh end of the trail matters more than the fading one
        particles[recycleIdx] = createParticle(x, y);
        recycleIdx = (recycleIdx + 1) % cap;
      }
    }

    function createParticle(x: number, y: number): Particle {
      return {
        x,
        y,
        size: Math.random() * 14 + 2,
        speedX: Math.random() * 3 - 0.9,
        speedY: Math.random() * 3 - 0.9,
        color: `hsla(${hue},100%, 70%, 0.7)`,
        growFactor: Math.random() * 0.05 + 0.05,
        maxSize: Math.random() * 20 + 4,
        life: 1,
        decay: Math.random() * 0.02 + 0.025,
      };
    }

    // move everything, then drop dead/offscreen particles by compacting the
    // array in place (splice per particle gets quadratic)
    function updateParticles() {
      if (!canvas) return;
      let alive = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.size < p.maxSize) p.size += p.growFactor;
        else p.size -= 0.1;
        p.life -= p.decay;
        if (
          p.life <= 0 || p.size <= 0.25 ||
          p.x < 0 || p.x > canvas.width ||
          p.y < 0 || p.y > canvas.height
        ) continue;
        particles[alive++] = p;
      }
      particles.length = alive;
    }

    function drawParticles() {
      // glow only on the fills, never on the lines: blurred strokes are what
      // tanked mobile. Sprite caching was tried and lost to GPU shadows.
      ctx.shadowBlur = glowDisabled ? 0 : 10;
      for (const p of particles) {
        ctx.fillStyle = p.color;
        if (!glowDisabled) ctx.shadowColor = p.color;
        ctx.globalAlpha = p.life; // dying particles fade instead of blinking out
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    // pack cell coords into one number; 4096 columns is more than any screen needs
    const cellKey = (x: number, y: number) =>
      Math.floor(x / CONNECT_DIST) * 4096 + Math.floor(y / CONNECT_DIST);

    function drawConnections() {
      // cells are one connect-distance wide, so anything in range of a
      // particle has to sit in the 3x3 cells around it. Saves scanning the
      // whole array for every particle.
      const grid = new Map<number, number[]>();
      for (let i = 0; i < particles.length; i++) {
        const key = cellKey(particles[i].x, particles[i].y);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      // --- Lines Setting ---
      ctx.lineWidth = 0.2;
      for (let i = 0; i < particles.length; i += 2) {
        const p = particles[i];
        const cx = Math.floor(p.x / CONNECT_DIST);
        const cy = Math.floor(p.y / CONNECT_DIST);
        let connections = 0;
        ctx.beginPath();
        for (let gx = cx - 1; gx <= cx + 1 && connections < MAX_CONNECTIONS; gx++) {
          for (let gy = cy - 1; gy <= cy + 1 && connections < MAX_CONNECTIONS; gy++) {
            const bucket = grid.get(gx * 4096 + gy);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const p2 = particles[j];
              const dx = p.x - p2.x, dy = p.y - p2.y;
              if (dx * dx + dy * dy < CONNECT_DIST_SQ) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                if (++connections >= MAX_CONNECTIONS) break;
              }
            }
          }
        }
        if (connections > 0) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.stroke(); // batch this particle's lines into a single stroke
        }
      }
      ctx.globalAlpha = 1;
    }

    // --- Animation loop ---
    // only runs while particles are alive; spawning starts it up again, so an
    // idle page burns no frames at all
    let animationId = 0;
    let running = false;

    function animate(now: number) {
      if (!canvas) return;
      // sustained slow frames mean this device cannot afford the glow either
      if (!glowDisabled && lastFrameTime) {
        if (now - lastFrameTime > SLOW_FRAME_MS) {
          if (++slowFrames >= SLOW_FRAME_LIMIT) glowDisabled = true;
        } else if (slowFrames > 0) {
          slowFrames--;
        }
      }
      lastFrameTime = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      if (particles.length === 0) {
        // canvas is already cleared, park the loop until the next spawn
        running = false;
        lastFrameTime = 0; // the gap while parked is not a slow frame
        return;
      }
      drawParticles();
      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    function ensureAnimating() {
      if (!running) {
        running = true;
        animationId = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("click", click, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("touchstart", touchStart);
      motionQuery.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 500,
        pointerEvents: "none",
      }}
    />
  );
}
