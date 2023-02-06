import DesignerCard from '@/components/designers/DesignerCard'
import General from '@/components/main/General'
import React from 'react'

const designers = () => {
  return (
    <div className='flex flex-col items-center min-h-screen '>
        <General/>
        <DesignerCard/>
    </div>
  )
}

export default designers
