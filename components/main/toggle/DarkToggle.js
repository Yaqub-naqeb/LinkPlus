import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '@/redux/reducers/isOpen';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseApp';
import { useFetch } from '@/components/useHooks/useFetch';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useMode } from '@/components/useHooks/useMode';
const DarkToggle = () => {

  const {data}=useFetch('Users');
  const {mode}=useMode();


  const auth=getAuth();
  const [user,loading]=useAuthState(auth)

  const info=data&&data.filter(name=>name.id==user.uid)
  console.log(info);
  const Mode = useSelector((state) => state.open);
  

const dispatch=useDispatch();

// send mode to firebase


const clickHandler=()=>{

  const docRef = doc(db, "Users", info[0]&&info[0].docId);
  
  const data1 = {
    mode:info[0]&&!info[0].mode,
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })

  dispatch(setDarkMode(!Mode.dark))

}



  return (
    <div className={`fixed   transition-all lg:block md:${Mode.open?'block ':''} ${Mode.open?' lg:translate-y-[-2rem] translate-y-[0rem]  right-16 lg:right-10':'hidden'}   right-[90px]  top-[14rem] rotate-90  `}   >
      


      <div className="toggleWrapper">
        {/* ()=>dispatch(setDarkMode(!Mode.dark)) */}
    <input type="checkbox" className='dn' id="dn" onClick={clickHandler} checked={mode&&mode?true:false}/>
    <label for="dn" className="toggle ">
        <span className="toggle__handler ">
            <span className="crater crater--1 "></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
    </label>
</div>


    </div>
  )
}

export default DarkToggle
