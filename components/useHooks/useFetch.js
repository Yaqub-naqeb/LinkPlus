import { db } from "@/firebase/FirebaseApp";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
  console.log(collectionName);

useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);

      try {
      
   const querySnapshot = await getDocs(collection(db, collectionName));
   querySnapshot.forEach((doc) => {
   // unique id of the docs 
     setData((prev)=>[...prev,{id:doc.id,data:doc.data()}]);
   });
  
        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };

    fetchData();
  }, []);


  return { data, isPending, error };
};

