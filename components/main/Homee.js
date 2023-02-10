import { db, storage } from '@/firebase/FirebaseApp'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import General from './General'
import NewPost from './NewPost'
import Posts from './Posts'
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util'


const Homee = () => {
  const [imageList,setImageList]=useState([]);
  const imageListRef=ref(storage,'images/')
  const [data,setData]=useState([]);

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

useEffect(()=>{
 const x =async()=>{
  const querySnapshot = await getDocs(collection(db, "Posts"));
  querySnapshot.forEach((doc) => {
  // unique id of the docs 
    setData((prev)=>[...prev,{id:doc.id,data:doc.data()}]);
  });
 }
 x();
},[])
// x();
console.log(imageList);



  return (
    <div className=' flex flex-col py-5  pb-10 gap-1 items-center '>
<General/>
<NewPost/>
{/* {data&&data.map(post=><div>{imageList.filter(img => img.includes(post.data.src))}</div>)} */}
{data&&data.map(post=><Posts key={post.id} name={post.data.name} data={post.data} src={imageList.filter(img => img.includes(post.data.src))} />
)}

{/* {names.filter(name => name.includes('J')).map(filteredName => (
        <li>
          {filteredName}
        </li>
      ))} */}
    </div>
  )
}

export default Homee
