import { Bar, Dot } from '@/components'
import { positionClasses, TBaseProps } from '@/lib/types';
import { cn } from '@/utils';
import React from 'react'
import Wave from 'react-wavify';

const GreenBackground = ({
    style = {},
}: Readonly<TBaseProps>) => {
    const shapeClasses = "pointer-events-none absolute inset-0 overflow-hidden -z-10 ";
    return (
        <div
            className={cn(
                "bg-green-50 dark:bg-dark-black pointer-events-none absolute inset-0 overflow-hidden -z-10 ",
            )}
            style={style}
        >
            {/* Dots */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="opacity-70 sm:opacity-100">
                    {/* Hollow dot small r */}
                    <div style={{ position: "absolute", right: "25%", top: "30%" }}>
                        <Dot size="16px" type="hollow" border={2} color="#8DE787" />
                    </div>
                    {/* Glowing pink dot bl */}
                    <div style={{ position: "absolute", left: "15%", bottom: "27%" }}>
                        <Dot size="10px" border={2} color="#79DB7F" blur={true} />
                    </div>
                </div>

            </div>
            {/* X */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="absolute top-1/12 left-1/12">
                    <Bar width="50px" length="10px" rotate="25deg" color="var(--color-sky-blue)" endColor="#52C46F" />
                    <Bar width="50px" length="10px" rotate="115deg" color="var(--color-sky-blue)" endColor="#2AAD5E" />
                </div>
                <div className="absolute bottom-1/5 left-4/12">
                    <Bar width="20px" length="3px" rotate="25deg" color="var(--color-purgreen)" endColor="var(--color-sky-blue)" />
                    <Bar width="20px" length="3px" rotate="115deg" color="var(--color-sky-blue)" endColor="var(--color-purgreen)" />
                </div>
                <div className="absolute top-4/5 right-2/12">
                    <Bar width="30px" length="10px" rotate="50deg" color="#8CF28E" endColor="#2AB060" />
                    <Bar width="30px" length="10px" rotate="140deg" color="#2AB060" endColor="#8CF28E" />
                </div>
            </div>
            <div className={cn()} id='LicencesWave'>
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
                            <stop offset="10%" stopColor="#A1F28F" />
                            <stop offset="90%" stopColor="#02964E" />
                        </linearGradient>
                    </defs>
                </Wave>
            </div>
        </div>
    )
}

export default GreenBackground