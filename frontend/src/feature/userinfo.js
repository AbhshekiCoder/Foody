import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import url from '../misc/url';
  

const userSlice = createSlice({
    

       name: 'username',
       initialState: {
        value: ''
       },

       reducers:{
        userinfo: (state, action) =>{
            state.value = action.payload

        }
       }
})

export const {userinfo} = userSlice.actions;
export default userSlice.reducer;