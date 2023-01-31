import React from 'react'
import General from './General'
import Posts from './Posts'

const Homee = () => {
  return (
    //   flex items-center  align-middle
    <div className='w-[1424px] grid grid-cols-3  place-content-center '>
<General/>


<Posts/>


    </div>
  )
}

export default Homee
