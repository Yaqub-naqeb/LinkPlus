import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import Image from 'next/image';

const EditProfilePopUp = () => {

    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [text,setText]=useState();
const [file,setFile]=useState(null);
const [path,setPath]=useState('');
const [data,setData]=useState('');

// to get data
useEffect(()=>{
  const x =async()=>{
   const querySnapshot = await getDocs(collection(db, "ProfileInfo"));
   querySnapshot.forEach((doc) => {
   // unique id of the docs 
     setData((prev)=>[...prev,{id:doc.id,data:doc.data()}]);
   });
  }
  x();
 },[])


  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex justify-end px-5'>
<div className='flex align-middle items-center justify-between gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5 '>Create post</h1>
<p className='cursor-pointer' onClick={()=>dispatch(setPostPopUp(!PopUp.postPopUp))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-16 w-[30vw] h-[45vh] rounded-md shadow-md px-16'>

       

      

<input onChange={e=>setText(e.target.value)} value={text} type="text" className='outline-none   w-[15rem] ' placeholder={`What is on your mind, ${data&&data.map(name=>name.data.email==user.email&&name.data.name)}?`}/>
{/* image */}
<input onChange={e=>setFile(e.target.files[0])}   type="file" className='outline-none   w-[15rem] ' />


<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text?'':'opacity-40'} `} disabled={text?false:true}>Post</button>

    </div>
</form>

    </div>
  )
}

export default EditProfilePopUp
