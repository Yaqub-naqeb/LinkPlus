import React, { useEffect, useState } from "react";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import SingleCard from "./SingleCard";
import { db } from "@/firebase/FirebaseApp";
import { collection, getDocs, query } from "firebase/firestore";
import { useFetchProjects } from "../useHooks/useFetchProjects";
const ProjectCard = () => {
  // const [subCollectionData,setSubCollection]=useState([]);

  const [allDoc,setAllDoc]=useState([]);
// const {data}=useFetch('Users');


const {subCollectionData}=useFetchProjects('Users');
// console.log(subCollectionData);

// console.log(subCollectionData);


// useEffect(()=>{
//   const fun=()=>{
//   data&&data.map(async sub=>{
//     // if you want to render all user you can inter sub.docId
//     const WorkQ=query(collection(db,`Users/${sub.docId}/moredetail`))
//     const workDetal= await getDocs(WorkQ)
//     const collectionInfo=workDetal.docs.map(doc=>({
//       ...doc.data(),docId:doc.id,
     
//     })
//     )
//     // if(collectionInfo.length!=0){
//       setSubCollection(collectionInfo);
//       // setAllDoc((prevDocs) => [...prevDocs, collectionInfo]);

//     // }
//     console.log(subCollectionData);
//   })}

// fun();

// },[])






  return (
    <div className="relative grid grid-cols-3 gap-8 rounded-2xl">

{subCollectionData&&subCollectionData.map((subData,index)=><SingleCard key={index} data={subData&&subData} />)}

    </div>
  );
};

export default ProjectCard;
