import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUserId: "",
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    storeLoggedInUserId: (state, action) => {
      console.log(action.payload);
      state.loggedInUserId = action.payload;
      localStorage.setItem("userId", state.loggedInUserId);
    },
  },
});

export const { storeLoggedInUserId } = userSlice.actions;

export default userSlice.reducer;
