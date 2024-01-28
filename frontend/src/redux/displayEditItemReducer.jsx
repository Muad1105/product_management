import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayEditProduct: { display: false, productId: "" },
};

export const displayEditSlice = createSlice({
  name: "displayEditComponet",
  initialState,
  reducers: {
    setShowEditProductDisplay: (state, action) => {
      console.log(action.payload);
      state.displayEditProduct = action.payload;
    },
  },
});

export const { setShowEditProductDisplay } = displayEditSlice.actions;

export default displayEditSlice.reducer;
