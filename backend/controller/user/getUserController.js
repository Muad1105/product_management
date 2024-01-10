import { User } from "../../model/userModel.js";

//Get all users from database

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    console.log(users);
    return response.status(200).json(users);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal server error" });
  }
};

// Get user by ID

export const getUser = async (request, response) => {
  const userId = request.id ? request.id : request.params.id;
  console.log("userID", userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
    console.log("user", user);
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return response.status(400).json({ message: "User not found." });
  }
  return response.status(200).json({ user });
};

// export default getAllUsers;
