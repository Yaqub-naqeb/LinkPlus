import React from 'react'
import { dark } from '../assets/svg/darkImg/dark'
import { useSelector,useDispatch } from 'react-redux'
import { setDarkMode } from '@/redux/reducers/isOpen'
import { dark2 } from '../assets/svg/darkImg/dark2'
const ThirdPart = () => {

  const Mode = useSelector((state) => state.open);
  console.log(Mode.dark);

const dispatch=useDispatch();

  return (
    <div className='fixed right-[90px] top-[10rem] '>

{/* third part */}
<div className='flex cursor-pointer items-end justify-end align-bottom transition-all duration-700 ease-out place-content-end place-items-end' onClick={()=>dispatch(setDarkMode(!Mode))}>
    {Mode.dark?dark2:dark}
</div>


    </div>
  )
}

export default ThirdPart
