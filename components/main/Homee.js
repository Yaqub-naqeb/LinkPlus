import React from 'react'
import General from './General'
import Posts from './Posts'
import ThirdPart from './ThirdPart'

const Homee = () => {
  return (
    //   flex items-center  align-middle w-[1424px]
    <div className=' grid grid-cols-1 place-items-center  '>
<General/>


<Posts/>
<br />
<Posts/>
<br />
<Posts/>
<br />
<Posts/>
<ThirdPart/>

    </div>
  )
}

export default Homee
