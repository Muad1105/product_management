import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/product/specificationRoutes.js";
import subCategoryRoutes from "./routes/product/configurationRoutes.js";

import cors from "cors";
dotenv.config();

const app = express();

const PORT = 1111;

//middleware for parsing request body
app.use(express.json());

//middleware for processing CORS POLICY
app.use(cors());

//Routes
app.use("/specification", categoryRoutes);
app.use("/configuration", subCategoryRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
    console.log("connected to MongoDb Database");
  })
  .catch((error) => {
    console.log(error);
  });
