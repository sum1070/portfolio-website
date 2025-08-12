"use client";
import { Card } from '@/components'
import React from 'react'
import NavButton from '@/components/navButton/NavButton';
import { pageIDs } from '@/utils';

const AboutCards = () => {
    return (
        <div className='flex flex-col gap-4 px-2 sm:px-8 md:px-24 lg:px-12 lg:flex-row justify-center lg:gap-16 items-center'>
            <Card
                cardContainerCN="w-64 h-30 "
                variant='compact'
                title="Who am I?"
                description={
                    <p>
                        Guess.
                    </p>
                }
            />
            <NavButton href={pageIDs.contact} button='contact' title='Find Me!' />

        </div>
    )
}

export default AboutCards;