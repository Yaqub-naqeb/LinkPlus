import React, { useState } from 'react'
import { useMode } from '../useHooks/useMode';
import { save } from '../assets/svg/save/SavePost';
import { close } from '../assets/svg/close/close';

const ThreeDotsMenu = () => {
    const [open ,setOpen]=useState(false);
const {mode}=useMode()
  return (
    <div className=''>
     <div class="relative z-40 inline-block text-left">
  <div>
    <button onClick={()=>setOpen(!open)} type="button" className={`inline-flex gap-1 justify-center w-8 h-8   rounded-full text-[1rem] pt-[2px] ${mode?'hover:bg-[#1b2430aa] text-white bg-[#273649]':'hover:bg-[#ECECEC] text-black  bg-white '}   text-sm font-medium   `} id="menu-button" aria-expanded="true" aria-haspopup="true">
      <span className='font-bold '>.</span>
      <span className='font-bold '>.</span>
      <span className='font-bold '>.</span>
      
      <span class="sr-only">Open menu</span>
    </button>
  </div>
{/* containar */}
 {
    open &&  <div  className={`origin-top-right  absolute right-0 mt-2 w-56 rounded-md shadow-lg ${mode?' text-white bg-[#273649] shadow-lg shadow-gray-600 ':'bg-white text-gray-700'}    ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div className="py-1" role="none">
      {/* <!-- Menu items --> */}
      <a href="#" class="flex items-center gap-1 px-4 py-2 text-sm   hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1" id="menu-item-0"><span>{save}</span> Save Post</a>
      <a href="#" class="flex items-center gap-1 px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1" id="menu-item-1"> {close} Hide Post</a>
     
    </div>
  </div>
 }


  
</div>
 
    </div>
  )
}

export default ThreeDotsMenu
