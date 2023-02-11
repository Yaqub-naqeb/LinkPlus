import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({

    name:'profile',
    // this is initial value
    initialState:{
      
        userName:''
    },
    // to update the initial value
    reducers:{
    
        set_userName(state,action){
            state.userName=action.payload
        }
    }



})
export const {set_userName}=profileSlice.actions
export default profileSlice.reducer