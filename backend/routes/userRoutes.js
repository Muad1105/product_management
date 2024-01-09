import express from "express";

const userRoutes = express.Router();

import createUser from "../controller/user/createUserController.js";
import editUserById from "../controller/user/editUserController.js";

import { getAllUsers } from "../controller/user/getUserController.js";

import { getUserById } from "../controller/user/getUserController.js";

import deleteUserById from "../controller/user/deleteUserController.js";

import authMiddleware from "../middleware/authMiddleware.js";

//Create user
userRoutes.post("/", createUser);
//Signup user
// userRoutes.post("/signup", userController.createUser);
//signin user
// userRoutes.post("/signin", userController.createUser);

//Get all users
userRoutes.get("/", getAllUsers);

//Get User by ID

userRoutes.get("/:id", getUserById);

//  Edit User by ID

userRoutes.put("/:id", editUserById);

// Delete User by ID
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
