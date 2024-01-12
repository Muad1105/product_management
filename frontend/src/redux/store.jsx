import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistReducer.jsx";
import userDataReducer from "./userReducer.jsx";

// Load data from local storage
const persistedWishlist = localStorage.getItem("wishlist");

const persistedWishlistInitialState = persistedWishlist
  ? { wishlist: { value: JSON.parse(persistedWishlist) } }
  : {};

const persistedUserData = localStorage.getItem("wishlist");

const persistedUseraDataInitialState = persistedUserData
  ? { wishlist: { value: JSON.parse(persistedUserData) } }
  : {};

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    userData: userDataReducer,
  },
  preloadedWishlistState: persistedWishlistInitialState,
  preloadedUserdataState: persistedUseraDataInitialState,
});

// Subscribe to store changes and save to local storage
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("wishlist", JSON.stringify(state.wishlist.value));
// });

// store.dispatch(saveToWishlist(initialState));
