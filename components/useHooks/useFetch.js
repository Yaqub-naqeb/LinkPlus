import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";


export const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // const [sortBy, setSortBy] = useState('Newest');

  
// useEffect(() => {
//     const fetchData = async () => {
//       setIsPending(true);

//       try {
      
//    const querySnapshot = await getDocs(collection(db, collectionName));
//    querySnapshot.forEach((doc) => {
//    // unique id of the docs 
//      setData((prev)=>[...prev,{id:doc.id,data:doc.data()}]);
//    });
  
//         setIsPending(false);
//         setError(null);
//       } catch (err) {
//         setIsPending(false);
//         setError("Could not fetch the data");
//       }
//     };

//     fetchData();
//   }, []);

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


