import { Bar, Dot } from '@/components'
import { positionClasses, TBaseProps } from '@/lib/types';
import { cn } from '@/utils'
import React from 'react'
import Wave from 'react-wavify';

type TWaveOptions = {
    height?: number;
    amplitude?: number;
    speed?: number;
    points?: number;
};

interface TColoredBackground extends TBaseProps {
    bgContainerCN?: string;
    wavePaused?: boolean;
    wave?: TWaveOptions;
}

const BlueBackground = ({
    bgContainerCN = "",
    wavePaused = false,
    style = {},
}: Readonly<TColoredBackground>) => {
    return (
        <div
            className={cn(
                "bg-blue-50 pointer-events-none absolute inset-0 overflow-hidden -z-10 ",
                bgContainerCN,
            )}
            style={style}
        >
            <BDeco />
            <div className={cn()} id='LicencesWave'>
                <Wave
                    fill="url(#gradient)"
                    className={cn(positionClasses.bottom, "min-w-svw z-0")}
                    paused={wavePaused}
                    options={{
                        height: 10,
                        amplitude: 200,
                        speed: 0.1,
                        points: 3
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="10%" stopColor="#8FDBF2" />
                            <stop offset="90%" stopColor="#025696" />
                        </linearGradient>
                    </defs>
                </Wave>
            </div>
        </div>
    )
}

export default BlueBackground

const BDeco = () => {
    const shapeClasses = "pointer-events-none absolute inset-0 overflow-hidden -z-10 ";
    return (
        <>
            {/* Dots */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="opacity-70 sm:opacity-100">
                    {/* Hollow dot small r */}
                    <div style={{ position: "absolute", right: "25%", top: "47%" }}>
                        <Dot size="16px" type="hollow" border={2} color="var(--color-sky-blue)" />
                    </div>
                    {/* Glowing pink dot bl */}
                    <div style={{ position: "absolute", left: "15%", bottom: "27%" }}>
                        <Dot size="10px" border={2} color="var(--color-sky-blue)" blur={true} />
                    </div>
                </div>
            </div>
            {/* X */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="absolute top-1/12 left-1/12">
                    <Bar width="50px" length="10px" rotate="25deg" color="var(--color-sky-blue)" endColor="var(--color-blue2)" />
                    <Bar width="50px" length="10px" rotate="115deg" color="var(--color-blue2)" endColor="var(--color-sky-blue)" />
                </div>
                <div className="absolute bottom-1/5 left-4/12">
                    <Bar width="20px" length="3px" rotate="25deg" color="var(--color-purblue)" endColor="var(--color-sky-blue)" />
                    <Bar width="20px" length="3px" rotate="115deg" color="var(--color-sky-blue)" endColor="var(--color-purblue)" />
                </div>
                <div className="absolute top-4/5 right-2/12">
                    <Bar width="30px" length="10px" rotate="50deg" color="var(--color-pale-purple2)" endColor="var(--color-purple1)" />
                    <Bar width="30px" length="10px" rotate="140deg" color="var(--color-pale-purple1)" endColor="var(--color-pale-purple2)" />
                </div>
                
            </div>
        </>
    );
};
