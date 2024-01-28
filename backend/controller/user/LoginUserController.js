import { User } from "../../model/user/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("login");

  //   check if the user exists
  let existingUser;

  existingUser = await User.findOne({ email });

  console.log("existing user");

  if (!existingUser) {
    return res.status(404).json({ message: "User not found, signup please" });
  }

  const passwordIsCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!passwordIsCorrect) {
    return res.status(401).json({ message: "Invalid Email / Password" });
  }
  console.log("password Correct");

  // create token with jwt
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  //Cookie

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true, // to keep token secure, without access in frontend
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Successfully logged in",
    user: existingUser,
    token: token,
  });
};

export default login;
