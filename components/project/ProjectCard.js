import Image from 'next/image'
import React from 'react'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import { love } from '../assets/svg/socialIcons/love'
import Img from '../assets/imgs/postImg/WallpaperDog-17124685.jpg'
const ProjectCard = () => {
  return (
    <div className=' relative object-cover grid grid-cols-3 gap-8 '>
      

<div className='relative'>
<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>


{/* info about project */}
<div className='absolute bottom-0 rounded-sm bg-transparent  bg-gradient-to-t from-[#000000df]  w-full h-[35%] text-white px-3 py-5 bg-red-500   '>


<div className=' flex flex-col justify-center align-middle items-start'>
<p className='hover:underline'>Project Name
</p>
<p className='hover:underline'>rating</p>


</div>



</div>

</div>

<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>
<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>
<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>
<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>
<Image src={Img} className={'w-[321px] h-[251px] rounded-md '} width={900} height={900}/>








    </div>
  )
}

export default ProjectCard
