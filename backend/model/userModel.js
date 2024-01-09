import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minLength: 4 },
  email: { type: String, required: true, unique: true },
  // wishlist: { type: Array },
});

export const User = mongoose.model("User", userSchema);
