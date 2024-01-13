import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
