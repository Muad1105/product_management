import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUsername: "",
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    storeLoggedInUsername: (state, action) => {
      console.log(action.payload);
      state.loggedInUsername = action.payload;
      localStorage.setItem("userData", state.loggedInUsername);
    },
  },
});

export const { storeLoggedInUsername } = userSlice.actions;

export default userSlice.reducer;
