import React from 'react'
import { CenterContainer, TriangleArrowUp } from '@/components'
import Wave from 'react-wavify'
import BackgroundMain from './MainPage/BackgroundMain'
import Button from '../Button'

const MainPage = () => {
    const scrollToTop = () => {
        document.getElementById('hero')?.scrollIntoView({
            behavior: 'smooth'
        });
    };


    return (
        <section className="flex overflow-hidden min-w-dvw min-h-dvh relative" id='MainPage'>
            <BackgroundMain />
            {/* Set wave to bottom, then invert the container*/}
            <div className='scale-y-[-1]' id='MainPageWaveDiv'>
                {/* wave must be absolute */}
                <Wave
                    className="min-w-svw z-0 absolute inset-x-0 bottom-0"
                    fill="var(--color-milky-white)"
                    paused={false}
                    options={{
                        height: 50,
                        amplitude: 20,
                        speed: 0.3,
                        points: 4
                    }}
                />
            </div>

            {/* Side navigation - fixed to left side */}

            <CenterContainer className="min-h-dvh relative z-20">
                <p>
                    this is main
                </p>
                <TriangleArrowUp onClick={scrollToTop} bounce={false} />
            </CenterContainer>
        </section>

    )
}

export default MainPage