"use client";

import React, { useEffect, useRef } from "react";

const Stars = ({ zIndex = -3 }: { zIndex?: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: any[] = [];
        let count = 0;
        const maxStars = 1000;
        let animationId: number;

        // Create the star particle image once
        const createStarImage = () => {
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            if (!ctx2) return null;
            
            canvas2.width = 100;
            canvas2.height = 100;
            const half = canvas2.width / 2;

            const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
            gradient2.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient2.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
            gradient2.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
            gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();

            return canvas2;
        };

        const starImage = createStarImage();
        if (!starImage) return;

        function random(min: number, max?: number) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            if (min > max) {
                const hold = max;
                max = min;
                min = hold;
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x: number, y: number) {
            const max = Math.max(x, y);
            const diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
        }

        function createStar() {
            const star = {
                orbitRadius: random(maxOrbit(canvas.width, canvas.height)),
                radius: 0,
                orbitX: canvas.width / 2,
                orbitY: canvas.height / 2,
                timePassed: random(0, maxStars),
                speed: 0,
                alpha: 0,

                draw() {
                    const x = Math.sin(star.timePassed) * star.orbitRadius + star.orbitX;
                    const y = Math.cos(star.timePassed) * star.orbitRadius + star.orbitY;
                    const twinkle = random(10);

                    if (twinkle === 1 && star.alpha > 0.5) {
                        star.alpha -= 0.05;
                    } else if (twinkle === 2 && star.alpha < 1) {
                        star.alpha += 0.05;
                    }
                    if (!ctx) return;
                    ctx.globalAlpha = star.alpha;
                    ctx.drawImage(starImage, x - star.radius / 2, y - star.radius / 2, star.radius, star.radius);
                    star.timePassed += star.speed;
                }
            };

            // Make stars slightly smaller for a more delicate effect
            star.radius = random(40, star.orbitRadius) / 15;
            star.speed = random(star.orbitRadius) / 75000; // Slightly faster for better effect
            // higher alpha -> brighter
            star.alpha = random(5, 10) / 10;

            count++;
            stars[count] = star;

            return star;
        }

        // Initialize stars based on current window size
        const initStars = () => {
            // Reset
            stars = [];
            count = 0;
            
            // Create stars - reduce the number for a more subtle effect
            for (let i = 0; i < 600; i++) {
                createStar();
            }
        };

        // Set canvas size and initialize stars
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Cancel existing animation
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            // Reinitialize stars for new window dimensions
            initStars();
            
            // Restart animation
            animate();
        };

        // Animation loop
        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'screen';
            for (let i = 1, l = stars.length; i < l; i++) {
                if (stars[i]) stars[i].draw();
            }
            animationId = requestAnimationFrame(animate);
        }

        // Initial setup
        setCanvasSize();
        
        // Add resize listener
        window.addEventListener('resize', setCanvasSize);

        // Cleanup on unmount
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 min-w-screen min-h-screen pointer-events-none"
            style={{ zIndex }}
        />
    );
};

export default Stars;