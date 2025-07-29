/* 
Space particles. Created with TypeScript.

Uncomment...

    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "#fff";
    
...if you want to see more space in space. But remember - it's slow.
@Amay 2015


"Spaaaaaace!" 
- Portal 2 
*/



"use client";
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface Particle {
    color: string;
    radius: number;
    x: number;
    y: number;
    ring: number;
    move: number;
    random: number;
}

export const SpaceParticles = ({ zIndex = -5 }: { zIndex?: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        const particles: Particle[] = [];
        const ratio = window.innerHeight < 400 ? 0.6 : 1;
        const r = 200;
        let counter = 0;

        // canvas set up
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.transform(ratio, 0, 0, -ratio, canvas.width / 2, canvas.height / 2);
        };

        setCanvasSize();

        window.addEventListener('resize', setCanvasSize);

        const createParticle = () => {
            particles.push({
                color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
                radius: Math.random() * 5,
                x: Math.cos(Math.random() * 7 + Math.PI) * r,
                y: Math.sin(Math.random() * 7 + Math.PI) * r,
                ring: Math.random() * r * 3,
                move: ((Math.random() * 4) + 1) / 500,
                random: Math.random() * 7
            });
        };

        const moveParticle = (p: Particle) => {
            p.ring = Math.max(p.ring - 1, r);
            p.random += p.move;
            p.x = Math.cos(p.random + Math.PI) * p.ring;
            p.y = Math.sin(p.random + Math.PI) * p.ring;
        };

        const resetParticle = (p: Particle) => {
            p.ring = Math.random() * r * 3;
            p.radius = Math.random() * 5;
        };

        const disappear = (p: Particle) => {
            if (p.radius < 0.8) {
                resetParticle(p);
            }
            p.radius *= 0.994;
        };

        const drawParticle = (p: Particle) => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        };

        // initialise particles
        for (let i = 0; i < 450; i++) {
            createParticle();
        }
        const loop = () => {
            ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
            if (counter < particles.length) {
                counter++;
            }

            for (let i = 0; i < counter; i++) {
                disappear(particles[i]);
                moveParticle(particles[i]);
                drawParticle(particles[i]);
            }
            animationId = requestAnimationFrame(loop);
        };

        let animationId = requestAnimationFrame(loop);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <canvas
            className={cn(
                'absolute inset-0 min-w-screen min-h-screen z-10 bottom-40',
            )}
            ref={canvasRef}
        />
    );
};

export default SpaceParticles;


/*
Space particles. Created with TypeScript.

Uncomment...

    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "#fff";

...if you want to see more space in space. But remember - it's slow.
@Amay 2015


"Spaaaaaace!"
- Portal 2
*/



// var Space = (function () {
//     function Space() {
//         this.canvas = document.createElement('canvas');
//         this.ctx = this.canvas.getContext('2d');
//         this.particles = [];
//         this.ratio = window.innerHeight < 400 ? 0.6 : 1;
//         this.r = 120;
//         this.counter = 0;
//     }
//     Space.prototype.init = function () {
//         this.createElement();
//         this.loop();
//     };
//     Space.prototype.createElement = function () {
//         var scale = this.ratio;
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//         this.canvas.style.width = '100%';
//         this.canvas.style.background = 'rgb(0, 0, 0)';
//         this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
//         document.body.appendChild(this.canvas);
//         for (var i = 0; i < 450; i++) {
//             this.createParticle();
//         }
//     };
//     Space.prototype.createParticle = function () {
//         this.particles.push({
//             color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
//             radius: Math.random() * 5,
//             x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
//             y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
//             ring: Math.random() * this.r * 3,
//             move: ((Math.random() * 4) + 1) / 500,
//             random: Math.random() * 7
//         });
//     };
//     Space.prototype.moveParticle = function (p) {
//         p.ring = Math.max(p.ring - 1, this.r);
//         p.random += p.move;
//         p.x = Math.cos(p.random + Math.PI) * p.ring;
//         p.y = Math.sin(p.random + Math.PI) * p.ring;
//     };
//     Space.prototype.resetParticle = function (p) {
//         p.ring = Math.random() * this.r * 3;
//         p.radius = Math.random() * 5;
//     };
//     Space.prototype.disappear = function (p) {
//         if (p.radius < 0.8) {
//             this.resetParticle(p);
//         }
//         p.radius *= 0.994;
//     };
//     Space.prototype.draw = function (p) {
//         this.ctx.beginPath();
//         this.ctx.fillStyle = p.color;
//         this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         this.ctx.fill();
//     };
//     Space.prototype.loop = function () {
//         this.ctx.clearRect(-this.canvas.width , -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2);
//         if (this.counter < this.particles.length) {
//             this.counter++;
//         }
//         //this.ctx.shadowBlur = 20;
//         //this.ctx.shadowColor = "#fff";
//         for (var i = 0; i < this.counter; i++) {
//             this.disappear(this.particles[i]);
//             this.moveParticle(this.particles[i]);
//             this.draw(this.particles[i]);
//         }
//         requestAnimationFrame(this.loop.bind(this));
//     };
//     return Space;
// })();
// window.onload = function () {
//     var space = new Space();
//     space.init();
// };
