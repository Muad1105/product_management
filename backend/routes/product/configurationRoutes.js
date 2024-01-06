import express from "express";

const configurationRoutes = express.Router();

import configurationControllers from "../../controller/product/configurationController.js";

// Create a sub category
configurationRoutes.post("/", configurationControllers.createConfiguration);

// Get all sub category from database
configurationRoutes.get("/", configurationControllers.getAllConfigurations);

// Get sub category by ID
configurationRoutes.get("/:id", configurationControllers.getConfigurationById);

// Edit Sub Catogory by ID
configurationRoutes.put("/:id", configurationControllers.editConfigurationById);

//  Delete sub category by ID
configurationRoutes.delete(
  "/:id",
  configurationControllers.deleteConfiguration
);

export default configurationRoutes;
