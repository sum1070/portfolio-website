import { Bar, Dot, CodeTextSVG2, LineCircle, Triangle } from '@/components'
import { cn } from '@/lib/utils'
import React from 'react'

const background = () => {
    const shapeClasses = "pointer-events-none absolute inset-0 overflow-hidden -z-10 ";
    return (
        <div
            className={cn(
                "bg-pale-purple1 pointer-events-none absolute inset-0 overflow-hidden -z-10 ",
            )}
        >
            {/* Bar */}
            <div className={cn(`${shapeClasses}`)}>
                {/* <Bar width="200px" type="hollow" borderWidth="3px" length="40px" rotate="135deg" />
                <Bar width="60dvw" type="hollow" borderWidth="1dvw" length="10dvh" rotate="135deg" />
                <Bar width="500px" length="80px" rotate="135deg" />
                <Bar width="400px" length="15px" color="var(--color-sky-blue)" endColor="var(--color-pale-purple0)" rotate="315deg" className="mask-luminance mask-r-from-black mask-r-from-5% mask-r-to-white" />
                <Bar width="300px" length="10px" color="var(--color-Mauve)" endColor="var(--color-sky-blue)" rotate="135deg" /> */}
            </div>
            {/* X */}
            <div className={cn(`${shapeClasses}`)}>
                <div className="absolute top-1/12 left-1/12">
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
        </div>
    )
}

export default background