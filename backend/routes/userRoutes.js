import express from "express";

const userRoutes = express.Router();

import createUser from "../controller/user/createUserController.js";
import editUserById from "../controller/user/editUserController.js";

import {
  getAllUsers,
  getUserById,
} from "../controller/user/getUserController.js";

import deleteUserById from "../controller/user/deleteUserController.js";

import login from "../controller/user/loginUserController.js";
import verifyToken from "../controller/user/verifyTokenControler.js";
import refreshToken from "../controller/user/refreshTokenController.js";
import logout from "../controller/user/logoutUserController.js";
import { sendOtp } from "../controller/user/sendOtpController.js";
import { addWishlistItem } from "../controller/user/wishlist/addWishlistController.js";

//Create user
userRoutes.post("/signup", createUser);
//Signup user
// userRoutes.post("/signup", userController.createUser);
//signin user
// userRoutes.post("/signin", userController.createUser);

userRoutes.post("/login", login);

userRoutes.post("/logout", verifyToken, logout);

userRoutes.get("/home", verifyToken, getUserById);

//refresh token
userRoutes.get("/refresh", refreshToken, verifyToken, getUserById);

//Get all users
userRoutes.get("/all-users", getAllUsers);

//Get User by ID

userRoutes.get("/:id", getUserById);

//  Edit User by ID

userRoutes.put("/:id", editUserById);

// Delete User by ID
userRoutes.delete("/:id", deleteUserById);

//Send OTP
userRoutes.post("/send-otp", sendOtp);

//User wishlist
userRoutes.patch("/wishlist", addWishlistItem);

export default userRoutes;
