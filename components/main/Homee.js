import { db, storage } from '@/firebase/FirebaseApp'
// import { getDownloadURL, listAll, ref } from 'firebase/storage'
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
import { useFetchProjects } from '../useHooks/useFetchProjects'


const Homee = () => {
  // const up=useSelector((state) => state.profile);
  const dispatch=useDispatch();
  // const [imageList,setImageList]=useState([]);
  // const imageListRef=ref(storage,'images/')
  const auth=getAuth()
  const [user]=useAuthState(auth);
  const {data}=useFetch('Posts');
  console.log(data);

// to get all image
// useEffect(()=>{
//   listAll(imageListRef).then(response=>{
//       response.items.forEach(item=>{
//           getDownloadURL(item).then(url=>{
//               setImageList(prev=>[...prev,url])
//               // setUrl(url)
//           })
//       })
//   })
// },[up.update])
//up.update

useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // setDocId(doc.id, " => ", doc.data())
    dispatch(set_userName(doc.data().name))
  });}

  rendering();

},[])
// TODO:the problem is when i want to post something new the previous image show then the new one show


  return (
    <div className=' flex flex-col py-5  pb-10 gap-3 items-center min-h-screen '>
<General/>
<NewPost/>
{/* {data&&data.map((post,index)=><Posts key={index} name={post.name} postData={post} src={imageList&&imageList&&imageList.filter(img =>img.includes(post.src))} />
)} */}
{data&&data.map((post,index)=>post.src&&<Posts key={index} name={post.name} postData={post} src={post.src&&post.src} />
)}

    </div>
  )
}

export default Homee
