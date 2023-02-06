import React from 'react'
import ImageComponent from '../img/ImageComponent'
import Img1 from '../assets/imgs/profileImg/bg.jpg'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'

const DesignerCard = () => {
  return (
    <div className=' w-[234px] h-[253px] rounded-2xl shadow-md  flex flex-col items-center align-middle justify-start '>
{/* top */}
<div className='relative w-full bg-black h-[40%] rounded-t-2xl  '>
<ImageComponent
        isContain={false}
        layout={true}
        pathImage={Img1}
        className={""}
      />
</div>

{/* bottom */}

<div className='flex flex-col items-center justify-start align-top '>
    <p className='translate-y-[-1.5rem]'>{profile}</p>
    <p className='text-xl font-[550] -translate-y-5'> John jenifer</p>
    <p className='text-sm -translate-y-5'>UI/UX designer</p>
<div className='flex flex-col items-center gap-2 -translate-y-3'>
<button className=' bg-[#757BB8] w-[74px] h-[26px] rounded-[15px]'>Follow</button>
    <button className=' bg-[#757BB8] w-[118px] h-[30px] rounded-[15px]'>Give a task</button>
    
</div>

</div>


      
    </div>
  )
}

export default DesignerCard
