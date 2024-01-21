import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: 4 },
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: false },
  wishlist: [{ type: String, required: false, unique: true }],
});

export const User = mongoose.model("User", userSchema);
