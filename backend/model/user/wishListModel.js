import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  name: { type: String, required: false },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
