import mongoose from "mongoose";

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const ItemCategory = mongoose.model("ItemCategory", itemCategorySchema);
