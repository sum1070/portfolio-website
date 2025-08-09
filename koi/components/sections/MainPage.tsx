import React from 'react'
import { Button, CenterContainer, TriangleArrowUp } from '@/components'
import Wave from 'react-wavify'
import BackgroundMain from './MainPage/BackgroundMain'
import { cn } from '@/lib/utils'

const MainPage = () => {
    const buttonClasses = 'max-w-60 md:max-w-none';
    const colGap = 'gap-2 xs:gap-4 md:gap-12 lg:gap-20';
    const buttonContainerClasses = "md:p-8 lg:p-16 flex flex-col justify-center items-center w-full";

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

            <CenterContainer className="min-h-dvh relative flex-col">
                <div
                    id='main-pic-btns-grid'
                    className={cn(
                        "-mt-8",
                        "flex flex-col md:grid md:grid-cols-3 items-center",
                        "pt-20",
                        colGap,
                    )}>
                    <div
                        id='main-pic-container'
                        className={cn(
                            "flex flex-col justify-center items-center order-first",
                            "w-1/2 mb-8",
                            "md:order-2 md:w-full "
                        )}>
                        <div className={cn("w-full flex items-center justify-center")}>
                            <img className={cn("object-scale-down, w-auto h-auto")} src="/images/dog.png" alt='pic' decoding="async" fetchPriority="low" loading="lazy" />
                        </div>
                    </div>
                    <div
                        id='main-btns-tl'
                        className={cn(
                            buttonContainerClasses,
                            colGap,
                            "order-2",
                            "md:items-end md:order-1",
                        )}>
                        <Button type="contact" href="/wip" className={cn(buttonClasses, "hover:-rotate-3  ")} />
                        <Button type="projects" href="/wip" className={cn(buttonClasses, "hover:rotate-3")} />
                    </div>
                    <div
                        id='main-btns-br'
                        className={cn(
                            buttonContainerClasses,
                            colGap,
                            "order-3 ",
                            "md:items-start md:order-3 md:mt-4",
                        )}>
                        <Button type="licences" href="/licences" className={cn(buttonClasses, "hover:rotate-3")} />
                        <Button type="wip" href="/wip" className={cn(buttonClasses, "hover:-rotate-3")} />
                    </div>
                </div>
                <div id='main-arrow-outer-container' className='p-4'>
                    <div id='main-arrow-container' className="absolute  justify-center pt-4">
                        <TriangleArrowUp onClick={scrollToTop} />
                    </div>
                </div>
            </CenterContainer>
        </section>
    )
}

export default MainPage