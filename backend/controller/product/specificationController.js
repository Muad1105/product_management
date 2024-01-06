import { response } from "express";
import { Specification } from "../../model/product/specificationModal.js";

const specificationControllers = {};

//  Create a specification

specificationControllers.createSpecification = async (request, response) => {
  try {
    console.log(request.body);
    const { name } = request.body;

    if (!name || name == "") {
      console.log("error");
      return response
        .status(400)
        .json({ error: "Name is required for a category" });
    }

    const specifications = await Specification.find();

    //Check input name if specification already exists
    const specExists = specifications.some((e) => e.name == name);

    if (specExists) {
      return response
        .status(400)
        .json({ error: "specification Already exists" });
    }

    const newSpec = new Specification({
      name,
    });

    await Specification.create(newSpec);
    response.status(201).json(newSpec);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all specifications from database

specificationControllers.getAllSpecifications = async (req, res) => {
  console.log("logged");
  try {
    const specsList = await Specification.find();
    console.log("specsList", specsList);
    res.status(200).send(specsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get a specification by ID

specificationControllers.getSpecificationById = async (req, res) => {
  console.log("logged");
  try {
    const id = req.params.id;
    const specifications = await Specification.findById(id);
    console.log("specifications", specifications);
    res.status(200).send(specifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Edit a specification by ID

specificationControllers.editSpecificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    console.log(name, id);
    if (!name) {
      return res.status(400).json({ error: "Name is required for a category" });
    }
    const result = { name };
    await Specification.findByIdAndUpdate(id, result);

    res.status(201).json("specification changed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specification by ID

specificationControllers.deleteSpecification = async (request, response) => {
  try {
    const id = request.params.id;

    await Specification.findByIdAndDelete(id);
    if (!id) {
      console.log("No Result");
      return response
        .status(500)
        .json({ message: "specification Item Not Found" });
    }
    return response
      .status(200)
      .send({ message: "specification Item Deleted Succesfully" });
  } catch (err) {}
};

export default specificationControllers;
