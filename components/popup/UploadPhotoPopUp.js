import React, { useEffect, useState } from 'react'
import { doc} from "firebase/firestore"; 
import { db, storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setEditPopup, setIsUploading, setPostPopUp, setUploadProfilePhoto } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';
import { set_Profile_Photo } from '@/redux/reducers/profille';
import { collection, getDocs, query, where } from "firebase/firestore";

import { HiUpload } from "@heroicons/react/outline";
import UploadImageInput from './upload/UploadImageInput';
import UploadProfile from './upload/UploadProfile';
import { ColorRing } from 'react-loader-spinner';

import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

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

// setLod(true);
dispatch(setIsUploading(true))

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
    dispatch(setIsUploading(false))
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
.then(docRef  => {
  // alert("background picture successfully changed");
  // dispatch(setIsUploading(false))

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

// 

//  const uploadButtonStyles = "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex gap-3 ";




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
    <div className='  flex flex-col items-center justify-center   align-middle lg:gap-16 md:gap-14 gap-8 lg:w-[30vw]  lg:h-[45vh] w-[95vw] lg:py-0  py-[3rem]  rounded-md shadow-md lg:px-16   pl-3'>

{/* kdjlsa */}

<UploadProfile
      label="Image:"
      onChange={(e) => setPhoto(e.target.files[0])}
    />
<UploadImageInput
      label="Background Image:"
      onChange={(e) => setBgPhoto(e.target.files[0])}
    />
{/* kjl */}


   
{/* image */}
<button className={`lg:w-full w-1/2  bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${photo||bgphoto?'':'opacity-40'} `}  disabled={photo||bgphoto?false:true} >Post</button>
{/* <p>{lod&&<ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>}</p> */}
      {/* <RingLoader css={override} size={100} color={'#123abc'} loading={lod} /> */}


    </div>
</form>
    </div>
  )
}

export default UploadPhotoPopUp



