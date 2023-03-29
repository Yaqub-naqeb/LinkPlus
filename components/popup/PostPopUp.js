// newIdea new branch
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setIsImagePosted, setIsLikeByUser, setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { set_isLiked, set_Update } from '@/redux/reducers/profille';
import { useFetch } from '../useHooks/useFetch';


const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [text,setText]=useState();
const [file,setFile]=useState(null);
const [postLoad,setPostLoad]=useState(true);
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
       dispatch(setIsImagePosted(false));
        setPostLoad(false);

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
// TODO:labar away postaka newya dabe false bchta naw

// dispatch(set_Update(!PopUp.update))

      
      });
    });
// like.isLikeByUser
dispatch(setPostPopUp(!PopUp.postPopUp))

setTimeout(() => {
  setPostLoad(true)
  dispatch(setIsImagePosted(true))
  dispatch(setIsLikeByUser(!PopUp.isLikeByUser))

}, 5000);

  }

  return (
    <div className='z-50 bg-white text-center   '>
   {/* flex justify-end lg:px-5 px-24 */}
<div className='flex relative lg:justify-end  lg:px-5  '>
<div className='flex lg:px-0 px-3 align-middle items-center justify-between lg:gap-[9rem]'>
      <h1 className='font-semibold text-2xl py-5 '>Create post</h1>
<p className='cursor-pointer lg:relative absolute right-4' onClick={()=>dispatch(setPostPopUp(!PopUp.postPopUp))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-16 lg:w-[30vw]  lg:h-[45vh] w-[90vw] lg:py-0  py-[3rem]  rounded-md shadow-md lg:px-16'>

       

      

<input onChange={e=>setText(e.target.value)} value={text} type="text" className='text-center
outline-none   min-w-full lg:border-b-2' placeholder={`What is on your mind, ${user.displayName?user.displayName:fullname.userName}?`}/>
{/* image */}
<input onChange={e=>setFile(e.target.files[0])}   type="file" className='outline-none   w-[15rem] ' required/>


<button className={`lg:w-full w-1/2  bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text&&postLoad?'':'opacity-40'} `} disabled={text&&postLoad?false:true}>Post</button>

    </div>
</form>

    </div>
  )
}

export default PostPopUp
