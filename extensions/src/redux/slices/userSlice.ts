import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    walletPublicAddress:string | null,
    NCid:string | null,
}

const initialState:UserState={
    walletPublicAddress:null,
    NCid:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,action:PayloadAction<UserState>){
            state.walletPublicAddress=action.payload.walletPublicAddress;
            state.NCid=action.payload.NCid;
        },
        logout(state){
            state=initialState
        }
    }
});

export const {setUser,logout}=userSlice.actions;
export default userSlice.reducer;