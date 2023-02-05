import React from 'react'
import General from './General'
import NewPost from './NewPost'
import Posts from './Posts'
import ThirdPart from './ThirdPart'
import DarkToggle from './toggle/DarkToggle'

const Homee = () => {
  return (
    //   flex items-center  align-middle w-[1424px]
    <div className=' flex flex-col py-5  pb-10 gap-1 items-center '>
<General/>
<NewPost/>

<Posts/>
<br />
<Posts/>
<br />
<Posts/>
<br />
<Posts/>
{/* <DarkToggle/> */}

    </div>
  )
}

export default Homee
