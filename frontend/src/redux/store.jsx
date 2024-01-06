import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer, { saveToWishlist } from "./reducer.jsx";

// Load data from local storage
const persistedState = localStorage.getItem("wishlist");
const initialState = persistedState
  ? { wishlist: { value: JSON.parse(persistedState) } }
  : {};

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
  preloadedState: initialState,
});

// Subscribe to store changes and save to local storage
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("wishlist", JSON.stringify(state.wishlist.value));
// });

// store.dispatch(saveToWishlist(initialState));
