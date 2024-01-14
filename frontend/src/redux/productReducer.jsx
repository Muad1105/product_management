import _default from "@mui/material/styles/identifier";
import { createSlice } from "@reduxjs/toolkit";

const id =
  localStorage.getItem("displayProductId") !== null
    ? JSON.parse(localStorage.getItem("displayProductId"))
    : "";

const initialState = {
  productId: id,
  productPosted: false,
};

export const productInComponentSlice = createSlice({
  name: "selectedProductStore",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      console.log("product reducer", action.payload);
      state.productId = action.payload;
      localStorage.setItem("displayProductId", JSON.stringify(state.productId));
    },
    setProductPosted: (state, action) => {
      console.log("product added");
      state.productPosted = true;
    },
  },
});

export const { setSelectedProduct, setProductPosted } =
  productInComponentSlice.actions;

export default productInComponentSlice.reducer;
