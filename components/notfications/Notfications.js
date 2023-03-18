import React from 'react'
import { useFetchNotfication } from '../useHooks/useFetchNotfication';

import SingleNotfication from './SingleNotfication';

const Notfications = () => {

const {subCollection}=useFetchNotfication('follower');
console.log(subCollection);


  return (
    <div className='min-h-screen fixed right-0 top-[6rem] w-[23%] bg-[#51557E] z-50 py-10 flex flex-col gap-3 '>
{
subCollection&&subCollection.map((sub,index)=>(
  <SingleNotfication key={index} subCollection={sub}/>
))
}




    </div>
  )
}

export default Notfications
