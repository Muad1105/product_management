import { User } from "../../model/user/userModel.js";
import bcrypt from "bcrypt";

import { generateToken } from "../../middleware/authUtils.js";

const saltRounds = 10; // Number of salt rounds for bcrypt

//Create user

const editUserById = async (request, response) => {
  console.log("signup request.body", request.body);
  try {
    const id = request.params.id;
    const { email, username, password, wishlist } = request.body;

    console.log(username, password, email);

    console.log("hash pass");
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      username: username,
      password: hashedPassword,
      email: email,
    };

    console.log(newUser);

    const addedUser = await User.findByIdAndUpdate(id, newUser);
    return response.status(201).json({ message: addedUser });
  } catch (error) {
    console.log(error);
  }
};

export default editUserById;
