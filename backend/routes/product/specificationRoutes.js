import express from "express";

const specificationsRoutes = express.Router();

import specificationsController from "../../controller/product/specificationController.js";

//  Route to post all specification from database
specificationsRoutes.post("/", specificationsController.createSpecification);

// Route to get all specification from database
specificationsRoutes.get("/", specificationsController.getAllSpecifications);

// Route to get a specification by ID
specificationsRoutes.get("/:id", specificationsController.getSpecificationById);

// Edit a specification by ID
specificationsRoutes.put(
  "/:id",
  specificationsController.editSpecificationById
);

// Route to delete specification by ID
specificationsRoutes.delete(
  "/:id",
  specificationsController.deleteSpecification
);

export default specificationsRoutes;
