import { db } from "@/firebase/FirebaseApp";
import { getAuth } from "firebase/auth";
import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";


export const useFetch = (collectionName) => {
  const PopUp = useSelector((state) => state.open);
  const [isImageLoad,setIsImageLoad]=useState(false);

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const auth=getAuth();
  const {user}=useAuthState(auth)
  const [subCollectionData,setSubCollection]=useState([]);

  
useEffect(() => {
  
  setIsPending(true);
  const blogsRef = collection(db, collectionName);
  const querySnapshot = query(
    blogsRef);
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    data.map(async sub=>{
      // if you want to render all user you can inter sub.docId
      const WorkQ=query(collection(db,`Users/${sub.docId}/moredetail`))
      const workDetal= await getDocs(WorkQ)
      const collectionInfo=workDetal.docs.map(doc=>({
        ...doc.data(),docId:doc.id,
       
      })
      )
      if(collectionInfo.length!=0){
        setSubCollection(collectionInfo);

    
      } })
    setData(data);
    setIsPending(false);
  });
  return () => unsubscribe();
}, []);


  return { data,subCollectionData, isPending, error };
};


