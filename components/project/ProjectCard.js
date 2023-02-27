import React from "react";
import SingleCard from "./SingleCard";
import { useFetchProjects } from "../useHooks/useFetchProjects";
const ProjectCard = () => {

const {subCollectionData}=useFetchProjects('Users');
  return (
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl">
{subCollectionData&&subCollectionData.map((user)=>(
  user&&user.map((subData,index)=><SingleCard key={index} data={subData} />)))}

    </div>
  );
};

export default ProjectCard;
