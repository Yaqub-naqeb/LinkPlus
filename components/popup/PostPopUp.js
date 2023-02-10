import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import Image from 'next/image';

const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [imageList,setImageList]=useState([]);
const [text,setText]=useState();
const [file,setFile]=useState(null);
const imageListRef=ref(storage,'images/')

// to get all image
useEffect(()=>{
    listAll(imageListRef).then(response=>{
        response.items.forEach(item=>{
            getDownloadURL(item).then(url=>{
                setImageList(prev=>[...prev,url])
            })
        })
    })
},[])


// to upload image

useEffect(()=>{
   const uploadFile=()=>{
    // console.log(name+'hi');
    const storageRef = ref(storage,`images/${file.name+uuid()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
     
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
        console.log(downloadURL);
    });
  }
);

   }
   file && uploadFile();
},[file])





      // upload the text

    const submitHandler=async(e)=>{
        e.preventDefault()

try{
    dispatch(setPostPopUp(!PopUp.postPopUp))
    const res=await addDoc(collection(db, "Posts"), {
        name:"hi",
        text: text,
        timeStamp:serverTimestamp(),
        likes:"Num",
        src:file.name,
     user:user.displayName
      
    
      });

}catch(err){
console.log(err)
}



          setText('')
          setFile('');
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
{/* image */}
<input onChange={e=>setFile(e.target.files[0])} accept="image/png"  type="file" className='outline-none   w-[15rem] ' placeholder='What is on your mind, Yaqub?'/>


<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text?'':'opacity-40'} `} disabled={text?false:true}>Post</button>

    </div>
</form>
<div className='flex '>
{imageList.map(url=>{
    return <Image src={`${url}`} width={200} height={200}/>
})}
</div>
    </div>
  )
}

export default PostPopUp
