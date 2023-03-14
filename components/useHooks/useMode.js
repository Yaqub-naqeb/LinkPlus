import { db } from "@/firebase/FirebaseApp";
import { getAuth } from "firebase/auth";
import { collection, query,onSnapshot, orderBy, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export const useMode = () => {
    const Mode = useSelector((state) => state.open);

  const [mode, setMode] = useState();
  const auth=getAuth();
  const [user,loading]=useAuthState(auth)
// useEffect(() => {
  
//   setIsPending(true);
//   const blogsRef = collection(db, collectionName);
//   const querySnapshot = query(
//     blogsRef,
//     // orderBy('date', sortBy === 'Newest' ? 'desc' : 'asc')
//     orderBy('timeStamp','desc')

//     );
//   const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       docId: doc.id,
//       ...doc.data(),
//     }));
//     setData(data);
//     setIsPending(false);
//   });
//   console.log(data);
//   return () => unsubscribe();
// }, [PopUp.postPopUp]);

useEffect(()=>{
    const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user&&user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setDocId(doc.id, " => ", doc.data())
      setMode(doc.data().mode)

    });}
  
    rendering();
  
  },[Mode.dark,[]])






  return { mode};
};



// 
