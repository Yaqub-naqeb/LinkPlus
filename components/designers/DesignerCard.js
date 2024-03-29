import React, { useState } from 'react'
import ImageComponent from '../img/ImageComponent'
import Img1 from '../assets/imgs/profileImg/texture-of-scratches-old-blue-paper-abstract-background-free-photo.jpg'
import  profile  from '../assets/imgs/profileImg/user.png'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useFetch } from '../useHooks/useFetch'
import { useMode } from '../useHooks/useMode'
import { doc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { uuid } from 'uuidv4'
import { useFetchNotfication } from '../useHooks/useFetchNotfication'
import { setFollow, setNotfication, setUpdateNofication } from '@/redux/reducers/isOpen'
import { set_user_uid } from '@/redux/reducers/profille'

const DesignerCard = ({user,cu,index}) => {
  const Mode = useSelector((state) => state.open);
  const dispatch=useDispatch();
  const [dis,setDisable]=useState(false);
  const {mode}=useMode();


  const {subCollection}=useFetchNotfication('followings');

  
  const folowerData=useFetchNotfication('follower')


  const isFollow=subCollection&&subCollection.filter(sub=>user.id==sub.userId);



  const {data}=useFetch('Users');

const clickFollowHandler=()=>{


const current=data&&data.filter(dt=>dt.id==cu.uid)



const isFollow=subCollection&&subCollection.filter(sub=>user.id==sub.userId);
const followerId=folowerData.subCollection&&folowerData.subCollection.filter(sub=>user.id==sub.userId);

    const db = getFirestore(); // initialize Firestore



if(isFollow[0]?true:false){
// if it is true
// if unfollow
  if(isFollow[0].follow){



const docRef = doc(db, `Users/${current[0].docId}/followings`,isFollow[0].docId);
updateDoc(docRef,{
follow:false,
docId:isFollow[0].docId,
userId:user.id,

})


// if it is false
  }else{

 const docRef = doc(db, `Users/${current[0].docId}/followings`,isFollow[0].docId);
 setDoc(docRef,{
 follow:true,
 timeStamp:serverTimestamp(),
 userId:user.id,
 docId:isFollow[0].docId
 })


  }



}else{
// if it is New

 // send data to firebase
 const SecondDocId=uuid();
 const docRef = doc(db, `Users/${current[0].docId}/followings`,SecondDocId);
setDoc(docRef,{
follow:true,
timeStamp:serverTimestamp(),
userId:user.id,
docId:SecondDocId,
senderUserId:cu.uid

})

// send data to firebase
const friendDocId=uuid();
 const docRefFriend = doc(db, `Users/${user.docId}/follower`,friendDocId);
setDoc(docRefFriend,{
 profilePhoto:current[0]&&current[0].profilePhoto?current[0].profilePhoto:'',
name:current[0].name,
follow:'Followed you ',
timeStamp:serverTimestamp(),
docId:friendDocId,
userId:user.id,
isNew:true,
userDocId:user.docId,
senderUserId:cu.uid,
firstSenderDocId:current[0].docId,
isConfirm:false,
confirmFollow:false

})
// setUpdateNofication

setTimeout(() => {
  dispatch(setUpdateNofication(!Mode.updateNofication))

}, 5000);
}

  //  setFollow(false);
  dispatch(setFollow(!Mode.follow))
  dispatch(setUpdateNofication(!Mode.updateNofication))

}

// profileHandler
const profileHandler=()=>{
  dispatch(set_user_uid(user.id))
}  

console.log(index);


  return (

    <div className={`items-start content-start self-start hover:scale-105 hover:shadow-lg transition-all duration-100 ease-in-out shadow-md w-80 h-72 justify-self-start rounded-2xl ${mode?'bg-[#273649] text-[#E7F6F2] font-medium':'bg-[#ffffffe8]'}`}>
{/* top */}
<div className='relative w-full h-[40%]   rounded-b-none   '>
<ImageComponent 
        isContain={false}
        layout={true}
        pathImage={user.backgroundPhoto?user.backgroundPhoto&&user.backgroundPhoto:Img1}
        className={""}
      />
</div>

{/* bottom */}

<div className='flex flex-col items-center justify-start align-top '>
    <p className='translate-y-[-1.5rem]'>
      
      
       {/* profileeeeee */}
       <div className="cursor-pointer "><Link href={"/publicProfile"} onClick={profileHandler}>
              {user&&user.profilePhoto?<Image src={user.profilePhoto} className={`w-14 h-14 object-cover rounded-full `} width={100} height={100}/>:<Image src={profile} className={`w-14 h-14 object-cover rounded-full `} width={100} height={100}/>}
              </Link>
              </div>
      
      
      
      </p>
    <p className='text-xl font-[550] -translate-y-5'> {user.name}</p>
    <p className='text-sm -translate-y-5'>{user.experience}</p>
<div className='flex flex-col items-center gap-2 text-sm -translate-y-3'>

{
  cu.uid==user.id?<Link href={'/profile'}>  <button className=' bg-[#757BB8] mt-5 w-[148px] h-[30px] rounded-[15px]'>View your Profile</button>  </Link>
  :<>
  
  
  {subCollection&&
<button className={`bg-[#757BB8] w-[74px] h-[26px] cursor-pointer rounded-[15px] ${dis&&'bg-[#757bb82e]'}`} onClick={clickFollowHandler} disabled={dis}>
  
  {/* {subCollection.filter(sub=>(
  user.id==sub.userId
)).length==0?'follow':('following')} */}

{isFollow[0]&&isFollow[0].follow?'Following':'follow'}

</button>
}
    <button className=' bg-[#757BB8] w-[118px] h-[30px] rounded-[15px]'>Give a task</button>
  
  
  </>
}
    
</div>

</div>


      
    </div>
  )
}

export default DesignerCard
