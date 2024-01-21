import { createSlice } from "@reduxjs/toolkit";

const user =
  localStorage.getItem("userData") !== null
    ? JSON.parse(localStorage.getItem("userData"))
    : "";

const initialState = {
  loggedInUser: user,
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    storeLoggedInUser: (state, action) => {
      //set an object with keys name and id user details
      console.log("user data", action.payload);
      state.loggedInUser = { id: action.payload.id, name: action.payload.name };

      localStorage.setItem("userData", JSON.stringify(state.loggedInUser));
    },
    userLogOut: (state, action) => {
      localStorage.removeItem("userData");
    },
  },
});

export const { storeLoggedInUser, userLogOut } = userSlice.actions;

export default userSlice.reducer;
