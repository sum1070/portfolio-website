import { BlueBackground, Navbar, Watching } from '@/components'
import React from 'react'
import ContactCard from './ContactCard';
import { cn, pageIDs } from '@/utils';

const Contact = () => {
  const pageID = pageIDs.contact;
  const Text = {
    h1: "text-3xl sm:text-4xl md:text-5xl xl:text-7xl ",
    h2: "text-xl sm:text-2xl md:text-3xl xl:text-4xl ",
  };
  return (
    <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative text-sky-900")} id={pageID}>
      <Navbar currentPage={pageID} />
      <BlueBackground
        wavePaused={true}
      />
      <div className="w-full pt-16 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
        <div id='contact-text' className="md:mb-12 sm:mb-8 mb-4">
          <h1 className={cn(
            Text.h1,
            "font-black text-center",
          )}>
            <Watching className=" w-[16svw] md:w-[10svw] inline-block ml-2 object-contain " />
          </h1>
          <h2 className={cn(
            Text.h2,
            "font-semibold mb-1 text-center",
          )}>
            You wanna find me, huh?
          </h2>
          <p className="mb-2 text-center">
            I think putting something here would look nice, but idk what to write.
          </p>
        </div>
        <ContactCard />
      </div>
    </div>
  )
}

export default Contact