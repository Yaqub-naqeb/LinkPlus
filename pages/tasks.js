import General from '@/components/main/General';
import Tasks from '@/components/tasks/Tasks';
import { useMode } from '@/components/useHooks/useMode';
import React from 'react'
import { useSelector } from 'react-redux';

const tasks = () => {
    const Mode = useSelector((state) => state.open);
    const {mode}=useMode();

  return (
    <div className={`min-h-screen `}>
                <General/>
<h1 className={`text-[1.2rem] font-semibold text-center pb-10 ${mode?'text-white':''}`}>Tasks</h1>
      <Tasks/>
    </div>
  )
}

export default tasks
