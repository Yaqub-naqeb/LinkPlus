import React from "react";
import Image from "next/image";
import chat from "../assets/imgs/homeImg/chat.png";
import saved from "../assets/imgs/homeImg/save-instagram.png";
import tasks from "../assets/imgs/homeImg/to-do-list.png";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SmallImage from "../profile/SmallImage";
import { useMode } from "../useHooks/useMode";

const General = () => {
  const dark = useSelector((state) => state.open);
  const name = useSelector((state) => state.profile);
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)
  const {mode}=useMode();
console.log(mode);


  return (
    <div
      className={` lg:flex   hidden flex-col gap-8 h-[100vh] fixed left-[90px] top-[10rem] ${
        dark.open ? "-z-20" : ""
      }    ${mode?'text-white':''}`}
// isMobile

    >
      <div className="flex items-center  gap-3"><SmallImage/><p className='font-bold'>{user.displayName?user.displayName:name.userName}</p></div>
      <div className="flex items-center  gap-3">
        <Image
          className=" w-[40px] h-[40px]"
          src={chat}
          width={500}
          height={500}
          priority
        />{" "}
        Messages
      </div>
      <div className="flex items-center  gap-3">
        <Image
          className=" w-[40px] h-[40px]"
          src={saved}
          width={500}
          height={500}
          priority
        />{" "}
        Saved
      </div>
      <div className="flex items-center  gap-3">
        <Image
          className="w-[40px] h-[40px]"
          src={tasks}
          width={500}
          height={500}
          priority
        />{" "}
        Tasks
      </div>
    </div>
  );
};

export default General;
