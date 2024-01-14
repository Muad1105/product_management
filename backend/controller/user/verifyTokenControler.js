import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const userToken = req.session.token;
  console.log("recieved token\n", userToken);
  if (!userToken) {
    console.error("Token not found.", userToken);
    res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(userToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("err", err);
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
    next();
  });
};

export default verifyToken;
