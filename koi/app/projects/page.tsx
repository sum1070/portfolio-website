import { Navbar } from '@/components'
import { pageIDs } from '@/utils'
import React from 'react'

const Project = () => {
  const pageID = pageIDs.projects
  return (
    <div id={pageID} >
      <Navbar currentPage={pageID} />
      meow
    </div>
  )
}

export default Project