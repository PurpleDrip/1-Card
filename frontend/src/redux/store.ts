import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store=configureStore({
    reducer:{
        user:userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;