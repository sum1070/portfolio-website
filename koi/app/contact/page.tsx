import { BlueBackground, LineCircle, Navbar } from '@/components'
import React from 'react'
import ContactCard from './contact-card';
import { cn, pageIDs } from '@/utils';

const Contact = () => {
  const pageID = pageIDs.contact;

  return (
    <div className={cn(
      "flex overflow-hidden min-w-dvw min-h-dvh relative text-sky-900",
      "dark:text-dark-text",
    )} id={pageID}>
      <Navbar currentPage={pageID} />
      <BlueBackground
        wavePaused={true}
      />
      <div id='contact-deco' className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <LineCircle size="32rem" x="-16rem" y="30%" className="opacity-70" />
        <LineCircle size="18rem" x="calc(100% - 9rem)" y="-7rem" className="opacity-70 hidden sm:block" />
      </div>
      <div id='contact-content' className="w-full pt-28 md:pt-36 pb-48 px-8 sm:px-12 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <div id='contact-text' className="text-center mb-10 md:mb-16">
          <h1 className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 md:mb-5",
            "dark:text-[#7dd3fc]",
          )}>
            Wanna have a chat?
          </h1>
          <p className="text-lg md:text-xl">
            Feel free to contact me through:
          </p>
        </div>
        <ContactCard />
      </div>
    </div>
  )
}

export default Contact
