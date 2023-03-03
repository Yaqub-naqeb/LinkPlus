import { useFetchProjects } from '@/components/useHooks/useFetchProjects';
import { db } from '@/firebase/FirebaseApp';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import SecondSingleCard from '../components/project/SecondSingleCard'

const publicProfile = () => {
  const {subCollectionData}=useFetchProjects('Users');
  console.log(subCollectionData);
  

  const like = useSelector((state) => state.open);
  console.log(like.dark);

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
   <div className='min-h-screen '>
     <div className={` -z-50  `}>
      {/* bg photo */}
      <div className=''> <Image className='w-full   h-1/3 object-cover absolute top-[6rem] right-0' src={dt&&dt.backgroundPhoto&&dt.backgroundPhoto} width={900} height={900}/></div>

{/* the photo */}
<div className=' flex items-center   gap-8 mt-[5rem]  '>
        <Image className='w-[18rem] z-40 h-[18rem] bg-[#ffff] shadow-lg p-2 object-cover  rounded-full' src={dt&&dt.profilePhoto} width={900} height={900} />
      <div className={``}>
      <p className={`text-black translate-y-16 font-semibold text-2xl z-50 ${like.dark?'text-white':'text-black'}`}>{dt&&dt.name}</p>
        <p className={`text-black translate-y-16 font-medium text-lg z-50 ${like.dark?'text-white':'text-black'}`}>{dt&&dt.experience?dt.experience:'experience'}</p>
      </div>

      </div>


    </div>
 <h1 className={`text-center pt-[8rem] text-2xl font-semibold ${like.dark?'text-white':'text-black'}`}>Projects</h1>
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl px-[5rem] py-[8rem] ">
{subCollectionData&&subCollectionData.map((user)=>(
  user&&user.map((subData,index)=><SecondSingleCard key={index} data={subData} />)))}

    </div>
   </div>
  )
}

export default publicProfile
