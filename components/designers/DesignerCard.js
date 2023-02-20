import React from 'react'
import ImageComponent from '../img/ImageComponent'
import Img1 from '../assets/imgs/profileImg/bg.jpg'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useFetch } from '../useHooks/useFetch'

const DesignerCard = ({user}) => {
  console.log(user);
  const Mode = useSelector((state) => state.open);
  const auth=getAuth();
  // const [user,loading]=useAuthState(auth)
  
// const {data}=useFetch('Users');
// const current=data&&data.filter(dt=>dt.id==user.uid)

  return (

    <div className={`items-start content-start self-start hover:scale-105 hover:shadow-lg transition-all duration-100 ease-in-out shadow-md w-80 h-72 justify-self-start rounded-2xl ${Mode.dark?'bg-[#273649] text-[#E7F6F2] font-medium':'bg-[#ffffffe8]'}`}>
{/* top */}
<div className='relative w-full h-[40%]   rounded-b-none   '>
<ImageComponent 

        isContain={false}
        layout={true}
        pathImage={Img1}
        className={""}
      />
</div>

{/* bottom */}

<div className='flex flex-col items-center justify-start align-top '>
    <p className='translate-y-[-1.5rem]'>
      
      
       {/* profileeeeee */}
       <div className="cursor-pointer "><Link href={"/profile"}>
              {user&&user.profilePhoto?<Image src={user.profilePhoto} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:profile}
              </Link>
              </div>
      
      
      
      </p>
    <p className='text-xl font-[550] -translate-y-5'> {user.name}</p>
    <p className='text-sm -translate-y-5'>{user.experience
}</p>
<div className='flex flex-col items-center gap-2 text-sm -translate-y-3'>
<button className=' bg-[#757BB8] w-[74px] h-[26px] rounded-[15px] '>Follow</button>
    <button className=' bg-[#757BB8] w-[118px] h-[30px] rounded-[15px]'>Give a task</button>
    
</div>

</div>


      
    </div>
  )
}

export default DesignerCard
