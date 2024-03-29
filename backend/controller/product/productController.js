import { Product } from "../../model/product/productModel.js";
const productControllers = {};

// Create a product

productControllers.createProduct = async (request, response) => {
  try {
    const {
      itemCategory,
      title,
      brand,
      description,
      price,
      specs,
      availableQuantity,
    } = request.body;

    const specsRecieved = JSON.parse(request.body.specs);
    console.log("specs", specs);
    const imageBuffer = request.file.buffer;
    // Convert the buffer to a Base64-encoded string
    const base64String = imageBuffer.toString("base64");

    if (
      !itemCategory ||
      !title ||
      !brand ||
      !specs[0] ||
      !price ||
      !description ||
      !base64String ||
      !availableQuantity
    ) {
      return response.status(400).json({
        error:
          "itemCategory, title, brand, specification ID, configuration ID, description, availableQuantity and Price are required for a product",
      });
    }

    const newProduct = {
      itemCategory,
      title,
      brand,
      description,
      price,
      specs: specsRecieved,
      image: base64String, // final buffer for the image
      availableQuantity,
    };

    await Product.create(newProduct);

    return response
      .status(201)
      .json({ message: "New Product added successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

//  Get all products from database
productControllers.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // const updatedImageProducts = products.map((product) => {
    //   // Check if product.image is defined before attempting to convert to base64

    //   return {
    //     id: product._id,
    //     itemCategory: product.itemCategory,
    //     title: product.title,
    //     brand: product.brand,
    //     description: product.description,
    //     price: product.price,
    //     specs: product.specs,
    //     image: product.image,
    //     availableQuantity: product.availableQuantity,
    //   };
    // });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get product by ID
productControllers.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit Product by ID

productControllers.editProductById = async (request, response) => {
  try {
    const {
      itemCategory,
      title,
      brand,
      description,
      price,
      specificationId,
      configurationId,
      availableQuantity,
      image,
    } = request.body;

    if (
      !itemCategory ||
      !title ||
      !brand ||
      !specificationId ||
      !configurationId ||
      !price ||
      !description ||
      !availableQuantity ||
      !image
    ) {
      return response.status(400).json({
        error: "All fields are required for a product",
      });
    }

    const id = request.params.id;
    const newProduct = {
      itemCategory,
      title,
      brand,
      description,
      price,
      specificationId,
      configurationId,
      image,
      availableQuantity,
    };
    await Product.findByIdAndUpdate(id, newProduct);

    return response
      .status(200)
      .send({ message: "Product Updated Succesfully" });
  } catch (error) {
    response
      .status(500)
      .send({ message: `status not defined ${error.message}` });
  }
};

//Delete product by ID

productControllers.deleteProductById = async (req, res) => {
  console.log("Delete Product");
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const result = await Product.findByIdAndDelete(id);
    res.status(200).send({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default productControllers;
