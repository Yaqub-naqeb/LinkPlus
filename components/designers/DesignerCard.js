import React, { useState } from 'react'
import ImageComponent from '../img/ImageComponent'
import Img1 from '../assets/imgs/profileImg/texture-of-scratches-old-blue-paper-abstract-background-free-photo.jpg'
import  profile  from '../assets/imgs/profileImg/user.png'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useFetch } from '../useHooks/useFetch'
import { useMode } from '../useHooks/useMode'
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { uuid } from 'uuidv4'

const DesignerCard = ({user,cu}) => {
  
  // const Mode = useSelector((state) => state.open);
  const [follow,setFollow]=useState(false);
  const {mode}=useMode();


  const {data}=useFetch('Users');

const clickFollowHandler=()=>{
const current=data&&data.filter(dt=>dt.id==cu.uid)
console.log(current[0].name);


    const db = getFirestore(); // initialize Firestore

 

   // send data to firebase
  const SecondDocId=uuid();
      const docRef = doc(db, `Users/${current[0].docId}/followings`,SecondDocId);
    setDoc(docRef,{
follow:'Following',
timeStamp:serverTimestamp(),
   })
   // send data to firebase
  const friendDocId=uuid();
      const docRefFriend = doc(db, `Users/${user.docId}/follower`,friendDocId);
    setDoc(docRefFriend,{
      profilePhoto:current[0].profilePhoto&&current[0].profilePhoto,
name:current[0].name,
follow:'Followed you ',
timeStamp:serverTimestamp(),
   })

   setFollow(false);



}



  return (

    <div className={`items-start content-start self-start hover:scale-105 hover:shadow-lg transition-all duration-100 ease-in-out shadow-md w-80 h-72 justify-self-start rounded-2xl ${mode?'bg-[#273649] text-[#E7F6F2] font-medium':'bg-[#ffffffe8]'}`}>
{/* top */}
<div className='relative w-full h-[40%]   rounded-b-none   '>
<ImageComponent 
        isContain={false}
        layout={true}
        pathImage={user.backgroundPhoto?user.backgroundPhoto:Img1}
        className={""}
      />
</div>

{/* bottom */}

<div className='flex flex-col items-center justify-start align-top '>
    <p className='translate-y-[-1.5rem]'>
      
      
       {/* profileeeeee */}
       <div className="cursor-pointer "><Link href={"/profile"}>
              {user&&user.profilePhoto?<Image src={user.profilePhoto} className={`w-14 h-14 object-cover rounded-full `} width={100} height={100}/>:<Image src={profile} className={`w-14 h-14 object-cover rounded-full `} width={100} height={100}/>}
              </Link>
              </div>
      
      
      
      </p>
    <p className='text-xl font-[550] -translate-y-5'> {user.name}</p>
    <p className='text-sm -translate-y-5'>{user.experience}</p>
<div className='flex flex-col items-center gap-2 text-sm -translate-y-3'>
<button className={`bg-[#757BB8] w-[74px] h-[26px] cursor-pointer rounded-[15px] ${follow?'bg-[#757bb8a3]':'bg-[#757BB8]'}`} onClick={clickFollowHandler} disabled={follow}>{follow?'Following':'Follow'}</button>
    <button className=' bg-[#757BB8] w-[118px] h-[30px] rounded-[15px]'>Give a task</button>
    
</div>

</div>


      
    </div>
  )
}

export default DesignerCard
