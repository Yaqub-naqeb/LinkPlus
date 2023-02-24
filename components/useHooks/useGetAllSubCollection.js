import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetAllSubCollection = () => {
    const [subCollection,setSubCollection]=useState([]);

    useEffect(() => {
  
        const blogsRef = collection(db, 'Users');
        const querySnapshot = query(
          blogsRef);
        const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }));
      
      data&&data.map(async sub=>{
        const WorkQ=query(collection(db,`Users/${sub.docId}/moredetail`))
        const workDetal= await getDocs(WorkQ)
        const collectionInfo=workDetal.docs.map(doc=>({
          ...doc.data(),docId:doc.id,
         
        }))
        console.log(collectionInfo.length!=0&&collectionInfo);
        if(collectionInfo.length!=0){
          setSubCollection(collectionInfo);
      
        } })
        });
       return ()=> unsubscribe();
      }, [user]);
      return { data, isPending, error };

}

