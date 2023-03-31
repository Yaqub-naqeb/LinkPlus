import React, { useState } from "react";
import Image from "next/image";
import Img1 from "../assets/imgs/logoSkills/1667px-Figma-logo.svg.png";

import { edit } from "../assets/svg/edit/edit";
import { useDispatch, useSelector } from "react-redux";
import { setSkillsEdit } from "@/redux/reducers/isOpen";
// import { SkillsIcon } from '../skillsIcon/SkillsIcon'
import react from "../assets/skills/react.png";
import js from "../assets/skills/Unofficial_JavaScript_logo_2.svg.png";
import html from "../assets/skills/480px-HTML5_Badge.svg.png";
import css from '../assets/skills/CSS3_logo.svg.png'
import git from '../assets/skills/Git_icon.svg.png'
import gitHub from '../assets/skills/Octicons-mark-github.svg.png'
import firebase from '../assets/skills/68747470733a2f2f696d672e69636f6e73382e636f6d2f636f6c6f722f3438302f66697265626173652e706e67.png'
import next from '../assets/skills/next.png'
import redux from '../assets/skills/redux.png'
import tailwindcss from '../assets/skills/Tailwind_CSS_Logo.svg.png'
import figma from '../assets/skills/figma.png'
import { useFetch } from "../useHooks/useFetch";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { blackEdit } from "../assets/svg/edit/blackEdit";

export const SkillsIcon = [
  {
    name: "Html",
    icon: html,
  },{
    name: "Css",
    icon: css,
  },
  {
    name: "TailwindCss",
    icon:tailwindcss,
  },
  {
    name: "React",
    icon: react,
  },
  {
    name: "JavaScript",
    icon: js,
  },
  {
    name: "Figma",
    icon: figma,
  },
  
  {
    name: "FireBase",
    icon: firebase,
  },
  
  {
    name: "Git",
    icon: git,
  },
  {
    name: "GitHub",
    icon: gitHub,
  },{
    name: "NextJs",
    icon: next,
  },{
    name: "Redux",
    icon: redux,
  }
];

const Skills = () => {

  const { data } = useFetch("Users");
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)
  const info=data&&data.filter(name=>name.id==user.uid)
  const PopUp = useSelector((state) => state.open);
  const dispatch = useDispatch();

  return (
 <div>
{/* for disctop */}
<div className=" lg:flex  md:flex hidden  flex-col items-center justify-center align-middle w-[233px]  h-[161px] bg-[#51557E]  gap-5  text-[#E7F6F2] rounded-[45px] relative place-self-start">
      <p>Skills</p>
      <p
        className="absolute right-3 cursor-pointer top-8"
        onClick={() => dispatch(setSkillsEdit(!PopUp.skillsEdit))}
      >
        {edit}
      </p>
      {/* skills */}
      <div className="grid grid-cols-3 gap-x-2 b gap-y-2 overflow-y-scroll scroll-smooth ">

        {data&&data.map((dt) =>
    dt.id==user.uid&&dt.skill&&dt.skill.map((pskill) =>
            SkillsIcon.map(
              (skill,index) =>
                pskill.label === skill.name && (
                  <Image key={index} className='h-[40px] w-[40px]' src={skill.icon}   width={800} height={800}/>
                )
            )
          )
        )}
        {/* {info&&info.map((pskill) =>
            SkillsIcon.map(
              (skill,index) =>
                pskill.label === skill.name && (
                  <Image key={index} className='h-[40px] w-[40px]' src={skill.icon}   width={800} height={800}/>
                )
            ))} */}


      </div>
    </div>

    {/* for mobile */}


    <div className="lg:hidden md:hidden relative">
       {/* skills */}
       <p
        className="absolute right-3 cursor-pointer -translate-y-[3.2rem] -translate-x-3 "
        onClick={() => dispatch(setSkillsEdit(!PopUp.skillsEdit))}
      >
        {blackEdit}
      </p>

      
       <div className="grid grid-cols-3 gap-x-1 b gap-y-5 ">
{data&&data.map((dt) =>
dt.id==user.uid&&dt.skill&&dt.skill.map((pskill) =>
    SkillsIcon.map(
      (skill,index) =>
        pskill.label === skill.name && (
          <Image key={index} className='h-[40px] w-[40px]' src={skill.icon}   width={800} height={800}/>
        )
    )
  )
)}
</div>
    </div>




 </div>
  );
};

export default Skills;
