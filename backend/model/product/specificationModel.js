import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Specification = mongoose.model(
  "Specification",
  specificationSchema
);
