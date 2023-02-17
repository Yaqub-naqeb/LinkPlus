import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db,storskill } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setEditPopup, setPostPopUp, setSkillsEdit } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
// import {  ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storskill";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
// import Imskill from 'next/imskill';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';


const AddSkillPopUp = () => {
    
    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [skillName,setSkillName]=useState();
const [description,setDescription]=useState();
const [proficiency,setProficiency]=useState();
console.log(proficiency);

const {data}=useFetch('ProfileInfo')

const info=data&&data.filter(name=>name.id==user.uid)


// // Your Firebase SDK Initialization code here
const submitHandler =(e)=>{

  e.preventDefault();

//   const db = getFirestore(); // initialize Firestore

//   const docRef = doc(db, "ProfileInfo", info[0]&&info[0].docId);
  
//   const data1 = {
//     skill: skillName,
//   };
  
//   updateDoc(docRef, data1)
//   .then(docRef => {
//       console.log("A New Document Field has been added to an existing document");
//   })
//   .catch(error => {
//       console.log(error);
//   })

//   setSkillName('')
// setDescription('');
// setProficiency('');
//   dispatch(setEditPopup(!PopUp.editPopup))

  
}
  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex justify-end px-5 items-center'>
<div className='flex align-middle items-center justify-between gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5 '>Add your Skills</h1>
<p className='cursor-pointer' onClick={()=>dispatch(setSkillsEdit(!PopUp.skillsEdit))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-5 w-[30vw] h-[45vh] rounded-md shadow-md px-16'>

       
      <label className='flex gap-3  items-center justify-center align-middle'>
       Skills: <input onChange={e=>setSkillName(e.target.value)} value={skillName} type="" className='border   min-w-full ' />
      </label>
      <label className='flex gap-3  items-center justify-center align-middle'>
      Description: <textarea onChange={e=>setDescription(e.target.value)} value={description} className='border   min-w-full '/>
      </label>
      <label   className='flex gap-3  items-center justify-center align-middle'>
      Proficiency: <select onChange={e=>setProficiency(e.target.value)} value={proficiency} className='border   min-w-full '>
          <option value="">Select proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>
   
{/* imskill */}
<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${skillName?'':'opacity-40'} `}  disabled={skillName?false:true}  >submit</button>

    </div>
</form>

    </div>
  )
}

export default AddSkillPopUp
