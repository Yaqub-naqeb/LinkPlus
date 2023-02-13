import { db, storage } from '@/firebase/FirebaseApp'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import General from './General'
import NewPost from './NewPost'
import Posts from './Posts'
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util'
import { useFetch } from '../useHooks/useFetch'


const Homee = () => {
  const [imageList,setImageList]=useState([]);
  const imageListRef=ref(storage,'images/')
  // const [data,setData]=useState([]);
  const {data}=useFetch('Posts');
console.log(data);
// console.log(data.map(post=>post.name));

// to get all image
useEffect(()=>{
  listAll(imageListRef).then(response=>{
      response.items.forEach(item=>{
          getDownloadURL(item).then(url=>{
              setImageList(prev=>[...prev,url])
          })
      })
  })
},[])


// console.log(data&&data.filter(post=>post.data.name) );

  return (
    <div className=' flex flex-col py-5  pb-10 gap-3 items-center min-h-screen '>
<General/>
<NewPost/>
{data&&data.map(post=><Posts key={post.id} name={post.name} data={post} src={imageList.filter(img => img.includes(post.src))} />
)}
{/* {   data&&data.map(post=><Posts key={post.id} name={post.name} data={post}/>)
} */}
    </div>
  )
}

export default Homee
