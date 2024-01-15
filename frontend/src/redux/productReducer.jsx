import _default from "@mui/material/styles/identifier";
import { createSlice } from "@reduxjs/toolkit";

const productId =
  localStorage.getItem("displayProductId") !== null
    ? JSON.parse(localStorage.getItem("displayProductId"))
    : "";

const categoryId =
  localStorage.getItem("displayProductId") !== null
    ? JSON.parse(localStorage.getItem("displayProductId"))
    : "";

const initialState = {
  productId: productId,
  productPosted: false,
  categorySelected: categoryId,
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
    displayCategorySidebarSelection: (state, action) => {
      console.log("display products sidebar selection");
      state.categorySelected = action.payload;
      localStorage.setItem(
        "displayCategorySelected",
        JSON.stringify(state.categorySelected)
      );
    },
  },
});

export const {
  setSelectedProduct,
  setProductPosted,
  displayCategorySidebarSelection,
} = productInComponentSlice.actions;

export default productInComponentSlice.reducer;
