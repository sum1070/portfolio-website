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
        <div className="flex overflow-hidden min-w-dvw min-h-dvh relative" id='MainPage'>
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
            {/* must hv both flex and flex col */}
            <div id="mySidenav" className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                <Button variant="green" className="w-[100px] p-0 text-[20px] rounded-r-lg hover:-translate-x-1 hover:scale-110">About</Button>
                <Button variant="blue" className="w-[100px] p-0 text-[20px] rounded-r-lg hover:-translate-x-1 hover:scale-110">Blog</Button>
                <Button variant="red" className="w-[100px] p-0 text-[20px] rounded-r-lg hover:-translate-x-1 hover:scale-110">Projects</Button>
                <Button variant="gray" className="w-[100px] p-0 text-[20px] rounded-r-lg hover:-translate-x-1 hover:scale-110">Contact</Button>
            </div>
            {/* <div id="mySidenav" className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                <button id="about" className='p-[15px] w-[100px] text-[20px] rounded-r-lg bg-green-500 transition delay-150 duration-300 ease-in-out hover:-translate-x-1 hover:scale-110 hover:bg-green-600'>About</button>
                <button id="blog" className='p-[15px] w-[100px] text-[20px] rounded-r-lg bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-x-1 hover:scale-110 hover:bg-blue-600'>Blog</button>
                <button id="projects" className='p-[15px] w-[100px] text-[20px] rounded-r-lg bg-red-500 transition delay-150 duration-300 ease-in-out hover:-translate-x-1 hover:scale-110 hover:bg-red-600'>Projects</button>
                <button id="contact" className='p-[15px] w-[100px] text-[20px] rounded-r-lg bg-gray-500 transition delay-150 duration-300 ease-in-out hover:-translate-x-1 hover:scale-110 hover:bg-gray-600'>Contact</button>
            </div> */}

            <CenterContainer className="min-h-dvh relative z-20">
                <p>
                    this is main
                </p>
                <TriangleArrowUp onClick={scrollToTop} bounce={false} />
            </CenterContainer>
        </div>

    )
}

export default MainPage