import Image from "next/image";
import React from "react";
import { love } from "../assets/svg/socialIcons/love";
import Img from "../assets/imgs/postImg/WallpaperDog-17124685.jpg";
import Img1 from "../assets/imgs/profileImg/pexels-spencer-selover-775358.jpg";

import { view } from "../assets/svg/socialIcons/view";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import SingleCard from "./SingleCard";
const ProjectCard = () => {
  const auth=getAuth();
const {data}=useFetch('Users');



  return (
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl">
    {
  data&&data.map((user=>
    
<>
{user&&user.projectPhoto&&user.projectPhoto.map((prj,index)=><SingleCard key={index} data={user} src={prj}/>)}

</>
 
    ))

}




 
    </div>
  );
};

export default ProjectCard;
