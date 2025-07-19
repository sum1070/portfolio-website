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
    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [], hue = 0, frame = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const mouse = { x: 0, y: 0 };

    // --------- Events listener functions ---------
    function click(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hue += 8;
      for (let i = 0; i < 20; i++) particles.push(createParticle());
    }

    function move(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hue += 2;
      if (frame % 2 === 0) for (let i = 0; i < 7; i++) particles.push(createParticle());
    }

    // Create particle
    function createParticle() {
      return {
        x: mouse.x,
        y: mouse.y,
        size: Math.random() * 15 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: `hsl(${hue},100%,50%)`,
      };
    }

    function handleParticles() {
      particles.forEach((p, i) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.size > 0.2) p.size -= 0.1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.closePath();
          }
        }

        if (p.size <= 0.3) particles.splice(i, 1);
      });
    }

    let animationId: number;
    function animate() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      frame++;
      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);


    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("click", click);
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
        zIndex: 50,
        pointerEvents: "none",
      }}
    />
  );
}
