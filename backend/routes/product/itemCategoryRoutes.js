import express from "express";

import itemCategoryController from "../../controller/product/itemCategoryController.js";

const itemCategoryRoutes = express.Router();

// Create ItemCategory
itemCategoryRoutes.post("/", itemCategoryController.createItemCategory);

//get all utem Category

itemCategoryRoutes.get(
  "/allItemCategories",
  itemCategoryController.getAllItemCategory
);

export default itemCategoryRoutes;

//Delete Item category

itemCategoryRoutes.delete("/:id", itemCategoryController.deleteItemcategory);
