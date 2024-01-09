import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token", token === process.env.JWT_SECRET);
  if (!token) return res.status(401).json({ message: "unauthorized" });

  // Decode the token to inspect its claims
  const decodedToken = jwt.decode(token);

  // Check if the token is expired
  if (decodedToken && decodedToken.exp) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current time in seconds
    if (decodedToken.exp < currentTimestamp) {
      console.log("Token has expired.");
    } else {
      console.log("Token is still valid.");
    }
  } else {
    console.log("Invalid or missing expiration claim in the token.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("err");
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export default authentication;
