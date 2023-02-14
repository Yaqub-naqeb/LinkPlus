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

const UploadPhotoPopUp = () => {


    const PopUp = useSelector((state) => state.open);
    const photoUrl=useSelector((state) => state.profile);

const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [photo,setPhoto]=useState(null);
const {data}=useFetch('ProfileInfo')
const [docId,setDocId]=useState();

useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "ProfileInfo"), where("id", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // dispatch(set_Profile_Photo(doc.data()))
    setDocId(doc.id, " => ", doc.data())
    // doc.id, " => ", doc.data()
    console.log(doc.data());
  });}

  rendering();

},[photoUrl.profilePhoto])

// Your Firebase SDK Initialization code here
const submitHandler =(e)=>{
  e.preventDefault();
  const db = getFirestore(); // initialize Firestore

// to get image url

const code=uuid();

const imageRef = ref(storage,`images/${photo.name+code}`);

uploadBytes(imageRef, photo).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
dispatch(set_Profile_Photo(url))
    });
  });



  const docRef = doc(db, "ProfileInfo",docId);
  
  const data1 = {
  profilePhoto:photoUrl.profilePhoto&&photoUrl.profilePhoto
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      alert("profile picture successfully changed");
  })
  .catch(error => {
      console.log(error);
  })

  setPhoto('')

  dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))
}


  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex justify-end px-5 items-center'>
<div className='flex align-middle items-center justify-between gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5 '>Edit Profile Picture</h1>
<p className='cursor-pointer' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-5 w-[30vw] h-[45vh] rounded-md shadow-md px-16'>

    
      <div className='flex gap-3  items-center justify-center align-middle'>
       UploadImage: <input onChange={e=>setPhoto(e.target.files[0])}  type="file"  className='border   max-w-full ' />
      </div>
   
{/* image */}
<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${photo?'':'opacity-40'} `}  disabled={photo?false:true} >Post</button>

    </div>
</form>

    </div>
  )
}

export default UploadPhotoPopUp



