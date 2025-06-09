import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface UserType{
    address:string|null;
    NCid:string|null
}

const initialState:UserType={
    address:null,
    NCid:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<UserType>)=>{
            state.address=action.payload.address;
            state.NCid=action.payload.NCid;
        },
        clearUser:(state)=>{
            state.address=null;
            state.NCid=null;
        },
    },
});

export const {setUser,clearUser}=userSlice.actions;

export default userSlice.reducer;