import React from 'react'

const UplodingImg = ({setFile}) => {
  return (
    <div>
      <input onChange={e=>setFile(e.target.files[0])} accept="image/png"  type="file" className='outline-none   w-[15rem] ' placeholder='What is on your mind, Yaqub?'/>
    </div>
  )
}

export default UplodingImg
