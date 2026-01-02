import { createSlice } from "@reduxjs/toolkit";
  

const userInformation = createSlice({
  name: "UsrInfo",
  initialState: null,
  reducers: {
    setProducts: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setProducts } = userInformation.actions;
export default userInformation.reducer;   