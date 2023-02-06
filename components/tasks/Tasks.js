import React from 'react'
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard'

const Tasks = () => {
    const Mode = useSelector((state) => state.open);

  return (
<div className='flex flex-col items-center'>
<div className=' grid grid-cols-2 place-items-center gap-8  '>
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
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
    </div>
</div>
  )
}

export default Tasks
