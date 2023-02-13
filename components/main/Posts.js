
//  setprofile the name of new branch


import React from 'react'
import Image from 'next/image'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'
import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import {useSelector,useDispatch} from "react-redux";
import { setLike } from '@/redux/reducers/isOpen'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'

const Posts = ({data,src,name}) => {
    console.log(data.text);
    console.log(src);
    console.log(name);
  
    const like = useSelector((state) => state.open);
    const name2 = useSelector((state) => state.profile);

    const dsipatch = useDispatch();
  
  return (
    <div className={`shadow-md ${like.dark?'bg-[#273649] text-[#E7F6F2]':'bg-[#ffffffe8]'}  h-full w-[45%] place-items-center rounded-2xl mx-3`}>
      
{/* card */}
<div className=''>
{/* header of card */}
<div className='flex justify-between  px-8 pt-5 ' > 
    <div className='flex items-center gap-1'>  <div className='cursor-pointer'>{profile}</div>  <h1 className='font-bold cursor-pointer'>{name}</h1></div>
    <h1 className='font-bold cursor-pointer'>...</h1>
</div>
{/* the content */}
<div className='px-8 py-5'>
    <p>{data.text}</p>
</div>
{/*  image */}
<div>
<Image src={`${src}`} alt={'postImage'}  width={400} height={400} priority className='w-full  '/>
</div>

{/* likes */}
<div className='flex justify-between mx-5 py-5 items-center '>
  
<div>
    1,598 Likes
</div>


   <div className='flex gap-5 items-center align-middle justify-center'> <div onClick={()=>dsipatch(setLike(!like.like))} >{like.like?love:loveRed}</div>
    <div>{comment}</div>
    <div>{send}</div>
    </div>

</div>
</div>
</div>
  )
}

export default Posts
