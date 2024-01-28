import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";

import axios from "axios";

const AddSpecs = ({ setSpecsData }) => {
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
  const [allSpecifications, setAllSpecifications] = useState([]);
  const [allConfigurations, setAllConfigurations] = useState([]);

  const [specsCount, setSpecsCount] = useState(1);
  const [specsArray, setSpecsArray] = useState([
    {
      id: specsCount,
      element: `specs ${specsCount}`,
      specs: { specificationId: "", configurationId: "" },
    },
  ]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchSpecification();
  }, []);

  useEffect(() => {
    console.log(productDetails.specs);
  }, [productDetails]);

  useEffect(() => {
    // console.log("All Specifications:", allSpecifications);
  }, [allSpecifications]);

  useEffect(() => {
    // console.log("All configurations:", allConfigurations);
  }, [allConfigurations]);

  useEffect(() => {
    console.log("Specs array:", specsArray);
    setSpecsData(specsArray);
  }, [specsArray]);

  const fetchSpecification = async () => {
    await axios
      .get("http://localhost:1111/specification")
      .then((res) => {
        console.log("fetch specification", res.data);
        setAllSpecifications((prev) => [...res.data]);
      })
      .catch((error) => console.log(error));
  };

  const handleAddSpecs = () => {
    if (specsArray.length < allSpecifications.length) {
      setSpecsCount((prevCount) => prevCount + 1);
      setSpecsArray((prevElemets) => [
        ...prevElemets,
        {
          id: specsCount + 1,
          element: `specs ${specsCount + 1}`,
          specs: { specificationId: "", configurationId: "" },
        },
      ]);
    } else {
      enqueueSnackbar("Max Category Available Reached", {
        variant: "error",
      });
    }
  };

  const removeSpec = (index) => {
    const updatedSpecsArray = specsArray.filter((_, idx) => idx !== index);
    setSpecsArray(updatedSpecsArray);

    // Remove the corresponding configuration data from allConfigurations
    setAllConfigurations((prevConfigurations) => {
      const updatedConfigurations = [...prevConfigurations];
      updatedConfigurations.splice(index, 1);
      return updatedConfigurations;
    });
  };

  const fetchConfigurationToCorrespondingSpecification = async (
    selectedSpecificationId,
    index
  ) => {
    console.log("configuration check");
    console.log(selectedSpecificationId);

    await axios.get("http://localhost:1111/configuration").then((res) => {
      console.log(res, "selectedSpecificationId", selectedSpecificationId);
      const configData = res.data.filter((e) => {
        console.log(selectedSpecificationId, e.specificationId);
        return e.specificationId == selectedSpecificationId;
      });
      setAllConfigurations((prev) => {
        console.log("configData", configData);
        const updatedConfigurations = [...prev];
        updatedConfigurations[index] = configData; // Update the array element at the specified index
        return updatedConfigurations;
      });
    });
  };

  const handleSpecificationChange = (specification, index) => {
    setSpecsArray((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        specs: { specificationId: specification, configurationId: "" },
      },
      ...prev.slice(index + 1),
    ]);
    fetchConfigurationToCorrespondingSpecification(specification, index);
  };

  const handleConfigurationChange = (configuration, index) => {
    setSpecsArray((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        specs: { ...prev[index].specs, configurationId: configuration },
      },
      ...prev.slice(index + 1),
    ]);
  };

  return (
    <div>
      {/* Select Specification */}
      <div className="flex gap-x-4 items-center">
        <div className="flex flex-col gap-y-4">
          {specsArray.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-y-2">
                <div className="flex gap-4 items-center">
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
                          value={item.specs.specificationId}
                          label="Specs"
                          onChange={(e) =>
                            handleSpecificationChange(e.target.value, index)
                          }
                        >
                          {allSpecifications.map((e, i) => {
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
                  {/* Select Sub Specification(Configuration) */}
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
                          value={item.specs.configurationId || ""}
                          label="Sub Specification"
                          onChange={(e) =>
                            handleConfigurationChange(e.target.value, index)
                          }
                        >
                          {allConfigurations[index] &&
                            allConfigurations[index].map((configuration) => {
                              console.log(configuration);
                              return (
                                <MenuItem
                                  key={configuration._id}
                                  value={configuration._id}
                                >
                                  {configuration.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  {specsArray.length !== 1 && (
                    <div className="cursor-pointer text-red-600">
                      <RemoveCircleOutlineIcon
                        onClick={() => removeSpec(index)}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="cursor-pointer text-green-600" onClick={handleAddSpecs}>
          <AddCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default AddSpecs;
