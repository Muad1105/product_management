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

export const getUserById = async (request, response) => {
  const id = request.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// export default getAllUsers;
