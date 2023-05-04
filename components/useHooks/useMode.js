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
