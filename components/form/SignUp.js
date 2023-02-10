import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { initFirebase } from '@/firebase/FirebaseApp';
// using react firebase hook
import {useAuthState}from 'react-firebase-hooks/auth'
// to redirect we are using useRouter
import { useRouter } from 'next/router';
import Link from 'next/link';


const SignUp = () => {
const [fullName,setFullName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [ConfirmPassword,setConfirmPassword]=useState();

initFirebase();
const provider = new GoogleAuthProvider();

const auth = getAuth();
const router=useRouter();

// using react firebase hooks
const [user,loading]=useAuthState(auth)


if(loading){
  return <div>Loading...</div>
}
if(user){
  router.push("/")
  
  return <div>welcom {user.displayName}</div>
}




const submitHandler=(e)=>{
e.preventDefault();



createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


  // with popup
setFullName('')
setEmail('')
setPassword('')
setConfirmPassword('')
}



const popupHandler=()=>{

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}




  return (
   <div className='h-[100vh]'>

<div className='w-[505px] h-[560px] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-8   '>
      
      <p className='text-4xl text-[#51557E] font-medium '>Welcome</p>
      
      <form onSubmit={submitHandler}  className='flex flex-col gap-5 items-center justify-center align-middle'>
      
      
      <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" name="" id="" placeholder='FullName' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword} type="password" name="" id="" placeholder='ConfirmPassword' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      
      {/* btn */}
      <button className='bg-[#51557E] tracking-wider rounded-[10px] w-[447px] h-[58px] font-bold text-[#E7F6F2] text-xl'>Create Account</button>
       <Link href={'/form'} className='text-2xl font-semibold  text-[#4A4E7C]'>Login</Link>
       <button onClick={popupHandler}>G</button>
      </form>
      
      
          </div>


   </div>
  )
}

export default SignUp
