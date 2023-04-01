import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { colourOptions } from '../data';
import makeAnimated from 'react-select/animated';

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


// options
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]




const AddSkillPopUp = () => {


  function handleSelect(data) {
    setSkillName(data);
   
  
  }

  const animatedComponents = makeAnimated();
    
    const PopUp = useSelector((state) => state.open);
    const fullname=useSelector((state) => state.profile);
const dispatch=useDispatch();
const auth=getAuth();
const [skillName,setSkillName]=useState();


const {data}=useFetch('Users')
const [user,loading]=useAuthState(auth)

const info=data&&data.filter(name=>name.id==user.uid)


// // Your Firebase SDK Initialization code here
const submitHandler =(e)=>{

  e.preventDefault();
  const db = getFirestore(); // initialize Firestore

  const docRef = doc(db, "Users", info[0]&&info[0].docId);
  
  const data1 = {
    skill: skillName,
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })

  setSkillName('')
  dispatch(setSkillsEdit(!PopUp.skillsEdit))

  
}
  return (
    <div className='z-50 bg-white text-center '>
   {/* flex justify-end px-5 items-center */}
<div className='
flex relative lg:justify-end  lg:px-5 
'>
<div className='flex lg:px-0 px-3 align-middle items-center justify-between lg:gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5'>Add your Skills</h1>
<p className='cursor-pointer lg:relative absolute right-4' onClick={()=>dispatch(setSkillsEdit(!PopUp.skillsEdit))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='  flex flex-col items-center justify-center align-middle gap-16 lg:w-[30vw]  lg:h-[45vh] w-[90vw] lg:py-0  py-[3rem]  rounded-md shadow-md lg:px-16'> 
     
      <label   className='flex gap-3  items-center justify-center align-middle lg:translate-x-0 md:translate-x-0 -translate-x-4'>
     <span className='font-semibold'> Skills: </span><Select   className='border z-50  min-w-full '
      closeMenuOnSelect={false}
      components={animatedComponents}
      // defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      isSearchable={true}
      onChange={handleSelect}
      value={skillName}
      options={colourOptions}
    />
     
      </label>
   
{/* imskill */}
{/* ${skillName?'':'opacity-40'} */}
<button className={`lg:w-full w-1/2  bg-[#757BB8] h-[2rem]  rounded-full text-xl  font-semibold  `}  disabled={skillName?false:true}  >submit</button>

    </div>
</form>

    </div>
  )
}

export default AddSkillPopUp
