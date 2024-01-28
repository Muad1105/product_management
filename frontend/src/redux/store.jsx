import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistReducer.jsx";
import userDataReducer from "./userReducer.jsx";
import productSelectionSectionReducer from "./productReducer.jsx";
import sectionDisplayReducer from "./showItemChangesReducer.jsx";
import showEditItem from "./displayEditItemReducer.jsx";

//fetch the persisted product value from local storage

const persistedProductId = localStorage.getItem("displayProductId");

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    userData: userDataReducer,
    productInComponent: productSelectionSectionReducer,
    displaySection: sectionDisplayReducer,
    displayEditItem: showEditItem,
  },
});
