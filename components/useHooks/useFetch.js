import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";


export const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
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

    setData(data);
    setIsPending(false);
  });
  return () => unsubscribe();
}, []);


  return { data, isPending, error };
};


