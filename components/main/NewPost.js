import React from 'react'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import { location } from '../assets/svg/socialIcons/location'
import { smth } from '../assets/svg/socialIcons/smth'
import { useDispatch, useSelector } from 'react-redux';
import { setPostPopUp } from '@/redux/reducers/isOpen';
import SmallImage from '../profile/SmallImage';
import { useMode } from '../useHooks/useMode';
import { WhiteSmth } from '../assets/svg/socialIcons/whiteSmth';
import { whiteLocation } from '../assets/svg/socialIcons/whiteLocation';
const NewPost = () => {
    const Mode = useSelector((state) => state.open);
    const {mode}=useMode();
    const dsipatch=useDispatch();
  return (
  <div className={` ${mode?'bg-[#273649]':'bg-[#FDFDFD]'} w-[688px] rounded-2xl   h-[126px] px-5 flex flex-col justify-evenly -translate-y-7`}>
      <div className='flex items-center gap-3 align-middle '>
      
     <SmallImage/>
      <input onClick={()=>dsipatch(setPostPopUp(!Mode.postPopUp))}  type="text" className='bg-transparent outline-none' placeholder='Type here...'/>
      
      
      
          </div>


<div className='px-1'> <hr /></div>




<div className='flex items-center justify-between px-5 align-middle'>
<div className='flex gap-5 '>
{mode?smth:WhiteSmth}
{mode?location:whiteLocation}
</div>
<button className='bg-[#757BB8]  py-2 px-8 font-medium rounded-full' onClick={()=>dsipatch(setPostPopUp(!Mode.postPopUp))}>Post</button>
</div>


  </div>
  )
}

export default NewPost
