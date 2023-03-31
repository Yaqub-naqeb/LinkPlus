//   npm i swiper
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
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
import { useMode } from "../useHooks/useMode";

const SecondCrousel = () => {
  const PopUp = useSelector((state) => state.open);
const dispatch=useDispatch();

const {data}=useFetch('Users');
const {mode}=useMode();

const auth=getAuth();
const [user]=useAuthState(auth)
const profileUrl= data&&data.filter(name=>name.id==user.uid)


  return (
    
    <div className="  lg:w-[730px] md:w-[730px] place-self-start relative  pt-8   lg:h-[437px] md:h-[437px] h-[250px] col-start-1 row-start-0  col-span-2  rounded-2xl">
<div className={`text-center cursor-pointer w-fit lg:block md:block  hidden absolute left-[50%] translate-x-[-50%] top-0 lg:text-[1rem] md:text-[1rem] text-[0.8rem] ${mode?'text-white':'text-black'}  `}
 onClick={()=>dispatch(setProjectsPhoto(!PopUp.projectPhoto))}>
+ Add your Projects
</div>
<div className={`text-center cursor-pointer w-fit lg:hidden md:hidden absolute left-[50%] translate-x-[8rem] translate-y-[-6.3rem] font-semibold  md:text-[1rem] text-[1.3rem] ${mode?'text-white':'text-black '}   `}
 onClick={()=>dispatch(setProjectsPhoto(!PopUp.projectPhoto))}>
+
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
      className="mySwiper rounded-[45px]" >
        {/* project images */}
{
    profileUrl&&profileUrl[0]&&profileUrl[0].projectPhoto&& 
    profileUrl[0].projectPhoto.map((img,index)=>(<SwiperSlide className={'cursor-pointer'} key={index}><Image  width={3000} height={3000} className='w-full h-full ' src={img} /></SwiperSlide>))
}
    </Swiper>
  </div>
  )
}

export default SecondCrousel
