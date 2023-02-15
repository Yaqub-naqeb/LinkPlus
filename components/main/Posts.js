
//  setprofile the name of new branch
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'
import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import {useSelector,useDispatch} from "react-redux";
import { setLike } from '@/redux/reducers/isOpen'
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import { db } from "@/firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const Posts = ({data,src,name}) => {
    console.log(data);

    const like = useSelector((state) => state.open);
    const auth=getAuth()
const user=useAuthState(auth);
console.log(user);


 
const likedHandler=()=>{
    // dispatch(setLike(!like.like))
// update data
const db = getFirestore(); // initialize Firestore

const docRef = doc(db, "Posts", data.docId);

const data1 = {
 likes: data.isLiked?data.likes-1:data.likes+1,
 isLiked:!data.isLiked

};

updateDoc(docRef, data1)
.then(docRef => {
    console.log("like is updated");
})
.catch(error => {
    console.log(error);
})


}

  
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
   {data&&data.likes&&data.likes} Likes
</div>


   <div className='flex gap-5 items-center align-middle justify-center'> <div onClick={likedHandler} >{data.isLiked?loveRed:love}</div>
   {/* <div className='flex gap-5 items-center align-middle justify-center'> <div onClick={likedHandler} >{like.like?love:loveRed}</div> */}
    <div>{comment}</div>
    <div>{send}</div>
    </div>

</div>
</div>
</div>
  )
}

export default Posts
