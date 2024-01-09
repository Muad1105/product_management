import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel";

const genereteTocken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const signup = async () => {
  try {
    const { username, password } = req.body;

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    //Generate JWT and send it to client
    const token = genereteTocken(newUser);
    resizeBy.json({ token });
  } catch (error) {
    console.log(error);
    resizeBy.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and passwords match

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT and send it to the client
      const token = genereteTocken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid creadentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
