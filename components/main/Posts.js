import React from 'react'
import Image from 'next/image'
import Img from '../assets/svg/postImg/WallpaperDog-17124685.jpg'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'

import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import { dark } from '../assets/svg/darkImg/dark'
import {useSelector,useDispatch} from "react-redux";
import { setLike } from '@/redux/reducers/isOpen'

const Posts = () => {
    const like = useSelector((state) => state.open);
    console.log(like.like);
    const dsipatch = useDispatch();
  
  return (
    <div className='shadow-md bg-[#ffffffe8] h-full w-[45%] place-items-center rounded-md mx-3'>
      
{/* card */}
<div className=''>
{/* header of card */}
<div className='flex justify-between  px-5 pt-5 ' > 
    <h1>profile</h1>
    <h1>...</h1>
</div>
{/* the content */}
<div className='px-8 py-5'>
    <h1>AVENGERS</h1>
    <p>avenger: dolor sit amet consectetur adipisicing elit. Minus distinctio asperiores quasi saepe error culpa consectetur quia repellendus dicta, exercitationem quis. Tenetur exercitationem officiis officia, ex ab voluptatem magni similique.</p>
</div>
{/*  image */}
<div>
<Image src={Img} width={400} height={400} priority className='w-full '/>

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
