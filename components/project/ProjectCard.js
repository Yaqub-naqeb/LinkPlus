import React from "react";
import SingleCard from "./SingleCard";
import { useFetchProjects } from "../useHooks/useFetchProjects";
const ProjectCard = () => {

const {subCollectionData}=useFetchProjects('Users');
  return (
    <div className="relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5 rounded-2xl pb-10 ">
{subCollectionData&&subCollectionData.map((user)=>(
  user&&user.map((subData,index)=><SingleCard key={index} data={subData} />)))}

    </div>
  );
};

export default ProjectCard;
