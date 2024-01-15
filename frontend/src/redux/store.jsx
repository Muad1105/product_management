import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistReducer.jsx";
import userDataReducer from "./userReducer.jsx";
import productSelectionSectionReducer from "./productReducer.jsx";

//fetch the persisted product value from local storage

const persistedProductId = localStorage.getItem("displayProductId");

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    userData: userDataReducer,
    productInComponent: productSelectionSectionReducer,
  },
});
