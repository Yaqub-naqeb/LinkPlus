import React from 'react'
import Image from 'next/image'
import ProfileImage from '../assets/imgs/profileImg/pexels-spencer-selover-775358.jpg'
import { useFetch } from '../useHooks/useFetch'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
const ProfileCard = () => {
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)

const {data}=useFetch('ProfileInfo');

console.log(data);






  return (
    <div className='row-span-2 self-start place-self-center  w-[289px] h-[628px] rounded-[45px] bg-slate-300 flex gap-5 flex-col items-center justify-center'>
      <Image src={ProfileImage} className={`w-[209px] h-[303px] rounded-[32px]`} width={300} height={300}/>
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
