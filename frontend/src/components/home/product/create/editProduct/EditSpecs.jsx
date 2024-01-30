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

const EditSpecs = ({ setSpecsData, specDetails }) => {
  // State to hold all specifications
  const [allSpecifications, setAllSpecifications] = useState([]);
  // State to hold all configurations
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
    specDetails && specDetails[0] && setSpecDetails();
  }, [specDetails]);

  const setSpecDetails = () => {
    const productSpecs = specDetails.map((spec, idx) => {
      handleSpecificationChange(spec.specificationId, idx);
      handleConfigurationChange(spec.configurationId, idx);
    });
  };
  useEffect(() => {
    setSpecsData(specsArray);
  }, [specsArray]);

  const fetchSpecification = async () => {
    await axios
      .get("http://localhost:1111/specification")
      .then((res) => {
        setAllSpecifications((prev) => [...res.data]);
      })
      .catch((error) => "");
  };

  const handleEditSpecs = () => {
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

  // Fetch configurations for the selected specification
  const fetchConfigurationToCorrespondingSpecification = async (
    selectedSpecificationId,
    index
  ) => {
    await axios.get("http://localhost:1111/configuration").then((res) => {
      const configData = res.data.filter((e) => {
        return e.specificationId == selectedSpecificationId;
      });
      setAllConfigurations((prev) => {
        const updatedConfigurations = [...prev];
        updatedConfigurations[index] = configData; // Update the array element at the specified index
        return updatedConfigurations;
      });
    });
  };

  // Handle change of specification dropdown
  const handleSpecificationChange = (specification, index) => {
    setSpecsArray((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        specs: { specificationId: specification, configurationId: "" },
      },
      ...prev.slice(index + 1),
    ]);
    // Fetch configurations for the selected specification
    fetchConfigurationToCorrespondingSpecification(specification, index);
  };

  // Handle change of configuration dropdown
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
      <div className="flex gap-x-4 items-center">
        <div className="flex flex-col gap-y-4">
          {specsArray.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-y-2">
                <div className="flex gap-4 items-center">
                  <div className="flex space-between  items-center gap-x-4">
                    {/* Select Specification */}
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
                          value={
                            item.specs.specificationId &&
                            item.specs.specificationId
                          }
                          label="Specs"
                          onChange={(e) =>
                            handleSpecificationChange(e.target.value, index)
                          }
                        >
                          {allSpecifications.map((e, i) => {
                            return (
                              <MenuItem
                                key={e._id}
                                value={e._id && e._id}
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
                          value={
                            item.specs.configurationId &&
                            item.specs.configurationId
                          }
                          label="Sub Specification"
                          onChange={(e) =>
                            handleConfigurationChange(e.target.value, index)
                          }
                        >
                          {allConfigurations[index] &&
                            allConfigurations[index].map((configuration) => {
                              return (
                                <MenuItem
                                  key={configuration._id}
                                  value={configuration._id && configuration._id}
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
        <div
          className="cursor-pointer text-green-600"
          onClick={handleEditSpecs}
        >
          <AddCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default EditSpecs;
