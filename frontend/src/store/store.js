import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../feature/userinfo.js';

export const store = configureStore({
    reducer:{
        name: userSlice
    }
})