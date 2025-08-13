import { CenterContainer } from '@/components'
import BackgroundAbout from '@/components/sections/about/BackgroundAbout'
import { cn, pageIDs } from '@/utils'
import React from 'react'
import DevCyberCard from '@/components/dev/DevCyberCard';
import CyberCard from '@/components/CyberCard'
const page = () => {
    return (
        <>
            <BackgroundAbout />
            <CenterContainer className='flex-col gap-4'>
                <div className='flex flex-row justify-center items-center w-full gap-4'>
                    <DevCyberCard />
                </div>
                <div className='flex flex-row justify-center items-center w-full gap-4'>
                    <CyberCard />
                </div>
            </CenterContainer>
        </>
    )
}

export default page