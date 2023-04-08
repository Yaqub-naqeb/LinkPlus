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
import LoadingOverlay from 'react-loading-overlay';


const Homee = () => {
  const op=useSelector((state) => state.open);

  const dispatch=useDispatch();
  const [imageList,setImageList]=useState([]);
  const imageListRef=ref(storage,'images/')
  const auth=getAuth()
  const [user]=useAuthState(auth);
  const {data}=useFetch('Posts');
  console.log(data[0]);


useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // setDocId(doc.id, " => ", doc.data())
    dispatch(set_userName(doc.data().name))
  });}

  rendering();

},[])
// [688px]
    // h-[126px]
  return (
    <div className=' flex flex-col lg:py-5  pb-10 gap-3 items-center min-h-screen  lg:w-[688px]  md:w-[688px] w-[358px] '>
      
<General/>
<NewPost/>
{/* {data&&data.map((post,index)=>index==0?   <LoadingOverlay className='w-fit mx-5 rounded-2xl ' active={op.isImagePosted} spinner text='Loading...'>
<Posts key={index}  postData={post} text={op.isImagePosted?post.text:'Loding...'} src={op.isImagePosted&&post.src}  />
  </LoadingOverlay>:<Posts key={index}  postData={post} text={post.text} src={post.src} />
)} */}
{data&&data.map((post,index)=>post.isNew? <Posts key={index}  postData={post} text={op.isImagePosted?post.text:'Loding...'} src={op.isImagePosted&&post.src}  />:<Posts key={index}  postData={post} text={post.text} src={post.src} />
)}

    </div>
  )
}

export default Homee
