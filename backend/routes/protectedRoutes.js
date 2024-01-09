// routes/protectedRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected-route", authMiddleware.authenticateToken, (req, res) => {
  // Access granted for authenticated users
  res.json({ message: "Access granted" });
});

module.exports = router;
