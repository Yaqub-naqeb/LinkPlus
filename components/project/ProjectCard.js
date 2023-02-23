import Image from "next/image";
import React from "react";
import { love } from "../assets/svg/socialIcons/love";
import Img from "../assets/imgs/postImg/WallpaperDog-17124685.jpg";
import Img1 from "../assets/imgs/profileImg/pexels-spencer-selover-775358.jpg";

import { view } from "../assets/svg/socialIcons/view";
import ImageComponent from "../img/ImageComponent";
import { useFetch } from "../useHooks/useFetch";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import SingleCard from "./SingleCard";
const ProjectCard = () => {



  const auth=getAuth();
const [user,loading]=useAuthState(auth)

const {data}=useFetch('Users');
console.log(data);
console.log();

// const profileUrl= data&&data.filter(name=>name.id==user.uid)
// console.log(profileUrl[0]&&profileUrl[0].projectPhoto);




  return (
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl">
    


 {/*  */}
{
  // profileUrl[0]&&profileUrl[0]&&profileUrl[0].projectPhoto.map(((prj,index)=><SingleCard key={index} src={prj}/>))



  data&&data.map((user=>
    
<>
{user&&user.projectPhoto&&user.projectPhoto.map((prj,index)=><SingleCard key={index} src={prj}/>)}

</>
 
    ))

}




 
    </div>
  );
};

export default ProjectCard;
