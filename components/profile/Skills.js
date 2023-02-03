import React from 'react'
import Image from 'next/image'
import Img1 from '../assets/imgs/logoSkills/1667px-Figma-logo.svg.png'
import Img2 from '../assets/imgs/logoSkills/adobe-xd-logo-64364E3A24-seeklogo.com.png'
import Img3 from '../assets/imgs/logoSkills/586d7ac125738d9f2d793e92.png'
import Img4 from '../assets/imgs/logoSkills/adobe-xd-logo-64364E3A24-seeklogo.com.png'
import Img5 from '../assets/imgs/logoSkills/586d7ac125738d9f2d793e92.png'
import Img6 from '../assets/imgs/logoSkills/png-clipart-adobe-indesign-adobe-creative-cloud-graphic-design-shop-text-triangle.png'
const Skills = () => {
  return (
    <div className='w-[233px] h-[161px] bg-[#51557E] flex flex-col items-center justify-center align-middle gap-5  text-[#E7F6F2] rounded-[45px]'>
      <p>Skills</p>
      {/* skills */}
      <div className='grid grid-cols-3 gap-x-2 b gap-y-2'>
<Image className='h-[40px] w-[30px]'  src={Img1} width={200} height={200}/>
<Image className='h-[34px] w-[30px]'  src={Img2} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img3} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img4} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img5} width={200} height={200}/>
<Image className='h-[34px] w-[30px]' src={Img6} width={200} height={200}/>

      </div>
    </div>
  )
}

export default Skills
