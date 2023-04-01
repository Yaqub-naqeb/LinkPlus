import React from 'react'
import { useSelector } from 'react-redux';
import { useMode } from '../useHooks/useMode';

const TaskCard = () => {
    const Mode = useSelector((state) => state.open);
const {mode}=useMode()
  return (
    <div className={`lg:w-[383px] w-[90vw] hover:scale-105 transition-all duration-150 ease-in-out h-[89px] rounded-2xl grid grid-cols-3 ${mode?' text-[#E7F6F2]  font-medium bg-[#273649]':'bg-[#FDFDFD]'} shadow-md place-items-center content-center text-center `}>
{/* first */}
<div>
    <p className='font-bold'>Task</p>
    <p>Logo Design</p>
     </div>
     {/* Second */}
<div>
<p className='font-bold '>Time</p>
<p>2 weeks</p>
</div>
<div> <button className=' rounded-full bg-[#
#51557E] w-[67px] h-[67px] bg-[#757BB8]'>Apply</button></div>
      
    </div>
  )
}

export default TaskCard
