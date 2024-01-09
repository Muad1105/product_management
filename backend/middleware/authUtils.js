import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
  const expiresIn = "1h"; // Adjust expiresIn as needed

  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateToken, verifyToken };
