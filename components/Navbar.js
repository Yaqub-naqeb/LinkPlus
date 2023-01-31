import React, { useState } from 'react'
import Link from 'next/link'
import { svg } from './svg/svg'
import { burger } from './svg/burger';
import { Poppins } from "@next/font/google";
import { close } from './svg/close';
const poppins = Poppins({ subsets: ["latin"],weight: '600' });
const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false);

  return (
   <div className='relative'>
     <div className={`flex  align-middle items-center justify-between lg:${()=>setMob(true)} lg:px-20 md:px-10 px-5  bg-slate-500 py-6 `}>



{/* nav */}
<nav className='flex align-middle items-center lg:gap-[10rem] justify-between md:gap-8'>
  {/* logo */}
<div className='flex gap-5'>
  {svg} 
  <div className={`flex flex-col align-middle items-center ${poppins.className}`}>
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

<div className='flex gap-5 '>

<div>search</div>
<div>sitteng</div>
<div>chatt</div>
<div>profile</div>
</div>
</div>


{/* mobile */}

<div>
<div className='lg:hidden md:hidden transition-all  duration-300 ease-in-out cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
  {isOpen?close:burger}
</div>





</div>
    </div>


<div className={`bg-red-500 transition-all  duration-300 ease-in-out absolute w-full top-0 opacity-0 -z-50 ${isOpen?`opacity-100 z-0 top-24 transition-all  duration-300 ease-in-out`:''} `}>
  
<ul className=''>
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
