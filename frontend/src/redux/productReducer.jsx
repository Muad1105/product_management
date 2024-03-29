import { createSlice } from "@reduxjs/toolkit";

// Fetch data fropm localStorage
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
  categorySelected: categoryId,
  searchProducts: "",
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
  
    displayCategorySidebarSelection: (state, action) => {
      console.log("display products sidebar selection", action.payload);
      state.categorySelected = action.payload;
      localStorage.setItem(
        "displayCategorySelected",
        JSON.stringify(state.categorySelected)
      );
    },
    searchProductItems: (state, action) => {
      console.log("Search Products Action");
      state.searchProducts = action.payload;
      localStorage.setItem(
        "searchProduct",
        JSON.stringify(state.searchProducts)
      );
    },
  },
});

export const {
  setSelectedProduct,
  displayCategorySidebarSelection,
  searchProductItems,
} = productInComponentSlice.actions;

export default productInComponentSlice.reducer;
