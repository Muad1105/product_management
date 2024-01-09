import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistReducer.jsx";
import userIdReducer from "./userReducer.jsx";

// Load data from local storage
const persistedWishlist = localStorage.getItem("wishlist");

const persistedWishlistInitialState = persistedWishlist
  ? { wishlist: { value: JSON.parse(persistedWishlist) } }
  : {};

const persistedUserId = localStorage.getItem("wishlist");

const persistedUserIdInitialState = persistedUserId
  ? { wishlist: { value: JSON.parse(persistedUserId) } }
  : {};

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    userId: userIdReducer,
  },
  preloadedWishlistState: persistedWishlistInitialState,
  preloadedUserIdState: persistedUserIdInitialState,
});

// Subscribe to store changes and save to local storage
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("wishlist", JSON.stringify(state.wishlist.value));
// });

// store.dispatch(saveToWishlist(initialState));
