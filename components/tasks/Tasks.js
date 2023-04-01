import React from 'react'
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard'

const Tasks = () => {
    const Mode = useSelector((state) => state.open);

  return (
<div className='flex flex-col items-center'>
<div className=' grid lg:grid-cols-2 place-items-center gap-y-6 lg:gap-x-12 '>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
    </div>
</div>
  )
}

export default Tasks
