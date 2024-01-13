import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  itemCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCategory",
    required: true,
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  image: { type: String, required: true },
  specificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specification",
    required: true,
  },
  configurationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Configuration",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
