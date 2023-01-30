import React from 'react'
import Link from 'next/link'
const Navbar = () => {

  return (
    <div className='flex justify-around '>



{/* nav */}
<nav className='flex gap-[10rem]'>
  {/* logo */}
<div>logo</div>
{/* links */}
  <ul className='flex gap-5'>
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
</nav>

{/* icons */}
<div className='flex gap-5'>

  <div>search</div>
  <div>sitteng</div>
  <div>chatt</div>
  <div>profile</div>

</div>

  
    </div>
  )
}

export default Navbar
