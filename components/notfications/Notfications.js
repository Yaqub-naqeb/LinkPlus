import React from 'react'
import { useFetchNotfication } from '../useHooks/useFetchNotfication';

import SingleNotfication from './SingleNotfication';
import { useMode } from '../useHooks/useMode';

const Notfications = () => {

const {subCollection}=useFetchNotfication('follower');
const {mode}=useMode();
  return (
    <div className={`lg:min-h-screen h-[70vw] lg:px-0  px-2 fixed right-0 top-[5.3rem] lg:top-[5.8rem] lg:w-[23%] w-[100vw]  z-50 lg:py-10 py-4 flex flex-col gap-3 rounded-lg lg:my-2 shadow-lg ${mode?'bg-[#25303F]':'bg-[#fff]'}`}>
{
subCollection&&subCollection.map((sub,index)=>(
  <SingleNotfication key={index} subCollection={sub}/>
))
}




    </div>
  )
}

export default Notfications
