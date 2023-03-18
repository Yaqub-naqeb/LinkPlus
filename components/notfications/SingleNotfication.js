import React from 'react'
import defaultImage from '../assets/imgs/profileImg/user.png'
import Link from 'next/link';
import Image from 'next/image';
const SingleNotfication = ({subCollection}) => {
  console.log(subCollection);
  return (
    <div className='flex gap-3  items-center align-middle px-2 justify-between bg-[#efececde] py-3 mx-1 rounded-lg'>
{/* the person that follows you */}

<div className='flex gap-3 items-center align-middle '>
    
      {/* profileeeeee circle*/}
      <div className="cursor-pointer "><Link href={"/profile"}>
              {subCollection.profilePhoto?<Image src={subCollection.profilePhoto} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:<Image src={defaultImage} className={`w-10 h-10 object-cover rounded-full `}/>}
              </Link>
              </div>

    {/* the name of this person  */}
    {subCollection.name}
    {/* <p className='font-extrabold text-lg'>yaqwb naqib</p> */}
</div>

<div className='flex gap-3 '>
<button className='bg-blue-400 rounded-md text-white px-2 py-2 '>Confirm</button>
<button className='bg-red-400 rounded-md text-white px-2 py-2 '>Delete</button>

</div>

</div>
  )
}

export default SingleNotfication
