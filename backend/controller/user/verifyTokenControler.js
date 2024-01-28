import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const userId = cookies.split("=")[0];
  const token = cookies.split("=")[1];
  console.log("recieved token\n", cookies, userId, token);
  if (!token) {
    console.error("cookies not found.");
    res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("err", err);
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
    req.token = token;
    next();
  });
};

export default verifyToken;
