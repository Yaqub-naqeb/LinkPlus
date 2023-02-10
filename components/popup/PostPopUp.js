import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setPostPopUp } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref,listAll,uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import Image from 'next/image';
import UplodingImg from './UplodingImg';

const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
console.log(user);

const [text,setText]=useState();
const [file,setFile]=useState(null);
const [imageList,setImageList]=useState([]);


const imageListRef=ref(storage,'images/')
// const uploadImage=()=>{
//     if(file==null) return;
//     // its just name of the image with current time
//     const imageRef = ref(storage, `images/${file.name+uuid()}`);
//     uploadBytes(imageRef,file).then(()=>{
//         alert('image uploaded')

//     }
// )
// }
// to bring back all images
useEffect(()=>{
    listAll(imageListRef).then(response=>{
        console.log(response.items.forEach(item=>{
            getDownloadURL(item).then(url=>{
                setImageList(prev=>[...prev,url])
            })
        }));
    })
},[])




    const submitHandler=async(e)=>{
        e.preventDefault()

    // its just name of the image with current time
  

// uploding

const uploadImage=()=>{
    if(file==null) return;
    // its just name of the image with current time
    const imageRef = ref(storage, `images/${file.name+uuid()}`);
    uploadBytes(imageRef,file).then(()=>{
        alert('image uploaded')

    }
)
}
uploadImage();





















      
try{
    dispatch(setPostPopUp(!PopUp.postPopUp))
    const res=await addDoc(collection(db, "Posts"), {
       
        text: text,
        timeStamp:serverTimestamp(),
        img:file,
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
<input onChange={e=>setFile(e.target.files[0])} type="file" className='outline-none   w-[15rem] ' placeholder='What is on your mind, Yaqub?'/>
{/* <UplodingImg setFile={setFile} /> */}


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
