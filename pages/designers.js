import DesignerCard from '@/components/designers/DesignerCard'
import General from '@/components/main/General'
import React from 'react'

const designers = () => {
  return (
  <div className='flex flex-col items-center justify-start '>
      <div className='grid grid-cols-3 gap-8 place-items-center '>
        <General/>
        <DesignerCard/>
        <DesignerCard/>
        <DesignerCard/>
        <DesignerCard/>
        <DesignerCard/>
 
    </div>
  </div>
  )
}

export default designers
