import { CenterContainer } from '@/components'
import DevNavButton from '@/components/navButton/DevNavButton'
import NavButton from '@/components/navButton/NavButton'
import BackgroundAbout from '@/components/sections/about/BackgroundAbout'
import { cn, pageIDs } from '@/utils'
import React from 'react'

const page = () => {
    return (
        <>
            <BackgroundAbout />
            <CenterContainer className='flex-wrap gap-12'>
                <NavButton className={cn("")} href={pageIDs.contact} 
                background='pillsBG'
                button='contact' title='Dev' titleCN='' />
                <NavButton className={cn(
                    "text-white"
                )} href={pageIDs.contact} 
                background='pillsBGInsta'
                button='contact' title='Instagram' titleCN='' />
                <DevNavButton className={cn()} href={pageIDs.contact} button='contact' title='Original' />
            </CenterContainer>
        </>
    )
}

export default page