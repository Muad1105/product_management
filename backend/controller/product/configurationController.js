import { Configuration } from "../../model/product/configurationModel.js";

const configurationControllers = {};

// Create new configuration Item

configurationControllers.createConfiguration = async (req, res) => {
  console.log("create");
  try {
    const { name, specificationId } = req.body;
    console.log(name);
    const allConfiguration = await Configuration.find();
    console.log(allConfiguration);

    //Check input name if Sub configuration already exists
    const ConfigurationDetailExists = allConfiguration.some((e, i) => {
      console.log("some method", e, e.name == name);
      return e.name == name;
    });

    if (!name || !specificationId) {
      return res.status(400).json({
        error: "Name and Specification ID are required for a subcategory",
      });
    }

    const newConfiguration = { name, specificationId };

    await Configuration.create(newConfiguration);
    res.status(201).json({ message: "Configuration Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add configuration to a category

//get all configuration items from database

configurationControllers.getAllConfigurations = async (req, res) => {
  try {
    const configurationDetails = await Configuration.find();
    if (!configurationDetails) {
    }
    res.status(200).send(configurationDetails);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get configuration by id

configurationControllers.getConfigurationById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Configuration.findById(id);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

// Edit configuration Item By ID

configurationControllers.editConfigurationById = async (req, res) => {
  try {
    const { name, specificationId } = req.body;
    const id = req.params.id;

    const newConfiguration = { name, specificationId };
    await Configuration.findByIdAndUpdate(id, newConfiguration);

    res.status(201).send({ message: "subCategory Edit Successful" });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

// Delete configuration item by ID
configurationControllers.deleteConfiguration = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Configuration.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Id not found" });
    }
    return res
      .status(201)
      .send({ message: "Sub Category Item Deleted Succesfully" });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export default configurationControllers;
