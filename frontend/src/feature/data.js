import { createSlice } from "@reduxjs/toolkit";


const dataSlice = createSlice({
    name: "data",
    initialState:{
        value: ''
    },
    reducers:{
        dishData: (state, action)=>{
            state.value = action.payload

        }

    }
})

export const {dishData} = dataSlice.actions;

export default dataSlice.reducer;