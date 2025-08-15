import { CenterContainer, Navbar, PinkBackground, Watching } from '@/components'
import { cn, iconImages, pageIDs } from '@/utils'
import React from 'react'

const Project = () => {
  const pageID = pageIDs.projects

  return (
    <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative ")} id={pageID}>
      <Navbar currentPage={pageID} />
      <PinkBackground />
      <div className="w-full pt-16 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
        <div id='contact-text' className="gap-4 flex-col flex justify-center items-center md:mb-12 sm:mb-8 mb-4">
          <h1 className="font-black mb-4 text-center">
            Projects
          </h1>
          <div className='pt-32 gap-9 flex flex-col items-center justify-center text-center'>
            <span className='stairs' />
            <h2>In construction...</h2>
            <h3 className=''>
              <span className="inline-flex items-center gap-x-2">trust me i will make sth this summer <img src={iconImages.sleepZZZ} alt="sleepZZZ" /> </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project