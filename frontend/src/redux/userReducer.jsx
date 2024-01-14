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
      console.log(action.payload);
      state.loggedInUsername = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.loggedInUsername));
    },
    userLoggedOut: (state, action) => {
      console.log("logout");
      localStorage.removeItem("userData");
    },
  },
});

export const { storeLoggedInUsername, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
