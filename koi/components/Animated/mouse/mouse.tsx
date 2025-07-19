// Inspired by "Constellations Mouse Trail" by Frank on CodePen:
// https://codepen.io/franksLaboratory/pen/oNYYRYR

"use client";
import React, { useEffect, useRef } from "react";

export default function MouseAnimated() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // initialise canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let particles: any[] = [], hue = 0, frame = 0;
    const MAX_PARTICLES = 150;

    // Blur effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(255, 255, 255, 0.3)";

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // reapply blur
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
    }
    resize();

    const mouse = { x: 0, y: 0 };

    // --------- Mouse Events listener functions ---------
    function click(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hue += 8;
      for (let i = 0; i < 20; i++) particles.push(createParticle());
      for (let i = 0; i < 20; i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(createParticle());
        }
      }
    }

    let lastTime = 0;
    function move(e: MouseEvent) {
      const currentTime = performance.now();
      if (currentTime - lastTime < 10) return;

      lastTime = currentTime;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hue += 2;
      if (frame % 2 === 0) for (let i = 0; i < 7; i++) particles.push(createParticle());
    }



    // --- Particles Setting ---
    function createParticle() {
      return {
        x: mouse.x,
        y: mouse.y,
        size: Math.random() * 14 + 1,
        speedX: Math.random() * 3 - 1,
        speedY: Math.random() * 3 - 1,
        color: `hsla(${hue},100%, 82%, 0.7)`,
        growFactor: Math.random() * 0.05 + 0.03,
        maxSize: Math.random() * 8 + 5,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
      };
    }

    function handleParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // update particle position
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.size < p.maxSize) {
          p.size += p.growFactor;
        } else {
          p.size -= 0.1;
        }

        // Decrease life
        p.life -= p.decay;

        // Skip drawing if particle is offscreen
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        // draw particle with glow
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();


        if (i % 2 === 0) {
          let connectionsCount = 0;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x, dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // --- Lines Setting ---
            if (dist < 80 && connectionsCount < 4) {
              ctx.beginPath();
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 0.2;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }

        // clear small or dead particles
        if (p.size <= 0.2 || p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    let animationId: number;
    function animate() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
      handleParticles();
      frame++;
      animationId = requestAnimationFrame(animate); // recursive call
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1, // make it behind other content
        pointerEvents: "none",
      }}
    />
  );
}