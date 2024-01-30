import express from "express";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productRoutes = express.Router();

import productControllers from "../../controller/product/productController.js";

//Route to create product to database
productRoutes.post(
  "/",
  upload.single("image"),
  productControllers.createProduct
);

// Route to get all product from database
productRoutes.get("/", productControllers.getAllProducts);

//Rote to get product by ID
productRoutes.get("/:id", productControllers.getProductById);

//Route to edit product by ID
productRoutes.put(
  "/:id",
  upload.single("image"),
  productControllers.editProductById
);

// Edit part of product
productRoutes.patch(
  "/",
  upload.single("image"),
  productControllers.createProduct
);

//  Route to delete product by ID
productRoutes.delete("/:id", productControllers.deleteProductById);

export default productRoutes;
