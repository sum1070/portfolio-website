import { CenterContainer } from '@/components'
import Wave from 'react-wavify'
import React from 'react'
import { cn } from '@/lib/utils'
import { positionClasses } from '@/lib/types'
import Background from './background'
import Navbar from '@/components/Navbar/Navbar';

const licences = () => {
    return (
        <div className={cn("flex overflow-hidden min-w-svw min-h-svh relative")} id="licencesPage">
            <Navbar/>
            <Background />
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
                            <stop offset="10%" stopColor="#F18EC9" />
                            <stop offset="90%" stopColor="#97025B" />
                        </linearGradient>
                    </defs>
                </Wave>
            </div>
            <CenterContainer className="min-h-dvh">
                <div>hello</div>

            </CenterContainer>
        </div>
    )
}

export default licences