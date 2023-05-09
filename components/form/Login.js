import React, { useState } from 'react'
import { Eye } from '../assets/svg/passwordEye/Eye';
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, initFirebase } from '@/firebase/FirebaseApp';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/redux/reducers/isOpen';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';

const Login = () => {
const [email,setEmail]=useState();
const [password,setPassword]=useState();

const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const [showPass,setShowPass]=useState(false);

const signForm = useSelector((state) => state.open);
const dsipatch = useDispatch();




const auth = getAuth();
const router=useRouter();

// using react firebase hooks
const [user,loading]=useAuthState(auth)

if(loading){
  return <div><TailSpin
  height="100"
  width="100"
  color="#757BB7"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperClass=""
  visible={true}
/></div>
}
if(user){
  router.push("/profile")  
  return <div>Welcome {user.displayName}</div>
}


initFirebase();


const submitHandler=(e)=>{
e.preventDefault();




if (!/\S+@\S+\.\S+/.test(email)) {
  setEmailError('Email is invalid');
}
// klfjsda


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
    console.log(errorCode);
    if(errorCode==='auth/user-not-found'){
      setEmailError('This Gmail was not found!');

    }
    else{
      setPasswordError('Wrong Password!');
    }
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
    <div className=' lg:w-[505px] w-[90vw] lg:h-[full] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center lg:gap-12 gap-8  py-5  translate-y-[-4rem]  '>
      
<p className='text-4xl text-[#51557E] font-bold '>Welcome Back</p>

<form onSubmit={submitHandler}  className='flex flex-col gap-5 lg:gap-8 items-center  align-middle'>


{/* first input */}
<input onChange={(e)=>setEmail(e.target.value)}  type="email"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] px-5 rounded-[10px] ' required/>

{emailError && <span className='text-red-500 font-semibold text-[0.8rem]'>{emailError}</span>}


<div>
<div className='relative'>
<input onChange={(e)=>setPassword(e.target.value)} type={`${showPass?'text':'password'}`} name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 lg:w-[447px] h-[2.5rem] w-[80vw] lg:h-[58px] rounded-[10px] ' required/>
{/* Eye icon */}
<div className='absolute right-4 -translate-y-7 lg:-translate-y-9 cursor-pointer' onClick={()=>setShowPass(!showPass)}>{Eye}</div>
</div>

{passwordError && <span className='text-red-500 font-semibold text-[0.8rem] '>{passwordError}</span>}



<p className='underline text-[#51557E] flex items-end justify-end mt-5'>Forgot Password?</p>
</div>


{/* btn */}
<button className='bg-[#51557E] tracking-wider rounded-[10px] lg:w-[447px] h-[2.5rem] w-[60vw] lg:h-[58px] font-bold text-[#E7F6F2] text-xl'>Login</button>
 <p className='text-2xl font-semibold cursor-pointer text-[#4A4E7C]' onClick={()=>dsipatch(setLogin(!signForm.login))}>SignUp</p>
</form>
<button  className="flex items-center lg:-translate-y-7 -translate-y-3 justify-center hover:bg-[#dad7d73b]  lg:p-3  rounded-full bg-white shadow cursor-pointer"
        onClick={popupHandler}>

<img className='lg:w-7 lg:h-7 w-6 h-6' src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt=""  />
</button>


    </div>
  )
}

export default Login
