import React, { useEffect, useState } from 'react'
import { addDoc, doc, onSnapshot, serverTimestamp, setDoc} from "firebase/firestore"; 
import { db, storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setImageUrl, setProjectsPhoto} from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';
import { collection, getDocs, query, where } from "firebase/firestore";
const ProjectPopUp = () => {
    const PopUp = useSelector((state) => state.open);

const dispatch=useDispatch();

const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [photo,setPhoto]=useState([]);
const [projectName,setProjectName]=useState();
const [projectUrl,setProjectUrl]=useState();
const [docId,setDocId]=useState();

const {data}=useFetch('Users')
const profileUrl= data&&data.filter(name=>name.id==user.uid)
useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setDocId(doc.id, " => ", doc.data())
  });}

  rendering();

},[])


// Your Firebase SDK Initialization code here
const submitHandler =async(e)=>{
  e.preventDefault();
  const db = getFirestore(); // initialize Firestore

const code=uuid();
  const imageRef = ref(storage,`images/${photo.name+code}`);
  dispatch(setImageUrl(!PopUp.imageUrl))
  uploadBytes(imageRef, photo).then((snapshot) => {
    getDownloadURL(snapshot.ref).then(async(url) => {

   // send data to firebase
  const SecondDocId=uuid();
      const docRef = doc(db, `Users/${docId}/moredetail`,SecondDocId);
   await setDoc(docRef,{
    projectPhoto:url,
projectUrl:projectUrl?projectUrl:'',
projectName:projectName,
docIdd:docId,
timeStamp:serverTimestamp(),

   })

  //  its send image to firebase too but not inside subCollection
  const docRef1 = doc(db, "Users",docId);

  const data1 = {
  projectPhoto:profileUrl[0]&&profileUrl[0].projectPhoto==null?[url]:[...profileUrl[0]&&profileUrl[0].projectPhoto,url],
  };
  updateDoc(docRef1, data1)
  .then(docRef => {
    alert("profile picture successfully changed");
  })
  .catch(error => {
    console.log(error);
  })
    });
  });
  
  setPhoto('')
  setProjectName('')
  setProjectUrl('')
  dispatch(setProjectsPhoto(!PopUp.projectPhoto))
}


  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex relative lg:justify-end  lg:px-5  '>
<div className='flex lg:px-0 px-3 align-middle items-center justify-between lg:gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5  '>Edit Profile Picture</h1>
<p className='cursor-pointer lg:relative absolute right-4' onClick={()=>  dispatch(setProjectsPhoto(!PopUp.projectPhoto))}>{close}</p>
      </div>
</div>
    <hr />
    <form onSubmit={submitHandler}>
    <div className='    flex flex-col items-center justify-center align-middle gap-16 lg:w-[30vw]  lg:h-[45vh] w-[95vw] lg:py-0  py-[3rem]  rounded-md shadow-md lg:px-16'> 

{/* project Name */}
<div className='flex gap-3  items-center justify-center align-middle'>
       Project Name: <input onChange={e=>setProjectName(e.target.value)} value={projectName} type="text"  className='border   max-w-full ' required/>
      </div>

       {/* project Url */}
 <div className='flex gap-3  items-center justify-center align-middle'>
       Project Url: <input onChange={e=>setProjectUrl(e.target.value)}  type="text"  value={projectUrl} className='border   max-w-full ' />
      </div>

{/* project Image */}
      <div className='flex lg:gap-3 md:gap-3 gap-1 items-center justify-center align-middle'>
       Project image: <input onChange={e=>setPhoto(e.target.files[0])}  type="file"  className='border md:max-w-full max-w-[55vw]  lg:max-w-[30vw] ' required/>
      </div>


    
   
{/* image */}
<button className={`lg:w-full w-1/2  bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${photo&&projectName?'':'opacity-40'} `}  disabled={photo&&projectName?false:true} >Post</button>

    </div>
</form>

    </div>
  )
}

export default ProjectPopUp