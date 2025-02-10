import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addChatter = createAsyncThunk(
  "addChatter",
  (data) => {
    try {
      return data
    }
    catch(err){
      console.log(err)
    }
  }
)

export const chatSlice = createSlice({
  name:"chatuser",
  initialState:{
    chatters:[],
  },
  extraReducers:(builder)=>{
    builder
      .addCase(addChatter.fulfilled,(state,action)=>{
        state.chatters = [...action.payload]
      })
  }
})

export default chatSlice.reducer