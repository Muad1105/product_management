import { ItemCategory } from "../../model/product/itemCategoryModel.js";

const itemCategoryController = {};

// Create Item Category
itemCategoryController.createItemCategory = async (req, res, next) => {
  const { name } = req.body;

  let nameExists;
  if (!name) {
    return res.status(200).json({ message: "Item Category Name Not Found" });
  } else {
    nameExists = await ItemCategory.findOne({ name });
  }
  if (nameExists) {
    return res
      .status(200)
      .json({ message: "Item Category Name Already Exists" });
  }
  const newItemCategory = { name };
  await ItemCategory.create(newItemCategory);
  res.status(200).json({ message: "Item Category Created Successfully." });
};

//   Get all Item Categories

itemCategoryController.getAllItemCategory = async (req, res, next) => {
  try {
    const allItemCategory = await ItemCategory.find();
    res.status(200).send(allItemCategory);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

itemCategoryController.deleteItemcategory = async (req, res, next) => {
  const id = req.params.id;
  await ItemCategory.findByIdAndDelete(id);
  res.status(200).json({ message: "Item Category Deleted Successfully." });
};

export default itemCategoryController;
