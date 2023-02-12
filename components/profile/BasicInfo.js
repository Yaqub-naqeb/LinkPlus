import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { set_age,set_city,set_exprience} from '@/redux/reducers/profille';

import { edit } from '../assets/svg/edit/edit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseApp';
import { useFetch } from '../useHooks/useFetch';
import { setEditPopup } from '@/redux/reducers/isOpen';

const BasicInfo = () => {

  const fullname=useSelector((state) => state.profile);
  
  const isOpen=useSelector((state) => state.open);
  console.log(isOpen.editPopup);
  const auth=getAuth();
  const dispatch=useDispatch();
  const [user,loading]=useAuthState(auth)
  console.log(user);
// const [data,setData]=useState([]);

// // to get info
const {data,isPending}=useFetch("ProfileInfo");

// console.log(data&&data.filter(name=>name.data.id==user.uid));
const info=data&&data.filter(name=>name.data.id==user.uid)
// console.log(info&&info.data.age);
// console.log(data&&data.map(name=>name.data.age));

  return (
    <div className='w-[472px] place-self-end text-center bg-[#4D545C] text-[#E7F6F2] rounded-[45px] h-[161px] flex flex-col gap-5 items-center justify-center'> 
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
        <p>{user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid&&name.data.name)}</p>
        <p>{info[0]?info[0].data.age:'edit'}</p>
        <p>{info[0]?info[0].data.city:'edit'}</p>
        <p>{info[0]?info[0].data.experience:'edit'}</p>
        {/* experience */}
        {/* <p>{data&&data.map(name=>name.data.id==user.uid&&name.data.city)}</p>
        <p>{data&&data.map(name=>name.data.id==user.uid&&name.data.experience)}</p> */}
        {/* <p>{user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid&&name.data.name)}</p>
      

        <input type="text" placeholder={`${fullname.exprince?fullname.exprince:'edit'}`} className='bg-transparent text-center'  onChange={(e)=>dispatch(set_exprience(e.target.value))} /> */}
    </div>
    {/* user info */}
      
    </div>
  )
}

export default BasicInfo
