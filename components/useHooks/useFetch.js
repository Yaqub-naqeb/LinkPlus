import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('Newest');
  const PopUp = useSelector((state) => state.open);


  
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
  console.log('useFetch');
  return () => unsubscribe();
}, [PopUp.postPopUp]);

  return { data, isPending, error };
};


