import General from '@/components/main/General'
import ProjectCard from '@/components/project/ProjectCard'
import React from 'react'

const projects = () => {

  return (
    <div className='min-h-screen flex items-center flex-col'>
        <General/>
      <div className='flex items-center align-middle justify-center lg:w-[1024px] w-[97vw]  '>
      <ProjectCard/>
      </div>
    </div>
  )
}

export default projects
