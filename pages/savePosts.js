import Posts from '@/components/main/Posts'
import { useFetchNotfication } from '@/components/useHooks/useFetchNotfication';
import Image from 'next/image';
import React from 'react'
import saved from "../components/assets/imgs/homeImg/save-instagram.png";

const savePosts = () => {
    const {subCollection}=useFetchNotfication('SavePosts');

console.log(subCollection);



  return (
    <div className='flex lg:translate-x-[57%] translate-x-[-4rem] flex-col lg:py-10  pb-10 gap-3 items-center min-h-screen  lg:w-[688px]  md:w-[688px] w-[358px]  '>

     <div className="flex items-center  gap-3 pb-5 " >
        <Image
          className=" w-[40px] h-[40px]"
          src={saved}
          width={500}
          height={500}
          priority
        />{" "}
        Saved Posts
      </div>

{/* {subCollection&&subCollection.map((post,index)=><Posts key={index}  postData={post} text={post.text} src={post.src} />)} */}
{subCollection&&subCollection.map((post,index)=>post.isNew? <Posts key={index} userDocId={userDocId}  postData={post} text={op.isImagePosted?post.text:'Loding...'} src={op.isImagePosted&&post.src}  />:<Posts key={index}  postData={post} text={post.text} src={post.src} />
)}

{/* <Posts userDocId={userDocId}  postData={post} text={op.isImagePosted?post.text:'Loding...'} src={op.isImagePosted&&post.src}  />    */}
 </div>
  )
}

export default savePosts
