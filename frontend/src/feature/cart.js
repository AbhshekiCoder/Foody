import {createSlice} from '@reduxjs/toolkit';

let cartSlice = createSlice({
    name: 'cart',
    initialState:{
        value: Number(localStorage.getItem('count')) || 0
    },
    reducers:{
        dishCount: (state, action) =>{
            state.value = action.payload

        }
    }
})

export const {dishCount} = cartSlice.actions;
export default cartSlice.reducer;


