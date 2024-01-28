import { createSlice } from "@reduxjs/toolkit";

const ProductDisplaytState = localStorage.getItem("productSelectedToDisplay");

const initialState = {
  productModified: true,
  productSelectedToDisplay: ProductDisplaytState,
};

export const showItemChangeSlice = createSlice({
  name: "showChanges",
  initialState,
  reducers: {
    setShowProductsListModified: (state, action) => {
      console.log("product changes trigger");
      state.productModified = action.payload;
    },
  },
});

export const { setShowProductsListModified, setProductSelectedToDisplay } =
  showItemChangeSlice.actions;

export default showItemChangeSlice.reducer;
