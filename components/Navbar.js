import React, { useState } from 'react'
import Link from 'next/link'
import { svg } from './assets/svg/svg'
import { burger } from './assets/svg/burger';
import { Poppins } from "@next/font/google";
import { close } from './assets/svg/close';
import { search } from './search';
import { setting } from './assets/svg/setting';
import { profile } from './assets/svg/profile';
import { notfication } from './assets/svg/notfication';
const poppins = Poppins({ subsets: ["latin"],weight: '600' });
const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false);

  return (
   <div className='relative '>
     <div className={`flex lg:${()=>setIsOpen(false)}   align-middle items-center justify-between lg:px-20 md:px-10 px-5  bg-[#EBEBEB] shadow-md py-6 `}>



{/* nav */}
<nav className='flex align-middle items-center lg:gap-[10rem] justify-between md:gap-8'>
  {/* logo */}
<div className='flex gap-5 md:text-[.8rem] text-[.7rem] lg:text-[1rem]'>
  {svg} 
  <div className={`flex flex-col  align-middle items-center ${poppins.className}`}>
  <p> Designers </p>
  <p>commiunity</p>
  </div>

</div>
{/* links */}
 
<div className='lg:block md:block hidden'>


 <ul className='flex gap-5 '>
    <li>
      <Link href={'/'}>home</Link>
    </li>
    <li>
      <Link href={'#'}>projects</Link>
    </li>
    <li>
      <Link href={'#'}>desiners</Link>
    </li>
    <li>
      <Link href={'#'}>login</Link>
    </li>
  </ul>
  </div>

</nav>


<div className='lg:block md:block hidden'>

<div className='flex gap-5'>

<div>{search}</div>
<div>{setting}</div>
<div>{notfication}</div>
<div>{profile}</div>
</div>
</div>


{/* mobile */}

<div className='lg:hidden md:hidden '>
<div className='lg:hidden md:hidden transition-all  duration-300 ease-in-out cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
  {isOpen?close:burger}
</div>





</div>
    </div>


<div className={`bg-[#EBEBEB] transition-all  duration-300 py-5 lg:hidden md:hidden  ease-in-out absolute w-full top-0 opacity-0 -z-50 ${isOpen?`opacity-100 -z-50 top-20 transition-all  duration-300 ease-in-out`:''} `}>
  
<ul className=' flex flex-col text-[1.2rem] px-5 text-lg font-bold gap-5  '>
<li>
      <Link href={'/'}>home</Link>
    </li>
    <li>
      <Link href={'#'}>projects</Link>
    </li>
    <li>
      <Link href={'#'}>desiners</Link>
    </li>
    <li>
      <Link href={'#'}>login</Link>
    </li>
</ul>
</div>


   </div>
  )
}

export default Navbar
