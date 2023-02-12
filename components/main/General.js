import React from "react";
import { profile } from "../assets/svg/rigthNavbarIcons/profile";
import Image from "next/image";
import chat from "../assets/imgs/homeImg/chat.png";
import saved from "../assets/imgs/homeImg/save-instagram.png";
import tasks from "../assets/imgs/homeImg/to-do-list.png";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const General = () => {
  const isOpen = useSelector((state) => state.open);
  const dark = useSelector((state) => state.open);
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)

const {data}=useFetch('ProfileInfo');


  return (
    <div
      className={`flex flex-col gap-8 h-[100vh] fixed left-[90px] top-[10rem] ${
        isOpen.open ? "-z-20" : ""
      }    ${dark.dark?'text-white':''}`}
    >
      <div className="flex items-center  gap-3">{profile} <p className='font-bold'>{user.displayName?user.displayName:data&&data.map(name=>name.data.id==user.uid&&name.data.name)}</p></div>
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
