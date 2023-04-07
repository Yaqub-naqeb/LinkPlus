import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, getAdditionalUserInfo, confirmPasswordReset  } from "firebase/auth";
import { db, initFirebase } from '@/firebase/FirebaseApp';
// using react firebase hook
import {useAuthState}from 'react-firebase-hooks/auth'
// to redirect we are using useRouter
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {  set_userName } from '@/redux/reducers/profille';
import { addDoc, collection, serverTimestamp, setDoc,	
   } from 'firebase/firestore';
import { setLogin } from '@/redux/reducers/isOpen';
import { useFetch } from '../useHooks/useFetch';
import { TailSpin } from  'react-loader-spinner'


const SignUp = () => {


  const like = useSelector((state) => state.profile);
  const signForm = useSelector((state) => state.open);
  const dsipatch = useDispatch();
  const {data}=useFetch('Posts');
  const googleProvider = new GoogleAuthProvider();


const [fullName,setFullName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [ConfirmPassword,setConfirmPassword]=useState();
// 

const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [ConfirmpasswordError, setConfirmPasswordError] = useState('');







initFirebase();
const auth = getAuth();
const router=useRouter();

// using react firebase hooks
const [user,loading]=useAuthState(auth)
// npm install react-loader-spinner --save

if(loading){
  return <div><TailSpin
  height="100"
  width="100"
  color="#757BB7"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>
}
if(user){
  console.log(like.userName);
  router.push("/profile")  
  return <div>welcome {user.displayName}</div>
}

const submitHandler= async(e)=>{

  e.preventDefault();

if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError('Email is invalid');
  } else {
    setEmailError('');
  }
 if (password.length < 6 ) {
    setPasswordError('Password must be at least 6 characters');
  } else {
    setPasswordError('');
  }
if(ConfirmPassword.length < 6){
  setConfirmPasswordError('Password must be at least 6 characters');

}
 else if (ConfirmPassword !== password) {
    setConfirmPasswordError('Confirm Password must be Match with password');
  } else {
    setPasswordError('');


    
      // upload the fullname to firebase 
createUserWithEmailAndPassword(auth, email, password)
.then(async(userCredential) => {
  // Signed in 
 
  const user = userCredential.user;
  dsipatch(set_userName(fullName))

try{
const res=await addDoc(collection(db, "Users"), {
name:fullName,
  timeStamp:serverTimestamp(),
  email:email,
  password:password,
  confirmPassword:ConfirmPassword,
   city:'',
   age:'',
   experience:'',
   profilePhoto:'',
   id:user.uid,
  isLike:false,
  mode:false,
  following:0,
  follower:0, 
});
}catch(err){
console.log(err)
}
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  setEmailError('already this email is exist');
  // ..
});     

// with popup
setFullName('')
setEmail('')
setPassword('')
setConfirmPassword('')




  }



}
// Form validation



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
            isLike:false   ,
            mode:false ,
            following:0,
            follower:0,       
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
   <div className='h-[85vh] '>

<div className='lg:w-[505px] w-[90vw] lg:h-[full] py-5 rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-5   '>
      
<p className='text-4xl text-[#51557E] font-bold '>Welcome </p>
      
      <form onSubmit={submitHandler}  className='flex  flex-col gap-5 items-center justify-center align-middle'>
      
      
      <input onChange={e=>setFullName(e.target.value)} value={fullName} type="text" name="" id="" placeholder='FullName' className='bg-[#EBEBEB] outline-none px-5 lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] rounded-[10px] ' required/>
{/* Name Error */}
{nameError && <span className='text-red-500 text-[0.8rem] '>{nameError}</span>}





      <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none px-5 lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] rounded-[10px] ' required/>
{/*Email  */}
{emailError && <span className='text-red-500 text-[0.8rem]'>{emailError}</span>}




      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] rounded-[10px] ' required/>
      {/*Password */}
      {passwordError && <span className='text-red-500 text-[0.8rem] '>{passwordError}</span>}



      <input onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword} type="password" name="" id="" placeholder='ConfirmPassword' className='bg-[#EBEBEB] outline-none px-5 lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] rounded-[10px] ' required/>
      {ConfirmpasswordError && <span className='text-red-500 text-[0.8rem] '>{ConfirmpasswordError}</span>}

      
      {/* btn */}
     <button className='bg-[#51557E] tracking-wider rounded-[10px] lg:w-[447px] w-[65vw] h-[2.4rem] lg:h-[58px] font-bold text-[#E7F6F2] text-xl'>Create Account</button>
     
      </form>
      <button  onClick={()=>dsipatch(setLogin(!signForm.login))} className='text-2xl font-semibold  text-[#4A4E7C]'>Login</button>
      
      <button onClick={popupHandler}>G</button>

          </div>


   </div>
  )
}

export default SignUp
