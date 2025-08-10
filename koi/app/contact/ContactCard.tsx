"use client";
import { Card, KoiUrl, TriangleArrowDown } from '@/components'
import React, { useState } from 'react'
import contactData from './contactData';
import ArrowDown from '@/components/svg/ArrowDown';

const ContactCard = () => {
    const [showContacts, setShowContacts] = useState(false);

    return (
        <div className='flex flex-col gap-4 px-2 sm:px-8 md:px-24 lg:px-12 lg:flex-row justify-center lg:gap-8'>
            <Card
                cardContainerCN="lg:grow-4"
                variant='compact'
                title="Who am I?"
                description={
                    <p>
                        Guess.
                    </p>
                }
            />
            <Card
                cardContainerCN="lg:grow-8"
                variant='feature'
                title="Find Me!"
                description={
                    <>
                        <p className='mt-1 text-base'>
                            Still thinking if I should leak my data or not ...
                        </p>
                        <button
                            onClick={() => setShowContacts(!showContacts)}
                            className="mt-3 px-4 py-2 bg-nice-purple1/30 hover:bg-nice-purple1/50 transition-all duration-200 rounded-md flex items-center justify-center gap-2"
                        >
                            <span>{showContacts ? 'Hide Contacts' : 'Show Contacts'}</span>
                            <ArrowDown
                                className={`w-[1.5rem] inline-block transition-transform duration-300 ease-in-out ${showContacts ? 'rotate-180' : 'rotate-0'
                                    }`}
                            />
                        </button>
                    </>
                }
                links={showContacts ? contactData : []}
            />
        </div>
    )
}

export default ContactCard;