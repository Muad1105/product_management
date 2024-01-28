import { User } from "../../model/user/userModel.js";

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

export const getUserById = async (request, response) => {
  // console.log(request);
  const userId = request.id || request.params.id;
  const token = request.token;
  console.log("userID", userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
    console.log("user", user);
    if (!user) {
      console.log("User Not Found");
      return response.status(404).json({ message: "User not found." });
    }
    console.log("Sending Response");
    return response.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// export default getAllUsers;
