import React from 'react'
import ImageComponent from '../img/ImageComponent'
import { love } from "../assets/svg/socialIcons/love";
import { view } from "../assets/svg/socialIcons/view";

const SecondSingleCard = ({data}) => {
  return (
    <div className="relative overflow-hidden transition-all duration-150 ease-in-out projectCard rounded-2xl ">
    <div className="transition-all duration-150 ease-in-out w-80 h-72 ">
      <ImageComponent
        isContain={false}
        layout={true}
        pathImage={data&&data.projectPhoto &&data.projectPhoto
        }  
      />
    </div>
  
    {/* info about project */}
    <div className=" overflow-hidden imm info absolute bottom-0  rounded-2xl bg-transparent  bg-gradient-to-t from-[#000000]  w-full h-[0%]  opacity-0  text-white    flex justify-around  transition-all duration-100 ease-in-out pt-4">
      {/* name of prj */}
      <div className=" flex flex-col text-[1.2rem] justify-center align-middle items-start">
        {/* ProjectName */}
        <p className=" ">{data&&data.projectName}</p>
        {/* project Url */}
        <a href={data&&data.projectUrl?data.projectUrl:'#'}  target='_blank' className="hover:underline">{data&&data.projectUrl?'Demo':'Please Add Url'}</a>
      </div>
      {/* svg */}
      <div className="flex items-center justify-center gap-3 align-middle">
        {love}
        {view}
      </div>
    </div>
  </div>
  )
}

export default SecondSingleCard
