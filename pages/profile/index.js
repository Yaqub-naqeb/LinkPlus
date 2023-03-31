import SignUp from '@/components/form/SignUp'
import BasicInfo from '@/components/profile/BasicInfo'
import Crousel from '@/components/profile/Crousel'
import ProfileCard from '@/components/profile/ProfileCard'
import Projects from '@/components/profile/Projects'
import SecondCrousel from '@/components/profile/SecondCrousel'
import Skills from '@/components/profile/Skills'
import { getAuth } from 'firebase/auth'
import React from 'react'

const index = () => {
  return (
   <div className=''>

     <div className='  lg:h-[100vh]  md:h-[100vh] min-h-full flex items-start justify-center align-top gap-[10rem] '>
   <div className=''>
   <ProfileCard/>
   </div>

   {/* skill && basic info using grid */}
 <div className='grid grid-cols-2 gap-y-5 gap-x-5 lg:place-items-start md:place-items-start place-items-center '>
 <BasicInfo/>
 <div className='lg:block md:block hidden'>
 <Skills/>
 </div>
 <div className='lg:block md:block hidden lg:translate-x-[4rem] md:translate-x-[4rem] translate-x-[10rem]'>
 <SecondCrousel/>
 </div>
 </div>
    </div>
   </div>
  )
}

export default index
