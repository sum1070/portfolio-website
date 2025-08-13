"use client";
import { Card } from '@/components'
import React from 'react'
import contactData from './contactData';

const ContactCard = () => {
    return (
        <div className='flex flex-col gap-4 px-2 sm:px-8 md:px-24 lg:px-12 lg:flex-row justify-center lg:gap-8'>
            <Card
                cardContainerCN="lg:grow-4"
                variant='compact'
                title="Who am I?"
                description={
                    <p>Guess.</p>
                }
            />
            <Card
                cardContainerCN="lg:grow-8"
                variant='feature'
                title="Find Me!"
                description={
                    <p className='mt-1 '>
                        Still thinking if I should leak my data or not ...
                    </p>
                }
                links={contactData}
            />
        </div>
    )
}

export default ContactCard;