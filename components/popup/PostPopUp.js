import React, { useState } from 'react'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';

const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();


const [text,setText]=useState();


    const submitHandler=async(e)=>{
        e.preventDefault()
        dispatch(setPostPopUp(!PopUp.postPopUp))
        const res=await addDoc(collection(db, "Posts"), {
            name: "Los Angeles",
            text: text,
        
          });
          setText('')
            }


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

       

      

<input onChange={e=>setText(e.target.value)} value={text} type="text" className='outline-none   w-[15rem] ' placeholder='What is on your mind, Yaqub?'/>

<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text?'':'opacity-40'} `} disabled={text?false:true}>Post</button>

    </div>
</form>
    </div>
  )
}

export default PostPopUp
