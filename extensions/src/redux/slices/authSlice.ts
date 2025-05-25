import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
    isRegistered:boolean;
}

const initialState:AuthState={
    isRegistered:false,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        registered(state){
            state.isRegistered=true;
        },
        logout(state){
            state=initialState
        }
    }
});

export const {registered,logout}=authSlice.actions;
export default authSlice.reducer;