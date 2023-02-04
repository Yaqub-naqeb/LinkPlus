import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  im from '../assets/imgs/postImg/WallpaperDog-17124685.jpg'
import  im1 from '../assets/imgs/profileImg/pexels-spencer-selover-775358.jpg'

import Slider from "react-slick";
import Image from 'next/image';
const Projects = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='w-[700px] place-self-start translate-x-5
     h-[437px] col-start-1 row-start-0  col-span-2  rounded-[45px]'>
       <Slider {...settings} className={' flex  items-center justify-center align-middle relative'} >
     
     
    
      <div className=''>

        <h3 >      <Image className=' h-full rounded-[45px] ' src={im} /></h3>
      </div>
    
      <div className='  '>

        <h3 >      <Image className=' rounded-[45px]' src={im} /></h3>
      </div>
    </Slider>
    </div>
  )
}

export default Projects
