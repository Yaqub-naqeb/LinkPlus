import BasicInfo from '@/components/profile/BasicInfo'
import ProfileCard from '@/components/profile/ProfileCard'
import Projects from '@/components/profile/Projects'
import Skills from '@/components/profile/Skills'
import React from 'react'

const index = () => {
  return (
   <div className='flex items-center
   justify-center align-middle'>


     <div className='w-[1324px]  h-[100vh] gap-y-[-5rem] grid grid-cols-3 place-items-start '>
   <ProfileCard/>

   {/* skill && basic info */}
 <div className='flex items-center gap-5'>
 <BasicInfo/>
   <Skills/>
   

 </div>
 <Projects />


    </div>
   </div>
  )
}

export default index
