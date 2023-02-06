import React from 'react'
import General from './General'
import NewPost from './NewPost'
import Posts from './Posts'


const Homee = () => {
  return (
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

    </div>
  )
}

export default Homee
