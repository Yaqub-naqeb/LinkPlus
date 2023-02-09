import Login from '@/components/form/Login'
import SignUp from '@/components/form/SignUp'
import React from 'react'
import { useSelector } from 'react-redux';


const form = () => {
  const Mode = useSelector((state) => state.open);

  return (
    <div className='  h-[90vh] flex flex-col items-center py-[40px]  align-middle gap-11'>
     <h1 className={`${Mode.dark?'text-[#E7F6F2]':'text-[#000]'}   text-[2.5rem] font- font-bold `}>Designers Community</h1>
     <SignUp/>
     {/* <Login/> */}
    </div>
  )
}

export default form
