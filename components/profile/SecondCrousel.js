//   npm i swiper
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "@/firebase/FirebaseApp";
import { collection, query,onSnapshot, orderBy, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Mousewheel, Pagination } from "swiper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setProjectsPhoto } from "@/redux/reducers/isOpen";
import { useFetch } from "../useHooks/useFetch";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const SecondCrousel = () => {
  const [data1,setData1]=useState();
const [subCollectionData,setSubCollection]=useState([])
  const PopUp = useSelector((state) => state.open);

const dispatch=useDispatch();

const clickHandler=()=>{
  dispatch(setProjectsPhoto(!PopUp.projectPhoto))
}

const auth=getAuth();
const [user,loading]=useAuthState(auth)

const data2=useFetch('Users');

const profileUrl= data2.data&&data2.data.filter(name=>name.id==user.uid)
console.log(profileUrl[0]&&profileUrl[0]);








useEffect(() => {
  
  const blogsRef = collection(db, 'Users');
  const querySnapshot = query(
    blogsRef);
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    data&&data.map(async sub=>{
      // current user docId
      const WorkQ=query(collection(db,`Users/${docId}/moredetail`))
      const workDetal= await getDocs(WorkQ)

      const collectionInfo=workDetal.docs.map(doc=>({
        ...doc.data(),docId:doc.id
       
      })
      )
      if(collectionInfo.length!=0){
        setSubCollection(collectionInfo);
    
      } })



console.log('hi');


    setData1(data);
  });
  return () => unsubscribe();
}, []);

  return (
    
    <div className=" w-[730px] place-self-start relative  pt-8   h-[437px] col-start-1 row-start-0  col-span-2  rounded-2xl">
        {/*  translate-x-5 
     h-[437px] col-start-1 row-start-0  col-span-2  rounded-[45px] */}
<div className='text-center cursor-pointer w-fit  absolute left-[50%] translate-x-[-50%] top-0' onClick={clickHandler}>
+ Add your Projects
</div>



    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={100}
      mousewheel={true}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      className="mySwiper rounded-[45px]"
    >
     
   {/* {
    profileUrl&&profileUrl[0]&&profileUrl[0].projectPhoto&& 
    profileUrl[0].projectPhoto.map((img,index)=>(<SwiperSlide className={'cursor-pointer'} key={index}><Image  width={3000} height={3000} className='w-full h-full ' src={img} /></SwiperSlide>)
)   

   } */}

{
  subCollectionData&&subCollectionData.map((img,index)=>(

   img.docIdd==user.uid&& <SwiperSlide className={'cursor-pointer'} key={index}> 
    <Image  width={3000} height={3000} className='w-full h-full ' src={img.projectPhoto&&img.projectPhoto} /> 
    </SwiperSlide>

    
  ))
  
}
{/* <SwiperSlide className={'cursor-pointer'} key={index}>
 <Image  width={3000} height={3000} className='w-full h-full ' src={img.projectPhoto} />
    </SwiperSlide> */}
    </Swiper>
  </div>
  )
}

export default SecondCrousel
