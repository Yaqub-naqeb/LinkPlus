import React from "react";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import SingleCard from "./SingleCard";
const ProjectCard = () => {
  const auth=getAuth();
const {data,subCollectionData}=useFetch('Users');
console.log(subCollectionData);
  return (
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl">

{subCollectionData&&subCollectionData.map((subData,index)=><SingleCard key={index} data={subData&&subData} />)}

    </div>
  );
};

export default ProjectCard;
