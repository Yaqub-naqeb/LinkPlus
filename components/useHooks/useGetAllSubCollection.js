// import { db } from "@/firebase/FirebaseApp";
// import { getAuth } from "firebase/auth";
// import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useFetch } from "./useFetch";

// export const useGetAllSubCollection = () => {
//     const [subCollection,setSubCollection]=useState([]);
// const {data}=useFetch('Users');
//     const auth=getAuth()
//     const [user]=useAuthState(auth);
//     const current=data&&data.filter(dt=>dt.id==user.uid)

//     useEffect(() => {
  
//         const blogsRef = collection(db, 'Users');
//         const querySnapshot = query(
//           blogsRef);
//         const unsubscribe = onSnapshot(querySnapshot, async(snapshot) => {

//     const WorkQ=query(collection(db,`Users/${current[0].docId}/follower`))
//     const workDetal=await getDocs(WorkQ)
//     const collectionInfo=workDetal.docs.map(doc=>({
//       ...doc.data(),docId:doc.id,
     
//     }))
//     setSubCollection(collectionInfo)


//         });






//        return ()=> unsubscribe();
//       }, []);
//       return { subCollection };

// }

