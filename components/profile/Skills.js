import React, { useState } from 'react'
import Image from 'next/image'
import Img1 from '../assets/imgs/logoSkills/1667px-Figma-logo.svg.png'
import Img2 from '../assets/imgs/logoSkills/adobe-xd-logo-64364E3A24-seeklogo.com.png'
import Img3 from '../assets/imgs/logoSkills/586d7ac125738d9f2d793e92.png'
import Img4 from '../assets/imgs/logoSkills/adobe-xd-logo-64364E3A24-seeklogo.com.png'
import Img5 from '../assets/imgs/logoSkills/586d7ac125738d9f2d793e92.png'
import Img6 from '../assets/imgs/logoSkills/png-clipart-adobe-indesign-adobe-creative-cloud-graphic-design-shop-text-triangle.png'
import { edit } from '../assets/svg/edit/edit'
import { useDispatch, useSelector } from 'react-redux'
import { setSkillsEdit } from '@/redux/reducers/isOpen'
// import { SkillsIcon } from '../skillsIcon/SkillsIcon'
import ImageComponent from '../img/ImageComponent'


import react from '../assets/skillsIcon/React-icon.svg.png'
import js from '../assets/skillsIcon/Unofficial_JavaScript_logo_2.svg.png'
import html from '../assets/skillsIcon/HTML5_logo_and_wordmark.svg.png'
import css from '../assets/skillsIcon/png-transparent-cascading-style-sheets-logo-css3-html-web-development-world-wide-web-blue-angle-web-design.png'

export const SkillsIcon=[
  
  {
    name:'Html'
    ,icon:html
  },{
    name:'React'
    ,icon:react
},{
    name:'JavaScript'
    ,icon:js
},
{
    name:'figma'
    ,icon:Img1
},
]




const Skills = () => {












  
  const [icons,setIcons]=useState(SkillsIcon);
  console.log(icons[0]);

  const PopUp = useSelector((state) => state.open);
  const dispatch=useDispatch();



  return (
    <div className='w-[233px] h-[161px] bg-[#51557E] flex flex-col items-center justify-center align-middle gap-5  text-[#E7F6F2] rounded-[45px] relative place-self-start'>
      <p>Skills</p>
      <p className='absolute right-3 cursor-pointer top-8' onClick={()=>dispatch(setSkillsEdit(!PopUp.skillsEdit))}>{edit}</p>
      {/* skills */}
      <div className='grid grid-cols-3 gap-x-2 b gap-y-2'>




{
  SkillsIcon.map((icon,index)=>(<Image key={index} className='h-[40px] w-[40px]' src={icon.icon}   width={800} height={800}/>))
}

{/* <Image className='h-[34px] w-[30px]'  src={Img2} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img3} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img4} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img5} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img6} width={200} height={200}/> */}

      </div>
    </div>
  )
}

export default Skills
