import React from 'react'
import { useFetchNotfication } from '../useHooks/useFetchNotfication';

import SingleNotfication from './SingleNotfication';

const Notfications = () => {

const {subCollection}=useFetchNotfication('follower');


  return (
    <div className='min-h-screen fixed right-0 top-[6rem] w-[23%] bg-[#51557E] z-50 py-10'>
{
subCollection&&<SingleNotfication subCollection={subCollection}/>
}



    </div>
  )
}

export default Notfications
