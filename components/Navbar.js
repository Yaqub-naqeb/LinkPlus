import React, { useState } from "react";
import Link from "next/link";
import { svg } from "./assets/svg/logo/svg";
import { darkSvg } from "./assets/svg/logo/darkSvg";
import { burger } from "./assets/svg/rigthNavbarIcons/burger";
import { Poppins } from "@next/font/google";
import { close } from "./assets/svg/rigthNavbarIcons/close";
import { search } from "./assets/svg/rigthNavbarIcons/search";
import { setting } from "./assets/svg/rigthNavbarIcons/setting";
import { notfication } from "./assets/svg/rigthNavbarIcons/notfication";
import { profile2 } from "./assets/svg/socialIcons/profile2";
import { setIsOpen } from "@/redux/reducers/isOpen";
import { useSelector, useDispatch } from "react-redux";
import { darkSearch } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSearch";
import { darkSetting } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSetting";
import { darkNotfication } from "./assets/svg/rigthNavbarIcons/darkIcons/darkNotfication"; 
import { useRouter } from "next/router";






const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const Navbar = () => {



  const pages=[
    {name:'Home',href:'/'},
    {name:'Projects',href:'/projects'},
    {name:'Tasks',href:'/tasks'},
    {name:'Designers',href:'/designers'}
  ]


  const router = useRouter();
const currentRoute = router.pathname;
console.log(currentRoute);


  const isOpen = useSelector((state) => state.open);
  // console.log(isOpenn.open);
  const dsipatch = useDispatch();

  return (
    
    <div className=" fixed  w-full z-50">
      <div
        className={`flex    align-middle items-center justify-between lg:px-20 md:px-10 px-5 ${isOpen.dark?'bg-[#1B2430] text-[#E7F6F2]':'bg-[#EBEBEB]'}   shadow-md py-6`}
      >
        {/* nav */}
        <nav className="flex align-middle items-center lg:gap-[10rem] justify-between md:gap-8">
          {/* logo */}
          <div className="flex gap-5 md:text-[.8rem] text-[.7rem] lg:text-[1rem]">
            {isOpen.dark? darkSvg:svg}
            <div
              className={`flex flex-col  align-middle items-center ${poppins.className}`}
            >
              <p> Designers </p>
              <p>commiunity</p>
            </div>
          </div>
          {/* links */}

          <div className="lg:block md:block hidden">
            <ul className="flex gap-5 ">
            
            
{pages&&pages.map(nav=>(<li  className={currentRoute === nav.href
       ? "active-class-name scale-125  font-[2rem]" 
       : "non-active-class-name"}>
                <Link href={nav.href}>{nav.name}</Link>
              </li> ))}


            </ul>
          </div>
        </nav>

        <div className="lg:block md:block hidden">
          <div className="flex gap-5 items-center align-middle justify-center">
            <div>{isOpen.dark?darkSearch:search}</div>
            <div>{isOpen.dark?darkNotfication:notfication}</div>
            <div>{isOpen.dark?darkSetting:setting}</div>
            <div className="cursor-pointer "><Link href={"/profile"}  >{profile2}</Link></div>
          </div>
        </div>

        {/* mobile */}

        <div className="lg:hidden md:hidden ">
          <div
            className="lg:hidden md:hidden transition-all  duration-300 ease-in-out cursor-pointer"
            onClick={() => dsipatch(setIsOpen(!isOpen.open))}
          >
            {isOpen.open ? close : burger}
          </div>
        </div>
      </div>

      <div
        className={`bg-[#EBEBEB] transition-all   duration-300 py-5 lg:hidden md:hidden  ease-in-out absolute w-full top-0 opacity-0 -z-50 ${
          isOpen.open
            ? `opacity-100 -z-10 top-20 transition-all  duration-300 ease-in-out`
            : ""
        } `}
      >
        {/* mobile */}
        <ul className=" flex flex-col text-[1.2rem] px-5 text-lg font-bold gap-5  ">
        {pages&&pages.map(nav=>(<li  className={currentRoute === nav.href
       ? "active-class-name scale-110  font-[2rem]" 
       : "non-active-class-name"}>
                <Link href={nav.href}>{nav.name}</Link>
              </li> ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
