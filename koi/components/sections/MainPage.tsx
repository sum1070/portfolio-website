import React from 'react'
import { Button, CenterContainer, TriangleArrowUp } from '@/components'
import Wave from 'react-wavify'
import BackgroundMain from './MainPage/BackgroundMain'
import { cn } from '@/lib/utils'

const MainPage = () => {
    const colGap = 'gap-2 xs:gap-8 md:gap-12 lg:gap-16';
    const buttonClasses = 'max-w-60 md:max-w-none';

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

            <CenterContainer className="min-h-dvh relative flex flex-col justify-center">
                {/* pic, btns grid */}
                <div className={cn(
                    "flex flex-col md:grid md:grid-cols-3 items-center",
                    "pt-20",
                    colGap,
                )}>
                    {/* pic */}
                    <div className={cn(
                        "flex flex-col justify-center items-center order-first",
                        "w-3/4 mb-8",
                        "md:order-2 md:w-full md:mb-0"
                    )}>
                        <div className={cn("w-full flex items-center justify-center")}>
                            <img className={cn("object-scale-down, w-auto h-auto")} src="/images/dog.png" alt='pic' decoding="async" fetchPriority="low" loading="lazy" />
                        </div>


                    </div>

                    {/* left (top) */}
                    <div className={cn(
                        "flex flex-col justify-center items-center w-full",
                        "order-2",
                        "md:items-end md:order-1",
                        colGap,
                    )}>
                        <Button type="contact" href="/contact" className={cn(buttonClasses,)} />
                        <Button type="projects" href="/projects" className={cn(buttonClasses,)} />
                    </div>

                    {/* right (bottom) */}
                    <div className={cn(
                        "flex flex-col justify-center items-center md:items-start w-full",
                        "order-3 md:order-3",
                        colGap,
                    )}>
                        <Button type="wip" href="/wip" className={cn(buttonClasses,)} />
                        <Button type="wip" href="/wip" className={cn(buttonClasses,)} />
                    </div>
                </div>
                {/* arrow (big screen) */}
                <div className={cn(
                    "relative",
                    "pt-2"
                )}>
                    <div className="absolute hidden md:block pt-20">
                        <TriangleArrowUp onClick={scrollToTop} />
                    </div>
                </div>
                {/* arrow (small screen) */}
                <div className="md:hidden mt-12 flex justify-center">
                    <TriangleArrowUp onClick={scrollToTop} />
                </div>
            </CenterContainer>
        </section>
    )
}

export default MainPage