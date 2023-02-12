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


const PostPopUp = () => {

    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [imageList,setImageList]=useState([]);
const [text,setText]=useState();
const [file,setFile]=useState(null);
const [path,setPath]=useState('');
const [data,setData]=useState('');
const imageListRef=ref(storage,'images/')



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

 const x=data&&(data.filter(name=>name.data.id==user.uid&&name.data.name&&name.data.name));
//  console.log(data&& x[0].data.name);
// console.log(data&&(data.filter(name=>name.data.id==user.uid&&name.data.name)))


// console.log(user.displayName?user.displayName:data&&(data.filter(name=>name.data.id==user.uid&&name.data.name)));

//  {user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid&&name.data.name)}

// console.log(user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid));

// to upload image

useEffect(()=>{
   const uploadFile=()=>{
    const code=uuid();
    const storageRef = ref(storage,`images/${file.name+code}`);
    setPath(code)

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
      name:user.displayName||user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid&&name.data.name),
        text: text,
        timeStamp:serverTimestamp(),
        likes:"Num",
        src: path,
        id:user.uid
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

       

      

<input onChange={e=>setText(e.target.value)} value={text} type="text" className=' pl-[10%] outline-none   min-w-full ' placeholder={`What is on your mind, ${user.displayName?user.displayName:data&&x[0].data.name}?`}/>
{/* image */}
<input onChange={e=>setFile(e.target.files[0])}   type="file" className='outline-none   w-[15rem] ' />


<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${text?'':'opacity-40'} `} disabled={text?false:true}>Post</button>

    </div>
</form>

    </div>
  )
}

export default PostPopUp
