
//  setprofile the name of new branch
import {  doc, getFirestore,updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'
import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import {useSelector} from "react-redux";
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import Link from "next/link";
import ImageComponent from "../img/ImageComponent";
import ImageComponent2 from "../img/ImageComponent2";

const Posts = ({data,src,name}) => {

    const like = useSelector((state) => state.open);

 
const likedHandler=()=>{
// update data
const db = getFirestore(); // initialize Firestore

const docRef = doc(db, "Posts", data.docId);

const data1 = {
 likes: data.isLiked?data.likes-1:data.likes+1,
 isLiked:!data.isLiked

};
// 
updateDoc(docRef, data1)
.then(docRef => {
    // "like is updated";
})
.catch(error => {
    // you can print the error
})
}

  
  return (
    <div className={`shadow-md ${like.dark?'bg-[#273649] text-[#E7F6F2]':'bg-[#ffffffe8]'}  h-full w-[45%] place-items-center rounded-2xl mx-3`}>
      
{/* card */}
<div className=''>
{/* header of card */}
<div className='flex justify-between  px-8 pt-5 ' > 
    <div className='flex items-center gap-1'>  <div className='cursor-pointer'>
        
           {/* profileeeeee */}
           <div className="cursor-pointer relative"><Link href={"/profile"}>
              {data&&data.profilePhoto?<Image alt="Image" src={`${data.profilePhoto&&data.profilePhoto}`} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:profile}    
              </Link>
              </div>
   
        
        
        </div>  <h1 className='font-bold cursor-pointer'>{name}</h1></div>
    <h1 className='font-bold cursor-pointer'>...</h1>
</div>
{/* the content */}
<div className='px-8 py-5'>
    <p>{data.text}</p>
</div>
{/*  image */}
<div className="relative w-[full] h-[30rem]">
{/* <Image src={`${src}`} alt={'postImage'}  width={400} height={400} priority className='w-full  '/> */}
<ImageComponent2 
        isContain={false}
        layout={true}
        pathImage={`${src}`}
        className={""}
      />
</div>

{/* likes */}
<div className='flex justify-between mx-5 py-5 items-center '>
  
<div>
   {data&&data.likes&&data.likes} Likes
</div>

{/* data.isLiked */}
   <div className='flex  gap-5 items-center align-middle justify-center'> <div className="cursor-pointer" onClick={likedHandler} >
    {data.isLiked?loveRed:love}</div>
    <div className="cursor-pointer">{comment}</div>
    <div className="cursor-pointer">{send}</div>
    </div>

</div>
</div>
</div>
  )
}

export default Posts
