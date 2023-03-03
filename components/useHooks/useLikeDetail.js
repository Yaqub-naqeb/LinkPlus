import { db } from "@/firebase/FirebaseApp";
import { getAuth } from "firebase/auth";
import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { cloneElement, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";


export const useLikeDetail = (collectionName,docId) => {
    const like = useSelector((state) => state.open);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [subCollectionLikeData,setSubCollection]=useState([]);
  const auth=getAuth()
const [user]=useAuthState(auth);
useEffect(() => {
  
  setIsPending(true);
  const blogsRef = collection(db, collectionName);
  const querySnapshot = query(
    blogsRef,
    orderBy('timeStamp','desc')
    );
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {

    const data = snapshot.docs.map((doc) =>
    ({
      docId: doc.id,
      ...doc.data(),
    }));

    setData(data);
    setIsPending(false);
// first user second
data.map( async sub=>{ 
  // console.log(sub);
  const WorkQ=query(collection(db,`Posts/${sub.docId}/LikeDetail`))
const workDetal= await getDocs(WorkQ)
const collectionInfo=workDetal.docs.map(doc=>({
...doc.data(),docId:doc.id,}))
// first Collection moredetail
collectionInfo&&collectionInfo.map(dt=>{
  // if the current user equal to this user that like the post do this
  if(dt.docId==user.uid&&docId==sub.docId){setSubCollection(dt)}
})    
    })
  });
 
  return () => unsubscribe();
}, [like.isLikeByUser]);
  return { data,subCollectionLikeData, isPending, error };
};



