import General from '@/components/main/General';
import Tasks from '@/components/tasks/Tasks';
import React from 'react'
import { useSelector } from 'react-redux';

const tasks = () => {
    const Mode = useSelector((state) => state.open);

  return (
    <div className={`min-h-screen `}>
                <General/>

      <Tasks/>
    </div>
  )
}

export default tasks
