import React, { useEffect, useState } from 'react'
import defaultImage from '../assets/imgs/profileImg/user.png'
import Link from 'next/link';
import Image from 'next/image';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseApp';
import { setIsDelete } from '@/redux/reducers/isOpen';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetch } from '../useHooks/useFetch';
const SingleNotfication = ({subCollection}) => {
  console.log(subCollection);

  const ob = useSelector((state) => state.open);
  const dispatch=useDispatch();
  const [docId,setDocId]=useState();

const [currentUserData,setCurrentUserData]=useState();
const [SenderUserData,setSenderUserData]=useState();

    const auth=getAuth();
    const us=useAuthState(auth);


//     useEffect(()=>{
//       const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", us[0].uid));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setDocId(doc.id, " => ", doc.data())
// setCurrentUserData(doc.data());
//         // dispatch(set_userName(doc.data().name))
//       });}
    
//       rendering();
    
//     },[])

console.log(subCollection);

    useEffect(()=>{
      const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==",subCollection.senderUserId&&subCollection.senderUserId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // setDocId(doc.id, " => ", doc.data())
setSenderUserData(doc.data());
        console.log(SenderUserData);

      });}
    
      rendering();
    
    },[])

    console.log(SenderUserData);



const deleteHandler=()=>{


// send data to firebase
 const docRefFriend = doc(db, `Users/${subCollection.userDocId}/follower`,subCollection.docId);
setDoc(docRefFriend,{
delete:true
})
dispatch(setIsDelete(!ob.isDelete))


}
const confirmHandler=()=>{

  
  // To delete the notfication 
 const docRefFriend = doc(db, `Users/${subCollection.userDocId}/follower`,subCollection.docId);
 setDoc(docRefFriend,{
 delete:true
 })

// update the folower inside users///////////////
const docRef1 = doc(db, "Users",subCollection.firstSenderDocId);
// const docRef1 = doc(db,`Users/${subCollection.userDocId}`);

const data1 = {
  following:SenderUserData.following+1,
};
updateDoc(docRef1, data1)
.then(docRef => {
  // alert("Follow sent");
})
.catch(error => {
  console.log(error);
})

 dispatch(setIsDelete(!ob.isDelete))
  
}


  return (
    // #efececde
    <div className={`flex gap-3  items-center align-middle px-2 justify-between bg-[#efececde] ${subCollection.delete&&'hidden'} py-3 mx-1 rounded-lg`}>
{/* the person that follows you */}

<div className='flex gap-3 items-center align-middle '>
    
      {/* profileeeeee circle*/}
      <div className="cursor-pointer "><Link href={"/profile"}>
              {subCollection.profilePhoto?<Image src={subCollection.profilePhoto} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:<Image src={defaultImage} className={`w-10 h-10 object-cover rounded-full `}/>}
              </Link>
              </div>

    {/* the name of this person  */}
    {subCollection.name}
    {/* <p className='font-extrabold text-lg'>yaqwb naqib</p> */}
</div>

<div className='flex gap-3 '>
<button className='bg-blue-400 rounded-md text-white px-2 py-2 ' onClick={confirmHandler}>Confirm</button>
<button className='bg-red-400 rounded-md text-white px-2 py-2 ' onClick={deleteHandler}>Delete</button>

</div>

</div>
  )
}

export default SingleNotfication
