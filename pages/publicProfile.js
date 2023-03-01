import { db } from '@/firebase/FirebaseApp';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';

const publicProfile = () => {
  const [dt,setDt]=useState([]);
  const auth=getAuth();
  const [user]=useAuthState(auth)
  const prof = useSelector((state) => state.profile);
  useEffect(()=>{
    const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", prof.user_uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDt(doc.data());
    });}
  
    rendering();
  },[])
  console.log(dt);
  return (
    <div className='min-h-screen -z-50'>
      {/* bg photo */}
      <div className=''> <Image className='w-full   h-1/3 object-cover absolute top-[6rem] right-0' src={dt&&dt.backgroundPhoto&&dt.backgroundPhoto} width={900} height={900}/></div>

{/* the photo */}
<div className=' flex items-center   gap-8 mt-[5rem]  z-50'>
        <Image className='w-[18rem] z-50 h-[18rem] bg-[#ffff] shadow-lg p-2 object-cover  rounded-full' src={dt&&dt.profilePhoto} width={900} height={900} />
      <div>
      <p className='text-black translate-y-16 font-semibold text-2xl z-50'>{dt&&dt.name}</p>
        <p className='text-black translate-y-16 font-medium text-lg z-50'>{dt&&dt.experience?dt.experience:'experience'}</p>
      </div>

      </div>



    </div>
  )
}

export default publicProfile
