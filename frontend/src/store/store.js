import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../feature/userinfo.js';
import cartSlice from '../feature/cart.js';
import locationSlice from '../feature/location.js';
import dataSlice from '../feature/data.js'
import cartDetail from "../feature/cartDetail.js";

export const store = configureStore({
    reducer:{
        name: userSlice,
        cart: cartSlice,
        location: locationSlice,
        data: dataSlice,
        cartDetail: cartDetail
    },
   
})

