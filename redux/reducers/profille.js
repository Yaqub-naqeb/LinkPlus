import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({

    name:'profile',
    // this is initial value
    initialState:{
        userName:'',
        age:'',
        city:'',
        exprince:'',
        idd:'',
        update:'',
        profilePhoto:'',
        user_uid:'',
        
    },
    // to update the initial value
    reducers:{
        set_userName(state,action){
            state.userName=action.payload
        },
        set_age(state,action){
            state.age=action.payload
        },
    
        set_city(state,action){
            state.city=action.payload
        }
        ,
    
        set_exprience(state,action){
            state.exprince=action.payload
        }
        ,
    
        set_idd(state,action){
            state.idd=action.payload
        }
        ,
    
        set_Update(state,action){
            state.update=action.payload
        }
        ,
    
        set_Profile_Photo(state,action){
            state.profilePhoto=action.payload
        }
        ,
    
        set_user_uid(state,action){
            state.user_uid=action.payload
        },
       
    }



})
export const {set_userName,set_age,set_city,set_exprience,set_idd,set_Update,set_Profile_Photo,set_user_uid}=profileSlice.actions
export default profileSlice.reducer