import jwt from "jsonwebtoken";

const logout = async (req, res, next) => {
  console.log("logout");
  const userToken = req.token;
  console.log("userToken", userToken);
  if (!userToken) {
    return res.status(400).json({ message: "Token Not Found." });
  }
  console.log("user token found");
  jwt.verify(String(userToken), process.env.JWT_SECRET_KEY, (err, user) => {
    console.log("jwt verify");
    if (err) {
      console.log("jwt err");
      console.log(err);
      return res.status(400).json({ message: "Authentication Failed." });
    }
    console.log("úser'id", user.id);
    res.clearCookie(`${user.id}`);

    return res.status(200).json({ message: "Successfully Logged Out." });
  });
};

export default logout;
