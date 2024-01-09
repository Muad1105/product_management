import { User } from "../../model/userModel.js";
import bcrypt from "bcrypt";

import { generateToken } from "../../middleware/authUtils.js";

const saltRounds = 10; // Number of salt rounds for bcrypt

//Create user

const createUser = async (request, response) => {
  console.log("request.body", request.body);
  try {
    //   check if the user exists
    let existingUser;
    try {
      console.log("try existing user");
      existingUser = await User.findOne({ email: request.body.email });
    } catch (err) {
      return new Error(err);
    }
    if (existingUser) {
      console.log("user exists");
      return response
        .status(400)
        .json({ message: "User already exists, Please login" });
    }
    console.log("body");
    if (
      !request.body.username ||
      !request.body.password ||
      !request.body.email
    ) {
      return response
        .status(400)
        .send("Send all required fields: Name, Password, email");
    }
    console.log("hash pass");
    //Hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

    const newUser = {
      username: request.body.username,
      password: hashedPassword,
      email: request.body.email,
    };

    try {
      const addedUser = await User.create(newUser);
      return response.status(201).json({ message: addedUser });
    } catch (err) {
      console.log(err);
    }

    return response.status(201).send(newUser);
  } catch (error) {
    console.log(error);
  }
};

export default createUser;
