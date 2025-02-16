import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import url from '../misc/url';

  


const locationSlice = createSlice({
    

       name: 'location',
       initialState: {
        value: ''
       },

       reducers:{
        locationinfo: (state, action) =>{
            state.value = action.payload

        }
       }
})

export const {locationinfo} = locationSlice.actions;
export default locationSlice.reducer;