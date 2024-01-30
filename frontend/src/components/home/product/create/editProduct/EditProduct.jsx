import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import EditSpecs from "./EditSpecs";

const EditProduct = ({ productId, closeEditProduct }) => {
  const [productDetails, setProductDetails] = useState({
    itemCategory: "",
    title: "",
    brand: "",
    image: null,
    price: 0,
    description: "",
    availableQuantity: 0,
    specs: [{ specificationId: "", configurationId: "" }],
  });

  const [productSpecDetails, setProductSpecDetails] = useState([]);

  const [selectedProductDetail, setSelectedProductDetail] = useState([]);

  // Fetch state data specification and configuration
  const [allSpecifications, setAllSpecifications] = useState([]);
  const [allConfigurations, setAllConfigurations] = useState([]);
  const [allItemCategories, setAllItemCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const [inputError, setInputError] = useState(false);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProduct();
    fetchItemCategories();
    fetchBrands();
  }, []);

  const fetchProduct = async () => {
    const product = await axios.get(
      `http://localhost:1111/product/${productId}`
    );
    setSelectedProductDetail(product.data);
  };

  useEffect(() => {
    selectedProductDetail.specs &&
      setProductDetails({
        itemCategory: selectedProductDetail.itemCategory,
        title: selectedProductDetail.title,
        brand: selectedProductDetail.brand,
        image: null,
        price: selectedProductDetail.price,
        description: selectedProductDetail.description,
        availableQuantity: selectedProductDetail.availableQuantity,
        specs: selectedProductDetail.specs,
      });
    setProductSpecDetails((prev) => selectedProductDetail.specs);
  }, [selectedProductDetail]);

  useEffect(() => {
    setProductDetails(productDetails);
  }, [productDetails]);

  const setSpecsData = (data) => {
    setProductDetails((prev) => ({ ...prev }));
  };

  const fetchItemCategories = async () => {
    const res = await axios
      .get("http://localhost:1111/itemCategory/allItemCategories")
      .catch((err) => "");
    const data = await res.data;
    setAllItemCategories(data);
  };

  const fetchBrands = async () => {
    const res = await axios
      .get("http://localhost:1111/brand/allBrands")
      .catch((err) => "");
    const data = await res.data.allBrands;
    setAllBrands(data);
  };

  const handleProductDetails = async () => {
    if (
      !productDetails.itemCategory ||
      !productDetails.title ||
      !productDetails.brand ||
      !productDetails.image ||
      !productDetails.price ||
      !productDetails.description ||
      !productDetails.availableQuantity ||
      !productDetails.specificationId ||
      !productDetails.configurationId
    ) {
      setInputError(true);
    }
    try {
      if (
        !productDetails.itemCategory ||
        !productDetails.title ||
        !productDetails.brand ||
        !productDetails.image ||
        !productDetails.price ||
        !productDetails.description ||
        !productDetails.availableQuantity ||
        !productDetails.specificationId ||
        !productDetails.configurationId
      ) {
        setInputError(true);
        return;
      }

      const formData = new FormData();

      // Append data to the FormData object
      formData.append("itemCategory", productDetails.itemCategory);
      formData.append("title", productDetails.title);
      formData.append("brand", productDetails.brand);
      formData.append("image", productDetails.image);
      formData.append("price", productDetails.price);
      formData.append("description", productDetails.description);
      formData.append("availableQuantity", productDetails.availableQuantity);
      formData.append("specificationId", productDetails.specificationId);
      formData.append("configurationId", productDetails.configurationId);

      // Make the POST
      await axios
        .patch("http://localhost:1111/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          enqueueSnackbar("Product Created Succesfully", {
            variant: "success",
          });
          dispatch(setProductPosted());
          closeEditProduct();
        })
        .catch((error) => "");
    } catch (error) {
      // Handle errors
    }
  };

  const fetchConfigurationToCorrespondingSpecification = async (
    selectedSpecificationId
  ) => {
    await axios.get("http://localhost:1111/configuration").then((res) => {
      setAllConfigurations(
        res.data.filter((e) => {
          return e.specificationId == selectedSpecificationId;
        })
      );
    });
  };

  useEffect(() => {
    productDetails.specificationId &&
      fetchConfigurationToCorrespondingSpecification(
        productDetails.specificationId
      );
  }, [productDetails]);

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-center items-center"
      onClick={closeEditProduct}
    >
      <div
        className="w-[650px] h-[550px] rounded-xl pt-6 flex flex-col justify-center items-center bg-slate-100 relative overflow-scroll"
        style={{ marginTop: "50px" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="my-4 font-bold text-xl">Edit Product</div>
        <div className="flex flex-col gap-y-2 w-[100%] px-6 py-4 h-full overflow-y-scroll">
          <div className="flex gap-x-4">
            {/* itemCategory Input */}
            <div className="flex space-between gap-x-4  items-center">
              <label htmlFor="" className="flex">
                Item Category
                <span>:</span>
              </label>
              <Box
                sx={{
                  minWidth: 150,
                  minHeight: 40,
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Item Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      productDetails.itemCategory && productDetails.itemCategory
                    }
                    label="Sub Specification"
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        itemCategory: e.target.value,
                      }))
                    }
                  >
                    {allItemCategories &&
                      allItemCategories.map((e, i) => {
                        return (
                          <MenuItem key={e._id} value={e._id}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            {/* Brand Input */}
            <div className="flex space-between gap-x-4  items-center">
              <label htmlFor="" className="flex">
                Brand <span>:</span>
              </label>
              <Box
                sx={{
                  minWidth: 150,
                  minHeight: 40,
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productDetails.brand && productDetails.brand}
                    label="Sub Specification"
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        brand: e.target.value,
                      }))
                    }
                  >
                    {allBrands &&
                      allBrands.map((e, i) => {
                        return (
                          <MenuItem key={e._id} value={e._id}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          {/* title Input */}
          <div className="flex space-between ">
            <label className="w-[200px]">Title : </label>
            <input
              value={productDetails.title && productDetails.title}
              type="text"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <EditSpecs
            specDetails={productSpecDetails}
            setSpecsData={setSpecsData}
          />
          <div className="flex space-between ">
            <label htmlFor="" className="w-[200px]">
              Price :{" "}
            </label>
            <input
              value={productDetails.price && productDetails.price}
              type="text"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex space-between ">
            <label htmlFor="" className="w-[200px]">
              Description :{" "}
            </label>
            <input
              value={productDetails.description && productDetails.description}
              type="text"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex space-between ">
            <label htmlFor="" className="w-[200px]">
              Available Quantity <span>: </span>
            </label>
            <input
              value={
                productDetails.availableQuantity &&
                productDetails.availableQuantity
              }
              type="number"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  availableQuantity: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex space-between ">
            <label htmlFor="" className="w-[200px]">
              Upload Image :
            </label>
            <input
              type="file"
              className="border-2 border-slate-400 rounded-md py-1 px-2 w-full"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />
          </div>
          <div>
            {inputError && (
              <span className="absolute text-slate-200 text-[13px] bg-red-700 px-3 py-1 top-0 right-0 left-0 text-center rounded-t-xl">
                Input Missing
              </span>
            )}
          </div>
        </div>

        <div className="my-6">
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "yellow",
              color: "black",
              marginRight: "20px",
            }}
            onClick={handleProductDetails}
          >
            Add
          </Button>
          <Button variant="outlined" size="small" onClick={closeEditProduct}>
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
