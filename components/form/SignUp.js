import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { db, initFirebase } from '@/firebase/FirebaseApp';
// using react firebase hook
import {useAuthState}from 'react-firebase-hooks/auth'
// to redirect we are using useRouter
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {  set_userName } from '@/redux/reducers/profille';
import { addDoc, collection, serverTimestamp,	
   } from 'firebase/firestore';
import { setLogin } from '@/redux/reducers/isOpen';


const SignUp = () => {


  const like = useSelector((state) => state.profile);
  const signForm = useSelector((state) => state.open);
  const dsipatch = useDispatch();


const [fullName,setFullName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [ConfirmPassword,setConfirmPassword]=useState();

// to get data

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
  console.log(like.userName);
  router.push("/profile")  
  return <div>welcome {user.displayName}</div>
}




const submitHandler= async(e)=>{
e.preventDefault();


      // upload the fullname to firebase 

    
        



createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    // dsipatch(setSwe(!signForm.swe))
    const user = userCredential.user;
    dsipatch(set_userName(fullName))

    // router.push('/profile')
    // ...
  try{

// const idd=uuid();
// dsipatch(set_idd(idd))

const res=await addDoc(collection(db, "ProfileInfo"), {
  name:fullName,
    timeStamp:serverTimestamp(),
    email:email,
    password:password,
    confirmPassword:ConfirmPassword,
    //  idd:idd,    
     city:'',
     age:'',
     experience:'',
     profilePhoto:'',
     id:user.uid
    
  });

}catch(err){
console.log(err)
}








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
  .then(async(result) => {
 // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    try{
      const res=await addDoc(collection(db, "ProfileInfo"), {
          timeStamp:serverTimestamp(),
          email:user.email,
          name:user.displayName,
          city:'',
          age:'',
          experience:'',
          id:user.uid ,
          isLike:false         
          
        });
  
  }catch(err){
  console.log(err)
  }
  





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
   <div className='h-[80vh] '>

<div className='w-[505px] h-[560px] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-5   '>
      
<p className='text-4xl text-[#51557E] font-bold '>Welcome </p>
      
      <form onSubmit={submitHandler}  className='flex  flex-col gap-5 items-center justify-center align-middle'>
      
      
      <input onChange={e=>setFullName(e.target.value)} value={fullName} type="text" name="" id="" placeholder='FullName' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      <input onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword} type="password" name="" id="" placeholder='ConfirmPassword' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] ' required/>
      
      {/* btn */}
     <button className='bg-[#51557E] tracking-wider rounded-[10px] w-[447px] h-[58px] font-bold text-[#E7F6F2] text-xl'> Create Account</button>
     
      </form>
      <button  onClick={()=>dsipatch(setLogin(!signForm.login))} className='text-2xl font-semibold  text-[#4A4E7C]'>Login</button>
      
      <button onClick={popupHandler}>G</button>

          </div>


   </div>
  )
}

export default SignUp
