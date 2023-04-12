
//  setprofile the name of new branch
import {  doc, getFirestore,serverTimestamp,setDoc,updateDoc } from "firebase/firestore";
import React, { useState } from 'react'
import Image from 'next/image'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'
import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import {useDispatch, useSelector} from "react-redux";
import profile  from '../assets/imgs/profileImg/user.png'
import Link from "next/link";
import ImageComponent2 from "../img/ImageComponent2";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLikeDetail } from "../useHooks/useLikeDetail";
import { setIsLikeByUser } from "@/redux/reducers/isOpen";
import { set_user_uid } from "@/redux/reducers/profille";
import { useMode } from "../useHooks/useMode";
import { ThreeDots } from "react-loader-spinner";
import ThreeDotsMenu from "./ThreeDotsMenu";

const Posts = ({postData,src,text}) => {
    console.log(postData);
    
const {subCollectionLikeData}=useLikeDetail('Posts',postData.docId);
const auth=getAuth()
const [user]=useAuthState(auth);
const [active, setActive] = useState(true);

const [isPostDeleted,setIsPostDeleted]=useState(false);

    const like = useSelector((state) => state.open);
    const prof = useSelector((state) => state.profile);
    const {mode}=useMode();

    const dispatch=useDispatch();


    const db = getFirestore(); // initialize Firestore

const postDeleted=()=>{
}

const likedHandler=async()=>{
    setActive(false);

    const dbb = getFirestore(); // initialize Firestore


    const docReff = doc(dbb, `Posts/${postData.docId}/LikeDetail`,user.uid);
    // if it is new
    if(postData.isNew){

        await setDoc(docReff,{
            likes: 1,
            isLiked:true,
            userId:user.uid,
        timeStamp:serverTimestamp(),}) 
        // update the isNew
        
  const docRef = doc(dbb, "Posts", postData.docId);
  
  const data1 = {
    isNew:false
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })   

  dispatch(setIsLikeByUser(!like.isLikeByUser))


    }else{

        await setDoc(docReff,{
            isLiked:subCollectionLikeData.isLiked?false:true,   
            timeStamp:serverTimestamp(),})
            dispatch(setIsLikeByUser(!like.isLikeByUser))

    }

// update postData
const db = getFirestore(); // initialize Firestore

const docRef = doc(db, "Posts", postData.docId);

const postData1 = {
likes: postData.isNew?postData.isLiked?postData.likes-1:postData.likes+1:subCollectionLikeData&&subCollectionLikeData.isLiked?postData.likes-1:postData.likes+1,
};

updateDoc(docRef, postData1)
.then(docRef => {
    // "like is updated";
})
.catch(error => {
    // you can print the error
})


setTimeout(() => {
    setActive(true);

}, 800);

}

// profileHandler
const profileHandler=()=>{
    dispatch(set_user_uid(postData.userUid))
}  





  return (
   <>
   {!isPostDeleted&& <div className={`shadow-md ${mode?'bg-[#273649] text-[#E7F6F2]':'bg-[#ffffffe8]'} lg:w-[40vw] w-[90vw]  h-full  place-items-center rounded-2xl mx-3`}>
      
      {/* card */}
      <div className=''>
      {/* header of card */}
      <div className='flex justify-between  px-7 pt-5 ' > 
          <div className='flex items-center gap-1'>  <div className='cursor-pointer'>
              
                 {/* profileeeeee */}
                 <Link href={"/publicProfile"} className={'flex items-center gap-3'} onClick={profileHandler}>
                   <div className="cursor-pointer relative" >
                    {like.isImagePosted&&postData&&postData.profilePhoto&&postData.profilePhoto?<Image alt="Image" src={`${postData.profilePhoto}`} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:<Image src={profile} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>}    
                    </div>
                    <h1 className='font-bold cursor-pointer'>{like.isImagePosted?postData.name:'Name...'}</h1>
                    </Link>
         
              
              
              </div>   </div>
      {/* three dots */}
          <h1 className='font-bold cursor-pointer'><ThreeDotsMenu isPostDeleted={isPostDeleted} setIsPostDeleted={setIsPostDeleted}/></h1>
          
      </div>
      {/* the content */}
      <div className='px-8 py-5'>
          <p>{text}</p>
      </div>
      {/*  image */}
    <a href={src}>
    <div className="relative w-[full] h-[30rem]">
      {src&&<ImageComponent2 
              isContain={false}
              layout={true}
              pathImage={`${src}`}
            />}
      </div>
    </a>
      
      {/* likes */}
      <div className='flex justify-between mx-5 py-5 items-center '>
        
      <div>
         {postData&&postData.likes} Likes
      </div>
      {/* Like comment Send */}
         <div className='flex  gap-5 items-center align-middle justify-center'> <div className="cursor-pointer" onClick={active ? likedHandler : null} >
      
          {postData.isNew?love: subCollectionLikeData&&subCollectionLikeData.isLiked?loveRed:love}</div>
          {/* { subCollectionLikeData&&subCollectionLikeData.isLiked?loveRed:love}</div> */}
      
          <div className="cursor-pointer">{comment}</div>
          <div className="cursor-pointer">{send}</div>
          </div>
      
      </div>
      </div>
      </div>}
   
   
   
   
   </>
  )
}

export default Posts
