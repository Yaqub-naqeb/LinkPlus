import React from 'react'
import General from './General'
import Posts from './Posts'
import ThirdPart from './ThirdPart'
import DarkToggle from './toggle/DarkToggle'

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
<DarkToggle/>

    </div>
  )
}

export default Homee
