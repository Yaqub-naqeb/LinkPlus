//   npm i swiper
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import im from '../assets/imgs/postImg/WallpaperDog-17124685.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Mousewheel, Pagination } from "swiper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setProjectsPhoto } from "@/redux/reducers/isOpen";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const SecondCrousel = () => {
  const PopUp = useSelector((state) => state.open);

const dispatch=useDispatch();

const clickHandler=()=>{
  dispatch(setProjectsPhoto(!PopUp.projectPhoto))
}

const auth=getAuth();
const [user,loading]=useAuthState(auth)

const {data}=useFetch('Users');

const profileUrl= data&&data.filter(name=>name.id==user.uid)
console.log(profileUrl[0]&&profileUrl[0].projectPhoto);





  return (
    
    <div className=" w-[730px] place-self-start relative  pt-8   h-[437px] col-start-1 row-start-0  col-span-2  rounded-2xl">
        {/*  translate-x-5 
     h-[437px] col-start-1 row-start-0  col-span-2  rounded-[45px] */}
<div className='text-center cursor-pointer w-fit  absolute left-[50%] translate-x-[-50%] top-0' onClick={clickHandler}>
+ Add your Projects
</div>



    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={100}
      mousewheel={true}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      className="mySwiper rounded-[45px]"
    >
     
   {
    profileUrl&&profileUrl[0]&&profileUrl[0].projectPhoto&& 
    profileUrl[0].projectPhoto.map((img,index)=>(<SwiperSlide className={'cursor-pointer'} key={index}><Image  width={3000} height={3000} className='w-full h-full ' src={img} /></SwiperSlide>)
)   

   }

    </Swiper>
  </div>
  )
}

export default SecondCrousel
