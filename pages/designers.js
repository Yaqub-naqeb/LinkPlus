import DesignerCard from '@/components/designers/DesignerCard'
import General from '@/components/main/General'
import { useFetch } from '@/components/useHooks/useFetch'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const designers = () => {

  const auth=getAuth()
  const [user]=useAuthState(auth);
  const {data}=useFetch('Users');
  return (
  <div className='flex flex-col items-center justify-start min-h-screen '>
      <div className='grid grid-cols-3 gap-8 place-items-center '>
        <General/>
      {
        data&&data.map((dt,index)=><DesignerCard key={index} user={dt}/>)
      }
    </div>
  </div>
  )
}

export default designers
