import { db, storage } from '@/firebase/FirebaseApp'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import General from './General'
import NewPost from './NewPost'
import Posts from './Posts'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { set_userName } from '@/redux/reducers/profille'


const Homee = () => {
  const up=useSelector((state) => state.profile);
  const dispatch=useDispatch();
  const [imageList,setImageList]=useState([]);
  const imageListRef=ref(storage,'images/')
  const auth=getAuth()
  const [user]=useAuthState(auth);

  // const [data,setData]=useState([]);
  const {data}=useFetch('Posts');

// to get all image
useEffect(()=>{
  listAll(imageListRef).then(response=>{
      response.items.forEach(item=>{
          getDownloadURL(item).then(url=>{
              setImageList(prev=>[...prev,url])
              // setUrl(url)
          })
      })
  })
},[up.update])


useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "ProfileInfo"), where("id", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // setDocId(doc.id, " => ", doc.data())
    dispatch(set_userName(doc.data().name))
  });}

  rendering();

},[])

  return (
    <div className=' flex flex-col py-5  pb-10 gap-3 items-center min-h-screen '>
<General/>
<NewPost/>
{data&&data.map(post=><Posts key={post.id} name={post.name} data={post} src={imageList.filter(img => img.includes(post.src))} />
)}

    </div>
  )
}

export default Homee
