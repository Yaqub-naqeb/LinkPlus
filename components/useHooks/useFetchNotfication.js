
import { db } from "@/firebase/FirebaseApp";
import { current } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetch } from "./useFetch";

export const useFetchNotfication = () => {
    const [subCollection,setSubCollection]=useState([]);
    const [isDocIdAvalable,setIsDocIdAvalable]=useState(false);
const {data}=useFetch('Users');
    const auth=getAuth()
    const [user]=useAuthState(auth);
   

    useEffect(() => {
  
        const blogsRef = collection(db, 'Users');
        const querySnapshot = query(
          blogsRef);
        const unsubscribe = onSnapshot(querySnapshot, async(snapshot) => {
            const current=  data&&data.filter(dt=>dt.id==user.uid)

if(current[0]&&current[0].docId){
       const WorkQ=query(collection(db,`Users/${current[0].docId}/follower`))
    const workDetal=await getDocs(WorkQ)
    const collectionInfo=workDetal.docs.map(doc=>({
      ...doc.data(),docId:doc.id,
     
    }))
    setSubCollection(collectionInfo[0])
}else{
setIsDocIdAvalable(!isDocIdAvalable)
}
        });


console.log('hi');



       return ()=> unsubscribe();
      }, [isDocIdAvalable]);
      return { subCollection };

}

