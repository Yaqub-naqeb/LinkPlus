import React from 'react'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
const NewPost = () => {
  return (
  <div className='bg-[#273649] w-[638px] rounded-lg  h-[126px] px-5 flex flex-col justify-evenly'>
      <div className=' flex  gap-3  items-center align-middle '>
      
      {profile}
      <input type="text" className='bg-transparent outline-none' placeholder='Type here...'/>
      
      
      
          </div>


<div className='px-1'> <hr /></div>




<div>
    
<button>Post</button>
</div>


  </div>
  )
}

export default NewPost
