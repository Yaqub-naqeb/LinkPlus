import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('Newest');


  
useEffect(() => {
  
  setIsPending(true);
  const blogsRef = collection(db, collectionName);
  const querySnapshot = query(
    blogsRef,
    // orderBy('date', sortBy === 'Newest' ? 'desc' : 'asc')
    orderBy('timeStamp','desc')

    );
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    setData(data);
    setIsPending(false);
  });
  console.log(data);
  return () => unsubscribe();
}, []);

  return { data, isPending, error };
};


