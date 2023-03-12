import { db } from "@/firebase/FirebaseApp";
import { getAuth } from "firebase/auth";
import { collection, query,onSnapshot, orderBy, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


export const useFetchCurrentUserProjects = (collectionName) => {

    const auth=getAuth();
    const [user,loading]=useAuthState(auth)
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [subCollectionData,setSubCollection]=useState([]);
 console.log(user.uid);
//   useEffect
useEffect(() => {
  
  setIsPending(true);
  const blogsRef = collection(db, collectionName);
  const querySnapshot = query(
    blogsRef,
    orderBy('timeStamp','desc')
    );
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    setData(data);
    console.log(data);
    setIsPending(false);
// first user second
data.map( async sub=>{
  console.log(sub);
    // if you want to render all user you can inter sub.docId
    const WorkQ=query(collection(db,`Users/${sub.docId}/moredetail`))
    const workDetal= await getDocs(WorkQ)
    const collectionInfo=workDetal.docs.map(doc=>({
    ...doc.data(),docId:doc.id,}))
    // first Collection moredetail
if(user.uid==sub.id){
  setSubCollection((prev)=>[...prev,collectionInfo]); 
}

    })

    
  });
 
  return () => unsubscribe();
}, []);

  return { data,subCollectionData, isPending, error };
};



