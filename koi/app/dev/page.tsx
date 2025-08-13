import { CenterContainer } from '@/components'
import DevNavButton from '@/components/navButton/DevNavButton'
import NavButton from '@/components/navButton/NavButton'
import BackgroundAbout from '@/components/sections/about/BackgroundAbout'
import { cn, pageIDs } from '@/utils'
import React from 'react'
import DevCool from '@/components/dev/DevCool';
import DevCyberCard from '@/components/dev/DevCyberCard';
import CyberCard from '@/components/dev/CyberCard'
import DevCard from '@/components/dev/DevCard'
const page = () => {
    return (
        <>
            <BackgroundAbout />
            <CenterContainer className='flex-col gap-4'>
                <div className='flex flex-row justify-center items-center w-full gap-4'>
                    <DevCyberCard />
                    <DevCool />
                </div>
                <div className='flex flex-row justify-center items-center w-full gap-4'>
                    <CyberCard />
                    <DevCard />
                </div>
            </CenterContainer>
        </>
    )
}

export default page