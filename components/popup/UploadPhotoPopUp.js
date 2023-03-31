import React, { useEffect, useState } from 'react'
import { doc} from "firebase/firestore"; 
import { db, storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setEditPopup, setPostPopUp, setUploadProfilePhoto } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';
import { set_Profile_Photo } from '@/redux/reducers/profille';
import { collection, getDocs, query, where } from "firebase/firestore";
import {useServerRendering} from '../useHooks/useServerRendering'
const UploadPhotoPopUp = () => {


    const PopUp = useSelector((state) => state.open);
    const photoUrl=useSelector((state) => state.profile);
    console.log(photoUrl);

const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [photo,setPhoto]=useState(null);
const [bgphoto,setBgPhoto]=useState(null);
const {data}=useFetch('Users')
const [docId,setDocId]=useState();

useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setDocId(doc.id, " => ", doc.data())
    console.log(doc.data());
  });}

  rendering();

},[photoUrl&&photoUrl.photoUrl])

// Your Firebase SDK Initialization code here
const submitHandler =(e)=>{
  e.preventDefault();
  const db = getFirestore(); // initialize Firestore


const code=uuid();
// console.log(photo.name);
if(photo){
  const imageRef = ref(storage,`images/${photo.name+code}`);

  uploadBytes(imageRef, photo).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
  const docRef = doc(db, "Users",docId);
  // update the Profile image
  const data1 = {
  profilePhoto:url,
  };
  updateDoc(docRef, data1)
  .then(docRef => {
    alert("profile picture successfully changed");
  })
  .catch(error => {
    console.log(error);
  })
    });
  });
  
}
  const code1=uuid();
  // console.log(bgphoto.name);

 if(bgphoto){
  const bgImageRef = ref(storage,`images/${bgphoto.name+code1}`);

  // background photo
uploadBytes(bgImageRef, bgphoto).then((snapshot) => {
  getDownloadURL(snapshot.ref).then((url) => {
const docRef = doc(db, "Users",docId);
// update the Profile image
const data1 = {
backgroundPhoto:url,
};
updateDoc(docRef, data1)
.then(docRef => {
  alert("background picture successfully changed");
})
.catch(error => {
  console.log(error);
})
  });
});

 }


  setPhoto('')
  setBgPhoto('')
  dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))
}



  return (
    <div className='z-50 bg-white text-center  '>
   
<div className='flex relative lg:justify-end  lg:px-5'>
<div className='flex lg:px-0 px-3 align-middle items-center justify-between lg:gap-[9rem]'>
      <h1 className='font-semibold text-2xl py-5 '>Edit Profile Picture</h1>
<p className='cursor-pointer lg:relative absolute right-4' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='  flex flex-col items-center justify-center align-middle gap-16 lg:w-[30vw]  lg:h-[45vh] w-[90vw] lg:py-0  py-[3rem]  rounded-md shadow-md lg:px-16'>

    
      <div className='flex gap-3  items-center justify-center align-middle'>
       UploadImage: <input onChange={e=>setPhoto(e.target.files[0])}  type="file"  className='border   lg:max-w-full md:max-w-full  w-2/3 ' />
      </div>

{/* <div class="relative rounded-md bg-gray-100 p-4">
  <input type="file" onChange={e=>setPhoto(e.target.files[0])}  className="opacity-0 absolute inset-0 z-50" />
  <div class="flex items-center justify-center">
    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span class="ml-2 leading-none">Upload an image</span>
  </div>
</div> */}











      <div className='flex gap-3  items-center justify-center align-middle'>
       Upload Background Image: <input onChange={e=>setBgPhoto(e.target.files[0])}  type="file"  className='border   max-w-full ' />
      </div>
   
{/* image */}
<button className={`lg:w-full w-1/2  bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${photo||bgphoto?'':'opacity-40'} `}  disabled={photo||bgphoto?false:true} >Post</button>

    </div>
</form>

    </div>
  )
}

export default UploadPhotoPopUp



