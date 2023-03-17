import React from "react";
import Link from "next/link";
import { svg } from "./assets/svg/logo/svg";
import { darkSvg } from "./assets/svg/logo/darkSvg";
import { burger } from "./assets/svg/rigthNavbarIcons/burger";
import { Poppins } from "@next/font/google";
import { close } from "./assets/svg/rigthNavbarIcons/close";
import { search } from "./assets/svg/rigthNavbarIcons/search";
import { setting } from "./assets/svg/rigthNavbarIcons/setting";
import { notfication } from "./assets/svg/rigthNavbarIcons/notfication";
import { setIsOpen, setIsProjectOpen, setNotfication } from "@/redux/reducers/isOpen";
import { useSelector, useDispatch } from "react-redux";
import { darkSearch } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSearch";
import { darkSetting } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSetting";
import { darkNotfication } from "./assets/svg/rigthNavbarIcons/darkIcons/darkNotfication"; 
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth,signOut } from "firebase/auth";
import SmallImage from "./profile/SmallImage";
import { useMode } from "./useHooks/useMode";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const Navbar = () => {
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)


  const pages=[
    {name:'Home',href:'/',isProject:false},
    {name:'Projects',href:'/projects',isProject:true},
    {name:'Tasks',href:'/tasks',isProject:false},
    {name:'Designers',href:'/designers',isProject:false}
  ]


  const router = useRouter();
const currentRoute = router.pathname;
  const isOpen = useSelector((state) => state.open);
  const {mode}=useMode();
  const dsipatch = useDispatch();

const signOutHandler=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}


  return (
    
    <div className=" fixed  w-full z-50">
      <div
        className={`flex    align-middle items-center justify-between lg:px-20 md:px-10 px-5 ${mode?'bg-[#1B2430] text-[#E7F6F2]':'bg-[#EBEBEB]'}   shadow-md py-6`}
      >
        {/* nav */}
        <nav className="flex align-middle items-center lg:gap-[10rem] justify-between md:gap-8">
          {/* logo */}
          <div className="flex gap-5 md:text-[.8rem] text-[.7rem] lg:text-[1rem]">
            {mode? darkSvg:svg}
            <div
              className={`flex flex-col   align-middle items-center ${poppins.className}`}
            >
              <p> Designers </p>
              <p>commiunity</p>
            </div>
          </div>
          {/* links */}

          <div className="lg:block md:block hidden">
            <ul className="flex gap-5 ">
            
            
{pages&&pages.map((nav,index)=>(<li key={index}  className={currentRoute === nav.href
       ? "active-class-name scale-125  font-[2rem]" 
       : "non-active-class-name"}>
                <Link href={nav.href}>{nav.name}</Link>
              </li> ))}


            </ul>
          </div>
        </nav>

        <div className="lg:block md:block hidden">
          <div className="flex gap-5 items-center align-middle justify-center">
{/*  */}
            <div>{mode?darkSearch:search}</div>

            <div onClick={()=>dsipatch(setNotfication(!isOpen.notfication))}>{mode?darkNotfication:notfication}</div>
            <div>{mode?darkSetting:setting}</div>
            {/* max-w-0 */}
            <div>
            <SmallImage/>

            </div>
            {user&&<div className="cursor-pointer " onClick={signOutHandler}><Link href={"/form"}  >SignOut</Link></div>}
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
        {pages&&pages.map((nav,index)=>(<li  key={index} className={currentRoute === nav.href
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
