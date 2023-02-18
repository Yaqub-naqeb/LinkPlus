import React, { useState } from "react";
import Image from "next/image";
import Img1 from "../assets/imgs/logoSkills/1667px-Figma-logo.svg.png";

import { edit } from "../assets/svg/edit/edit";
import { useDispatch, useSelector } from "react-redux";
import { setSkillsEdit } from "@/redux/reducers/isOpen";
// import { SkillsIcon } from '../skillsIcon/SkillsIcon'
import ImageComponent from "../img/ImageComponent";

import react from "../assets/skillsIcon/React-icon.svg.png";
import js from "../assets/skillsIcon/Unofficial_JavaScript_logo_2.svg.png";
import html from "../assets/skillsIcon/HTML5_logo_and_wordmark.svg.png";

import { useFetch } from "../useHooks/useFetch";

export const SkillsIcon = [
  {
    name: "Html",
    icon: html,
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
    name: "figma",
    icon: Img1,
  },
];

const Skills = () => {
  const { data } = useFetch("ProfileInfo");
  console.log(
    data.map(
      (dt, index) =>
        dt &&
        dt.skill &&
        dt.skill.map((psk) => psk.label) == SkillsIcon.map((nm) => nm.name)
    )
  );


  const PopUp = useSelector((state) => state.open);
  const dispatch = useDispatch();

  return (
    <div className="w-[233px] h-[161px] bg-[#51557E] flex flex-col items-center justify-center align-middle gap-5  text-[#E7F6F2] rounded-[45px] relative place-self-start">
      <p>Skills</p>
      <p
        className="absolute right-3 cursor-pointer top-8"
        onClick={() => dispatch(setSkillsEdit(!PopUp.skillsEdit))}
      >
        {edit}
      </p>
      {/* skills */}
      <div className="grid grid-cols-3 gap-x-2 b gap-y-2">

        {data.map((dt) =>
          dt.skill.map((pskill) =>
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
  );
};

export default Skills;
