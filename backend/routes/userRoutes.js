import express from "express";

const userRoutes = express.Router();

import userController from "../controller/userController.js";

//Create user
userRoutes.post("/", userController.createUser);

//Get all users
userRoutes.get("/", userController.getAllUsers);

//Get User by ID

userRoutes.get("/:id", userController.getUserById);

//  Edit User by ID

userRoutes.put("/:id", userController.editUserById);

// Delete User by ID
userRoutes.delete("/:id", userController.deleteUserById);

export default userRoutes;
