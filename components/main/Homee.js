import React from 'react'
import General from './General'
import Posts from './Posts'
import ThirdPart from './ThirdPart'

const Homee = () => {
  return (
    //   flex items-center  align-middle
    <div className='w-[1424px] grid grid-cols-1 place-items-center  '>
<General/>


<Posts/>
<ThirdPart/>

    </div>
  )
}

export default Homee
