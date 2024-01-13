import { Brand } from "../../model/product/brandModel.js";

const brandController = {};

//create Brand

brandController.createBrand = async (req, res, next) => {
  console.log("post");
  const { name } = req.body;
  try {
    let nameExists;
    if (!name) {
      return res.status(400).json({ message: "brand name not found." });
    } else {
      nameExists = await Brand.findOne({ name });
    }
    if (nameExists) {
      return res.status(400).json({ message: "Brand Name Already Exists." });
    }
    const newBrand = {
      name,
    };
    await Brand.create(newBrand);
    return res.status(200).json({ message: "Brand Created Successfully." });
  } catch (err) {
    console.log(err);
  }
};

brandController.getAllBrands = async (req, res, next) => {
  try {
    const allBrands = await Brand.find();
    res.status(200).send({ allBrands });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

brandController.deleteBrand = async (req, res, next) => {
  const id = req.params.id;
  await Brand.findOneAndDelete(id);
  res.status(200).json({ message: "Brand Deleted Successfully." });
};

export default brandController;
