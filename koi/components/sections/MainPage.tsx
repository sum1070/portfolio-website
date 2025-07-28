import React from 'react'
import { CenterContainer, TriangleArrowUp } from '@/components'
import Wave from 'react-wavify'
import BackgroundMain from './MainPage/BackgroundMain'

const MainPage = () => {
    const scrollToTop = () => {
        document.getElementById('hero')?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex overflow-hidden min-w-dvw" id='MainPage'>
            <BackgroundMain />
            {/* Set wave to bottom, then invert the container */}
            <div className='scale-y-[-1] min-h-dvh ' id='MainPageWaveDiv'>
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

            <CenterContainer>
                <p>
                    this is main
                </p>
                <TriangleArrowUp onClick={scrollToTop} bounce={false} />

            </CenterContainer>
        </div>
    )
}

export default MainPage