import { Bar, Triangle } from '@/components'
import { positionClasses, TBaseProps } from '@/lib/types';
import { cn } from '@/utils'
import React from 'react'
import Wave from 'react-wavify';

const PinkBackground = ({
    style = {},
}: Readonly<TBaseProps>) => {
    const shapeClasses = "pointer-events-none absolute inset-0 overflow-hidden -z-10 ";
    return (
        <div
            className={cn(
                "bg-pale-purple1 pointer-events-none absolute inset-0 overflow-hidden -z-50 ",
            )}
            style={style}
        >
            {/* Bar */}
            <div className={cn(`${shapeClasses}`)}>
            </div>
            {/* X */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="absolute top-40 left-1">
                    <Bar width="50px" length="10px" rotate="25deg" color="var(--color-pink3)" endColor="var(--color-pale-purple1)" />
                    <Bar width="50px" length="10px" rotate="115deg" color="var(--color-pink0)" endColor="var(--color-pink3)" />
                </div>
                <div className="absolute bottom-1/5 left-4/12">
                    <Bar width="20px" length="3px" rotate="25deg" color="var(--color-pink3)" endColor="var(--color-pale-purple1)" />
                    <Bar width="20px" length="3px" rotate="115deg" color="var(--color-pink0)" endColor="var(--color-pink3)" />
                </div>
                <div className="absolute top-4/5 right-2/12">
                    <Bar width="30px" length="10px" rotate="50deg" color="var(--color-blue2)" endColor="var(--color-pale-purple1)" />
                    <Bar width="30px" length="10px" rotate="140deg" color="var(--color-pale-purple1)" endColor="var(--color-blue2)" />
                </div>
            </div>
            {/* SVG */}
            <div className={`${shapeClasses}`}>
                <div className="absolute left-0 bottom-6/12">
                    <Triangle size="100px" image="big" rotate="330deg" />
                </div>
                <div className="absolute left-3/5 top-auto">
                    <Triangle size="150px" image="mid" />
                </div>
                <div className="absolute right-1/12 bottom-4/12">
                    <Triangle size="80px" image="big" rotate="120deg" className="mask-luminance mask-r-from-white mask-r-from-70% mask-r-to-black" />
                </div>

            </div>
            <div className={cn()} id='PinkWave'>
                <Wave
                    fill="url(#gradient)"
                    className={cn(positionClasses.bottom, "min-w-svw z-0")}
                    paused={true}
                    options={{
                        height: 10,
                        amplitude: 200,
                        speed: 0.1,
                        points: 3
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="10%" stopColor="var(--color-pinkWave1)" />
                            <stop offset="90%" stopColor="var(--color-pinkWave2)" />
                        </linearGradient>
                    </defs>
                </Wave>
            </div>
        </div>
    )
}

export default PinkBackground