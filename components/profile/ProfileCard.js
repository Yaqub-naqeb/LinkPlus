import React from 'react'
import Image from 'next/image'
import { useFetch } from '../useHooks/useFetch'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { edit } from '../assets/svg/edit/edit'
import { setUploadProfilePhoto } from '@/redux/reducers/isOpen'
import { useDispatch, useSelector } from 'react-redux'
import defaultBackground from '../assets/imgs/profileImg/texture-of-scratches-old-blue-paper-abstract-background-free-photo.jpg'
import { location } from '../assets/svg/socialIcons/location'
import { whiteLocation } from '../assets/svg/socialIcons/whiteLocation'
import { useMode } from '../useHooks/useMode'
import { exp } from '../assets/svg/socialIcons/exp'
import Skills from './Skills'
import { photo } from '../assets/svg/edit/photo'
import SecondCrousel from './SecondCrousel'
import { blackEdit } from '../assets/svg/edit/blackEdit'


const ProfileCard = () => {
  const photoUrl=useSelector((state) => state.profile);
  console.log(photoUrl.city);

  const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();

  const auth=getAuth();
  const [user,loading]=useAuthState(auth)
  
const {data}=useFetch('Users');
const {mode}=useMode();

const profileUrl= data&&data.filter(name=>name.id==user.uid)


  return (
    <div>
      {/* for disctop */}
      <div className=' 
      lg:flex md:flex hidden
      row-span-2 self-start place-self-center  w-[289px] h-[628px] rounded-[45px] bg-slate-300  gap-5 flex-col items-center justify-center relative '>

{profileUrl[0]&&<>


  <div className='absolute right-2 top-5 z-50 p-1 rounded-full bg-white   cursor-pointer' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))} >{blackEdit}</div>

{/* background Image Card */}
<div className='absolute top-0 left-0 w-full h-1/3'>
{profileUrl[0].backgroundPhoto?
<Image src={profileUrl[0].backgroundPhoto} className={`w-full h-full   object-cover  rounded-t-[32px]`} width={900} height={900}/>
:<Image src={defaultBackground} className={`w-full h-full   object-cover  rounded-t-[32px]`} width={900} height={900}/>}

</div>
<div className='z-50'>
{/* profile imageee */}
{profileUrl[0].profilePhoto&&<Image src={profileUrl[0].profilePhoto} className={`w-[209px]  h-[303px] object-cover rounded-[32px]`} width={900} height={900}/>}
{/* <div className='absolute right-2 top-5 z-50 p-1 rounded-full bg-white   cursor-pointer' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))} >{blackEdit} fldaksjaldkjflkdj</div> */}

   <div className='flex flex-col gap-3  items-center justify-center align-middle'>
     
   <p className='font-bold'>{user.displayName?user.displayName:photoUrl.userName}</p>
   
   <p className=' text-[0.8rem]'>{photoUrl.exprince?photoUrl.exprince:'experince'}</p>
   
   
   </div>
   
       <div className='grid grid-cols-2 gap-x-12 gap-y-3 place-items-center'>
      <p>Following</p>
      <p>Follower</p>
      <p>{profileUrl[0].following}</p>
      <p>{profileUrl[0].follower}</p>
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

</>}

    </div>

    {/* for Mobile */}
    <div className=' lg:hidden md:hidden
    absolute top-0 left-0 w-full h-screen 
    '>

{profileUrl[0]&&<>

      {/* background image */}
      <div className='h-1/3 flex relative'>
      {/* <div className='absolute right-2 top-[6.3rem]  bg-white p-1 rounded-full w-7 h-7  flex items-center justify-center align-middle z-10 '  onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))} >
{photo}

      </div> */}

{profileUrl[0].backgroundPhoto?
<Image src={profileUrl[0].backgroundPhoto} className={`w-full h-full   object-cover  rounded-t-[32px]`} width={900} height={900}/>
:<Image src={defaultBackground} className={`w-full h-full   object-cover  rounded-t-[32px]`} width={900} height={900}/>}
</div>

{/* image */}
<div className='translate-y-[-6%]  '>



  {/* profile image */}
<div className='z-20 ml-8  w-[130px] p-1 flex items-center justify-center align-middle bg-white h-[130px] object-cover rounded-full  relative'>
  

{profileUrl[0].profilePhoto&&<Image src={profileUrl[0].profilePhoto} className={`object-cover rounded-full w-[120px] h-[120px]   `} width={900} height={900}/>}


<div className='

absolute right-0 top-[5.8rem] bg-white p-1 rounded-full w-7 h-7  flex items-center justify-center align-middle

z-10
' onClick={()=>  dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))
}>
{photo}
</div>

</div>
{/* name and exprience and location */}
<div className='flex flex-col gap-2 mt-1  ml-8 '>
     
   <p className='font-bold'>{user.displayName?user.displayName:photoUrl.userName}</p>

   {/* kjfdsldkfjas */}
   {/* lkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
   <div className='grid grid-cols-2 gap-x-8  place-items-center absolute right-5 top-20'>
      <p>Following</p>
      <p>Follower</p>
      <p>{profileUrl[0].following}</p>
      <p>{profileUrl[0].follower}</p>
       </div>
  

<div className='flex gap-1 '>
  
<div>{exp}</div>
   <p className=' text-[.9rem] translate-y-1'>{photoUrl.exprince?photoUrl.exprince:'Experince'}</p>
</div>
    
    <div className='flex gap-2.5 '>
        <div className='translate-x-0.5 '>{whiteLocation}</div>
        <p className='text-[.9rem] translate-y-[1px]'>{profileUrl[0].city?profileUrl[0].city:'Location'}</p>
</div>
   </div>
{/* line */}
   <hr className='mx-8 my-4  border border-[#0006] rounded-lg ' />
   {/* Skills */}
   <div className='flex flex-col gap-2 mt-1  ml-9  '>
    <p className='font-bold  w-[82vw] '>Skills</p>
   <div className='mx-6 my-5 translate-x-2'>
   <Skills/>
   </div>
</div>
{/* line */}
<hr className='mx-8 my-4  border border-[#0006] rounded-lg ' />

  {/* Skills */}
  <div className='flex flex-col gap-2 mt-1  ml-9  '>
    <p className='font-bold  w-[82vw] '>Projects</p>
   <div className='mx-auto my-8  -translate-x-5  '>
   <SecondCrousel/>
   </div>
   </div>




</div>


   {/*  (: here we go*/}
   



</>}

    </div>
    
    </div>
  )
}

export default ProfileCard
