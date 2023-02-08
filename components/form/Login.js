import React, { useState } from 'react'
import { Eye } from '../assets/svg/passwordEye/Eye';

const Login = () => {
const [email,setEmail]=useState();
const [password,setPassword]=useState();


const submitHandler=(e)=>{
e.preventDefault();
console.log(email,password)
}


  return (
    <div className='w-[505px] h-[560px] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-16   '>
      
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
<button className='bg-[#51557E] tracking-wider rounded-[10px] w-[447px] h-[58px] font-bold text-[#E7F6F2] text-xl'>Create Account</button>
 <p className='text-2xl font-semibold  text-[#4A4E7C]'>SignUp</p>
</form>


    </div>
  )
}

export default Login
