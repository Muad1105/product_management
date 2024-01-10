import express from "express";

const userRoutes = express.Router();

import createUser from "../controller/user/createUserController.js";
import editUserById from "../controller/user/editUserController.js";

import { getAllUsers, getUser } from "../controller/user/getUserController.js";

import deleteUserById from "../controller/user/deleteUserController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import login from "../controller/user/loginUserController.js";
import verifyToken from "../controller/user/verifyTokenControler.js";
import refreshToken from "../controller/user/refreshTokenController.js";

//Create user
userRoutes.post("/signup", createUser);
//Signup user
// userRoutes.post("/signup", userController.createUser);
//signin user
// userRoutes.post("/signin", userController.createUser);

userRoutes.post("/login", login);

userRoutes.get("/home", verifyToken, getUser);

//refresh token
// userRoutes.get("/refresh", refreshToken, verifyToken, getUser);

//Get all users
userRoutes.get("/all-users", getAllUsers);

//Get User by ID

userRoutes.get("/:id", getUser);

//  Edit User by ID

userRoutes.put("/:id", editUserById);

// Delete User by ID
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
