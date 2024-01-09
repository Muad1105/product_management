import { User } from "../../model/userModel.js";
import bcrypt from "bcrypt";

const saltRounds = 10; // Number of salt rounds for bcrypt

const userController = {};

//Create user

userController.createUser = async (request, response) => {
  console.log("request.body", request.body);
  try {
    if (!request.body.name || !request.body.password || !request.body.email) {
      return response
        .status(400)
        .send("Send all required fields: Name, Password, email");
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

    const newUser = {
      name: request.body.name,
      password: hashedPassword,
      email: request.body.email,
    };

    await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

//Get all users from database

userController.getAllUsers = async (request, response) => {
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

userController.getUserById = async (request, response) => {
  const id = request.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// Edit user by ID

userController.editUserById = async (request, response) => {
  const id = request.params.id;
  try {
    if (!request.body.name || !request.body.password || !request.body.email) {
      return response
        .status(400)
        .send("Send all required fields: Name, Password, email");
    }

    // Extract the user ID from the JWT payload
    const loggedInUserId = request.user.id;

    // Check if the logged-in user is authorized to edit this user
    if (id !== loggedInUserId) {
      return response.status(403).json({
        message: "Forbidden: You are not authorized to edit this user",
      });
    }

    const newUser = {
      name: request.body.name,
      password: request.body.password,
      email: request.body.email,
    };
    const user = await User.findByIdAndUpdate(id, newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

// Delete User By ID

userController.deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;

    // Check if the logged-in user is authorized to delete this user
    if (id !== request.user.id) {
      return response.status(403).json({
        message: "Forbidden: You are not authorized to delete this user",
      });
    }
    await User.findByIdAndDelete(id);
    if (!id) {
      console.log("No Result");
      return response.status(400).json({ message: "User Not Found" });
    }
    return response.status(200).send({ message: "User Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export default userController;
