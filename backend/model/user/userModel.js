import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: 4 },
  email: { type: String, required: true, unique: true },
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" }],
});

export const User = mongoose.model("User", userSchema);
