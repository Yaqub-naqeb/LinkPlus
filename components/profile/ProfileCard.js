import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProfileImage from '../assets/imgs/profileImg/pexels-spencer-selover-775358.jpg'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { edit } from '../assets/svg/edit/edit'
import { set_Profile_Photo } from '@/redux/reducers/profille';
import { setUploadProfilePhoto } from '@/redux/reducers/isOpen'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '@/firebase/FirebaseApp';
const ProfileCard = () => {

  // const citiesRef = collection(db, "ProfileInfo");
  // const q = query(citiesRef, where("", "==", "CA"));
const [photo,setPhoto]=useState();



  const photoUrl=useSelector((state) => state.profile);


  const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();

  const auth=getAuth();
  const [user,loading]=useAuthState(auth)
  
const {data}=useFetch('ProfileInfo');


// const profileUrl= data&&data.filter(name=>name.id==user.uid)
// console.log(profileUrl[0].profilePhoto
//   );



useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "ProfileInfo"), where("id", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // dispatch(set_Profile_Photo(doc.data()))
    setPhoto(doc.data())
    // doc.id, " => ", doc.data()
    console.log(doc.data());
  });}

  rendering();

},[photoUrl.profilePhoto])

// console.log(profileUrl[0].profilePhoto);
// console.log(data&&data.filter(name=>name.id==user.uid&&name.profilePhoto));

  return (
    <div className='row-span-2 self-start place-self-center  w-[289px] h-[628px] rounded-[45px] bg-slate-300 flex gap-5 flex-col items-center justify-center relative'>


<div className='absolute right-2 top-5 cursor-pointer' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))}>{edit}</div>
{/* photoUrl.profilePhoto */}
      <Image src={photo?photo.profilePhoto:ProfileImage} className={`w-[209px] h-[303px] object-cover rounded-[32px]`} width={900} height={900}/>
<div className='flex flex-col gap-3 items-center justify-center align-middle'>
  
<p className='font-bold'>{user.displayName?user.displayName:data&&data.map(name=>name.id==user.uid&&name.name)}</p>
<p className=' text-[0.8rem]'>{data&&data.map(name=>name.id==user.uid&&name.experience)}</p>


</div>

    <div className='grid grid-cols-2 gap-x-12 gap-y-3 place-items-center'>
   <p>Following</p>
   <p>Follower</p>
   <p>120</p>
   <p>135</p>
    </div>

{/* follow */}

      
      <div className='flex flex-col  justify-center items-center gap-5 align-middle'>
      <button className={`bg-[#51557E] rounded-[15px] w-[204px] h-[50px] text-[#E7F6F2
] 

 before:content-[''] before:absolute before:bg-[#757BB8]  before:rounded-[15px]  before:items-center before:justify-center before:opacity-0 before:z-40  hover:before:opacity-80 hover:before:top-0 before:w-0 hover:before:w-full hover:before:flex hover:before:transition-all hover:before:duration-50 hover:before:ease-out before:h-full 
 
 relative `}><span className=''>Follow</span></button>
      <button className=' bg-[#757BB8] w-[144px] h-[50px] rounded-[15px]'>Give a task</button>
      </div>

    </div>
  )
}

export default ProfileCard
