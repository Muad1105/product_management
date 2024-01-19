import { createSlice } from "@reduxjs/toolkit";

const user =
  localStorage.getItem("userData") !== null
    ? JSON.parse(localStorage.getItem("userData"))
    : "";

const initialState = {
  loggedInUsername: user,
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    storeLoggedInUsername: (state, action) => {
      state.loggedInUsername = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.loggedInUsername));
    },
    userLogOut: (state, action) => {
      localStorage.removeItem("userData");
    },
  },
});

export const { storeLoggedInUsername, userLogOut } = userSlice.actions;

export default userSlice.reducer;
