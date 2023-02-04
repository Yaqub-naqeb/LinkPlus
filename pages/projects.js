import General from '@/components/main/General'
import ProjectCard from '@/components/project/ProjectCard'
import React from 'react'

const projects = () => {
  return (
    <div className='h-[100vh]   flex items-center flex-col'>
        <General/>
      <div className='flex items-center align-middle justify-center w-[1220px] '>
      <ProjectCard/>
      </div>
    </div>
  )
}

export default projects
