import { createSlice } from "@reduxjs/toolkit";

const isOpenSlice=createSlice({

    name:'open',
    // this is initial value
    initialState:{
        open:false,
        like:false,
        dark:false,
        postPopUp:false,
    },
    // to update the initial value
    reducers:{
        setIsOpen(state,action){
            state.open=!state.open
        },
        setLike(state,action){
            state.like=!state.like
        }
        ,
        setDarkMode(state,action){
            state.dark=!state.dark
        }
        ,
        setPostPopUp(state,action){
            state.postPopUp=!state.postPopUp
        }
    }



})
export const {setIsOpen,setLike,setDarkMode,setPostPopUp}=isOpenSlice.actions
export default isOpenSlice.reducer