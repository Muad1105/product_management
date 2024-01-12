import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  console.log("req.headers.cookies triggered", req.headers);
  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log("user found", user.id);
    req.id = user.id;
  });
  next();
};

export default verifyToken;
