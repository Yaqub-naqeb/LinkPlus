import { createSlice } from "@reduxjs/toolkit";

const isOpenSlice=createSlice({

    name:'open',
    // this is initial value
    initialState:{
        open:false,
        like:false,
        dark:false
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
    }



})
export const {setIsOpen,setLike,setDarkMode}=isOpenSlice.actions
export default isOpenSlice.reducer