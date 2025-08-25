"use client";
import { Card } from '@/components'
import React from 'react'
import contactData from './contact-data';

const ContactCard = () => {
    const darkModeCard = "dark:bg-[#002136] dark:from-transparent dark:to-transparent ";
    const lightModeCard = "bg-gradient-to-br from-MauveContact from-30% to-95% to-sky-300  ";
    const styles = {
        card: `${lightModeCard} ${darkModeCard}`
    }
    return (
        <div className='flex  flex-col gap-4 px-2 sm:px-8 md:px-24 lg:px-12 lg:flex-row justify-center lg:gap-8'>
            <Card
                cardContainerCN="lg:grow-4"
                backgroundColor={styles.card}
                variant='compact'
                title="Who am I?"
                description={
                    <p>Guess.</p>
                }
            />
            <Card
                cardContainerCN="lg:grow-8"
                variant='feature'
                backgroundColor={styles.card}
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