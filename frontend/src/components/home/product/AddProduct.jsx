import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddProduct = ({ id, onClose }) => {
  const [productDetails, setProductDetails] = useState({
    itemCategory: "",
    title: "",
    brand: "",
    image: null,
    price: 0,
    description: "",
    availableQuantity: 0,
    specificationId: "",
    configurationId: "",
  });

  const [inputError, setInputError] = useState(false);

  // Fetch state data specification and configuration
  const [specifications, setSpecifications] = useState([]);
  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    fetchSpecification();
  }, []);

  const fetchSpecification = async () => {
    console.log("fetch");
    await axios
      .get("http://localhost:1111/specification")
      .then((res) => {
        console.log("fetch specification", res.data);
        setSpecifications((prev) => [...res.data]);
      })
      .catch((error) => console.log(error));
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
      console.log("productDetails", productDetails);
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
        console.log("Missing Input Values");
        return;
      }

      console.log("input values");

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
        .post("http://localhost:1111/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setInputError(false);
          onClose();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const fetchConfigurationToCorrespondingSpecification = async (
    selectedSpecificationId
  ) => {
    console.log(selectedSpecificationId);
    await axios.get("http://localhost:1111/configuration").then((res) => {
      console.log(res, "selectedSpecificationId", selectedSpecificationId);
      setConfigurations(
        res.data.filter((e) => {
          console.log(selectedSpecificationId, e.specificationId);
          return e.specificationId == selectedSpecificationId;
        })
      );
    });
  };

  useEffect(() => {
    console.log(productDetails.image);
    productDetails.specificationId &&
      fetchConfigurationToCorrespondingSpecification(
        productDetails.specificationId
      );
  }, [productDetails]);

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[650px] h-[550px] rounded-xl pt-6 flex flex-col justify-center items-center bg-slate-100 relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="my-4 font-bold text-xl">Add Specification</div>
        <div className="flex flex-col gap-y-2 w-[100%] px-6 py-4 h-full overflow-y-scroll">
          {/* itemCategory Input */}
          <div className="flex space-between">
            <label className="w-[200px]">Item Category : </label>
            <input
              type="text"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  itemCategory: e.target.value,
                }))
              }
            />
          </div>
          {/* Brand Input */}
          <div className="flex space-between ">
            <label className="w-[200px]">Brand : </label>
            <input
              type="text"
              className="border-2 border-slate-400 rounded-md w-full px-4 py-1"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  brand: e.target.value,
                }))
              }
            />
          </div>
          {/* title Input */}
          <div className="flex space-between ">
            <label className="w-[200px]">Title : </label>
            <input
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
          {/* Select Specification */}
          <div className="flex gap-x-4 items-center">
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex space-between  items-center gap-x-4">
                  <label htmlFor="" className="flex">
                    Specification <span>:</span>{" "}
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
                        Specs
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="specification"
                        style={{ borderColor: "red" }}
                        value={productDetails.specification}
                        label="Specs"
                        onChange={(e) =>
                          setProductDetails((prev) => ({
                            ...prev,
                            specificationId: e.target.value,
                          }))
                        }
                      >
                        {specifications.map((e, i) => {
                          console.log(e);
                          return (
                            <MenuItem
                              key={e._id}
                              value={e._id}
                              style={{ borderColor: "red" }}
                            >
                              {e.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                {/* Select Sub Specification */}
                <div className="flex space-between gap-x-4  items-center">
                  <label htmlFor="" className="flex">
                    Configuration <span>:</span>
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
                        Config
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productDetails.configuration}
                        label="Sub Specification"
                        onChange={(e) =>
                          setProductDetails((prev) => ({
                            ...prev,
                            configurationId: e.target.value,
                          }))
                        }
                      >
                        {configurations &&
                          configurations.map((e, i) => {
                            console.log(e);
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
            </div>
          </div>
          <div className="flex space-between ">
            <label htmlFor="" className="w-[200px]">
              Price :{" "}
            </label>
            <input
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
          <Button variant="outlined" size="small" onClick={onClose}>
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
