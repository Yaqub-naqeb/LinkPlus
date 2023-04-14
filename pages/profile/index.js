import BasicInfo from '@/components/profile/BasicInfo'
import ProfileCard from '@/components/profile/ProfileCard'
import SecondCrousel from '@/components/profile/SecondCrousel'
import Skills from '@/components/profile/Skills'
import { useMode } from '@/components/useHooks/useMode'
import { getAuth } from 'firebase/auth'
import React from 'react'

const index = () => {
  const {mode}=useMode();
  return (
   <div className={`${mode?'bg-[#1B2430]':''}`}>

     <div className='  lg:h-[90vh]  md:h-screen min-h-full flex items-start justify-center align-top gap-[10rem] '>
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
  //  h
  )
}

export default index
