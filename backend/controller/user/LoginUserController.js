import { User } from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //   check if the user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Usser not found, signup please" });
  }

  const passwordIsCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!passwordIsCorrect) {
    return res.status(400).json({ message: "Invalid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .json({ message: "Successfully logged in", user: existingUser, token });
};
