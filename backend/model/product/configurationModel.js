import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specification",
    required: true,
  },
});

export const Configuration = mongoose.model(
  "Configuration",
  configurationSchema
);
