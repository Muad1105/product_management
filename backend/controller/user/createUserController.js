import { User } from "../../model/user/userModel.js";
import bcrypt from "bcrypt";

import { generateToken } from "../../middleware/authUtils.js";

const saltRounds = 10; // Number of salt rounds for bcrypt

//Create user

const createUser = async (request, response) => {
  console.log("signup request.body");
  const { email, username, password, wishlist } = request.body;
  try {
    let existingUser;
    //   check if the user exists
    try {
      console.log("try existing user");
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      return new Error(err);
    }
    if (existingUser) {
      console.log("user exists");
      return response
        .status(409)
        .json({ message: "User already exists, Please login" });
    }
    console.log("body");
    console.log(username, password, email);
    if (!username || !password || !email) {
      console.log("value missing");
      return response
        .status(400)
        .send("Send all required fields: Name, Password, email");
    }
    console.log("hash pass");
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      username: username,
      password: hashedPassword,
      email: email,
    };

    console.log(newUser);

    const addedUser = await User.create(newUser);
    return response.status(201).json({ message: addedUser });
  } catch (error) {
    console.log(error);
  }
};

export default createUser;
