import { useFetchCurrentUserProjects } from '@/components/useHooks/useFetchCurrentUserProjects';
import { useMode } from '@/components/useHooks/useMode';
import { db } from '@/firebase/FirebaseApp';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import SecondSingleCard from '../components/project/SecondSingleCard'

const publicProfile = () => {


  

  const like = useSelector((state) => state.open);
  console.log(like.dark);

  const [dt,setDt]=useState([]);
  const prof = useSelector((state) => state.profile);
  const {subCollectionData}=useFetchCurrentUserProjects('Users',prof.user_uid);
  
const {mode}=useMode();


  useEffect(()=>{
    const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", prof.user_uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDt(doc.data());
    });}
  
    rendering();
  },[])

  return (
   <div className='min-h-screen '>
     <div className={` -z-50  `}>
      {/* bg photo */}
      <div className=''> <Image className='w-full   h-1/3 object-cover absolute top-[6rem] right-0' src={dt&&dt.backgroundPhoto&&dt.backgroundPhoto} width={900} height={900}/></div>

{/* the photo */}
<div className=' flex lg:flex-row flex-col items-center   lg:gap-8 gap-2 lg:mt-[5rem] mt-[6.2rem] '>
        <Image className='lg:w-[18rem] z-40 lg:h-[18rem] 
        w-[12rem] h-[12rem] bg-[#ffff] shadow-lg p-2 object-cover  rounded-full' src={dt&&dt.profilePhoto} width={900} height={900} />

      <div className={`lg:translate-y-16 lg:text-left text-center`}>
      <p className={`text-black  font-semibold text-2xl z-50 ${mode?'text-white':'text-black'}`}>{dt&&dt.name}</p>
        <p className={`text-black font-medium text-lg z-50 ${mode?'text-white':'text-black'}`}>{dt&&dt.experience?dt.experience:'experience'}</p>
      </div>

      </div>


    </div>
 <h1 className={`text-center lg:pt-[8rem] pt-[5rem] text-2xl font-semibold ${mode?'text-white':'text-black'}`}>Projects</h1>
    <div className="relative grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-y-8 gap-x-14 rounded-2xl lg:px-[5rem] px-0 lg:py-[8rem] py-[3rem] lg:w-full w-[80vw] place-items-center -translate-x-10">
      {/* translate-x-[-3rem]  */}
{subCollectionData&&subCollectionData.map((user)=>(
  user&&user.map((subData,index)=><SecondSingleCard key={index} data={subData} />)))}
    </div>
   </div>
  )
}

export default publicProfile
