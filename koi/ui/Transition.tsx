'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
interface WaveTransitionProps {
    className?: string;
    waveColor?: string;
    waveHeight?: number;
    waveAmplitude?: number;
    speed?: number;
    wavePoints?: number;
}

export default function WaveTransition({
    className = '',
    waveColor = 'var(--color-pale-purple0)',
    waveHeight = 400,
    waveAmplitude = 20,
    speed = 0.4,
    wavePoints = 4
}: Readonly<WaveTransitionProps>) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const wave = pathRef.current;

        if (!container || !wave) return;

        let width = container.offsetWidth;
        let height = container.offsetHeight;

        const calculateWavePoints = (factor: number) => {
            const points = [];
            const waveWidth = container.offsetWidth;

            for (let i = 0; i <= wavePoints; i++) {
                const x = (i / wavePoints) * waveWidth;
                const sinSeed = (factor + (i + i % wavePoints)) * speed * 100;
                const sinHeight = Math.sin(sinSeed / 100) * waveAmplitude;
                const yPos = Math.sin(sinSeed / 100) * sinHeight + waveHeight;
                points.push({ x, y: yPos });
            }

            return points;
        };

        const buildPath = (points: Array<{ x: number; y: number }>) => {
            let SVGString = `M ${points[0].x} ${points[0].y}`;

            const cp0 = {
                x: (points[1].x - points[0].x) / 2,
                y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
            };

            SVGString += ` C ${cp0.x} ${cp0.y} ${cp0.x} ${cp0.y} ${points[1].x} ${points[1].y}`;

            let prevCp = cp0;
            let inverted = -1;

            for (let i = 1; i < points.length - 1; i++) {
                const cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
                const cp1 = {
                    x: (points[i].x - prevCp.x) + points[i].x,
                    y: (points[i].y - prevCp.y) + points[i].y
                };

                SVGString += ` C ${cp1.x} ${cp1.y} ${cp1.x} ${cp1.y} ${points[i + 1].x} ${points[i + 1].y}`;
                prevCp = cp1;
                inverted = -inverted;
            }

            SVGString += ` L ${width} ${height}`;
            SVGString += ` L 0 ${height} Z`;
            return SVGString;
        };

        let lastUpdate: number | null = null;
        let totalTime = 0;
        let animationFrameId: number;

        const tick = () => {
            const now = Date.now();

            if (lastUpdate) {
                const elapsed = (now - lastUpdate) / 1000;
                lastUpdate = now;

                totalTime += elapsed;

                const factor = totalTime * Math.PI;
                wave.setAttribute('d', buildPath(calculateWavePoints(factor)));
            } else {
                lastUpdate = now;
            }

            animationFrameId = window.requestAnimationFrame(tick);
        };

        // Start animation
        tick();

        // Handle window resize
        const handleResize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [waveHeight, waveAmplitude, speed, wavePoints]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-screen", className)}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-full h-full"
            >
                <path ref={pathRef} id="wave" d="" fill={waveColor} />
            </svg>
        </div>
    );
}