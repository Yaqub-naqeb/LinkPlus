import React from 'react'
import { useFetchNotfication } from '../useHooks/useFetchNotfication';

import SingleNotfication from './SingleNotfication';

const Notfications = () => {

const {subCollection}=useFetchNotfication('follower');

  return (
    <div className='lg:min-h-screen h-[70vw] lg:px-0 px-3 fixed right-0 top-[5.3rem] lg:top-[6rem] lg:w-[23%] w-[100vw] bg-[#51557E] z-50 lg:py-10 py-4 flex flex-col gap-3 '>
{
subCollection&&subCollection.map((sub,index)=>(
  <SingleNotfication key={index} subCollection={sub}/>
))
}




    </div>
  )
}

export default Notfications
