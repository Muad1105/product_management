import { createSlice } from "@reduxjs/toolkit";

const userData =
  localStorage.getItem("userData") !== null
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

const initialState = {
  loggedInUser: userData,
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    storeLoggedInUserData: (state, action) => {
      //set an object with keys name and id user details
      console.log("user data", action.payload);
      state.loggedInUser = {
        token: action.payload.token,
        id: action.payload,
        name: action.payload.name,
      };

      localStorage.setItem("userData", JSON.stringify(state.loggedInUser));
    },
    userLogOut: (state, action) => {
      localStorage.removeItem("userData");
    },
  },
});

export const { storeLoggedInUserData, userLogOut } = userSlice.actions;

export default userSlice.reducer;
