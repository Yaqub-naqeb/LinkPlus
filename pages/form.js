import Login from '@/components/form/Login'
import SignUp from '@/components/form/SignUp'
import { useMode } from '@/components/useHooks/useMode';
import React from 'react'
import { useSelector } from 'react-redux';
import Head from 'next/head';


const form = () => {
  const Mode = useSelector((state) => state.open);
const {mode}=useMode();
  return (
       <Head>
    <meta name="google-site-verification" content="0mBSfDrUrat0KaaakEYLTBjBJNESc03bGquvZ75S46s" />
    </Head>
    <div className='  h-[90vh] flex flex-col items-center py-[40px]  align-middle gap-11'>
     <h1 className={`${mode?'text-[#E7F6F2]':'text-[#000]'}   text-[2.5rem] font- font-bold `}>Designers Community</h1>
     
     {Mode.login?<Login/>:<SignUp/>}
     {/* <Login/> */}
    </div>
  )
}

export default form
