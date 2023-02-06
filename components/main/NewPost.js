import React from 'react'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import { location } from '../assets/svg/socialIcons/location'
import { smth } from '../assets/svg/socialIcons/smth'
import { useDispatch, useSelector } from 'react-redux';
const NewPost = () => {
    const Mode = useSelector((state) => state.open);
  return (
  <div className={` ${Mode.dark?'bg-[#273649]':'bg-[#FDFDFD]'} w-[688px] rounded-2xl   h-[126px] px-5 flex flex-col justify-evenly`}>
      <div className=' flex  gap-3  items-center align-middle '>
      
      {profile}
      <input type="text" className='bg-transparent outline-none' placeholder='Type here...'/>
      
      
      
          </div>


<div className='px-1'> <hr /></div>




<div className='flex justify-between align-middle items-center px-5'>
<div className='flex gap-5'>
{smth}
{location}
</div>
<button className='bg-[#757BB8] py-2 px-8 font-medium rounded-full'>Post</button>
</div>


  </div>
  )
}

export default NewPost
