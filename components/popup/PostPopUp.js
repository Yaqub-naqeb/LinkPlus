// newIdea new branch
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setIsLikeByUser, setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { set_Update } from '@/redux/reducers/profille';
import { useFetch } from '../useHooks/useFetch';


const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [text,setText]=useState();
const [file,setFile]=useState(null);
// const [data,setData]=useState('');

const {data}=useFetch('Users');






  const current=data&&data.filter(dt=>dt.id==user.uid)
  console.log(current);

  
const addData = async (
  img,
  text,
  userid,
) => {
  const docRef = await addDoc(collection(db, 'Posts'), {
    src: img,
    name:user.displayName?user.displayName:fullname.userName,
    text: text,
    id: userid,
    timeStamp: serverTimestamp(),
    likes:0,
    isLiked:false,
    isNew:true,
    userUid:user.uid,
    profilePhoto:current&&current[0]&&current[0].profilePhoto?current[0].profilePhoto:''

  });
  // console.log('Document written with ID: ', docRef.id);
};




      // upload the text

    const submitHandler=async(e)=>{
        e.preventDefault()

    const code=uuid();

    const imageRef = ref(storage,`images/${file.name+code}`);


    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async(url) => {
        dispatch(set_Update(url))
       

        // add them to fire base
        addData(
          url,
          text,
          user && user.uid,
        
        );
dispatch(setIsLikeByUser(!PopUp.isLikeByUser))

        dispatch(setPostPopUp(!PopUp.postPopUp))

      
      });
    });

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

       

      

<input onChange={e=>setText(e.target.value)} value={text} type="text" className=' pl-[10%] outline-none   min-w-full ' placeholder={`What is on your mind, ${user.displayName?user.displayName:fullname.userName}?`}/>
{/* image */}
<input onChange={e=>setFile(e.target.files[0])}   type="file" className='outline-none   w-[15rem] ' required/>


<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text?'':'opacity-40'} `} disabled={text?false:true}>Post</button>

    </div>
</form>

    </div>
  )
}

export default PostPopUp
