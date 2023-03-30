import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { set_age,set_city,set_exprience, set_userName} from '@/redux/reducers/profille';

import { edit } from '../assets/svg/edit/edit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseApp';
import { useFetch } from '../useHooks/useFetch';
import { setEditPopup } from '@/redux/reducers/isOpen';

const BasicInfo = () => {



  const fullname=useSelector((state) => state.profile);
  
  const isOpen=useSelector((state) => state.open);
  const auth=getAuth();
  const dispatch=useDispatch();
  const [user,loading]=useAuthState(auth)
  const [data1,setData1]=useState();

useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setData1(doc.data());
    dispatch(set_userName(doc.data().name))
    dispatch(set_exprience(doc.data().experience))
  },[]);}

  rendering();

},[isOpen.editPopup])

  return (
    <div className='w-[472px]  place-self-end text-center bg-[#4D545C] text-[#E7F6F2] rounded-[45px] h-[161px] md:flex hidden lg:flex flex-col gap-5 items-center justify-center'> 
  <div className='flex self-end items-center w-[60%] pr-5 justify-between '>
  <p className='font-bold'>Basic info</p>
    <p  className='items-end justify-end' onClick={e=>dispatch(setEditPopup(isOpen.editPopup))}>{edit}</p>
  </div>

{/* info */}
    <div className=' text-[15px] grid grid-cols-4 gap-y-2'>
        <p className=' font-extralight'>FullName</p>
        <p className=' font-extralight'>Age</p>
        <p className=' font-extralight'>City</p>
        <p className=' font-extralight'>Experience</p>

         <p>{user.displayName?user.displayName:fullname.userName}</p>
         <p>{data1&&data1.age?data1.age:'edit'}</p>
         <p>{data1&&data1.city?data1.city:'edit'}</p>
         <p>{data1&&data1.experience?data1.experience:'edit'}</p>
    </div>
    {/* user info */}
      
    </div>
  )
}

export default BasicInfo
