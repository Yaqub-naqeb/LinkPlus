import Login from '@/components/form/Login'
import SignUp from '@/components/form/SignUp'
import React from 'react'

const form = () => {
  return (
    <div className=' h-[90vh] flex flex-col items-center py-[40px]  align-middle gap-11'>
     <h1 className='text-[2.5rem] font- font-bold text-[#E7F6F2]'>Designers Community</h1>
     {/* <SignUp/> */}
     <Login/>
    </div>
  )
}

export default form
