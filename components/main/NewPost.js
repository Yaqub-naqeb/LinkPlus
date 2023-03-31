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
    // [688px]
    // h-[126px]
  <div className={` mt-3 ${Mode.open?'':'z-40'} ${mode?'bg-[#273649]':'bg-[#FDFDFD]'} rounded-2xl w-full lg:h-[126px] md:h-[126px] h-[96px]    px-5 flex flex-col justify-evenly -translate-y-7 `}>
      <div className='flex items-center gap-3 align-middle '>
      
     <SmallImage/>
      {/* <input onClick={()=>dsipatch(setPostPopUp(!Mode.postPopUp))}  type="text" className='bg-transparent  outline-none' 
      placeholder='Type here...'
      /> */}

      <p onClick={()=>dsipatch(setPostPopUp(!Mode.postPopUp))} className='bg-transparent   font-semibold outline-none text-[#5f5e5eaa] '>Type here...</p>



      
      
      
          </div>


<div className='px-1'> <hr /></div>




<div className='flex items-center justify-between px-5 align-middle'>
<div className='flex gap-5 '>
{mode?smth:WhiteSmth}
{mode?location:whiteLocation}
</div>
<button className='bg-[#757BB8] md:py-2 py-1 lg:py-2 px-8 font-medium rounded-full' onClick={()=>dsipatch(setPostPopUp(!Mode.postPopUp))}>Post</button>
</div>


  </div>
  )
}

export default NewPost
