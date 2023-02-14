import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { db } from '@/firebase/FirebaseApp';

export const useServerRendering = ({first,second}) => {
    console.log(first,second);
    const [serverdata,setServerData]=useState();
    const [docId,setDocId]=useState();
    const photoUrl=useSelector((state) => state.profile);

    useEffect(()=>{
        const rendering=async()=>{  const q = query(collection(db, "ProfileInfo"), where(first, "==", second));
      
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // dispatch(set_Profile_Photo(doc.data()))
          setDocId(doc.id, " => ", doc.data())
          // doc.id, " => ", doc.data()
          setServerData(doc.data());
        });}
      
        rendering();
      
      },[photoUrl.profilePhoto])


  return { serverdata,docId};

}

