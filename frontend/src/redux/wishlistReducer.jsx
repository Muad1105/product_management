import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  loggedInUserId: "",
};

export const createWishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    saveToWishlist: (state, action) => {
      console.log(action.payload);
      //Check if value is array (recieving and sotring from localStorage)
      Array.isArray(action.payload)
        ? action.payload.map((e, i) => {
            state.value.push(e);
          })
        : state.value.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.value));
    },
  },
});

export const { saveToWishlist } = createWishlist.actions;

export default createWishlist.reducer;
