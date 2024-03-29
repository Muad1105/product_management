import express from "express";

const brandRoutes = express.Router();

import brandController from "../../controller/product/brandController.js";

//Create Brand
brandRoutes.post("/", brandController.createBrand);

//Get all brands

brandRoutes.get("/allBrands", brandController.getAllBrands);

//Get all brands

brandRoutes.get("/:id", brandController.getBrandById);

//Delete Brand

brandRoutes.delete("/", brandController.deleteBrand);
export default brandRoutes;
