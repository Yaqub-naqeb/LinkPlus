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

     <div className='  h-[100vh]  flex items-start justify-center align-top gap-[10rem] '>
   <ProfileCard/>

   {/* skill && basic info using grid */}
 <div className='grid grid-cols-2 gap-y-5 gap-x-5 place-items-center '>
 <BasicInfo/>
   <Skills/>
   

 {/* <Projects /> */}
 {/* <Crousel/> */}
 <SecondCrousel/>
 </div>
    </div>
   </div>
  )
}

export default index
