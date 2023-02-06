import React from 'react'
import { useSelector } from 'react-redux';

const TaskCard = () => {
    const Mode = useSelector((state) => state.open);

  return (
    <div className={`w-[383px] h-[89px] rounded-2xl grid grid-cols-3 ${Mode.dark?' text-[#E7F6F2]  font-medium':'bg-[#FDFDFD]'} shadow-md place-items-center content-center text-center`}>
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
