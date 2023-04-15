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
import { setIsOpen, setIsProjectOpen, setNotfication, setUpdateNofication } from "@/redux/reducers/isOpen";
import { useSelector, useDispatch } from "react-redux";
import { darkSearch } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSearch";
import { darkSetting } from "./assets/svg/rigthNavbarIcons/darkIcons/darkSetting";
import { darkNotfication } from "./assets/svg/rigthNavbarIcons/darkIcons/darkNotfication"; 
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth,signOut } from "firebase/auth";
import SmallImage from "./profile/SmallImage";
import { useMode } from "./useHooks/useMode";
import { useFetchNotfication } from "./useHooks/useFetchNotfication";
import { messageNotfi } from "./assets/svg/rigthNavbarIcons/messageNotfi";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/FirebaseApp";
import { darkmsgNotfi } from "./assets/svg/rigthNavbarIcons/darkIcons/darkmsgNotfi";
import DarkToggle from "./main/toggle/DarkToggle";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const Navbar = () => {
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)

  const {subCollection}=useFetchNotfication('follower');
  // console.log(subCollection[0]);
  const isNewFolower=subCollection&&subCollection.filter(sub=>sub.isNew==true);
  console.log(isNewFolower[0]);





  const pages=[
    {name:'Home',href:'/',isProject:false},
    {name:'Projects',href:'/projects',isProject:true},
    {name:'Tasks',href:'/tasks',isProject:false},
    {name:'Users',href:'/users',isProject:false}
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
  dsipatch(setIsOpen(!isOpen.open))


}
const notfiHandler=()=>{

  // const friendDocId=uuid();
if(isNewFolower[0]&&isNewFolower[0].isNew){
  const docRefFriend = doc(db, `Users/${isNewFolower[0].userDocId}/follower`,isNewFolower[0].docId);
updateDoc(docRefFriend,{
profilePhoto:isNewFolower[0].profilePhoto&&isNewFolower[0].profilePhoto,
name:isNewFolower[0].name,
follow:'Followed you ',
timeStamp:isNewFolower[0].timeStamp,
docId:isNewFolower[0].docId,
userId:isNewFolower[0].userId,
isNew:false,
userDocId:isNewFolower[0].userDocId
})
}
dsipatch(setNotfication(!isOpen.notfication))

}


  return (
    
    
    <div className={`fixed bg-white z-50  w-full`}>
      <div
        className={`flex  align-middle items-center justify-between lg:px-20 md:px-10  px-5 ${mode?'bg-[#1B2430] text-[#E7F6F2]':'bg-[#EBEBEB]'}   shadow-md py-6`}
      >
        {/* nav */}
        <nav className="flex align-middle items-center lg:gap-[10rem] justify-between md:gap-8 ">
          {/* logo */}
          <div className="flex gap-3 md:text-[.8rem] text-[.7rem] lg:text-[1rem] cursor-pointer"               onClick={()=>router.push('/')}
>
            {mode? darkSvg:svg}
            <div
              className={`flex flex-col  align-middle justify-center items-center ${poppins.className}`}
            >
              {/* <p> JobFinders </p>
              <p>commiunity</p> */}
              <p>LinkPlus</p>
            </div>
          </div>
          {/* links */}

          <div className="lg:block  hidden  ">
            <ul className="flex gap-5">
            
            
{pages&&pages.map((nav,index)=>(<li key={index}  className={currentRoute === nav.href
       ? "active-class-name scale-125  font-[2rem]" 
       : "non-active-class-name"}>
                <Link  href={nav.href}>{nav.name}</Link>
              </li> ))}


            </ul>
          </div>
        </nav>

        <div className="lg:block  hidden">
          <div className="flex gap-5 items-center align-middle justify-center">
{/*  */}
            <div>{mode?darkSearch:search}</div>

            <div onClick={notfiHandler} className="cursor-pointer">{mode?isNewFolower[0]&&isNewFolower[0].isNew?darkmsgNotfi:darkNotfication: isNewFolower[0]&&isNewFolower[0].isNew?messageNotfi:notfication}</div>
            <div>{mode?darkSetting:setting}</div>
            {/* max-w-0 */}
            <div>
            <SmallImage/>

            </div>
            {user&&<div className="cursor-pointer " onClick={signOutHandler}><Link href={"/form"}  >SignOut</Link></div>}
          </div>
        </div>

        {/* mobile */}
{/* md:hidden */}




        <div className={`lg:hidden flex gap-3  items-center justify-center `}>


        <div onClick={notfiHandler} className="">{mode?isNewFolower[0]&&isNewFolower[0].isNew?darkmsgNotfi:darkNotfication: isNewFolower[0]&&isNewFolower[0].isNew?messageNotfi:notfication}</div>

        <SmallImage/>

          <div
            className="lg:hidden  transition-all  duration-300 ease-in-out cursor-pointer"
            onClick={() => dsipatch(setIsOpen(!isOpen.open))}
          >
            {isOpen.open ? close : burger}
          </div>
        </div>
      </div>

      <div
        className={` ${isOpen.open?'z-50 bg-black':'-z-50'}  ${mode?'bg-[#25303f] ':'bg-[#f4f4f4] shadow-md'} transition-all   duration-300 py-5 lg:hidden   ease-in-out absolute w-full md:px-6 px-5 top-0 opacity-0 -z-50 ${
          isOpen.open
            ? `opacity-100 -z-10 top-20 transition-all  duration-300 ease-in-out`
            : ""
        } `}
      >
        {/* mobile */}
        <div className=" ">

        <ul className={` ${isOpen.open?'':'hidden'}  ${mode?'text-white':'text-black'} flex flex-col text-[1.2rem] px-5 text-lg font-bold gap-5`}>

        <Link href={'/profile'} onClick={()=>dsipatch(setIsOpen(!isOpen.open))} className="flex gap-3 text-[0.9rem] translate-y-3 align-middle items-center" >        <SmallImage/> View Profile</Link>
<hr  className="mb-2"/>

        {pages&&pages.map((nav,index)=>(<li  key={index} className={currentRoute === nav.href
       ? "active-class-name scale-110  font-[2rem]" 
       : "non-active-class-name"}>


                <Link href={nav.href } onClick={()=>dsipatch(setIsOpen(!isOpen.open))}>{nav.name}</Link>
              </li> ))}
              {user&&<div className="cursor-pointer  text-red-500" onClick={signOutHandler}><Link href={"/form"}  >SignOut</Link></div>}

        </ul>
        {/* togle */}
        <div className="">
          <DarkToggle/>
        </div>

        </div>
      
        
      </div>
    </div>
  );
};

export default Navbar;
