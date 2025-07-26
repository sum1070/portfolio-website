import React from 'react'
import { CenterContainer, Pattern } from '@/components'
import Wave from 'react-wavify'

const MainPage = () => {
    return (
        <section className="relative min-h-screen bg-Mauve">
            <div className=" -top-2 left-0 right-0 scale-y-[-1] z-0 relative">
                <Wave
                    fill="var(--color-milky-white)"
                    paused={false}
                    options={{
                        height: 40,
                        amplitude: 20,
                        speed: 0.3,
                        points: 4
                    }}
                />
            </div>
        </section>
    )
}

export default MainPage