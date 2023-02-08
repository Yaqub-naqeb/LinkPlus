import React, { useState } from 'react'

const SignUp = () => {
const [fullName,setFullName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [ConfirmPassword,setConfirmPassword]=useState();


const submitHandler=(e)=>{
e.preventDefault();
console.log(fullName,email,password,ConfirmPassword)


}


  return (
    <div className='w-[505px] h-[560px] rounded-[25px] bg-[#FFFFFF]  text-center flex flex-col items-center align-middle justify-center gap-8   '>
      
<p className='text-4xl text-[#51557E] font-medium '>Welcome</p>

<form onSubmit={submitHandler}  className='flex flex-col gap-5 items-center justify-center align-middle'>


<input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" name="" id="" placeholder='FullName' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>
<input onChange={(e)=>setEmail(e.target.value)}  type="text"  name="" id="" placeholder='Email' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>
<input onChange={(e)=>setPassword(e.target.value)} type="text" name="" id="" placeholder='Password' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>
<input onChange={(e)=>setConfirmPassword(e.target.value)} type="text" name="" id="" placeholder='ConfirmPassword' className='bg-[#EBEBEB] outline-none px-5 w-[447px] h-[58px] rounded-[10px] '/>

{/* btn */}
<button className='bg-[#51557E] tracking-wider rounded-[10px] w-[447px] h-[58px] font-bold text-[#E7F6F2] text-xl'>Create Account</button>
 <p className='text-2xl font-semibold  text-[#4A4E7C]'>Login</p>
</form>


    </div>
  )
}

export default SignUp
