import { Navbar, PinkBackground } from '@/components'
import { cn, pageIDs } from '@/utils'
import React from 'react'

const Project = () => {
  const pageID = pageIDs.projects
    const Text = {
      h1: "text-3xl sm:text-4xl md:text-5xl xl:text-7xl ",
      h2: "text-xl sm:text-2xl md:text-3xl xl:text-4xl ",
    };
  return (
    <div id={pageID} >
      <Navbar currentPage={pageID} />
      <PinkBackground />
      <div className="w-full pt-20 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
                <div id='license-text' className="">
                    <h1 className={cn(
                        Text.h1,
                        "font-black mb-4 text-center",
                    )}>
                        Projects
                    </h1>
                    <div className="mb-4 text-center">
                        Hi
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Project