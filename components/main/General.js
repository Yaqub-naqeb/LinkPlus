import React from 'react'
import { profile } from '../assets/svg/profile'
import Image from 'next/image'
import chat from '../assets/svg/homeImg/chat.png'
import saved from '../assets/svg/homeImg/save-instagram.png'
import tasks from '../assets/svg/homeImg/to-do-list.png'

const General = () => {
  return (
    <div className='flex flex-col gap-8 h-[100vh]'>   
     <div className='flex items-center  gap-3'>{profile} full name</div>
     <div  className='flex items-center  gap-3'><Image className=' w-[40px] h-[40px]' src={chat} width={500} height={500} priority /> Messages</div>
     <div  className='flex items-center  gap-3'><Image className=' w-[40px] h-[40px]' src={saved} width={500} height={500} priority/> Saved</div>
     <div  className='flex items-center  gap-3'><Image className='w-[40px] h-[40px]' src={tasks} width={500} height={500} priority/> Tasks</div>
    </div>
  )
}

export default General
