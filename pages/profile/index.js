import BasicInfo from '@/components/profile/BasicInfo'
import ProfileCard from '@/components/profile/ProfileCard'
import Projects from '@/components/profile/Projects'
import Skills from '@/components/profile/Skills'
import React from 'react'

const index = () => {
  return (
   <div className=''>


     <div className='  h-[100vh]  flex items-start justify-center align-top gap-[10rem] '>
   <ProfileCard/>

   {/* skill && basic info using grid */}
 <div className='grid grid-cols-2 gap-y-5 gap-x-5 place-items-center '>
 <BasicInfo/>
   <Skills/>
   

 <Projects />
 </div>


    </div>
   </div>
  )
}

export default index
