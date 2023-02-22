import React, { useState } from 'react'
import { Eye } from '../assets/svg/passwordEye/Eye';
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, initFirebase } from '@/firebase/FirebaseApp';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/redux/reducers/isOpen';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Login = () => {
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const signForm = useSelector((state) => state.open);
const dsipatch = useDispatch();




const auth = getAuth();
const router=useRouter();

// using react firebase hooks
const [user,loading]=useAuthState(auth)

if(loading){
  return <div>Loading...</div>
}
if(user){
  router.push("/profile")  
  return <div>welcome {user.displayName}</div>
}


initFirebase();


const submitHandler=(e)=>{
e.preventDefault();

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user);
    navigate('/');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



}
const googleProvider = new GoogleAuthProvider();


 // sign up with Google
 const popupHandler = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const isNewuser = getAdditionalUserInfo(result).isNewUser;
    if (isNewuser) {
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     try{
       const res=await addDoc(collection(db, "Users"), {
           timeStamp:serverTimestamp(),
           email:user.email,
           name:user.displayName,
           city:'',
           age:'',
           experience:'',
           id:user.uid   , 
           isLike:false           
     })
     
   }catch(err){
   console.log(err)
   }
    }
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className='w-[505px] h-[560px] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-16  translate-y-[-4rem]  '>
      
<p className='text-4xl text-[#51557E] font-bold '>Welcome Back</p>

<form onSubmit={submitHandler}  className='flex flex-col gap-8 items-center  align-middle'>


{/* first input */}
<input onChange={(e)=>setEmail(e.target.value)}  type="text"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>

<div>
<div className='relative'>
<input onChange={(e)=>setPassword(e.target.value)} type="text" name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>
{/* Eye icon */}
<div className='absolute right-4 -translate-y-9 cursor-pointer'>{Eye}</div>
</div>



<p className='underline text-[#51557E] flex items-end justify-end my-2'>Forgot Password?</p>
</div>


{/* btn */}
<button className='bg-[#51557E] tracking-wider rounded-[10px] w-[447px] h-[58px] font-bold text-[#E7F6F2] text-xl'>Login</button>
 <p className='text-2xl font-semibold cursor-pointer text-[#4A4E7C]' onClick={()=>dsipatch(setLogin(!signForm.login))}>SignUp</p>
</form>
<button onClick={popupHandler}>G</button>



    </div>
  )
}

export default Login
