import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '@/redux/reducers/isOpen';
const DarkToggle = () => {

  const Mode = useSelector((state) => state.open);
  console.log(Mode.dark);

const dispatch=useDispatch();



  return (
    <div className='fixed right-[90px] top-[13rem] rotate-90 '   >
      


      <div className="toggleWrapper">
    <input type="checkbox" className='dn' id="dn" onClick={()=>dispatch(setDarkMode(!Mode.dark))}/>
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
