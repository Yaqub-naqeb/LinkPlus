import React from "react";
import Modal from "../redux/reducers/isOpen";
import Navbar from "./Navbar";
import { Poppins } from "@next/font/google";
import { useSelector } from "react-redux";
import DarkToggle from "./main/toggle/DarkToggle";
import PostPopUp from "./popup/PostPopUp";
import SignUp from "./form/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import EditProfilePopUp from "./popup/EditProfilePopUp";
import UploadPhotoPopUp from "./popup/UploadPhotoPopUp";
import Login from "./form/Login";
import AddSkillPopUp from "./popup/AddSkillPopUp";
import ProjectPopUp from "./popup/ProjectPopUp";
import { useMode } from "./useHooks/useMode";
import { useRouter } from "next/router";
import Notfications from "./notfications/Notfications";



const poppins = Poppins({ subsets: ["latin"], weight: ["600", "400", "700"] });
const Layout = ({ children }) => {
  const isDark = useSelector((state) => state.open);
  const {mode}=useMode();
  console.log(mode);
const auth=getAuth();
  const [user,loading]=useAuthState(auth)
  const router = useRouter();
  const currentPath = router.asPath;
  console.log(currentPath);

  return (
    <div className={`${poppins.className }  ${user?``:'bg-[#EBEBEB] flex items-center justify-center align-middle min-h-[100vh]'}`}  >
{/* background  */}


{user?<>
      <Navbar />
 <div className={`${isDark.postPopUp&&' blur-sm '}`}>

 {currentPath!='/publicProfile'&&<DarkToggle/>}
     <div className={`pt-[8rem]  px-[5rem] ${mode?'bg-[#1B2430]':'bg-[#EBEBEB]  '}`}>
      {isDark.notfication&&<Notfications/>}
     {children}

     </div>

   <div>  {isDark.postPopUp&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}></div>}
      {isDark.editPopup&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}></div>}
      {isDark.uploadProfilePhoto&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}></div>}
      {isDark.skillsEdit&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}></div>}
      {isDark.projectPhoto&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}></div>}
 
</div>
 </div>
 <div className="fixed top-[10rem] left-1/3  z-50">
       {isDark.postPopUp&&<PostPopUp/>}
       {isDark.editPopup&&<EditProfilePopUp/>}
       {isDark.uploadProfilePhoto&&<UploadPhotoPopUp/>}
       {isDark.skillsEdit&&<AddSkillPopUp/>}
       {isDark.projectPhoto&&<ProjectPopUp/>}

  </div> </>:<div className="pt-[5rem]">{isDark.login?<Login/>:<SignUp/>}</div>
}



    </div>
  );
};

export default Layout;
