import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setEditPopup, setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import Image from 'next/image';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';


const EditProfilePopUp = () => {

    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);

const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [age,setAge]=useState();
const [city,setCity]=useState();
const [experince,setExperince]=useState();

const {data}=useFetch('ProfileInfo')

const info=data&&data.filter(name=>name.id==user.uid)


// Your Firebase SDK Initialization code here
const submitHandler =(e)=>{
  e.preventDefault();
  const db = getFirestore(); // initialize Firestore

  const docRef = doc(db, "ProfileInfo", info[0]&&info[0].docId);
  
  const data1 = {
    age: age,
    experience:experince,
    city:city
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })

  setAge('')
  setCity('')
  setExperince('')
  dispatch(setEditPopup(!PopUp.editPopup))

  
}



  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex justify-end px-5 items-center'>
<div className='flex align-middle items-center justify-between gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5 '>Edit Profile</h1>
<p className='cursor-pointer' onClick={()=>dispatch(setEditPopup(!PopUp.editPopup))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-5 w-[30vw] h-[45vh] rounded-md shadow-md px-16'>

       

      <div className='flex gap-3  items-center justify-center align-middle'>
       Age: <input onChange={e=>setAge(e.target.value)} value={age} type="text" className='border   min-w-full ' />
      </div>
      <div className='flex gap-3  items-center justify-center align-middle'>
        City: <input onChange={e=>setCity(e.target.value)} value={city} type="text" className='border   min-w-full ' />
      </div>
      <div className='flex gap-3  items-center justify-center align-middle'>
       Experince: <input onChange={e=>setExperince(e.target.value)} value={experince} type="text" className='border   max-w-full ' />
      </div>
     

   
{/* image */}
<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${age&&city&&experince?'':'opacity-40'} `}  disabled={age&&city&&experince?false:true} >Post</button>

    </div>
</form>

    </div>
  )
}

export default EditProfilePopUp
