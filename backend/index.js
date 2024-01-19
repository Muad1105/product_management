import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";
import brandRoutes from "./routes/product/brandRoutes.js";
import itemCategoryRoutes from "./routes/product/itemCategoryRoutes.js";
import specificationsRoutes from "./routes/product/specificationRoutes.js";
import configurationRoutes from "./routes/product/configurationRoutes.js";
dotenv.config();
import session from "express-session";

const app = express();

// session controller to pass data from one controller to another

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

//middleware for parsing request body
app.use(express.json());

//middleware for processing CORS POLICY
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/brand", brandRoutes);
app.use("/itemCategory", itemCategoryRoutes);
app.use("/specification", specificationsRoutes);
app.use("/configuration", configurationRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
    console.log("connected to MongoDb Database");
  })
  .catch((error) => {
    console.log(error);
  });
