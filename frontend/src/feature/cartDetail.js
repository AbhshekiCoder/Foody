import { createSlice } from "@reduxjs/toolkit";



const cartDetail = createSlice({
    name: 'cartDetail',
    initialState: {
        value: '',
    },
    reducers:{
        setCartDetail: (state, action) =>{
            state.value = action.payload
        }
    }

})

export const {setCartDetail} = cartDetail.actions;
export default cartDetail.reducer;